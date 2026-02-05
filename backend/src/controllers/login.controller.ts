
import {Request, Response, NextFunction} from 'express';
import { prisma } from '../db/prisma.js';
import { ApiError } from '../classes/ApiError.class.js';
import { comparePassword } from '../utils/auth.utils.js';
import { createSession } from '../utils/session.utils.js';
import { SESSION_CONFIG } from '../configs/session.config.js';
import { sendSuccess } from '../utils/response.utils.js';
import { PrismaClientKnownRequestError } from '../generated/prisma/internal/prismaNamespace.js';
import { UserGender } from '../generated/prisma/enums.js';
import { User } from '../types/data.types.js';

type loginInput = {
    username : string,
    password : string,
}

type loginSuccessResponse = {
    user : User
}


export async function loginHandler(
    req : Request,
    res : Response,
    next : NextFunction
){
    try{
        const {username, password} = req.body as loginInput;
        console.log('username :', username);
        console.log('password :', password);

        //validate email
        const user = await prisma.user.findUnique({
            where : {
                username : username
            },
            include : {
                class : {
                    select : {
                        label : true,
                    }
                }
            }
        });

        console.log('user retrieved : ',user);
        
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
                    username : user.username,
                    firstName : user.firstName,
                    lastName : user.lastName,
                    gender : user.gender === UserGender.f? 'f' : 'm',
                    class : user.class,
                    createdAt : user.createdAt,
                }
            }
        )
    }catch(error){
        if(error instanceof PrismaClientKnownRequestError){
            console.log('prisma error : ', error);
            next(ApiError.internalError())
        }else{
            next(error);
        }
    }
}