import { Request, Response, NextFunction } from "express";
import { sendSuccess } from "../../utils/response.utils.js";
import { prisma } from "../../db/prisma.js";
import { ApiError } from "../../classes/ApiError.class.js";

type AnimatorProfile = {
    id : number, 
    firstName : string,
    lastName : string,
    username : string,
    gender : 'f' | 'm',
}

type AnimatorProfileSuccessResponse = {
    animator : AnimatorProfile
}

export async function animatorProfileHandler(
    req : Request,
    res : Response,
    next : NextFunction
){
    try{
        const user = req.user!;

        const animator = await prisma.animator.findUnique({
                where : {
                    id : user.id,
                    username : user.username
                }
        });

        if(!animator) throw ApiError.unauthorized("Aucun Animateur(trice) n'existe avec ces données");

        return sendSuccess<AnimatorProfileSuccessResponse>(
            res,
            {
                animator : {
                    id : animator.id,
                    username : animator.username,
                    firstName : animator.firstName,
                    lastName : animator.lastName,
                    gender : animator.gender,
                }
            }
        )
    }catch(error){
        next(error);
    }
}