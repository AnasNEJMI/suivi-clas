import {Request, Response, NextFunction} from 'express';
import { PrismaClientKnownRequestError } from "../../generated/prisma/internal/prismaNamespace.js";
import { ApiError } from "../../classes/ApiError.class.js";
import { prisma } from '../../db/prisma.js';
import { sendSuccess } from '../../utils/response.utils.js';

type SkillEvalInput = {
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

type SkillEvalResponse = {
    data : SkillEvalEntry | null
}


export async function animatorSubmitSkillEvalHandler(
    req : Request,
    res : Response,
    next : NextFunction
){
    try{

        const {animatorId, studentId, autonomy, discipline, organisation, ponctuality, regularity, respect, preparation, positive, negative, improvements} = req.body as SkillEvalInput;
        console.log('animatorId : ',animatorId, ' | studentId : ', studentId);

        if(animatorId !== req.user!.id){
            throw ApiError.unauthorized('Accès non autorisé.');
        }

        const skillEval = await prisma.skill.upsert({
            where : {
                skillId : {
                    animatorId,
                    studentId,
                }
            },
            update : {
                autonomy, discipline, organisation, ponctuality, regularity, respect, preparation, positive, negative, improvements
            },
            create : {
                animatorId,
                studentId,
                autonomy, discipline, organisation, ponctuality, regularity, respect, preparation, positive, negative, improvements
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
                updatedAt : true
            }
        })

        if(!skillEval){
            throw ApiError.internalError('Erreur lors de la soumission de l\'évaluation des compétences.')
        }

        return sendSuccess<SkillEvalResponse>(
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