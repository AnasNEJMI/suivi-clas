import {Request, Response, NextFunction} from 'express';
import { PrismaClientKnownRequestError } from "../../generated/prisma/internal/prismaNamespace.js";
import { ApiError } from "../../classes/ApiError.class.js";
import { prisma } from '../../db/prisma.js';
import { sendSuccess } from '../../utils/response.utils.js';
import z from 'zod';
import { AnswerChoice, Difficulty } from '../../generated/prisma/enums.js';


type QcmInput = {
    animatorId : number,
    studentId : number,
}

export type QcmEntry = {
    id : number,
    completed : boolean,
    score : number | null,
    studentId : number,
    lesson : {id : number, label : string} | null,
    qcmQuestions : QcmQuestionEntry[],
    createdAt : Date,
    updatedAt : Date,
}

export type QcmQuestionEntry = {
    id : number,
    correct : boolean,
    selectedChoice : AnswerChoice | null,
    bankQuestion : BankQuestionEntry
}

export type BankQuestionEntry = {
    id : number,
    question : string,
    difficulty : Difficulty,
    answerA : string,
    answerB : string,
    answerC : string,
    answerD : string,
    correctAnswer : AnswerChoice,
    explanation : string,
}


type QcmsResponse = {
    data : QcmEntry[]
}

const QcmQuerySchema = z.object({
    animatorId:   z.coerce.number().int().positive(),
    studentId: z.coerce.number().int().positive(),
});

export async function animatorFetchQcmsHandler(
    req : Request,
    res : Response,
    next : NextFunction
){
    try{
        const parsed = QcmQuerySchema.safeParse(req.query);

        if(!parsed.success){
            throw ApiError.validationError('Paramètres invalides : ' + parsed.error.message);
        }


        const {animatorId, studentId} = parsed.data as QcmInput;
        console.log('animatorId : ',animatorId, ' | studentId : ', studentId);

        if(animatorId !== req.user!.id){
            throw ApiError.unauthorized('Accès non autorisé.');
        }

        const qcms = await prisma.qcm.findMany({
            where : {
                studentId,
                bilan : {submittedById : animatorId}
            },
            select : {
                id : true,
                score : true,
                completed : true,
                studentId : true,
                createdAt : true,
                updatedAt : true,
                lesson : {select : {id : true, label : true}},
                qcmQuestions : {
                    select : {
                        id : true,
                        correct : true,
                        selectedChoice : true,
                        bankQuestion : {
                            select : {
                                id : true,
                                question : true,
                                difficulty : true,
                                answerA : true,
                                answerB : true,
                                answerC : true,
                                answerD : true,
                                correctAnswer : true,
                                explanation : true,

                            }
                        }
                    }
                }
            },
            orderBy : {
                createdAt : 'desc',
            }
        });



        return sendSuccess<QcmsResponse>(
            res,
            {
                data : qcms
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