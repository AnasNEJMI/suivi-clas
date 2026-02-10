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
            if(presence){
                const lesson = await prisma.lesson.findUnique({
                    where : {
                        id : lessonId
                    }
                });
                
                if(!lesson){
                    throw ApiError.invalidCredentials("La leçon choisie n'est pas validate.");
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