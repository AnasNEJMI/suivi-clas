import express from 'express';
import { hashPassword } from '../utils/auth.utils';
import { CreateUserInput } from '../schemas/auth.schema';
import {prisma} from '../db/prisma';
import { Prisma } from '../generated/prisma/client';
import { ApiResponse } from '../types/response.types';
import { ApiError } from '../classes/ApiError.class';
import { sendCreated } from '../utils/response.utils';

type CreateUserResponse = {
    id : number,
    email : string,
    createdAt : string
}

export async function createUserHandler(
    req: express.Request,
    res: express.Response<ApiResponse<CreateUserResponse>>,
    next : express.NextFunction
){
    
    try{
        const {email, password} = req.body as CreateUserInput;
    
        //check if a user with the same email already exists
        const existingUser = await prisma.user.findUnique({
            where : {email}
        })
    
        if(existingUser){
            throw ApiError.userAlreadyExists(email);
        }
    
        const passwordHash = await hashPassword(password);

        const user = await prisma.user.create({
            data : {
                email : email.toLocaleLowerCase(),
                passwordHash,
            }
        })

        return sendCreated<CreateUserResponse>(res, {
            id : user.id,
            email : user.email,
            createdAt : user.createdAt.toISOString(),
        })
        
    }catch(err){
        if(
            err instanceof Prisma.PrismaClientKnownRequestError &&
            err.code === "P2002"
        ){
            return next(ApiError.userAlreadyExists())
        }

        next(err)
    }
};