import {Request, Response, NextFunction} from 'express';
import { PrismaClientKnownRequestError } from "../../generated/prisma/internal/prismaNamespace.js";
import { ApiError } from "../../classes/ApiError.class.js";
import { prisma } from '../../db/prisma.js';
import { sendSuccess } from '../../utils/response.utils.js';
import z from 'zod';
import {LessonEval } from '../../generated/prisma/enums.js';

type SeanceInput = {
    scolarYearId : number,
    animatorId : number,
    classId : number,
    date : Date,
}

type LessonEvalsInput = {
    animatorId : number,
    studentId : number,
}

export type LessonEvalsEntry = {
    animatorId : number,
    studentId : number,
    evaluations : LessonEvalEntry[]
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

type LessonEvalsResponse = {
    data : LessonEvalsEntry | null
}

const lessonEvalQuerySchema = z.object({
    animatorId:   z.coerce.number().int().positive(),
    studentId: z.coerce.number().int().positive(),
});

export async function animatorFetchLessonEvalsHandler(
    req : Request,
    res : Response,
    next : NextFunction
){
    try{
        const parsed = lessonEvalQuerySchema.safeParse(req.query);

        if(!parsed.success){
            throw ApiError.validationError('Paramètres invalides : ' + parsed.error.message);
        }


        const {animatorId, studentId} = parsed.data as LessonEvalsInput;
        console.log('animatorId : ',animatorId, ' | studentId : ', studentId);

        if(animatorId !== req.user!.id){
            throw ApiError.unauthorized('Accès non autorisé.');
        }

        const lessonEvals = await prisma.lessonEvaluation.findMany({
            where : {
                submittedById : animatorId,
                studentId
            },
            select : {
                id : true,
                lesson : {
                    select : {
                        id : true,
                        label : true,
                        subject : {
                            select : {
                                id : true,
                                label : true
                            }
                        } 
                    }
                },
                evaluation : true
            }
        });

        if(!lessonEvals){
            throw ApiError.internalError('Erreur lors du chargement des évalations')
        }


        return sendSuccess<LessonEvalsResponse>(
            res,
            {
                data : {
                    animatorId,
                    studentId,
                    evaluations : lessonEvals
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