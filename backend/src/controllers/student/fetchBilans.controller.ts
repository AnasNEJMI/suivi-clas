import { Request, Response, NextFunction } from "express";
import { sendSuccess } from "../../utils/response.utils.js";
import { prisma } from "../../db/prisma.js";
import { ApiError } from "../../classes/ApiError.class.js";
import { ScolarYear } from "../../db/seed.users.data.js";
import { number } from "zod";
import { PrismaClientKnownRequestError } from "../../generated/prisma/internal/prismaNamespace.js";
import { BilanEntry } from "../animator/submitBilan.controller.js";
import { Gender } from "../../generated/prisma/enums.js";

type BilansEntry  = {
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
    submittedBy : {
        id : number,
        firstName : string,
        lastName : string,
        gender : Gender
    }
}

type BilansResponse = {
    bilans : BilansEntry[]
}
export async function studentBilansHandler(
    req : Request,
    res : Response,
    next : NextFunction
){
    try{
        const user = req.user!;

        const bilans = await prisma.bilan.findMany({
            where : {
                studentId : user.id
            },
            orderBy : {
                date : 'desc',
            },
            select : {
                date : true,
                lesson : {
                    select : {
                        id : true,
                        label : true,
                        subject : {
                            select : {
                                id : true,
                                label : true
                            }
                        }
                    }
                },
                summary : true,
                presence : true,
                id : true,
                seanceId : true,
                studentId : true,
                submittedBy : {
                    select : {
                        id : true,
                        firstName : true,
                        lastName : true,
                        gender : true
                    }
                }
            }
        })
        
        return sendSuccess<BilansResponse>(res, {bilans})

    }catch(error){
        if (error instanceof PrismaClientKnownRequestError) {
            console.error('[student-bilans] Prisma error:', error);
            return next(ApiError.internalError());
        }
        next(error);
    }
}