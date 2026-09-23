import { Request, Response, NextFunction }        from 'express'
import { prisma }                                 from '../../../db/prisma.js'
import { ApiError }                               from '../../../classes/ApiError.class.js'
import { sendSuccess }                            from '../../../utils/response.utils.js'
import { PrismaClientKnownRequestError }          from '../../../generated/prisma/internal/prismaNamespace.js'
import { Subject } from '../../../db/seed.users.data.js'

// ── Response types ────────────────────────────────────────────────────────────

export type StudentEntry = {
  firstName: string
  lastName:  string
  gender:    'm' | 'f'
  level:     { id: number; label: string }
}

export type ClassEntry = {
  id:            number
  label:         string
  contractTitle: string 
  students:      StudentEntry[]
}

export type AssociationEntry = {
  id:         number
  label:      string
  postalCode: number
  address:    string
  specializations : Subject[]
  classes:    ClassEntry[]
}

export type AnimatorProfileByScolarYear = {
  id:           number
  label:        string
  associations: AssociationEntry[]
}

export type ProfileDataResponse = {
  scolarYears: AnimatorProfileByScolarYear[]
}

// ── Handler ───────────────────────────────────────────────────────────────────

export async function animatorFetchProfileDataHandler(
  req:  Request,
  res:  Response,
  next: NextFunction,
) {
  try {
    const animatorId = req.user!.id

    const contracts = await prisma.animatorContract.findMany({
      where:   { animatorId },
      orderBy: { scolarYear: { label: 'desc' } },
      select: {
        id: true,
        contractSpecializations: {
          select: { subject: { select: { id: true, label: true } } },
        },
        scolarYear: { select: { id: true, label: true } },
        class: {
          select: {
            id:    true,
            label: true,
            association: {
              select: {
                id:         true,
                label:      true,
                postalCode: true,
                address:    true,
              },
            },
            students: {
              orderBy: [{ lastName: 'asc' }, { firstName: 'asc' }],
              select: {
                firstName: true,
                lastName:  true,
                gender:    true,
                level:     { select: { id: true, label: true } },
              },
            },
          },
        },
      },
    })

    // ── Internal bucket types ─────────────────────────────────────────────────

    type ClassBucket = Map<number, {
      id:            number
      label:         string
      contractTitle: string
      students:      StudentEntry[]
    }>

    type AssociationBucket = Map<number, {
      id:           number
      label:        string
      postalCode:   number
      address:      string
      specializations : Subject[]
      classBucket:  ClassBucket
    }>

    type ScolarYearBucket = Map<number, {
      id:                number
      label:             string
      associationBucket: AssociationBucket
    }>

    // ── Build nested maps ─────────────────────────────────────────────────────

    const scolarYearMap: ScolarYearBucket = new Map()

    for (const contract of contracts) {
      if (!contract.scolarYear || !contract.class?.association) continue

      const { scolarYear, class: cls } = contract
      const association = cls.association!;

      // ── Scolar year ───────────────────────────────────────────────────────

      if (!scolarYearMap.has(scolarYear.id)) {
        scolarYearMap.set(scolarYear.id, {
          id:                scolarYear.id,
          label:             scolarYear.label,
          associationBucket: new Map(),
        })
      }
      const yearEntry = scolarYearMap.get(scolarYear.id)!

      // ── Association ───────────────────────────────────────────────────────

      if (!yearEntry.associationBucket.has(association.id)) {
        yearEntry.associationBucket.set(association.id, {
          id:          association.id,
          label:       association.label,
          postalCode:  association.postalCode,
          address:     association.address,
          specializations : contract.contractSpecializations.map(s => s.subject.label as Subject),
          classBucket: new Map(),
        })
      }
      const assocEntry = yearEntry.associationBucket.get(association.id)!

      // ── Class ─────────────────────────────────────────────────────────────
      // contractTitle is composed from the scolar year + class label.
      // If you add a dedicated `title` column to AnimatorContract,
      // replace this with contract.title.

      if (!assocEntry.classBucket.has(cls.id)) {
        assocEntry.classBucket.set(cls.id, {
          id:            cls.id,
          label:         cls.label,
          contractTitle: `${cls.label} — ${scolarYear.label}`,
          students:      [],
        })
      }
      const classEntry = assocEntry.classBucket.get(cls.id)!

      // ── Students — filter out those without a level ───────────────────────

      const validStudents: StudentEntry[] = cls.students
        .filter(s => s.level !== null)
        .map(s => ({
          firstName: s.firstName,
          lastName:  s.lastName,
          gender:    s.gender,
          level:     s.level!,
        }))

      classEntry.students.push(...validStudents)
    }

    const scolarYears: AnimatorProfileByScolarYear[] = [...scolarYearMap.values()].map(
      year => ({
        id:    year.id,
        label: year.label,
        associations: [...year.associationBucket.values()].map(assoc => ({
          id:         assoc.id,
          label:      assoc.label,
          postalCode: assoc.postalCode,
          address:    assoc.address,
          specializations : assoc.specializations,
          classes:    [...assoc.classBucket.values()].map(cls => ({
            id:            cls.id,
            label:         cls.label,
            contractTitle: cls.contractTitle,
            students:      cls.students,
          })),
        })),
      })
    )
    
    console.log('proifle data ',scolarYears)
    return sendSuccess<ProfileDataResponse>(res, { scolarYears })

  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      console.error('[animatorFetchProfileDataHandler] Prisma error:', error)
      return next(ApiError.internalError())
    }
    next(error)
  }
}