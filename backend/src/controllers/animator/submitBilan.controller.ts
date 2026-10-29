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

export async function animatorSubmitBilanHandler(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const {
      date,
      animatorId,
      studentId,
      seanceId,
      lessonId,
      presence,
      summary,
      includeQcm,
      curriculumSkillIds,
    } = req.body as BilanInput

    console.log(
      'seanceId : ', seanceId,
      ' | animatorId : ', animatorId,
      ' | studentId : ', studentId,
      ' | date : ', date,
    )

    if (animatorId !== req.user!.id) {
      throw ApiError.unauthorized('Accès non autorisé.')
    }

    // Ignore skill selections when the student was absent. For a present student,
    // an empty list is valid and means “no specific skills selected”.
    const selectedSkillIds = presence
      ? [...new Set((curriculumSkillIds ?? []).map(Number))]
      : []

    // Never trust IDs sent by the client: every selected skill must belong to the
    // lesson attached to this bilan.
    if (selectedSkillIds.length > 0) {
      if (!lessonId || lessonId < 1) {
        throw ApiError.unauthorized('Une leçon doit être sélectionnée pour associer des compétences.')
      }

      const matchingSkills = await prisma.curriculumSkill.findMany({
        where: {
          id: { in: selectedSkillIds },
          lessonId,
        },
        select: { id: true },
      })

      if (matchingSkills.length !== selectedSkillIds.length) {
        throw ApiError.unauthorized('Une ou plusieurs compétences ne correspondent pas à la leçon sélectionnée.')
      }
    }

    const skillReferences = selectedSkillIds.map((id) => ({ id }))

    // Use the whole day to avoid false negatives when the incoming date has lost
    // its time component. (The bilan identity remains seanceId + studentId.)
    const bilan = await prisma.bilan.upsert({
      where: {
        bilanId: {
          seanceId,
          studentId,
        },
      },
      update: {
        presence,
        // On update, always replace the previous skill selection. [] clears it.
        ...(presence && { lessonId, summary, curriculumSkills: { set: skillReferences }}),
        ...(!presence && { lessonId: null, summary: null }),
      },
      create: {
        submittedById: animatorId,
        seanceId,
        studentId,
        date,
        presence,
        ...(presence && { lessonId, summary, curriculumSkills: { connect: skillReferences }}),
        ...(!presence && { lessonId: null, summary: null }),
        
      },
      select: {
        id: true,
        submittedById: true,
        lesson: {
          select: {
            id: true,
            label: true,
            curriculumSkills : {
                select : {id : true, label : true, description : true}
            },
            subject: { select: { id: true, label: true } },
          },
        },
        curriculumSkills: {
          where : {id : {in : curriculumSkillIds?? []}},
          select: { id: true, label: true, description: true },
          orderBy: { position: 'asc' },
        },
        studentId: true,
        seanceId: true,
        date: true,
        presence: true,
        summary: true,
      },
    })

    if (!bilan) {
      throw ApiError.internalError('Une erreur est survenue.')
    }

    let qcm: QcmEntry | null = null

    // If skills were selected, the QCM generator must restrict its bank pool to
    // those skill IDs. An empty/omitted list means all questions for this lesson.
    if (bilan.presence && bilan.lesson?.id && includeQcm) {
      qcm = await generateQcmForBilan(
        bilan.id,
        studentId,
        bilan.lesson.id,
      )
    }

    return sendSuccess<BilanResponse>(res, {
      data: { ...bilan, qcm },
    })
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      console.error('[animatorSeance] Prisma error:', error)
      return next(ApiError.internalError())
    }
    next(error)
  }
}
