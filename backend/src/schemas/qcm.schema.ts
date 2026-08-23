import z from "zod";
import { AnswerChoice, Difficulty } from "../generated/prisma/enums.js";

export const answerChoiceSchema = z.enum(AnswerChoice);
export const difficultySchema = z.enum(Difficulty);

const bankQuestionEntrySchema = z.object({
  id: z.int().positive(),
  question: z.string(),
  difficulty: difficultySchema,
  answerA: z.string(),
  answerB: z.string(),
  answerC: z.string(),
  answerD: z.string(),
  correctAnswer: answerChoiceSchema,
  explanation: z.string(),
});

const qcmQuestionsEntrySchema = z.object({
  id: z.int().positive(),
  correct: z.boolean(),
  selectedChoice: answerChoiceSchema.nullable(),
  bankQuestion: bankQuestionEntrySchema,
})

export const lessonSchema = z.object({
  id: z.int().positive(),
  label: z.string(),
});

export const qcmSchema = z.object({
  id: z.int().positive(),
  studentId: z.int().positive(),
  completed: z.boolean(),
  score: z.number().nullable(),
  qcmQuestions: z.array(qcmQuestionsEntrySchema),
});

export type QcmInput = z.infer<typeof qcmSchema>;