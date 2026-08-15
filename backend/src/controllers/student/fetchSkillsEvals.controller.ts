import { Request, Response, NextFunction } from "express";
import { sendSuccess } from "../../utils/response.utils.js";
import { prisma } from "../../db/prisma.js";
import { ApiError } from "../../classes/ApiError.class.js";
import { PrismaClientKnownRequestError } from "../../generated/prisma/internal/prismaNamespace.js";


type SkillsEvalsResponse = {
    skillsEvals : SkillsEvalEntry[]
}

export type SkillsEvalEntry = {
    id : number,
    animator : {
        id : number,
        firstName : string,
        lastName : string,
        gender : 'm' | 'f'
    }
    updatedAt : Date,
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
export async function studentSkillsEvalsHandler(
    req : Request,
    res : Response,
    next : NextFunction
){
    try{
        const user = req.user!;

        const skillsEvals = await prisma.skill.findMany({
            where : {
                studentId : user.id
            },
            select : {
                id : true,
                animator : {
                    select : {
                        id : true,
                        firstName : true,
                        lastName : true,
                        gender : true
                    }
                },
                updatedAt : true,
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
        
        return sendSuccess<SkillsEvalsResponse>(res, {skillsEvals})

    }catch(error){
        if (error instanceof PrismaClientKnownRequestError) {
            console.error('[student-bilans] Prisma error:', error);
            return next(ApiError.internalError());
        }
        next(error);
    }
}