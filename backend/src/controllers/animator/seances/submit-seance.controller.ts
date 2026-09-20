import {Request, Response, NextFunction} from 'express';
import { PrismaClientKnownRequestError } from "../../../generated/prisma/internal/prismaNamespace.js";
import { ApiError } from "../../../classes/ApiError.class.js";
import { prisma } from '../../../db/prisma.js';
import { sendSuccess } from '../../../utils/response.utils.js';
import { SeanceEntry } from './utils.js';

type SeanceInput = {
    animatorId : number,
    classId : number,
    date : Date,
    seanceDurationId : number,
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
        const {animatorId, classId, date, seanceDurationId} = req.body as SeanceInput;

        if(animatorId !== req.user!.id){
            throw ApiError.unauthorized('Accès non autorisé.');
        }

        const scolarYear = await prisma.scolarYear.findFirst({
            where : {
                startDate: {
                    lte: date,
                },
                endDate: {
                    gte: date,
                },
            }
        })
        
        if(!scolarYear){
            throw ApiError.unauthorized('Données de séance invalides.');
        }

        const seanceDuration = await prisma.seanceDuration.findFirst({
            where : {id : seanceDurationId},
        });

        if(!seanceDuration){
            throw ApiError.unauthorized('Données de séance invalides.');
        }

        const scolarYearId = scolarYear.id;
        console.log(scolarYearId, animatorId, classId, date, seanceDuration.id);
        const seance = await prisma.seance.create({
            data : {
                scolarYearId,
                animatorId,
                classId,                
                date,
                seanceDurationId : seanceDuration.id
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
                    scolarYearId : seance.scolarYearId!,
                    date : seance.date,
                    seanceDuration,
                    studentBilans : studentEntries
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