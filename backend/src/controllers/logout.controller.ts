
import {Request, Response, NextFunction} from 'express';
import { deleteSession } from '../utils/session.utils.js';
import { SESSION_CONFIG } from '../configs/session.config.js';
import { sendSuccess } from '../utils/response.utils.js';


type logoutResponse = {
    message : string
}


export async function logoutHandler(
    req : Request,
    res : Response,
    next : NextFunction
){
    try{
        const sessionId = req.sessionId;

        if(sessionId){
            await deleteSession(sessionId);
        }

        res.clearCookie(SESSION_CONFIG.COOKIE_NAME);

        //return response
        return sendSuccess<logoutResponse>(
            res,
            {
                message : 'Déconnexion réussie.'
            }
        )
    }catch(error){
        next(error);
    }
}