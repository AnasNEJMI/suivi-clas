import 'dotenv/config'
import { Request, Response, NextFunction } from 'express'
import z from 'zod'
import { prisma } from '../../../db/prisma.js'
import { ApiError } from '../../../classes/ApiError.class.js'
import { sendSuccess } from '../../../utils/response.utils.js'
import { PrismaClientKnownRequestError } from '../../../generated/prisma/internal/prismaNamespace.js'
import { ACTIVITIES, ENGAGEMENT_LEVELS, NEXT_STEPS } from './auto-summary.types.js'
import { generateAutoSummaryParagraphsFromDb } from './auto-summary-utils.js'

const autoSummaryBodySchema = z.object({
  studentId: z.number().int().positive(),
  lessonId: z.number().int().positive(),
  activity: z.enum(ACTIVITIES),
  engagement: z.enum(ENGAGEMENT_LEVELS),
  nextStep: z.enum(NEXT_STEPS),
  curriculumSkillIds: z.array(z.number().int().positive()).max(100).default([]),
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
    const { studentId, lessonId, curriculumSkillIds, ...choices } = parsed.data
    console.log('values ',{ studentId, lessonId, curriculumSkillIds, ...choices })
    const skillIds = [...new Set(curriculumSkillIds)]

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
                select: { firstName: true, gender: true },
              },
            },
          },
        },
      }),
      prisma.lesson.findUnique({
        where: { id: lessonId },
        select: {
          label: true,
          subject: { select: { label: true } },
          // Only skills that belong to this lesson are returned, in the lesson's own order.
          curriculumSkills: {
            where: { id: { in: skillIds } },
            orderBy: [{ position: 'asc' }, { id: 'asc' }],
            select: { id: true, label: true },
          },
        },
      }),
    ])

    const student = contract?.class?.students[0]
    if (!student) throw ApiError.unauthorized('Élève introuvable.')
    if (!lesson) throw ApiError.unauthorized('Leçon introuvable.')

    // A selected id that is not a skill of this lesson means a stale or tampered selection.
    if (lesson.curriculumSkills.length !== skillIds.length) {
      throw ApiError.validationError('Certaines compétences sélectionnées ne correspondent pas à cette leçon.')
    }

    // DB-backed selection: three independently selected paragraphs, in reading order.
    const paragraphs = await generateAutoSummaryParagraphsFromDb({
      firstName: student.firstName,
      gender: student.gender,
      lessonLabel: lesson.label,
      subjectLabel: lesson.subject.label,
      skillLabels: lesson.curriculumSkills.map(skill => skill.label),
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