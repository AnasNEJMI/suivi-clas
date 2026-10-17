import "dotenv/config"

import { Request, Response, NextFunction }  from 'express'
import z from 'zod'
import { prisma } from '../../../db/prisma.js'
import { ApiError } from '../../../classes/ApiError.class.js'
import { sendSuccess } from '../../../utils/response.utils.js'
import { PrismaClientKnownRequestError } from '../../../generated/prisma/internal/prismaNamespace.js'
import { ACTIVITIES, ENGAGEMENT_LEVELS, METHODOLOGY_SKILLS, METHODOLOGY_TRENDS, NEXT_STEPS } from './auto-summary.types.js'
import { generateAutoSummaryParagraphs } from "./auto-summary.utils.js"

const autoSummaryBodySchema = z.object({
  studentId:        z.number().int().positive(),
  lessonId:         z.number().int().positive(),
  activity:         z.enum(ACTIVITIES),
  engagement:       z.enum(ENGAGEMENT_LEVELS),
  methodologySkill: z.enum(METHODOLOGY_SKILLS),
  methodologyTrend: z.enum(METHODOLOGY_TRENDS),
  nextStep:         z.enum(NEXT_STEPS),
})

export type AutoSummaryResponse = { data : { paragraphs: string[] }}

// POST /api/animator/bilan/auto-summary
export async function animatorAutoSummaryHandler(
  req:  Request,
  res:  Response,
  next: NextFunction,
) {
  try {
    const user = req.user!
    
    // Feature restricted to one animator. The !allowed guard matters: without it,
    // an unset env var and an undefined username would compare equal.
    const allowed = process.env.AUTO_SUMMARY_USERNAME
    if (!allowed || user.username !== allowed) {
        throw ApiError.unauthorized('Fonctionnalité non disponible.')
    }
    
    const parsed = autoSummaryBodySchema.safeParse(req.body)
    if (!parsed.success) {
        throw ApiError.validationError('Paramètres invalides : ' + parsed.error.message)
    }
    const { studentId, lessonId, ...choices } = parsed.data
    
    // The student must belong to a class this animator is contracted with.
    // The nested `where` returns only the requested student's first name.
    const [contract, lesson] = await Promise.all([
        prisma.animatorContract.findFirst({
        where: {
          animatorId: user.id,
          class:      { students: { some: { id: studentId } } },
        },
        select: {
            class: {
                select: {
              students: {
                  where:  { id: studentId },
                select: { firstName: true },
            },
        },
          },
        },
    }),
      prisma.lesson.findUnique({
          where:  { id: lessonId },
        select: { label: true },
      }),
    ])
    
    console.log('ss')
    const firstName = contract?.class?.students[0]?.firstName
    if (!firstName) throw ApiError.unauthorized('Élève introuvable.')
    if (!lesson)    throw ApiError.unauthorized('Leçon introuvable.')

    const paragraphs = generateAutoSummaryParagraphs({
      firstName,
      lessonLabel: lesson.label,
      ...choices,
    })

    console.log('paragraphs : ', paragraphs)
    return sendSuccess<AutoSummaryResponse>(res, { data : {paragraphs}})
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      console.error('[animatorAutoSummaryHandler] Prisma error:', error)
      return next(ApiError.internalError())
    }
    next(error)
  }
}