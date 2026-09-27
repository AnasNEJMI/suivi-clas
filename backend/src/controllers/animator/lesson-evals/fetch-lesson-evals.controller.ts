// src/controllers/animator/animatorLessonEvals.controller.ts

import { Request, Response, NextFunction } from 'express'
import { prisma }                          from '../../../db/prisma.js'
import { sendSuccess }                     from '../../../utils/response.utils.js'
import { ApiError }                        from '../../../classes/ApiError.class.js'
import { PrismaClientKnownRequestError }   from '../../../generated/prisma/internal/prismaNamespace.js'
import { LessonEval } from '../../../generated/prisma/enums.js'

// ── Types (matching your provided contract) ────────────────────────────────────
export type LessonEvalData = {
  id:         number,
  studentId : number,
  lesson:     { id: number; label: string }
  subject:    { id: number; label: string }
  level:      { id: number; label: string }
  evaluation: LessonEval,
  updatedAt : Date
}

export type LessonEvalsBySubjectEntry = {
  id:          number   // subject id — used as grouping key
  subject:     { id: number; label: string }
  lessonEvals: LessonEvalData[]
}

export type StudentLessonEvalsEntry = {
  id:          number
  firstName:   string
  lastName:    string
  gender:      'f' | 'm'
  level:       { id: number; label: string }
  lessonEvalsBySubject: LessonEvalsBySubjectEntry[]
}

export type LessonEvalClassEntry = {
  id:          number
  label:       string
  contractId:  number
  association: { id: number; label: string }
  scolarYear:  { id: number; label: string }
  students:    StudentLessonEvalsEntry[]
}

export type LessonEvalsResponse = {
  classes: LessonEvalClassEntry[]
}

// ── Handler ───────────────────────────────────────────────────────────────────

export async function animatorFetchLessonEvalsHandler(
  req:  Request,
  res:  Response,
  next: NextFunction,
) {
  try {
    const animatorId = req.user!.id

    // ── Two parallel queries ──────────────────────────────────────────────────
    //
    // Query A: contract structure — class rosters, student levels, association.
    //          This gives us the grouping shell to build the response tree.
    //
    // Query B: every lesson eval this animator has submitted, with full lesson
    //          context (level, subject). Fetched flat then grouped in memory.
    //          Doing it flat avoids N+1 queries (one per student).

    const [contracts, rawEvals] = await Promise.all([
      prisma.animatorContract.findMany({
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
                },
              },
            },
          },
        },
      }),

      prisma.lessonEvaluation.findMany({
        where: { submittedById : animatorId },
        select: {
          id:         true,
          studentId:  true,
          evaluation: true,
          updatedAt : true,
          lesson: {
            select: {
              id:      true,
              label:   true,
              level:   { select: { id: true, label: true } },
              subject: { select: { id: true, label: true } },
            },
          },
        },
      }),
    ])

    // ── Build lookup: studentId → their evals ─────────────────────────────────

    type RawEval = (typeof rawEvals)[0]

    const evalsByStudentId = new Map<number, RawEval[]>()
    for (const ev of rawEvals) {
      if (!evalsByStudentId.has(ev.studentId)) {
        evalsByStudentId.set(ev.studentId, [])
      }
      evalsByStudentId.get(ev.studentId)!.push(ev)
    }

    // ── Per-student builder ───────────────────────────────────────────────────
    //
    // Filters to only evals where lesson.level matches the student's level,
    // then groups the remaining evals by subject.
    // A student in 5ème will never see evals for lessons from another level,
    // even if the animator accidentally submitted some.

    function buildStudentLessonEvals(
      studentId: number,
      levelId:   number,
    ): LessonEvalsBySubjectEntry[] {
      const allStudentEvals = evalsByStudentId.get(studentId) ?? []

      // Level filter — the core constraint
      const levelEvals = allStudentEvals.filter(ev => ev.lesson.level.id === levelId)

      // Group by subject
      const subjectMap = new Map<number, LessonEvalsBySubjectEntry>()

      for (const ev of levelEvals) {
        const { id: subjectId, label: subjectLabel } = ev.lesson.subject

        if (!subjectMap.has(subjectId)) {
          subjectMap.set(subjectId, {
            id:          subjectId,
            subject:     { id: subjectId, label: subjectLabel },
            lessonEvals: [],
          })
        }

        subjectMap.get(subjectId)!.lessonEvals.push({
          id:         ev.id,
          studentId,
          lesson:     { id: ev.lesson.id, label: ev.lesson.label },
          subject:    ev.lesson.subject,
          level:      ev.lesson.level,
          evaluation: ev.evaluation as LessonEval,
          updatedAt : ev.updatedAt
        })
      }

      return [...subjectMap.values()]
    }

    // ── Build response tree: class → students → evals by subject ─────────────

    const classes: LessonEvalClassEntry[] = contracts
      .filter(c => c.class !== null && c.scolarYear !== null && c.class.association !== null)
      .map(contract => {
        const cls = contract.class!

        const students: StudentLessonEvalsEntry[] = cls.students
          .filter(s => s.level !== null)
          .map(s => ({
            id:          s.id,
            firstName:   s.firstName,
            lastName:    s.lastName,
            gender:      s.gender,
            level:       s.level!,
            lessonEvalsBySubject : buildStudentLessonEvals(s.id, s.level!.id),
          }))

        return {
          id:          cls.id,
          label:       cls.label,
          contractId:  contract.id,
          association: cls.association!,
          scolarYear:  contract.scolarYear!,
          students,
        }
      })

    return sendSuccess<LessonEvalsResponse>(res, { classes })

  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      console.error('[animatorLessonEvalsHandler] Prisma error:', error)
      return next(ApiError.internalError())
    }
    next(error)
  }
}