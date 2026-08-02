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

const seanceQuerySchema = z.object({
    animatorId:   z.coerce.number().int().positive(),
    classId:      z.coerce.number().int().positive(),
    scolarYearId: z.coerce.number().int().positive(),
    date:         z.coerce.date(),
});

export async function animatorDeleteSeanceHandler(
    req : Request,
    res : Response,
    next : NextFunction
){
    try{
        const parsed = seanceQuerySchema.safeParse(req.query);

        if(!parsed.success){
            throw ApiError.validationError('Paramètres invalides : ' + parsed.error.message);
        }


        const {scolarYearId, animatorId, classId, date} = parsed.data as SeanceInput;
        console.log('scolarYearId : ', scolarYearId,' | animatorId : ',animatorId, ' | classId : ', classId, ' | date : ',date);

        if(animatorId !== req.user!.id){
            throw ApiError.unauthorized('Accès non autorisé.');
        }

        // La date arrivée en query param a perdu la précision horaire (souvent minuit UTC).
        // Pour éviter les faux négatifs si la séance a été créée avec une heure précise,
        // on cherche dans toute la journée avec gte/lt plutôt qu'une égalité stricte.
        const startOfDay = new Date(date);
        startOfDay.setUTCHours(0, 0, 0, 0);

        const endOfDay = new Date(date);
        endOfDay.setUTCHours(23, 59, 59, 999);

        const whereSeance = {
            animatorId,
            classId,
            scolarYearId,
            date: { gte: startOfDay, lt: endOfDay },
        };

        const seance = await prisma.seance.findFirst({
            where:  whereSeance,
            select: { id: true },
        });

        if (!seance) {
            throw ApiError.internalError('Séance introuvable.');
        }

        await prisma.$transaction([
            prisma.bilan.deleteMany({
                where : {seanceId : seance.id}
            }),
            prisma.seance.delete({
                where : {id : seance.id}
            })
        ]);


        return sendSuccess<SeanceResponse>(
            res,
            {
                data : null
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