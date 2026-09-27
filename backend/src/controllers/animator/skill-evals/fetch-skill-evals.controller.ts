// src/controllers/animator/animatorSkillEvals.controller.ts

import { Request, Response, NextFunction } from 'express'
import { prisma }                          from '../../../db/prisma.js'
import { sendSuccess }                     from '../../../utils/response.utils.js'
import { ApiError }                        from '../../../classes/ApiError.class.js'
import { PrismaClientKnownRequestError }   from '../../../generated/prisma/internal/prismaNamespace.js'

// ── Types ──────────────────────────────────────────────────────────────────────

export type SkillEvalData = {
  id : number,
  studentId : number,
  animatorId : number,
  ponctuality:  number
  preparation:  number
  autonomy:     number
  organisation: number
  regularity:   number
  discipline:   number
  respect:      number
  positive:     string
  negative:     string
  improvements: string
  updatedAt:    Date
}

export type SkillEvalStudentEntry = {
  id:        number
  firstName: string
  lastName:  string
  gender:    'f' | 'm'
  level:     { id: number; label: string } | null
  skillEval: SkillEvalData | null   // null = not yet evaluated by this animator
}

export type SkillEvalClassEntry = {
  id:          number
  label:       string
  contractId:  number
  association: { id: number; label: string }
  scolarYear:  { id: number; label: string }
  students:    SkillEvalStudentEntry[]
}

export type SkillEvalsResponse = {
  classes: SkillEvalClassEntry[]
}

// ── Handler ───────────────────────────────────────────────────────────────────

export async function animatorFetchSkillEvalsHandler(
  req:  Request,
  res:  Response,
  next: NextFunction,
) {
  try {
    const animatorId = req.user!.id

    // Single query — students.skills is filtered to only this animator's eval.
    // Because each student has at most one skill entry per animator,
    // skills[0] is either the eval or undefined.

    const contracts = await prisma.animatorContract.findMany({
      where:   { animatorId },
      orderBy: { scolarYear: { label: 'desc' } },
      select: {
        id:         true,
        scolarYear: { select: { id: true, label: true } },
        class: {
          select: {
            id:          true,
            label:       true,
            association: { select: { id: true, label: true } },
            students: {
              orderBy: [{ lastName: 'asc' }, { firstName: 'asc' }],
              select: {
                id:        true,
                firstName: true,
                lastName:  true,
                gender:    true,
                level:     { select: { id: true, label: true } },
                skills: {
                  where:  { animatorId },
                  select: {
                    id: true,
                    ponctuality:  true,
                    preparation:  true,
                    autonomy:     true,
                    organisation: true,
                    regularity:   true,
                    discipline:   true,
                    respect:      true,
                    positive:     true,
                    negative:     true,
                    improvements: true,
                    updatedAt:    true,
                  },
                },
              },
            },
          },
        },
      },
    })

    const classes: SkillEvalClassEntry[] = contracts.map(contract => {
      if (!contract.class || !contract.class.association || !contract.scolarYear) {
        throw ApiError.internalError()
      }

      const students: SkillEvalStudentEntry[] = contract.class.students.map(student => ({
        id:        student.id,
        firstName: student.firstName,
        lastName:  student.lastName,
        gender:    student.gender,
        level:     student.level ?? null,
        skillEval: student.skills[0] ? {...student.skills[0], studentId : student.id, animatorId} : null,
      }))

      const evalsSubmitted = students.filter(s => s.skillEval !== null).length

      return {
        id:          contract.class.id,
        label:       contract.class.label,
        contractId:  contract.id,
        association: contract.class.association,
        scolarYear:  contract.scolarYear,
        students
      }
    })

    return sendSuccess<SkillEvalsResponse>(res, { classes })
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      console.error('[animatorSkillEvalsHandler] Prisma error:', error)
      return next(ApiError.internalError())
    }
    next(error)
  }
}