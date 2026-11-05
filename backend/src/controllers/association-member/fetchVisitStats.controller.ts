import { Request, Response, NextFunction } from 'express'
import { prisma }       from '../../db/prisma.js'
import { ApiError }     from '../../classes/ApiError.class.js'
import { Gender }       from '../../generated/prisma/enums.js'
import { sendSuccess }  from '../../utils/response.utils.js'

export type ConsultedBilan = {
  id:            number
  date:          Date            // date of the séance
  lessonLabel:   string | null
  subjectLabel:  string | null
  firstViewedAt: Date | null     // null = never opened
  lastViewedAt:  Date | null
  viewCount:     number
  delayHours:    number | null   // time between the bilan being written and its first opening
}

export type StudentConsultationStats = {
  id: number; firstName: string; lastName: string; gender: Gender
  bilansReceived:   number            // bilans of séances the student attended
  bilansRead:       number
  totalReadings:    number            // sum of openings (one per 30-minute reading)
  firstVisit:       Date | null
  lastVisit:        Date | null       // last time any bilan was opened
  latestBilanDate:  Date | null
  latestBilanRead:  boolean | null    // null = no bilan
  medianDelayHours: number | null     // typical time before a bilan is opened
  bilans:           ConsultedBilan[]  // most recent first
}

export type ClassConsultationStats  = { class: { id: number; label: string }; students: StudentConsultationStats[] }
export type VisitStatsPerScolarYear = { scolarYear: { id: number; label: string }; classes: ClassConsultationStats[] }
export type VisitStatsResponse      = { visitStatsPerScolarYear: VisitStatsPerScolarYear[] }

// Kept exported in case another handler imports it
export async function fetchAssociationStudents(associationId: number) {
  return prisma.student.findMany({
    where:  { class: { associationId } },
    select: {
      id: true, firstName: true, lastName: true, gender: true,
      class: { select: { id: true, label: true } },
    },
  })
}

// ── Accumulators: year → class → student ─────────────────────────────────────

type StudentAcc = { id: number; firstName: string; lastName: string; gender: Gender; bilans: ConsultedBilan[] }
type ClassAcc   = { class: { id: number; label: string }; students: Map<number, StudentAcc> }
type YearAcc    = { scolarYear: { id: number; label: string }; classes: Map<number, ClassAcc> }

const HOUR = 3_600_000

const earliest = (a: Date | null, b: Date | null): Date | null => (a && b ? (a < b ? a : b) : a ?? b)
const latest   = (a: Date | null, b: Date | null): Date | null => (a && b ? (a > b ? a : b) : a ?? b)

function median(values: number[]): number | null {
  if (values.length === 0) return null
  const s   = [...values].sort((a, b) => a - b)
  const mid = Math.floor(s.length / 2)
  return s.length % 2 ? s[mid]! : (s[mid - 1]! + s[mid]!) / 2
}

function toStats(acc: StudentAcc): StudentConsultationStats {
  const { bilans } = acc   // already most recent first
  const read   = bilans.filter(b => b.firstViewedAt !== null)
  const newest = bilans[0] ?? null

  return {
    id: acc.id, firstName: acc.firstName, lastName: acc.lastName, gender: acc.gender,
    bilansReceived:   bilans.length,
    bilansRead:       read.length,
    totalReadings:    bilans.reduce((n, b) => n + b.viewCount, 0),
    firstVisit:       bilans.reduce<Date | null>((d, b) => earliest(d, b.firstViewedAt), null),
    lastVisit:        bilans.reduce<Date | null>((d, b) => latest(d, b.lastViewedAt), null),
    latestBilanDate:  newest?.date ?? null,
    latestBilanRead:  newest ? newest.firstViewedAt !== null : null,
    medianDelayHours: median(read.flatMap(b => (b.delayHours === null ? [] : [b.delayHours]))),
    bilans,
  }
}

export async function associationVisitStatsHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const associationId = req.user!.association?.id
    if (!associationId) throw ApiError.unauthorized('Aucune association liée à ce compte.')

    // One query: every bilan a present student could have opened
    const bilans = await prisma.bilan.findMany({
      where:   { presence: true, seance: { class: { associationId } } },
      orderBy: { date: 'desc' },
      select: {
        id: true, date: true, createdAt: true,
        viewCount: true, firstViewedAt: true, lastViewedAt: true,
        lesson:  { select: { label: true, subject: { select: { label: true } } } },
        student: { select: { id: true, firstName: true, lastName: true, gender: true } },
        seance: {
          select: {
            scolarYear: { select: { id: true, label: true } },
            class:      { select: { id: true, label: true } },
          },
        },
      },
    })

    const yearMap = new Map<number, YearAcc>()

    for (const b of bilans) {
      const { scolarYear, class: cls } = b.seance
      if (!scolarYear || !cls) continue   // a séance without year or class can't be placed

      let year = yearMap.get(scolarYear.id)
      if (!year) { year = { scolarYear, classes: new Map() }; yearMap.set(scolarYear.id, year) }

      let classAcc = year.classes.get(cls.id)
      if (!classAcc) { classAcc = { class: cls, students: new Map() }; year.classes.set(cls.id, classAcc) }

      let student = classAcc.students.get(b.student.id)
      if (!student) { student = { ...b.student, bilans: [] }; classAcc.students.set(b.student.id, student) }

      student.bilans.push({
        id: b.id,
        date: b.date,
        lessonLabel:   b.lesson?.label ?? null,
        subjectLabel:  b.lesson?.subject.label ?? null,
        firstViewedAt: b.firstViewedAt,
        lastViewedAt:  b.lastViewedAt,
        viewCount:     b.viewCount,
        delayHours:    b.firstViewedAt
          ? Math.round((Math.max(0, b.firstViewedAt.getTime() - b.createdAt.getTime()) / HOUR) * 10) / 10
          : null,
      })
    }

    const visitStatsPerScolarYear: VisitStatsPerScolarYear[] = [...yearMap.values()]
      .map(year => ({
        scolarYear: year.scolarYear,
        classes: [...year.classes.values()]
          .map(c => ({
            class: c.class,
            students: [...c.students.values()]
              .map(toStats)
              .sort((a, b) => a.lastName.localeCompare(b.lastName, 'fr', { sensitivity: 'base' })),
          }))
          .sort((a, b) => a.class.label.localeCompare(b.class.label, 'fr', { sensitivity: 'base' })),
      }))
      .sort((a, b) => b.scolarYear.label.localeCompare(a.scolarYear.label))

    return sendSuccess(res, { visitStatsPerScolarYear } satisfies VisitStatsResponse)
  } catch (error) {
    next(error)
  }
}