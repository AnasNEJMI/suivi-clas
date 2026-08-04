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

export type LessonEvalEntry = {
    id : number,
    lesson : {
        id : number,
        label : string,
        subject : {
            id : number, 
            label : string
        },
    },
    evaluation : LessonEval
}

type LessonEvalResponse = {
    data : LessonEvalEntry
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
                evaluation : true
            }
        })

        if(!lessonEval){
            throw ApiError.internalError('Erreur lors de la soumission de l\'évalation.')
        }


        return sendSuccess<LessonEvalResponse>(
            res,
            {
                data : lessonEval
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