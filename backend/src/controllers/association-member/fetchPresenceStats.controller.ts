import { Request, Response, NextFunction } from "express";
import { Gender } from "../../generated/prisma/enums.js"
import { ApiError } from "../../classes/ApiError.class.js";
import { prisma } from "../../db/prisma.js";
import { sendSuccess } from "../../utils/response.utils.js";

export type PresenceStatsResponse = {
    presenceStatsPerScolarYear : PresenceStatsPerScolarYear[]
}

export type PresenceStatsPerScolarYear = {
    scolarYear : {id : number, label : string},
    classes : {
        class : {id : number, label : string},
        students : StudentPresenceStats[]
    }[],
}

export type StudentPresenceStats = {
    id : number,
    firstName : string,
    lastName : string,
    gender : Gender,
    presence : number,
    absence : number,
}

export async function associationMemberFetchPresenceStatsHandler(
    req : Request,
    res : Response,
    next : NextFunction
){
    const assocMember = req.user!;
    const associationId = req.user?.association?.id;
    
    if(!assocMember || !associationId){
        throw ApiError.invalidCredentials('Aucune association liée à ce compte.');
    }

    try{
        const [bilans, students] = await Promise.all([

            // Query 1: every bilan in this association that has a scolar year.
            // We only select the three fields needed for grouping: who, when (year), what (presence).
            // We deliberately do NOT embed student info here — it would repeat per bilan.
            prisma.bilan.findMany({
            where: {
                student: { class: { associationId } },
                seance:  { scolarYearId: { not: null } },
            },
            select: {
                studentId: true,
                presence:  true,
                seance: {
                    select: {
                    scolarYear: { select: { id: true, label: true } },
                    },
                },
            },
            }),

            
            // Query 2: every student in this association with their class.
            // Each student appears exactly once, regardless of how many bilans they have.
            prisma.student.findMany({
                where: { class: { associationId } },
                select: {
                    id:        true,
                    firstName: true,
                    lastName:  true,
                    gender:    true,
                    class:     { select: { id: true, label: true } },
                },
            }),
        ])
        const studentMap = new Map(students.map(s => [s.id, s]))

        type scolarYearStats = {
            scolarYear: { id: number; label: string }
            classes: Map<number, {
                class:    { id: number; label: string }
                students: Map<number, {
                    id : number,
                    firstName : string,
                    lastName : string,
                    gender : Gender,
                    presence : number,
                    absence : number,
                }>
            }>
        }

        const statsMap = new Map<number, scolarYearStats>();

        for(const bilan of bilans){
            const scolarYear = bilan.seance.scolarYear;
            if(!scolarYear) continue;

            const student = studentMap.get(bilan.studentId);
            if(!student) continue;

            const studentClass = student.class;

            if(!studentClass) continue;

            if(!statsMap.get(scolarYear.id)){
                statsMap.set(scolarYear.id, {scolarYear, classes : new Map()});
            }

            const scolarYearStats = statsMap.get(scolarYear.id)!;

            if(!scolarYearStats.classes.has(studentClass.id)){
                scolarYearStats.classes.set(studentClass.id, {class : studentClass, students : new Map()})
            }

            const classMap = scolarYearStats.classes.get(studentClass.id)!;

            if(!classMap.students.has(bilan.studentId)){
                classMap.students.set(bilan.studentId, {
                    id : student.id,
                    firstName : student.firstName,
                    lastName : student.lastName,
                    gender : student.gender,
                    presence : 0,
                    absence : 0,
                })
            }

            const studentStats = classMap.students.get(bilan.studentId)!;

            if(bilan.presence){
                studentStats.presence++;
            }else{
                studentStats.absence++ 
            }
        }

        for (const student of students) {
        if (!student.class) continue
        for (const scolarYearStats of statsMap.values()) {
            const classMap = scolarYearStats.classes.get(student.class.id)
            if (!classMap) continue
            if (!classMap.students.has(student.id)) {
            classMap.students.set(student.id, {
                    id : student.id,
                    firstName : student.firstName,
                    lastName : student.lastName,
                    gender : student.gender,
                    presence : 0,
                    absence : 0,
            })
            }
        }
        }

        const presenceStatsPerScolarYear: PresenceStatsPerScolarYear[] = []

        for (const scolarYearStats of statsMap.values()) {
            const classes = []
            for (const classStats of scolarYearStats.classes.values()) {

                // Build the student list for this (year, class) pair
                const studentStats: StudentPresenceStats[] = Array.from(
                classStats.students.entries()
                )
                .map(([studentId, counts]) => {
                    const s = studentMap.get(studentId)!
                    return {
                    id:        s.id,
                    firstName: s.firstName,
                    lastName:  s.lastName,
                    gender:    s.gender,
                    presence:  counts.presence,
                    absence:   counts.absence,
                    }
                })
                .sort((a, b) =>
                    a.lastName.localeCompare(b.lastName, 'fr', { sensitivity: 'base' })
                )

                classes.push({
                    class:        classStats.class,
                    students: studentStats,
                })
            }
            presenceStatsPerScolarYear.push({
                scolarYear:   scolarYearStats.scolarYear,
                classes
            })
        }

        // Sort entries: most recent year first, then class label alphabetically
        presenceStatsPerScolarYear.sort((a, b) =>b.scolarYear.label.localeCompare(a.scolarYear.label) )
        return sendSuccess(res, { presenceStatsPerScolarYear } satisfies PresenceStatsResponse)
    }catch (error) {
        next(error)
    }
}
