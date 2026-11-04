import { Request, Response, NextFunction } from "express";
import { sendSuccess } from "../../utils/response.utils.js";
import { prisma } from "../../db/prisma.js";
import { ApiError } from "../../classes/ApiError.class.js";
import { PrismaClientKnownRequestError } from "../../generated/prisma/internal/prismaNamespace.js";
import { LessonEval } from "../../generated/prisma/enums.js";

type LessonEvalsResponse = {
    lessonsBySubject : LessonsBySubject[]
}

type LessonsBySubject = {
    id : number,
    label : string,
    lessons : Lesson[]
}

export type Lesson = {
    id : number,
    label : string,
    curriculumSkills : CurriculumSkillEntry[],
    eval : LessonEvalEntry | null
}

export type CurriculumSkillEntry = {
    id : number,
    label : string,
    description : string
}

export type LessonEvalEntry = {
    id : number,
    submittedBy : {
        id : number,
        firstName : string,
        lastName : string
    }
    evaluation : LessonEval,
    updatedAt : Date,
}

export async function studentLessonEvalsHandler(
    req : Request,
    res : Response,
    next : NextFunction
){
    try{
        const studentId = req.user!.id;
        const levelId   = req.user!.level?.id;
        if (!levelId) throw ApiError.unauthorized('Aucun niveau scolaire assigné.');

        const now = new Date();

        // The student's class, and the current school year: the most recent one that has started.
        // (Between two years, e.g. in summer, this still returns the year that just ended.)
        const [student, scolarYear] = await Promise.all([
            prisma.student.findUnique({
                where:  { id: studentId },
                select: { classId: true },
            }),
            prisma.scolarYear.findFirst({
                where:   { startDate: { lte: now } },
                orderBy: { startDate: 'desc' },
                select:  { id: true },
            }),
        ]);

        if (!student) throw ApiError.unauthorized   ('Élève introuvable.');

        // No class or no school year yet → nothing to show, not an error
        if (student.classId === null || !scolarYear) {
            return sendSuccess<LessonEvalsResponse>(res, { lessonsBySubject: [] });
        }

        // Subjects the student is accompanied in: union of the specialisations of every
        // animator contracted for this class during this school year
        const contracts = await prisma.animatorContract.findMany({
            where: { classId: student.classId, scolarYearId: scolarYear.id },
            select: { contractSpecializations: { select: { subjectId: true } } },
        });

        const subjectIds = [...new Set(
            contracts.flatMap(c => c.contractSpecializations.map(s => s.subjectId))
        )];

        if (subjectIds.length === 0) {
            return sendSuccess<LessonEvalsResponse>(res, { lessonsBySubject: [] });
        }

        const lessons = await prisma.lesson.findMany({
            where: { levelId, subjectId: { in: subjectIds } },
            select: {
                id: true, label: true,
                curriculumSkills : { select : { id : true, label : true, description : true } },
                subject: { select: { id: true, label: true } },
                lessonEvals: {
                    where:   { studentId },
                    orderBy: { updatedAt: 'desc' },   // several animators can evaluate the same lesson: the latest wins
                    take:    1,
                    select: {
                        id: true, evaluation: true, updatedAt : true,
                        submittedBy: { select: { id: true, firstName: true, lastName: true } },
                    },
                },
            },
            orderBy: [{ subject: { label: 'asc' } }, { label: 'asc' }],
        });

        // Single pass, already ordered alphabetically by subject.
        // Every subject with at least one lesson at this level appears, evaluated or not.
        const subjectMap = new Map<number, LessonsBySubject>();
        for (const lesson of lessons) {
            let subject = subjectMap.get(lesson.subject.id);
            if (!subject) {
                subject = { id: lesson.subject.id, label: lesson.subject.label, lessons: [] };
                subjectMap.set(lesson.subject.id, subject);
            }

            subject.lessons.push({
                id: lesson.id,
                label: lesson.label,
                curriculumSkills: lesson.curriculumSkills,
                eval: lesson.lessonEvals[0] ?? null,
            });
        }

        return sendSuccess<LessonEvalsResponse>(res, {
            lessonsBySubject : Array.from(subjectMap.values())
        })

    }catch(error){
        if (error instanceof PrismaClientKnownRequestError) {
            console.error('[student-lesson-evals] Prisma error:', error);
            return next(ApiError.internalError());
        }
        next(error);
    }
}