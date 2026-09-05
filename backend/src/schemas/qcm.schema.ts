import z from "zod";
import { AnswerChoice, Difficulty, Gender } from "../generated/prisma/enums.js";

export const answerChoiceSchema = z.enum(AnswerChoice);
export const difficultySchema = z.enum(Difficulty);
export const genderSchema = z.enum(Gender);

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

const submittedByEntrySchema = z.object({
  id : z.int().positive(),
  firstName : z.string(),
  lastName : z.string(),
  gender : genderSchema,
})

const qcmQuestionsEntrySchema = z.object({
  id: z.int().positive(),
  correct: z.boolean(),
  selectedChoice: answerChoiceSchema.nullable(),
  bankQuestion: bankQuestionEntrySchema,
})

export const subjectSchema = z.object({
  id: z.int().positive(),
  label: z.string(),
});

export const lessonSchema = z.object({
  id: z.int().positive(),
  label: z.string(),
  subject : subjectSchema
});

export const qcmSchema = z.object({
  id: z.int().positive(),
  studentId: z.int().positive(),
  completed: z.boolean(),
  score: z.number().nullable(),
  qcmQuestions: z.array(qcmQuestionsEntrySchema),
  submittedBy : submittedByEntrySchema,
  date : z.iso.datetime(),
});

export type QcmInput = z.infer<typeof qcmSchema>;