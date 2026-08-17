// src/controllers/association/visitStats.controller.ts
import { Request, Response, NextFunction } from 'express'
import { prisma }                          from '../../db/prisma.js'
import { ApiError } from '../../classes/ApiError.class.js';
import { Gender } from '../../generated/prisma/enums.js';
import { sendSuccess } from '../../utils/response.utils.js';

export type VisitStatsResponse          = { visitStatsPerScolarYear: VisitStatsPerScolarYear[] }
export type VisitStatsPerScolarYear     = { scolarYear: { id: number; label: string }; classes: { class : {id: number; label: string},students: StudentVisitStats[] }[]}
export type StudentVisitStats           = { id: number; firstName: string; lastName: string; gender: Gender; numVisits: number; lastVisit: Date | null }

export async function fetchAssociationStudents(associationId: number) {
  return prisma.student.findMany({
    where:  { class: { associationId } },
    select: {
      id: true, firstName: true, lastName: true, gender: true,
      class: { select: { id: true, label: true } },
    },
  })
}

export async function associationVisitStatsHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const associationId = req.user!.association?.id
    if (!associationId) throw ApiError.unauthorized('Aucune association liée à ce compte.')

    const [visits, students] = await Promise.all([

      // Query 1: all Visit rows for students in this association.
      // Visit is pre-aggregated — visitCount and lastVisit are already computed.
      // We only need studentId + year for grouping, plus the two metric fields.
      prisma.visit.findMany({
        where: {
          student:     { class: { associationId } },
        },
        select: {
          studentId:   true,
          numVisits:  true,
          lastVisit:   true,
          scolarYear:  { select: { id: true, label: true } },
        },
      }),

      fetchAssociationStudents(associationId),
    ])

    // O(1) lookups
    const studentMap = new Map(students.map(s => [s.id, s]))

    // Build a set of classIds that had any visits per year.
    // This drives the fill-in pass: we only add zero-visit students to
    // (year, class) pairs that already have at least one real visit row.
    // Without this guard, every student would appear in every year.
    type ClassYearKey = string
    const activeClassYearKeys = new Set<ClassYearKey>()

    // Primary accumulator: yearId → classId → studentId → metrics
    type YearBucket = {
      scolarYear: { id: number; label: string }
      classes: Map<number, {
        class:    { id: number; label: string }
        students: Map<number, { numVisits: number; lastVisit: Date | null }>
      }>
    }
    const yearMap = new Map<number, YearBucket>()

    for (const visit of visits) {
      const scolarYear = visit.scolarYear
      if (!scolarYear) continue

      const student = studentMap.get(visit.studentId)
      if (!student?.class) continue

      if (!yearMap.has(scolarYear.id)) {
        yearMap.set(scolarYear.id, { scolarYear, classes: new Map() })
      }
      const yearBucket = yearMap.get(scolarYear.id)!

      if (!yearBucket.classes.has(student.class.id)) {
        yearBucket.classes.set(student.class.id, { class: student.class, students: new Map() })
      }
      const classBucket = yearBucket.classes.get(student.class.id)!

      // Each student has at most one Visit row per year (DB unique constraint),
      // so there's no count to accumulate — just store the values directly.
      classBucket.students.set(visit.studentId, {
        numVisits: visit.numVisits,
        lastVisit:  visit.lastVisit,
      })

      activeClassYearKeys.add(`${student.class.id}-${scolarYear.id}`)
    }

    // Fill-in pass: students with no Visit row appear as 0 / null.
    // Only for (class, year) pairs that were already activated above.
    for (const student of students) {
      if (!student.class) continue
      for (const yearBucket of yearMap.values()) {
        const key = `${student.class.id}-${yearBucket.scolarYear.id}`
        if (!activeClassYearKeys.has(key)) continue   // class was inactive this year

        const classBucket = yearBucket.classes.get(student.class.id)
        if (!classBucket) continue

        if (!classBucket.students.has(student.id)) {
          classBucket.students.set(student.id, { numVisits: 0, lastVisit: null })
        }
      }
    }

    // Flatten → sort
    const visitStatsPerScolarYear: VisitStatsPerScolarYear[] = []

    for (const yearBucket of yearMap.values()) {
        const classes = [];
      for (const classBucket of yearBucket.classes.values()) {
        const visitStats: StudentVisitStats[] = Array.from(classBucket.students.entries())
          .map(([studentId, metrics]) => {
            const s = studentMap.get(studentId)!
            return {
              id:         s.id,
              firstName:  s.firstName,
              lastName:   s.lastName,
              gender:     s.gender,
              numVisits: metrics.numVisits,
              lastVisit:  metrics.lastVisit,
            }
          })
          // Most visits first — a useful default for the dashboard view
          .sort((a, b) => b.numVisits - a.numVisits || a.lastName.localeCompare(b.lastName, 'fr', { sensitivity: 'base' }))

        classes.push({
          class: classBucket.class,
          students : visitStats,
        })
      }
      visitStatsPerScolarYear.push({
          scolarYear: yearBucket.scolarYear,
          classes
      })
    }

    visitStatsPerScolarYear.sort(
      (a, b) =>
        b.scolarYear.label.localeCompare(a.scolarYear.label))

    return sendSuccess(res, { visitStatsPerScolarYear } satisfies VisitStatsResponse)
  } catch (error) {
    next(error)
  }
}