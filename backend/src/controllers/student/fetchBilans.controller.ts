import { Request, Response, NextFunction } from "express";
import { sendSuccess } from "../../utils/response.utils.js";
import { prisma } from "../../db/prisma.js";
import { ApiError } from "../../classes/ApiError.class.js";
import { PrismaClientKnownRequestError } from "../../generated/prisma/internal/prismaNamespace.js";
import { AnswerChoice, Difficulty, Gender } from "../../generated/prisma/enums.js";

type QcmEntry = {
    id : number,
    completed : boolean,
    score : number | null,
    lesson : {id : number, label : string} | null,
    qcmQuestions : QcmQuestionsEntry[],
    createdAt : Date,
    updatedAt : Date,
}

type QcmQuestionsEntry = {
    id : number,
    correct : boolean,
    selectedChoice : AnswerChoice | null,
    bankQuestion : BankQuestionEntry
}
type BankQuestionEntry = {
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

type BilanEntry  = {
    date: Date;
    presence: boolean;
    summary: string | null;
    lesson: {
        id: number;
        label: string;
        subject: {
            id: number;
            label: string;
        };
    } | null;
    id: number;
    studentId: number;
    seanceId: number;
    submittedBy : {
        id : number,
        firstName : string,
        lastName : string,
        gender : Gender
    }
    qcm : QcmEntry | null
}

type BilansResponse = {
    bilans : BilanEntry[]
}
export async function studentBilansHandler(
    req : Request,
    res : Response,
    next : NextFunction
){
    try{
        const user = req.user!;

        const bilans = await prisma.bilan.findMany({
            where : {
                studentId : user.id
            },
            orderBy : {
                date : 'desc',
            },
            select : {
                date : true,
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
                summary : true,
                presence : true,
                id : true,
                seanceId : true,
                studentId : true,
                submittedBy : {
                    select : {
                        id : true,
                        firstName : true,
                        lastName : true,
                        gender : true
                    }
                },
                qcm : {
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
                                        explanation : true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        })
        
        return sendSuccess<BilansResponse>(res, {bilans})

    }catch(error){
        if (error instanceof PrismaClientKnownRequestError) {
            console.error('[student-bilans] Prisma error:', error);
            return next(ApiError.internalError());
        }
        next(error);
    }
}