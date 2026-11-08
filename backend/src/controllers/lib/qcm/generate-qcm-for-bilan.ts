import { prisma } from '../../../db/prisma.js';
import { PrismaClientKnownRequestError } from '../../../generated/prisma/internal/prismaNamespace.js';
import { QcmEntry } from '../../animator/seances/utils.js';
import { shuffle } from './helper-functions.js';

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
    orderBy: { id: 'asc' }, // stable order: easy -> hard, as inserted
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

/**
 * Generates the QCM of a bilan (4 easy, 4 medium, 2 hard questions).
 * Skills selected on the bilan restrict the pool to those skills; no skill means the whole lesson bank.
 * A bilan's skills never change (to change them the bilan is deleted, and its QCM with it),
 * so an existing QCM is always valid and is simply returned.
 */
export async function generateQcmForBilan(
  bilanId: number,
  studentId: number,
  lessonId: number,
): Promise<QcmEntry | null> {
  // Independent reads: run them together.
  const [existing, bilan] = await Promise.all([
    prisma.qcm.findUnique({ where: { bilanId }, select: qcmSelect }),
    prisma.bilan.findUnique({
      where: { id: bilanId },
      select: { lessonId: true, curriculumSkills: { select: { id: true } } },
    }),
  ]);

  if (existing) return existing;

  if (!bilan) {
    throw new Error(`Bilan ${bilanId} introuvable lors de la génération du QCM.`);
  }

  if (bilan.lessonId !== null && bilan.lessonId !== lessonId) {
    throw new Error(
      `La leçon du bilan (${bilan.lessonId}) ne correspond pas à la leçon demandée (${lessonId}).`,
    );
  }

  const selectedSkillIds = bilan.curriculumSkills.map((skill) => skill.id);

  const bankQuestions = await prisma.qcmBankQuestion.findMany({
    where: {
      lessonId,
      ...(selectedSkillIds.length > 0 ? { curriculumSkillId: { in: selectedSkillIds } } : {}),
    },
    select: { id: true, difficulty: true },
  });

  if (bankQuestions.length === 0) return null;

  const selected = [
    ...shuffle(bankQuestions.filter((q) => q.difficulty === 'e')).slice(0, 4),
    ...shuffle(bankQuestions.filter((q) => q.difficulty === 'm')).slice(0, 4),
    ...shuffle(bankQuestions.filter((q) => q.difficulty === 'h')).slice(0, 2),
  ];

  try {
    return await prisma.qcm.create({
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
  } catch (error) {
    // Double submit: another request created the QCM first (bilanId is unique). Return that one.
    if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
      const winner = await prisma.qcm.findUnique({ where: { bilanId }, select: qcmSelect });
      if (winner) return winner;
    }
    throw error;
  }
}