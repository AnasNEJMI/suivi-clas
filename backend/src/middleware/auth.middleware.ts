import express from 'express';
import { ApiError } from '../classes/ApiError.class.js';
import { SESSION_CONFIG } from '../configs/session.config.js';
import { getSession } from '../utils/session.utils.js';
import { isValidUUID } from '../utils/auth.utils.js';
import { User } from '../types/data.types.js';
import { Gender } from '../generated/prisma/enums.js';

declare global {
  namespace Express {
    interface Request {
      user?: User,
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

        console.log("sessionId valid ? ", !sessionId)
        console.log('sessionId', sessionId)

        if (!sessionId)                         throw ApiError.unauthorized('Aucune session trouvée.');
        if (typeof sessionId !== 'string')      throw ApiError.unauthorized('Format de session invalide.');
        if (sessionId.trim().length === 0)      throw ApiError.unauthorized('Session vide.');
        if (!isValidUUID(sessionId))            throw ApiError.unauthorized('Format de session invalide.');

        //get the session from the db
        const session = await getSession(sessionId);
        if (!session) throw ApiError.unauthorized('Session invalide ou expirée.');
        console.log('session : ', session);

        if(session.student){
            const { student } = session;

            if (!student.class || !student.level || !student.class.association) {
                throw ApiError.unauthorized('Compte élève incomplet.');
            }

            req.user = {
                id:          student.id,
                username:    student.username,
                firstName:   student.firstName,
                lastName:    student.lastName,
                userType:    'student',
                gender:      student.gender === Gender.f ? 'f' : 'm',
                class:       { id: student.class.id,                  label: student.class.label },
                level:       { id: student.level.id,                  label: student.level.label },
                association: { id: student.class.association.id,      label: student.class.association.label },
                createdAt:   student.createdAt,
            };
        }else if(session.animator){
            const { animator } = session;

            req.user = {
                id:          animator.id,
                username:    animator.username,
                firstName:   animator.firstName,
                lastName:    animator.lastName,
                userType:    'animator',
                gender:      animator.gender === Gender.f ? 'f' : 'm',
                class:       null,
                level:       null,
                association: null,
                createdAt:   animator.createdAt,
            };
        }else if(session.associationMember){
            const { associationMember } = session;

            if (!associationMember.association) {
                throw ApiError.unauthorized('Compte membre incomplet.');
            }

            req.user = {
                id:          associationMember.id,
                username:    associationMember.username,
                firstName:   associationMember.firstName,
                lastName:    associationMember.lastName,
                userType:    'associationMember',
                gender:      associationMember.gender === Gender.f ? 'f' : 'm',
                class:       null,
                level:       null,
                association: { id: associationMember.association.id, label: associationMember.association.label },
                createdAt:   associationMember.createdAt,
            };
        }else {
            // session en base sans aucun utilisateur rattaché — état incohérent
            throw ApiError.unauthorized('Session invalide.');
        }

        req.sessionId = sessionId;
         
        next();
    }catch(error){
        next(error);
    }
}

