// src/controllers/student/visit.controller.ts
import { Request, Response, NextFunction } from 'express'
import { sendSuccess } from '../../utils/response.utils.js'
import { prisma } from '../../db/prisma.js';

export async function trackStudentVisit(studentId: number): Promise<{
    scolarYearId: number;
    id: number;
    lastVisit: Date;
    studentId: number;
    numVisits: number;
} | null> {
  const now = new Date('2026-09-16T00:00:00.000Z')
  console.log('now : ', now);

  const scolarYear = await prisma.scolarYear.findFirst({
    where: {
      startDate: { lte: now },
      endDate:   { gt:  now },
    },
    select: { id: true },
  })

  // Outside all school year date ranges — do nothing.
  if (!scolarYear) return null;

  const visit = await prisma.visit.upsert({
    where: {
      visitId: {
        studentId,
        scolarYearId: scolarYear.id,
      },
    },
    update: {
      numVisits: { increment: 1 },
      lastVisit: now,
    },
    create: {
      studentId,
      scolarYearId: scolarYear.id,
      numVisits:    1,
      lastVisit:    now,
    },
  })

  console.log('visit : ',visit)
  return visit;
}

export async function studentVisitHandler(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const studentId = req.user!.id

    // Don't await in the response chain — tracking is a side effect.
    // If it fails (e.g. DB hiccup), log it but don't surface an error to the student.
    trackStudentVisit(studentId).then((visit) => {
      console.log('visit updated', visit)
    }).catch(err =>
      console.error(`[trackStudentVisit] studentId=${studentId}`, err)
    )

    // Respond immediately — the client doesn't need to wait for the upsert
    return sendSuccess(res, { tracked: true })
  } catch (error) {
    next(error)
  }
}