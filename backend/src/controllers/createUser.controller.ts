import express from 'express';
import { hashPassword } from '../utils/auth';
import { CreateUserInput } from '../schemas/user.schema';
import {prisma} from '../db/prisma';
import { Prisma } from '../generated/prisma/client';

export async function createUserHandler(req: express.Request, res: express.Response){
    const {email, password} = req.body as CreateUserInput;

    //check if a user with the same email already exists
    const existingUser = await prisma.user.findUnique({
        where : {email}
    })

    if(existingUser){
        return res.status(409).json({
            error : "USER_ALREADY_EXISTS"
        })
    }

    const passwordHash = await hashPassword(password);

    try{
        const user = await prisma.user.create({
            data : {
                email,
                passwordHash,
            }
        })

        return res.status(201).json({
            id:user.id,
            email: user.email,
        })

    }catch(err){
        if(
            err instanceof Prisma.PrismaClientKnownRequestError &&
            err.code === "P2002"
        ){
            return res.status(409).json({
                error : "USER_ALREADY_EXISTS"
            })
        }

        throw err;
    }


    console.log('user created successfully with email : ', email, 'password : ', password)
    res.json({ email : email});
};