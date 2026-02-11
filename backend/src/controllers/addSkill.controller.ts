import { Request, Response, NextFunction } from "express";
import { sendSuccess } from "../utils/response.utils.js";
import { prisma } from "../db/prisma.js";
import { ApiError } from "../classes/ApiError.class.js";
import { Bilan, Skill } from "../types/data.types.js";
import { PrismaClientKnownRequestError } from "../generated/prisma/internal/prismaNamespace.js";

type SkillInput = {
    userId : number,
    autonomy : number,
    discipline : number,
    organisation : number,
    ponctuality : number,
    regularity : number,
    respect : number,
    preparation : number,
    positive : string,
    negative : string,
    improvements : string,
}

type AddBilanSuccessResponse = {
    skill : Skill
}

export async function addSkillHandler(
    req : Request,
    res : Response,
    next : NextFunction
){
    try{
            const {userId, autonomy, discipline, organisation, ponctuality, regularity, respect, preparation, positive, negative, improvements} = req.body as SkillInput;
    
            //validate user
            const user = await prisma.user.findUnique({
                where : {
                    id : userId
                }
            });
            
            if(!user){
                throw ApiError.invalidCredentials();
            }
            
    
            //create bilan
            const skill = await prisma.skill.create({
                data : {
                    userId : user.id,
                    autonomy : autonomy,
                    discipline : discipline,
                    organisation : organisation,
                    ponctuality : ponctuality,
                    regularity : regularity,
                    respect : respect,
                    preparation : preparation,
                    positive : positive,
                    negative : negative,
                    improvements : improvements,
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
    
    
            //return response
            return sendSuccess<AddBilanSuccessResponse>(
                res,
                {
                    skill : skill
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