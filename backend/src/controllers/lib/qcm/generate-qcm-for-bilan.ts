import { prisma } from '../../../db/prisma.js';
import { QcmEntry } from '../../animator/seances/utils.js';
import { shuffle } from './helper-functions.js';

export async function generateQcmForBilan(
  bilanId: number,
  studentId: number,
  lessonId: number,
): Promise<QcmEntry | null> {
  const qcmSelect = {
    id: true,
    completed: true,
    score: true,
    studentId: true,
    createdAt: true,
    updatedAt: true,
    lesson: {
      select: {
        id: true,
        label: true,
        subject: { select: { id: true, label: true } },
      },
    },
    qcmQuestions: {
      select: {
        id: true,
        correct: true,
        selectedChoice: true,
        bankQuestion: {
          select: {
            id: true,
            question: true,
            difficulty: true,
            answerA: true,
            answerB: true,
            answerC: true,
            answerD: true,
            correctAnswer: true,
            explanation: true,
          },
        },
      },
    },
  } as const;

  // Preserve idempotency: don't generate a second QCM for the same bilan.
  const existing = await prisma.qcm.findUnique({
    where: { bilanId },
    select: qcmSelect,
  });
  if (existing) return existing;

  // Read the skills explicitly associated with this bilan. An empty list means
  // use the whole lesson bank; a non-empty list means use ONLY those skills.
  const bilan = await prisma.bilan.findUnique({
    where: { id: bilanId },
    select: {
      lessonId: true,
      curriculumSkills: { select: { id: true } },
    },
  });

  if (!bilan) {
    throw new Error(`Bilan ${bilanId} introuvable lors de la génération du QCM.`);
  }

  if (bilan.lessonId !== null && bilan.lessonId !== lessonId) {
    throw new Error(
      `La leçon du bilan (${bilan.lessonId}) ne correspond pas à la leçon demandée (${lessonId}).`,
    );
  }

  const selectedSkillIds = bilan.curriculumSkills.map((skill) => skill.id);
  const hasSelectedSkills = selectedSkillIds.length > 0;

  const bankQuestions = await prisma.qcmBankQuestion.findMany({
    where: {
      lessonId,
      ...(hasSelectedSkills
        ? { curriculumSkillId: { in: selectedSkillIds } }
        : {}),
    },
    select: { id: true, difficulty: true },
  });

  if (bankQuestions.length === 0) return null;

  const grouped = {
    e: bankQuestions.filter((q) => q.difficulty === 'e'),
    m: bankQuestions.filter((q) => q.difficulty === 'm'),
    h: bankQuestions.filter((q) => q.difficulty === 'h'),
  };

  // Keep the existing distribution: 4 easy, 4 medium, and 2 hard questions.
  // If a pool is smaller than requested, use all available questions from it.
  const selected = [
    ...shuffle(grouped.e).slice(0, 4),
    ...shuffle(grouped.m).slice(0, 4),
    ...shuffle(grouped.h).slice(0, 2),
  ];

  if (selected.length === 0) return null;

  return prisma.qcm.create({
    data: {
      studentId,
      bilanId,
      lessonId,
      qcmQuestions: {
        create: selected.map((question) => ({ bankQuestionId: question.id })),
      },
    },
    select: qcmSelect,
  });
}
