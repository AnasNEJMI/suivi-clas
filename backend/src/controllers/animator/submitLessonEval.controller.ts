import {Request, Response, NextFunction} from 'express';
import { PrismaClientKnownRequestError } from "../../generated/prisma/internal/prismaNamespace.js";
import { ApiError } from "../../classes/ApiError.class.js";
import { prisma } from '../../db/prisma.js';
import { sendSuccess } from '../../utils/response.utils.js';
import {LessonEval } from '../../generated/prisma/enums.js';

type LessonEvalInput = {
    animatorId : number,
    studentId : number,
    lessonId : number,
    evaluation : LessonEval
}

export type LessonEvalData = {
  id:         number,
  studentId : number,
  lesson:     { id: number; label: string }
  subject:    { id: number; label: string }
  level:      { id: number; label: string }
  evaluation: LessonEval
  updatedAt : Date
}

type LessonEvalResponse = {
    data : LessonEvalData
}


export async function animatorSubmitLessonEvalHandler(
    req : Request,
    res : Response,
    next : NextFunction
){
    try{

        const {animatorId, studentId, lessonId, evaluation} = req.body as LessonEvalInput;
        console.log('animatorId : ',animatorId, ' | studentId : ', studentId, ' | lessonId : ', lessonId, ' | evaluation : ', evaluation);

        if(animatorId !== req.user!.id){
            throw ApiError.unauthorized('Accès non autorisé.');
        }

        const lessonEval = await prisma.lessonEvaluation.upsert({
            where : {
                lessonEvalId : {
                    submittedById : animatorId,
                    studentId,
                    lessonId
                }
            },
            update : {
                evaluation
            },
            create : {
                submittedById : animatorId,
                studentId,
                lessonId,
                evaluation
            },
            select : {
                id : true,
                lesson : {
                    select : {
                        id : true,
                        label : true,
                        subject : {
                            select : {id : true, label : true}
                        } 
                    }
                },
                student : {
                    select : {
                        id : true,
                        level : {select : {id : true, label : true}}
                    }
                },
                evaluation : true,
                updatedAt : true,
            }
        })

        if(!lessonEval){
            throw ApiError.internalError('Erreur lors de la soumission de l\'évalation.')
        }
        
        const level = lessonEval.student.level;
        const subject = lessonEval.lesson.subject;
        const lesson = {id : lessonEval.lesson.id, label : lessonEval.lesson.label};
        if(!level || !subject || !lesson){
            throw ApiError.internalError('Erreur lors de la soumission de l\'évalation.')
        }

        return sendSuccess<LessonEvalResponse>(
            res,
            {
                data : {
                    id : lessonEval.id,
                    studentId : lessonEval.student.id,
                    lesson,
                    subject,
                    level,
                    evaluation : lessonEval.evaluation,
                    updatedAt : lessonEval.updatedAt
                }
            }
        )
    }catch(error){
        if (error instanceof PrismaClientKnownRequestError) {
            console.error('[animatorSeance] Prisma error:', error);
            return next(ApiError.internalError());
        }
        next(error);
    }
}