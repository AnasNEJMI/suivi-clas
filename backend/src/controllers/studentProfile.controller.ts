import { Request, Response, NextFunction } from "express";
import { sendSuccess } from "../utils/response.utils.js";
import { Bilan, Doc, Skill, User } from "../types/data.types.js";
import { ApiError } from "../classes/ApiError.class.js";
import { prisma } from "../db/prisma.js";

type profileSuccessResponse = {
    bilans : Bilan[],
    docs : Doc[],
    // skill : Skill,
}

export async function studentProfileHandler(
    req : Request,
    res : Response,
    next : NextFunction
){
    try{
        //if auth lets you pass user should be available (fingers crossed)
        const user = req.user!;

        if(user.role !== 'student'){
            throw ApiError.unauthorized('Seuls les élèves sont autorisés.')
        }

        const bilans = await prisma.bilan.findMany({
            where : {
                id : user.id
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
                date : true,
                presence : true,
                subject : true,
                lesson : {
                    select : {
                        id : true,
                        label : true,
                        subject : true,
                    }
                },
                createdAt : true,
                summary : true,

            },orderBy : {
                date : 'desc',
            }
        })

        return sendSuccess<profileSuccessResponse>(
            res,
            {
                bilans,
                docs : [],
            }
        )
    }catch(error){
        next(error);
    }
}