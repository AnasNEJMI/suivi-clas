import express from 'express';
import { ApiError } from '../classes/ApiError.class.js';
import { SESSION_CONFIG } from '../configs/session.config.js';
import { getSession } from '../utils/session.utils.js';
import { isValidUUID } from '../utils/auth.utils.js';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        email: string;
        createdAt: Date;
      };
      sessionId?: string;
    }
  }
}

export async function requireAuthHandler(
    req : express.Request,
    res : express.Response,
    next : express.NextFunction,
){
    try{
        const sessionId = req.cookies[SESSION_CONFIG.COOKIE_NAME];

        console.log('sessionId', sessionId)
        
        ////validation of cookie value
        if(!sessionId){
            throw ApiError.unauthorized('Aucune session trouvée.')
        }

        if(typeof sessionId !== 'string'){
            throw ApiError.unauthorized('Format de session invalide.')
        }
        
        if(sessionId.trim().length === 0){
            throw ApiError.unauthorized('Session vide.')
        }
        
        if(!isValidUUID(sessionId)){
            throw ApiError.unauthorized('Format de session invalide.')
        }

        //get the session from the db
        const session = await getSession(sessionId);

        if(!session){
            throw ApiError.unauthorized('Session invalide ou expirée.')
        }

        req.user = session.user;
        req.sessionId = sessionId;
         
        next();
    }catch(error){
        next(error);
    }
}