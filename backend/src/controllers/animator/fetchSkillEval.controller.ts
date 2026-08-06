import {Request, Response, NextFunction} from 'express';
import { PrismaClientKnownRequestError } from "../../generated/prisma/internal/prismaNamespace.js";
import { ApiError } from "../../classes/ApiError.class.js";
import { prisma } from '../../db/prisma.js';
import { sendSuccess } from '../../utils/response.utils.js';
import z from 'zod';


type SkillEvalInput = {
    animatorId : number,
    studentId : number,
}

export type SkillEvalEntry = {
    id : number,
    studentId : number,
    animatorId : number,
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
    updatedAt : Date,
}


type LessonEvalsResponse = {
    data : SkillEvalEntry | null
}

const skillEvalQuerySchema = z.object({
    animatorId:   z.coerce.number().int().positive(),
    studentId: z.coerce.number().int().positive(),
});

export async function animatorFetchSkillEvalHandler(
    req : Request,
    res : Response,
    next : NextFunction
){
    try{
        const parsed = skillEvalQuerySchema.safeParse(req.query);

        if(!parsed.success){
            throw ApiError.validationError('Paramètres invalides : ' + parsed.error.message);
        }


        const {animatorId, studentId} = parsed.data as SkillEvalInput;
        console.log('animatorId : ',animatorId, ' | studentId : ', studentId);

        if(animatorId !== req.user!.id){
            throw ApiError.unauthorized('Accès non autorisé.');
        }

        const skillEval = await prisma.skill.findUnique({
            where : {
                skillId : {
                    animatorId,
                    studentId
                }
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
                studentId : true,
                animatorId : true,
                updatedAt : true,
            }
        });



        return sendSuccess<LessonEvalsResponse>(
            res,
            {
                data : skillEval
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