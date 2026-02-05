import { Request, Response, NextFunction } from "express";
import { sendSuccess } from "../utils/response.utils.js";
import { User } from "../types/data.types.js";

type profileSuccessResponse = {
    user : User
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
                    username : user.username,
                    firstName : user.firstName,
                    lastName : user.lastName,
                    gender : user.gender,
                    class : user.class? {label : user.class.label} : null,
                    createdAt : user.createdAt,
                    role : user.role
                }
            }
        )
    }catch(error){
        next(error);
    }
}