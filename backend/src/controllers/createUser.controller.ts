import express from 'express';
import { hashPassword } from '../utils/auth.utils.js';
import { CreateUserInput } from '../schemas/auth.schema.js';
import {prisma} from '../db/prisma.js';
import { Prisma } from '../generated/prisma/client.js';
import { ApiResponse } from '../types/response.types.js';
import { ApiError } from '../classes/ApiError.class.js';
import { sendCreated } from '../utils/response.utils.js';

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