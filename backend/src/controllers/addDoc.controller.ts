import { Request, Response, NextFunction } from "express";
import { sendSuccess } from "../utils/response.utils.js";
import { prisma } from "../db/prisma.js";
import { ApiError } from "../classes/ApiError.class.js";
import { Doc} from "../types/data.types.js";
import { PrismaClientKnownRequestError } from "../generated/prisma/internal/prismaNamespace.js";

type DocInput = {
    docId : number | undefined;
    lessonId : number,
    type : string,
    link : string,
}

type AddDocSuccessResponse = {
    doc : Doc
}

export async function addDocHandler(
    req : Request,
    res : Response,
    next : NextFunction
){
    try{
            const {docId, lessonId, type, link} = req.body as DocInput;
    
            //validate user
            const lesson = await prisma.lesson.findUnique({
                where : {
                    id : lessonId
                }
            });
            
            if(!lesson){
                throw ApiError.invalidCredentials();
            }
            
            let document;

            if(docId){
                document = await prisma.document.update({
                    where : {
                        id : docId
                    },
                    data : {
                        type : type,
                        link : link,
                    },
                    select : {
                        id : true,
                        lesson : {
                            select : {
                                id : true,
                                label : true,
                            }
                        },
                        type : true,
                        link : true,
                    }
                })
            }else{
                document = await prisma.document.create({
                    data : {
                        lessonId : lessonId,
                        type : type,
                        link : link,
                    },
                    select : {
                        id : true,
                        lesson : {
                            select : {
                                id : true,
                                label : true,
                            }
                        },
                        type : true,
                        link : true,
                    }
                })
            }
            
    
    
            return sendSuccess<AddDocSuccessResponse>(
                res,
                {
                    doc : document
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