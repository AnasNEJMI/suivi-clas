// src/controllers/association/visitStats.controller.ts
import { Request, Response, NextFunction } from 'express'
import { prisma }                          from '../../db/prisma.js'
import { ApiError } from '../../classes/ApiError.class.js';
import { Gender } from '../../generated/prisma/enums.js';
import { sendSuccess } from '../../utils/response.utils.js';

export type QcmStatsResponse = { qcmStatsPerScolarYear: QcmStatsPerScolarYear[] }
export type QcmStatsPerScolarYear = { scolarYear: { id: number; label: string }; classes: ClassQcmStats[]}
export type ClassQcmStats = { class : {id: number; label: string}, students: StudentQcmStats[]};
export type StudentQcmStats = {id: number; firstName: string;  lastName: string; gender : 'm' | 'f', qcmCompletedCount : number, totalQcms : number, qcmCompletedTotalPoints : number};

export async function fetchAssociationStudents(associationId: number) {
  return prisma.student.findMany({
    where:  { class: { associationId } },
    select: {
      id: true, firstName: true, lastName: true, gender: true,
      class: { select: { id: true, label: true } },
    },
  })
}

export async function associationQcmStatsHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const associationId = req.user!.association?.id
    if (!associationId) throw ApiError.unauthorized('Aucune association liée à ce compte.')
    
    const [qcms, students] = await Promise.all([
    
      prisma.qcm.findMany({
        where: {
          student:     { class: { associationId } },
        },
        select: {
          studentId : true,
          score : true,
          completed : true,
          bilan : {select : {seance : {select : {scolarYear : {select : {id : true, label : true}}}}}}
        },
      }),

      fetchAssociationStudents(associationId),
    ])

    const studentMap = new Map(students.map(s => [s.id, s]));

    type ClassYearKey = string
    const activeClassYearKeys = new Set<ClassYearKey>()
    
    type YearBucket = {
      scolarYear: { id: number; label: string }
      classes: Map<number, {
        class:    { id: number; label: string }
        students: Map<number, {qcmCompletedCount : number, totalQcms : number, qcmCompletedTotalPoints : number}>
      }>
    }
    const yearMap = new Map<number, YearBucket>();

    for (const qcm of qcms) {
      const scolarYear = qcm.bilan?.seance.scolarYear;

      if (!scolarYear) continue

      const student = studentMap.get(qcm.studentId)
      if (!student?.class) continue

      if (!yearMap.has(scolarYear.id)) {
        yearMap.set(scolarYear.id, { scolarYear, classes: new Map() })
      }
      const yearBucket = yearMap.get(scolarYear.id)!

      if (!yearBucket.classes.has(student.class.id)) {
        yearBucket.classes.set(student.class.id, { class: student.class, students: new Map() })
      }
      const classBucket = yearBucket.classes.get(student.class.id)!
      
      if (!classBucket.students.has(student.id)) {
        classBucket.students.set(student.id, {
          qcmCompletedCount : 0,
          totalQcms : 0,
          qcmCompletedTotalPoints : 0,
        })
      }

      const studentStats =  classBucket.students.get(student.id)!;
      const completedIncrement = qcm.completed? 1 : 0;
      studentStats.qcmCompletedCount += completedIncrement;
      studentStats.totalQcms++;
      studentStats.qcmCompletedTotalPoints += qcm.score? qcm.score : 0;

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
          classBucket.students.set(student.id, {
            qcmCompletedCount : 0,
            totalQcms : 0,
            qcmCompletedTotalPoints : 0
          })
        }
      }
    }

    const qcmStatsPerScolarYear: QcmStatsPerScolarYear[] = []

    for (const yearBucket of yearMap.values()) {
        const classes = [];
      for (const classBucket of yearBucket.classes.values()) {
        const students: StudentQcmStats[] = Array.from(classBucket.students.entries())
          .map(([studentId, studentStats]) => {
            const s = studentMap.get(studentId)!
            return {
              id:         s.id,
              firstName:  s.firstName,
              lastName:   s.lastName,
              gender:     s.gender,
              qcmCompletedCount: studentStats.qcmCompletedCount,
              totalQcms:  studentStats.totalQcms,
              qcmCompletedTotalPoints : studentStats.qcmCompletedTotalPoints
            }
          })
          // Most visits first — a useful default for the dashboard view
          .sort((a, b) => b.qcmCompletedCount - a.qcmCompletedCount || a.lastName.localeCompare(b.lastName, 'fr', { sensitivity: 'base' }))

        classes.push({
          class: classBucket.class,
          students : students,
        })
      }
      qcmStatsPerScolarYear.push({
          scolarYear: yearBucket.scolarYear,
          classes
      })
    }

    //maybe sort this data before submission
    return sendSuccess(res, { qcmStatsPerScolarYear } satisfies QcmStatsResponse)
  } catch (error) {
    next(error)
  }
}