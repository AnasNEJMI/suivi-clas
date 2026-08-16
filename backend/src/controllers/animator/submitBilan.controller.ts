import {Request, Response, NextFunction} from 'express';
import { PrismaClientKnownRequestError } from "../../generated/prisma/internal/prismaNamespace.js";
import { ApiError } from "../../classes/ApiError.class.js";
import { prisma } from '../../db/prisma.js';
import { sendSuccess } from '../../utils/response.utils.js';
import { BilanInput } from '../../schemas/bilan.schema.js';
import { generateQcmForBilan } from '../lib/qcm/generate-qcm-for-bilan.js';


export type BilanEntry = {
    date: Date;
    presence: boolean;
    summary: string | null;
    lesson: {
        id: number;
        label: string;
        subject: {
            id: number;
            label: string;
        };
    } | null;
    id: number;
    studentId: number;
    seanceId: number;
    submittedById: number;
    qcmId : number | null;
}

type BilanResponse = {
    data : BilanEntry | null
}

export async function animatorSubmitBilanHandler(
    req : Request,
    res : Response,
    next : NextFunction
){
    try{

        const {date, animatorId, studentId, seanceId, lessonId, presence, summary, includeQcm} = req.body as BilanInput;
        console.log('seanceId : ', seanceId,' | animatorId : ',animatorId, ' | studentId : ', studentId, ' | date : ',date);

        if(animatorId !== req.user!.id){
            throw ApiError.unauthorized('Accès non autorisé.');
        }

        // La date arrivée en query param a perdu la précision horaire (souvent minuit UTC).
        // Pour éviter les faux négatifs si la séance a été créée avec une heure précise,
        // on cherche dans toute la journée avec gte/lt plutôt qu'une égalité stricte.

        const bilan = await prisma.bilan.upsert({
            where : {
                bilanId : {
                    seanceId,
                    studentId
                }
            },
            update : {
                presence,
                ...(presence && {
                    lessonId, summary
                }),
                ...(!presence && {
                    lessonId : null, summary : null
                }),
                
            },
            create : {
                submittedById : animatorId,
                seanceId,              
                studentId,
                date,
                presence,
                ...(presence && {
                    lessonId, summary
                }),
                ...(!presence && {
                    lessonId : null, summary : null
                }),
            },
            select : {
                id : true,
                submittedById : true,
                lesson : {
                    select : {
                        id : true,
                        label : true,
                        subject : {
                            select : {id : true, label : true}
                        }
                    }
                },
                studentId : true,
                seanceId : true,
                date : true,
                presence : true,
                summary : true,
            }
        });

        if(!bilan){
            throw ApiError.internalError('Une erreur est survenue.')
        }

        let qcm : {id : number} | null = null;
        //create qcm
        if(bilan.presence && bilan.lesson?.id && includeQcm){
            qcm = await generateQcmForBilan(bilan.id, studentId, bilan.lesson.id)
        }

        return sendSuccess<BilanResponse>(
            res,
            {
                data : {...bilan, qcmId : qcm?.id?? null}
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