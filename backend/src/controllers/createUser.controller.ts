import { Request, Response } from 'express';
import { isAuth } from '../app';

export const createUserHandler = (req: Request, res: Response) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log('received a post user request with credentials : email ', email, ' password ', password)
    res.json({ email : email});
};