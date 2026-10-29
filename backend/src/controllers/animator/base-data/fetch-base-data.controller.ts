import { Request, Response, NextFunction } from "express";
import { sendSuccess } from "../../../utils/response.utils.js";
import { prisma } from "../../../db/prisma.js";
import { ApiError } from "../../../classes/ApiError.class.js";
import { PrismaClientKnownRequestError } from "../../../generated/prisma/internal/prismaNamespace.js";
import { AnimatorBaseDataResponse, buildAnimatorBaseData } from "./utils.js";

export async function animatorFetchBaseDataHandler(
    req : Request,
    res : Response,
    next : NextFunction
){
    try{
        const user = req.user!;
        const animatorId = user.id;

        const [contracts, seanceDurations] = await prisma.$transaction([
                prisma.animatorContract.findMany({
                where : {animatorId},
                orderBy : { scolarYear : {label : 'desc'}},
                select : {
                    id : true,
                    contractSpecializations : {
                        select : {
                            subjectId : true,
                        }
                    },
                    scolarYear : {select : {id : true, label : true}},
                    class : {
                        select : {
                            id : true, label : true, 
                            association : {select : {id : true, label : true}},
                            students : {
                                orderBy : [{lastName : 'asc'},{firstName : 'asc'}],
                                select : {
                                    id : true,username:  true,firstName: true,lastName: true,gender: true,
                                    level : {select : {id : true,label : true,order : true}}}
                            }
                        }
                    },
                }
            }),
            prisma.seanceDuration.findMany()
        ])

        

        const {scolarYears, lessonsByLevel} = await buildAnimatorBaseData(contracts);
        sendSuccess<AnimatorBaseDataResponse>(res, {scolarYears, lessonsByLevel, seanceDurations});

     }catch(error){
        if (error instanceof PrismaClientKnownRequestError) {
            console.error('[animatorSeancesDataHandler] Prisma error:', error);
            return next(ApiError.internalError());
        }
        next(error);
    }
}