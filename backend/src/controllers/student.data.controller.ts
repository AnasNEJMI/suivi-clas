import { Request, Response, NextFunction } from "express";
import { sendSuccess } from "../utils/response.utils.js";
import { Bilan, Doc, QcmWithQuestions, Skill, User } from "../types/data.types.js";
import { ApiError } from "../classes/ApiError.class.js";
import { prisma } from "../db/prisma.js";

type StudentDataSuccessResponse = {
    bilans : Bilan[],
    skill : Skill,
    docs : Doc[],
    // qcmWithQuestions : QcmWithQuestions[],
}

export async function studentDataHandler(
    req : Request,
    res : Response,
    next : NextFunction
){
    try{
        //if auth lets you pass user should be available (fingers crossed)
        const user = req.user!;

        if(user.userType !== 'student'){
            throw ApiError.unauthorized('Seuls les élèves sont autorisés.')
        }

        const bilans = await prisma.bilan.findMany({
            where : {
                studentId : user.id
            },
            select : {
                id : true,
                date : true,
                seance : {
                    select : {
                        id : true,
                        date : true,
                    }
                },
                submittedBy : {
                    select : {
                        id : true,
                        username : true,
                        firstName : true,
                        lastName : true
                    }
                },
                presence : true,
                lesson : {
                    select : {
                        id : true,
                        label : true,
                        subject : {
                            select : {
                                id : true,
                                label : true,
                            }
                        },
                    }
                },
                createdAt : true,
                summary : true,

            },orderBy : {
                date : 'desc',
            }
        })
        
        // const allBilans = await prisma.bilan.findMany();

        // console.log('fetched bilans for student with id', user.id, ' the bilans : ', bilans)
        // console.log('fetched all bilans ', allBilans)

        // const lessonIds = bilans.map(bilan => bilan.lesson?.id).filter((lessonId) => lessonId !== undefined);
        // const uniqueLessonIds = [...new Set(lessonIds)];

        // console.log('lessonIds ',uniqueLessonIds);

        // const qcmWithQuestions = await prisma.qcm.findMany({
        //     where : {
        //         userId : user.id,
        //         lessonId : {in : uniqueLessonIds},
        //     },
        //     select : {
        //         id : true,
        //         user : {
        //             select : {
        //                 id : true,
        //                 firstName : true,
        //                 lastName : true,
        //             }
        //         },
        //         lesson : {
        //             select : {
        //                 id : true,
        //                 label : true,
        //             }
        //         },
        //         completed : true,
        //         createdAt : true,
        //         qcmQuestions : {
        //             select : {
        //                 bankQuestion : {
        //                     select : {
        //                         question : true,
        //                         answerA : true,
        //                         answerB : true,
        //                         answerC : true,
        //                         answerD : true,
        //                         correctAnswer : true,
        //                         difficulty : true,
        //                     }
        //                 },
        //                 selectedChoice : true,
        //             }
        //         }
        //     }
        // })
        //check if there is a qcm of this bilan's lessonId, 
        //EXISTS : RETURN IT
        //DOES NOT EXIST : CREATE qcm, create the 10 questions attached to it
        //

        const skill = await prisma.skill.findUniqueOrThrow({
            where : {
                studentId : user.id
            },
            select : {
                id : true,
                autonomy : true,
                discipline : true,
                organisation : true,
                ponctuality : true,
                regularity : true,
                respect : true,
                preparation : true,
                positive : true,
                negative : true,
                improvements : true,
            }
        })

        return sendSuccess<StudentDataSuccessResponse>(
            res,
            {
                bilans,
                skill,
                docs : [],
                // qcmWithQuestions
            }
        )
    }catch(error){
        next(error);
    }
}