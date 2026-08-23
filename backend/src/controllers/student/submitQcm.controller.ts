import {Request, Response, NextFunction} from 'express';
import { PrismaClientKnownRequestError } from "../../generated/prisma/internal/prismaNamespace.js";
import { ApiError } from "../../classes/ApiError.class.js";
import { prisma } from '../../db/prisma.js';
import { sendSuccess } from '../../utils/response.utils.js';
import { QcmInput } from '../../schemas/qcm.schema.js';
import { AnswerChoice, Difficulty } from '../../generated/prisma/enums.js';


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

type QcmResponse = {
    data : QcmEntry | null
}

export async function submitStudentQcmHandler(
    req : Request,
    res : Response,
    next : NextFunction
){
    try{

        const {id, studentId, completed, score, qcmQuestions} = req.body as QcmInput;

        console.log('studentId', studentId, ' user id : ',req.user?.id);


        if(studentId !== req.user!.id){
            throw ApiError.unauthorized('Accès non autorisé.');
        }

        const [qcm, ...qcmQuestionsUpdated] = await prisma.$transaction([
            prisma.qcm.update({
                where : {id},
                data : {
                    score,
                    completed,
                },
                    select : {
                        id : true,
                        score : true,
                        completed : true,
                        studentId : true,
                        createdAt : true,
                        updatedAt : true,
                        lesson : {select : {id : true, label : true}}
                    }
            }),
            ...qcmQuestions.map(q =>(
                prisma.qcmQuestion.update({
                    where : {id : q.id},
                    data : {
                        correct : q.correct,
                        selectedChoice : q.selectedChoice
                    },
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
                })
            ))
        ])

        if(!qcm || !qcmQuestions){
            throw ApiError.invalidJsonBodyError('Qcm non valide.');
        }
        return sendSuccess<QcmResponse>(
            res,
            {
                data : {...qcm, qcmQuestions : qcmQuestionsUpdated}
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