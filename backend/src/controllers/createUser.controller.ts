import express from 'express';
import { hashPassword } from '../utils/auth';
import { CreateUserInput } from '../schemas/user.schema';
import {prisma} from '../db/prisma';

export async function createUserHandler(req: express.Request, res: express.Response){
    const {email, password} = req.body as CreateUserInput;

    const passwordHash = await hashPassword(password);

    await prisma.user.create({
        data : {
            email,
            passwordHash,
        }
    })

    console.log('user created successfully with email : ', email, 'password : ', password)
    res.json({ email : email});
};