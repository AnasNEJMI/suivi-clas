
import {Request, Response, NextFunction} from 'express';
import { prisma } from '../db/prisma';
import { ApiError } from '../classes/ApiError.class';
import { comparePassword } from '../utils/auth.utils';
import { createSession } from '../utils/session.utils';
import { SESSION_CONFIG } from '../configs/session.config';
import { sendSuccess } from '../utils/response.utils';
import { PrismaClientKnownRequestError } from '../generated/prisma/internal/prismaNamespace';

type loginInput = {
    email : string,
    password : string,
}

type loginSuccessResponse = {
    user : {
        id  : number,
        email : string
    }
}


export async function loginHandler(
    req : Request,
    res : Response,
    next : NextFunction
){
    try{
        const {email, password} = req.body as loginInput;

        //validate email
        const user = await prisma.user.findUnique({
            where : {email : email.toLocaleLowerCase()}
        });
        
        if(!user){
            throw ApiError.invalidCredentials();
        }
        
        //validate password
        const isPasswordValid = await comparePassword(password, user.passwordHash);
        
        if(!isPasswordValid){
            throw ApiError.invalidCredentials();
        }

        //create session
        const session = await createSession(
            user.id,
            req.ip,
            req.headers['user-agent']
        )

        //set cookie
        res.cookie(
            SESSION_CONFIG.COOKIE_NAME,
            session.id,
            SESSION_CONFIG.COOKIE_OPTIONS
        )

        //return response
        return sendSuccess<loginSuccessResponse>(
            res,
            {
                user : {
                    id : user.id,
                    email : user.email
                }
            }
        )
    }catch(error){
        if(error instanceof PrismaClientKnownRequestError){
            next(ApiError.internalError())
        }else{
            next(error);
        }
    }
}