import { Request, Response, NextFunction } from "express";
import { sendSuccess } from "../utils/response.utils.js";

type profileSuccessResponse = {
    user : {
        id : number,
        email : string,
        createdAt : string,
    }
}

export async function profileHandler(
    req : Request,
    res : Response,
    next : NextFunction
){
    try{
        //if auth lets you pass user should be available (fingers crossed)
        const user = req.user!;

        return sendSuccess<profileSuccessResponse>(
            res,
            {
                user : {
                    id : user.id,
                    email : user.email,
                    createdAt : user.createdAt.toISOString(),
                }
            }
        )
    }catch(error){
        next(error);
    }
}