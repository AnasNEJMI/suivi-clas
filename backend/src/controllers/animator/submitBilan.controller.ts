import { Request, Response, NextFunction } from 'express'
import { PrismaClientKnownRequestError } from '../../generated/prisma/internal/prismaNamespace.js'
import { ApiError } from '../../classes/ApiError.class.js'
import { prisma } from '../../db/prisma.js'
import { sendSuccess } from '../../utils/response.utils.js'
import { BilanInput } from '../../schemas/bilan.schema.js'
import { generateQcmForBilan } from '../lib/qcm/generate-qcm-for-bilan.js'
import { BilanEntry, QcmEntry } from './seances/utils.js'

type BilanResponse = {
  data: BilanEntry | null
}

const SKILL_SELECT = { id: true, label: true, description: true } as const

// Single source of truth for what the client gets back (both lesson skills and bilan skills are ordered).
const BILAN_SELECT = {
  id: true,
  submittedById: true,
  studentId: true,
  seanceId: true,
  date: true,
  presence: true,
  summary: true,
  lesson: {
    select: {
      id: true,
      label: true,
      subject: { select: { id: true, label: true } },
      curriculumSkills: { select: SKILL_SELECT, orderBy: { position: 'asc' } },
    },
  },
  // The skills linked to this bilan (no extra filter needed: the relation already is the validated set).
  curriculumSkills: { select: SKILL_SELECT, orderBy: { position: 'asc' } },
} as const

function isUniqueViolation(error: unknown): boolean {
  return error instanceof PrismaClientKnownRequestError && error.code === 'P2002'
}

export async function animatorSubmitBilanHandler(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const {
      animatorId: bodyAnimatorId,
      studentId,
      seanceId,
      lessonId,
      presence,
      summary,
      includeQcm,
      curriculumSkillIds,
      lessonEval,
    } = req.body as BilanInput

    // The identity always comes from the session; the body field is only checked for consistency.
    const animatorId = req.user!.id
    if (bodyAnimatorId !== animatorId) {
      throw ApiError.unauthorized('Accès non autorisé.')
    }

    // ---- Validate everything BEFORE the first write (the old code saved the bilan, then rejected the request) ----

    // A present student needs a lesson and an evaluation. An absent student needs neither: the old code
    // rejected absent bilans (no lessonId / lessonEval) after having saved them, and could even write a
    // lesson evaluation for an absent student.
    if (presence && (!lessonId || lessonId < 1)) {
      throw ApiError.validationError('Une leçon doit être sélectionnée.')
    }
    if (presence && !lessonEval) {
      throw ApiError.validationError('Le niveau d’acquisition est obligatoire.')
    }

    // Absent => selections ignored. Present => an empty list is valid ("no specific skills").
    const skillIds = presence ? [...new Set((curriculumSkillIds ?? []).map(Number))] : []
    if (skillIds.some(id => !Number.isInteger(id) || id < 1)) {
      throw ApiError.validationError('Identifiants de compétences invalides.')
    }

    // Two independent reads, run in parallel (same latency as one):
    //  1. the seance must exist, the student must be in its class, and the animator must be assigned to that class
    //     (same rule as the auto-summary handler). It also provides the bilan date, so it is not taken from the client.
    //  2. every selected skill must belong to the lesson (count is cheaper than fetching rows).
    const [seance, matchingSkillCount] = await Promise.all([
      prisma.seance.findFirst({
        where: {
          id: seanceId,
          class: {
            students: { some: { id: studentId } },
            animatorContracts: { some: { animatorId } },
          },
        },
        select: { date: true },
      }),
      skillIds.length > 0
        ? prisma.curriculumSkill.count({ where: { id: { in: skillIds }, lessonId: lessonId! } })
        : Promise.resolve(0),
    ])

    if (!seance) {
      throw ApiError.unauthorized('Séance ou élève introuvable.')
    }
    if (matchingSkillCount !== skillIds.length) {
      throw ApiError.validationError('Une ou plusieurs compétences ne correspondent pas à la leçon sélectionnée.')
    }

    const skillReferences = skillIds.map(id => ({ id }))

    // ---- One transaction: the bilan and the lesson evaluation are saved together or not at all ----
    const save = () =>
      prisma.$transaction(async tx => {
        const saved = await tx.bilan.upsert({
          where: { bilanId: { seanceId, studentId } },
          update: presence
            ? { presence: true, lessonId, summary, curriculumSkills: { set: skillReferences } }
            // Going from present to absent also clears the skills (they used to stay linked to the bilan).
            : { presence: false, lessonId: null, summary: null, curriculumSkills: { set: [] } },
          create: {
            submittedById: animatorId,
            seanceId,
            studentId,
            date: seance.date,
            ...(presence
              ? { presence: true, lessonId, summary, curriculumSkills: { connect: skillReferences } }
              : { presence: false, lessonId: null, summary: null }),
          },
          select: BILAN_SELECT,
        })

        if (presence) {
          await tx.lessonEvaluation.upsert({
            where: { lessonEvalId: { submittedById: animatorId, studentId, lessonId: lessonId! } },
            update: { evaluation: lessonEval! },
            create: { submittedById: animatorId, studentId, lessonId: lessonId!, evaluation: lessonEval! },
          })
        }

        return saved
      })

    // Two concurrent submissions of the same bilan can both try to INSERT: retry once, the second pass updates.
    let bilan
    try {
      bilan = await save()
    } catch (error) {
      if (!isUniqueViolation(error)) throw error
      bilan = await save()
    }

    let qcm: QcmEntry | null = null

    // Outside the transaction on purpose: generation can be slow and must not hold a DB connection open.
    // NOTE: the selected skill ids are not passed here (see the comment in the summary of changes).
    if (bilan.presence && bilan.lesson?.id && includeQcm) {
      qcm = await generateQcmForBilan(bilan.id, studentId, bilan.lesson.id)
    }

    return sendSuccess<BilanResponse>(res, {
      data: { ...bilan, qcm },
    })
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      console.error('[animatorSubmitBilanHandler] Prisma error:', error.code, error.meta)
      if (error.code === 'P2003') return next(ApiError.validationError('Référence invalide.'))
      return next(ApiError.internalError())
    }
    next(error)
  }
}