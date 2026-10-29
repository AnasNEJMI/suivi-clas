import { Request, Response, NextFunction } from "express";
import { sendSuccess } from "../../../utils/response.utils.js";
import { prisma } from "../../../db/prisma.js";
import { ApiError } from "../../../classes/ApiError.class.js";
import { PrismaClientKnownRequestError } from "../../../generated/prisma/internal/prismaNamespace.js";
import { buildSeancesByScolarYear, SeancesByScolarYearEntry } from "./utils.js";

export type SeancesDataResponse = {
    scolarYears : SeancesByScolarYearEntry[]
}

export async function animatorFetchSeancesDataHandler(
    req : Request,

    res : Response,
    next : NextFunction
){
    try{
        const user = req.user!;
        const animatorId = user.id;

        const seances = await prisma.seance.findMany({
            where : {animatorId},
            orderBy : { scolarYear : {label : 'desc'}},
            select : {
                id : true,
                date : true,
                animatorId : true,
                scolarYear : {select : {id : true, label : true}},
                seanceDuration : {select : {id : true, label : true, durationMin : true}},
                bilans : { select : {
                    curriculumSkills : {select : {id : true, label : true, description : true}},
                    id : true, date : true, presence : true, summary : true, studentId : true, seanceId : true, submittedById : true,
                    lesson : {select : {id : true, label : true,
                        subject : {select : {id : true, label : true}}}},
                    qcm : {
                        select : {
                            id : true, completed : true, score : true, studentId : true, createdAt : true, updatedAt : true,
                            lesson : {select : {id : true, label : true, subject : {select : {id : true, label : true}}}},
                            qcmQuestions : {
                                select : {
                                    id : true, correct : true, selectedChoice : true,
                                    bankQuestion : {
                                        select : {
                                            id : true, question : true, difficulty : true, answerA : true, answerD : true, answerB : true, answerC : true, correctAnswer : true, explanation : true
                                        }
                                    }
                                }
                            }
                        }
                    }
                    },
                },
                class : { select : {
                    id : true, label : true, 
                    association : {select : {id : true, label : true}},
                    students :{select : {
                        id: true, firstName : true, lastName : true, gender : true,
                        level : {select : {id : true, label : true}}
                    }}
                    }
                },
            }
        })

        const scolarYears = await buildSeancesByScolarYear(seances, animatorId);
        sendSuccess(res, {scolarYears})
     }catch(error){
        if (error instanceof PrismaClientKnownRequestError) {
            console.error('[animatorSeancesDataHandler] Prisma error:', error);
            return next(ApiError.internalError());
        }
        next(error);
    }
}