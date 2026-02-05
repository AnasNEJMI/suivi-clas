import { addDays } from "date-fns";
import { SESSION_CONFIG } from "../configs/session.config.js";
import { prisma } from "../db/prisma.js";

export async function createSession(
    userId : number,
    ipAddress? : string,
    userAgent? : string,
){
    const expiresAt = addDays(new Date(), SESSION_CONFIG.EXPIRY_DAYS);

    const session = await prisma.session.create({
        data : {
            userId,
            expiresAt,
            ipAddress,
            userAgent
        },
        include : {
            user : {
                select : {
                    id : true,
                    username : true,
                    createdAt : true,
                }
            }
        }
    })

    return session;
}

export async function getSession(sessionId : string){
    const session  = await prisma.session.findUnique({
        where : {id : sessionId},
        include : {
            user : {
                select : {
                    id : true,
                    username : true,
                    firstName : true,
                    lastName : true,
                    gender : true,
                    class : true,
                    createdAt : true,
                }
            }
        }

    })

    if (!session){
        return null;
    }

    const now = new Date();

    if(session.expiresAt < now){
        await prisma.session.delete({
            where : {id : sessionId}
        });
        return null;
    }

    const newExpireAt = addDays(new Date(), SESSION_CONFIG.EXPIRY_DAYS);
    await prisma.session.update({
        where : {id : sessionId},
        data : {
            expiresAt : newExpireAt,
            lastActiveAt : new Date()
        },
    });

    return session;
}

export async function deleteSession(sessionId : string){
    await prisma.session.delete({
        where : {id : sessionId}
    }).catch(() => {
        //todo
    })
}

export async function deleteAllSessions(userId : number){
    await prisma.session.deleteMany({
        where : {userId : userId}
    }).catch(() => {
        //todo
    })
}