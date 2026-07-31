import {Request, Response, NextFunction} from 'express';
import { PrismaClientKnownRequestError } from "../../generated/prisma/internal/prismaNamespace.js";
import { ApiError } from "../../classes/ApiError.class.js";
import { prisma } from '../../db/prisma.js';
import { sendSuccess } from '../../utils/response.utils.js';
import z from 'zod';
import { Gender } from '../../generated/prisma/enums.js';

type SeanceInput = {
    scolarYearId : number,
    animatorId : number,
    classId : number,
    date : Date,
}

export type SeanceEntry = {
    id : number,
    date : Date,
    animatorId : number,
    classId : number,
    scolarYearId : number,
    students : {
        id : number,
        firstName : string,
        lastName : string,
        gender : Gender,
        level : {id : number, label : string},
        bilan : {
            presence : boolean,
            summary : string,
            lesson : {
                id : number,
                label : string,
                subject : {id : number, label : string}
            } | null,
        } | null,
    }[]
}

type SeanceResponse = {
    data : SeanceEntry | null
}

export async function animatorSubmitSeanceHandler(
    req : Request,
    res : Response,
    next : NextFunction
){
    try{

        const {scolarYearId, animatorId, classId, date} = req.body as SeanceInput;
        console.log('scolarYearId : ', scolarYearId,' | animatorId : ',animatorId, ' | classId : ', classId, ' | date : ',date);

        if(animatorId !== req.user!.id){
            throw ApiError.unauthorized('Accès non autorisé.');
        }

        // La date arrivée en query param a perdu la précision horaire (souvent minuit UTC).
        // Pour éviter les faux négatifs si la séance a été créée avec une heure précise,
        // on cherche dans toute la journée avec gte/lt plutôt qu'une égalité stricte.

        const seance = await prisma.seance.create({
            data : {
                scolarYearId,
                animatorId,
                classId,                
                date
            }
        });

        if(!seance){
            throw ApiError.internalError('Une erreur est survenue.')
        }
        
        const students = await prisma.student.findMany({
            where : {
                classId
            },
            select : {
                id : true,
                firstName : true,
                lastName : true,
                gender : true,
                level : {
                    select : {
                        id : true,
                        label : true,
                    }
                }
            }
        })

        if(!students){
            throw ApiError.internalError('Une erreur est survenue.')
        }
        
        const studentEntries = students.map((student) => ({
            id : student.id,
            firstName : student.firstName,
            lastName : student.lastName,
            gender : student.gender,
            level : {id : student.level!.id, label : student.level!.label},
            bilan : null,
        }))

        return sendSuccess<SeanceResponse>(
            res,
            {
                data : {
                    id : seance.id,
                    animatorId : seance.animatorId!,
                    classId : seance.classId!,
                    date : seance.date,
                    scolarYearId : seance.scolarYearId!,
                    students : studentEntries
                }
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