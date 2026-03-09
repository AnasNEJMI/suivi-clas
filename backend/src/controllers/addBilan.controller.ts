import { Request, Response, NextFunction } from "express";
import { sendSuccess } from "../utils/response.utils.js";
import { prisma } from "../db/prisma.js";
import { ApiError } from "../classes/ApiError.class.js";
import { Bilan } from "../types/data.types.js";
import { PrismaClientKnownRequestError } from "../generated/prisma/internal/prismaNamespace.js";

type BilanInput = {
    userId : number,
    date : Date,
    lessonId : number,
    subject : string,
    presence : boolean,
    summary : string,
}

type AddBilanSuccessResponse = {
    bilan : Bilan
}

export async function addBilanHandler(
    req : Request,
    res : Response,
    next : NextFunction
){
    try{
            const {userId, date, lessonId, subject, presence, summary} = req.body as BilanInput;
    
            //validate email
            const user = await prisma.user.findUnique({
                where : {
                    id : userId
                }
            });
            
            if(!user){
                throw ApiError.invalidCredentials();
            }
            
            //validate lesson
            let lesson;

            if(presence){
                lesson = await prisma.lesson.findUnique({
                    where : {
                        id : lessonId
                    }
                });
                
                if(!lesson){
                    throw ApiError.invalidCredentials("La leçon choisie n'est pas valide.");
                }

            }

            const lesId = lessonId < 0 ? null : lessonId;
            const sub = subject === '' ? null : subject;
            const summ = summary === '' ? null : summary;
            //create bilan
            const bilan = await prisma.bilan.create({
                data : {
                    userId : user.id,
                    date : date,
                    lessonId : lesId,
                    subject :   sub,
                    presence : presence,
                    summary : summ
                },
                select : {
                    id : true,
                    user : {
                        select : {
                            id : true,
                            firstName : true,
                            lastName : true,
                        }
                    },
                    date : true,
                    presence : true,
                    subject : true,
                    summary : true,
                    lesson : {
                        select : {
                            id : true,
                            label : true,
                            subject : true,
                        }
                    }
                }
            })

            //once the bilan is created, check if there is any created qcms in this subject are created but not finished
            //if any exist return pass
            //if not create a new qcm on the subject
            //1 - check if qcm with lessonId exists :
            //EXISTS : Do nothing
            //DOES NOT EXIST : Create qcm, create 10 qcm questions attached to this qcm
            if(lesId !== null){
                const qcm = await prisma.qcm.create({
                    data : {
                        userId : user.id,
                        lessonId : lesId,
                        completed : false,
                    }
                })

                //get 10 random bank question ids for this lesson
                const randomBankQuestions = await prisma.$queryRaw<{id : number}[]>`
                    SELECT id
                    FROM "QcmBankQuestion"
                    WHERE "lessonId" = ${lesId}
                    ORDER BY RANDOM()
                    LIMIT 10;
                `;

                //create the data for the 10 questions of this qcm using the data available
                const qcmQuestionsData = randomBankQuestions.map((bankQuestion) => {
                    return {
                        qcmId : qcm.id,
                        bankQuestionId : bankQuestion.id,
                    }
                }
                )

                //create the 10 qcm question rows
                const qcmQuestions = await prisma.qcmQuestion.createMany({
                    data : qcmQuestionsData,
                })

                console.log(`Successfully created ${qcmQuestions.count} new questions for the qcm with ${qcm.id}, the user with id ${user.id} and lesson with id ${lesId}!`);
            }
    
            //return response
            return sendSuccess<AddBilanSuccessResponse>(
                res,
                {
                    bilan : bilan
                }
            )
        }catch(error){
            if(error instanceof PrismaClientKnownRequestError){
                console.log('prisma error : ', error);
                next(ApiError.internalError())
            }else{
                next(error);
            }
        }
}