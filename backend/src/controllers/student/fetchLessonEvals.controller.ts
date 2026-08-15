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
    eval : LessonEvalEntry | null
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

        const lessons = await prisma.lesson.findMany({
            where: { levelId },
            select: {
                id: true, label: true,
                subject: { select: { id: true, label: true } },
                lessonEvals: {
                    where: { studentId },
                    take:  1,
                    select: {
                        id: true, evaluation: true,updatedAt : true,
                        submittedBy: { select: { id: true, firstName: true, lastName: true } },
                    },
                },
            },
            orderBy: [{ subject: { label: 'asc' } }, { label: 'asc' }],
        });

        // O(n) single-pass Map grouping — already ordered alphabetically by subject
        //only pick the subjects for which a lesson received an eval
        const subjectMap = new Map();
        for (const lesson of lessons) {
            if (!subjectMap.has(lesson.subject.id) && lesson.lessonEvals[0]) {
                subjectMap.set(lesson.subject.id, {
                id: lesson.subject.id, label: lesson.subject.label, lessons: [],
                });
            }

            const subject = subjectMap.get(lesson.subject.id);
            if(subject){
                subject.lessons.push({
                    id: lesson.id, label: lesson.label, eval: lesson.lessonEvals[0] ?? null,
                });
            }
        }
        
        return sendSuccess<LessonEvalsResponse>(res, {
            lessonsBySubject : Array.from(subjectMap.values())
        })

    }catch(error){
        if (error instanceof PrismaClientKnownRequestError) {
            console.error('[student-bilans] Prisma error:', error);
            return next(ApiError.internalError());
        }
        next(error);
    }
}