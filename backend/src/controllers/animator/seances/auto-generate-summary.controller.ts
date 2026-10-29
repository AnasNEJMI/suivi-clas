import 'dotenv/config'
import { Request, Response, NextFunction } from 'express'
import z from 'zod'
import { prisma } from '../../../db/prisma.js'
import { ApiError } from '../../../classes/ApiError.class.js'
import { sendSuccess } from '../../../utils/response.utils.js'
import { PrismaClientKnownRequestError } from '../../../generated/prisma/internal/prismaNamespace.js'
import {
  ACTIVITIES,
  COMPREHENSION_LEVELS,
  ENGAGEMENT_LEVELS,
  METHODOLOGY_SKILLS,
  METHODOLOGY_TRENDS,
  NEXT_STEPS,
} from './auto-summary.types.js'
import { generateAutoSummaryParagraphsFromDb } from './auto-summary-utils.js'

const autoSummaryBodySchema = z.object({
  studentId: z.number().int().positive(),
  lessonId: z.number().int().positive(),
  activity: z.enum(ACTIVITIES),
  engagement: z.enum(ENGAGEMENT_LEVELS),
  comprehension: z.enum(COMPREHENSION_LEVELS),
  methodologySkill: z.enum(METHODOLOGY_SKILLS),
  methodologyTrend: z.enum(METHODOLOGY_TRENDS),
  nextStep: z.enum(NEXT_STEPS),
})

export type AutoSummaryResponse = { data: { paragraphs: string[] } }

// POST /api/animator/bilan/auto-summary
export async function animatorAutoSummaryHandler(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const user = req.user!

    // Feature restricted to one animator. Keep the explicit unset-env guard.
    const allowed = process.env.AUTO_SUMMARY_USERNAME
    if (!allowed || user.username !== allowed) {
      throw ApiError.unauthorized('Fonctionnalité non disponible.')
    }

    const parsed = autoSummaryBodySchema.safeParse(req.body)
    if (!parsed.success) {
      throw ApiError.validationError('Paramètres invalides : ' + parsed.error.message)
    }
    const { studentId, lessonId, ...choices } = parsed.data

    const [contract, lesson] = await Promise.all([
      prisma.animatorContract.findFirst({
        where: {
          animatorId: user.id,
          class: { students: { some: { id: studentId } } },
        },
        select: {
          class: {
            select: {
              students: {
                where: { id: studentId },
                select: { firstName: true },
              },
            },
          },
        },
      }),
      prisma.lesson.findUnique({
        where: { id: lessonId },
        select: { label: true },
      }),
    ])

    const firstName = contract?.class?.students[0]?.firstName
    if (!firstName) throw ApiError.unauthorized('Élève introuvable.')
    if (!lesson) throw ApiError.unauthorized('Leçon introuvable.')

    // DB-backed selection: four independently selected paragraphs, in reading order.
    const paragraphs = await generateAutoSummaryParagraphsFromDb({
      firstName,
      lessonLabel: lesson.label,
      ...choices,
    })

    return sendSuccess<AutoSummaryResponse>(res, { data: { paragraphs } })
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      console.error('[animatorAutoSummaryHandler] Prisma error:', error)
      return next(ApiError.internalError())
    }
    next(error)
  }
}
