import express from 'express';
import { ApiError } from '../classes/ApiError.class.js';
import { User, UserType } from '../types/data.types.js';

declare global {
  namespace Express {
    interface Request {
      user?: User,
      sessionId?: string;
    }
  }
}

export async function requireAdminHandler(
    req : express.Request,
    res : express.Response,
    next : express.NextFunction,
){
    try{
        const user = req.user!;

        if(user.userType !== 'admin'){
            throw ApiError.unauthorized('Accès non autorisé.')
        }
         
        next();
    }catch(error){
        next(error);
    }
}