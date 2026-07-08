import { addDays } from "date-fns";
import { SESSION_CONFIG } from "../configs/session.config.js";
import { prisma } from "../db/prisma.js";
import { UserType } from "../types/data.types.js";

export async function createSession(
    userType : UserType,
    userId : number,
    ipAddress? : string,
    userAgent? : string,
){
    const expiresAt = addDays(new Date(), SESSION_CONFIG.EXPIRY_DAYS);

    const session = await prisma.session.create({
        data : {
            studentId : userType === 'student'? userId : null,
            animatorId : userType === 'animator'? userId : null,
            associationMemberId : userType === 'associationMember'? userId : null,
            expiresAt,
            ipAddress,
            userAgent
        },
        include : {
            student : {
                select : {
                    id : true,
                    username : true,
                    createdAt : true,
                    class : {
                        select : {
                            id : true,
                            label : true,
                            association : {
                                select : {
                                    id : true,
                                    label : true,
                                }
                            }
                        }
                    },
                    level : {
                        select : {
                            id : true,
                            label : true,
                        }
                    }
                }
            },
            animator : {
                select : {
                    id : true,
                    username : true,
                    createdAt : true,
                }
            },
            associationMember : {
                select : {
                    id : true,
                    username : true,
                    createdAt : true,
                    association : {
                        select : {
                            id : true,
                            label : true,
                        }
                    }
                }
            }
        }
    })

    return session;
}

export async function getSession(sessionId : string){
    const session = await prisma.session.findUnique({
        where: { id: sessionId },
        include: {
            student: {
                select: {
                    id:        true,
                    username:  true,
                    firstName: true,
                    lastName:  true,
                    gender:    true,
                    createdAt: true,
                    class: {
                        select: {
                            id:    true,
                            label: true,
                            association: {
                                select: { id: true, label: true },
                            },
                        },
                    },
                    level: {
                        select: { id: true, label: true },
                    },
                },
            },
            animator: {
                select: {
                    id:        true,
                    username:  true,
                    firstName: true,
                    lastName:  true,
                    gender:    true,
                    createdAt: true,
                },
            },
            associationMember: {
                select: {
                    id:        true,
                    username:  true,
                    firstName: true,
                    lastName:  true,
                    gender:    true,
                    createdAt: true,
                    association: {
                        select: { id: true, label: true },
                    },
                },
            },
        },
    });

    console.log("retrieved session is : ", session);
    
    if (!session){
        return null;
    }
    
    const now = new Date();
    
    console.log("now : ", now);
    console.log("retrieved session expiresAt : ", session?.expiresAt);
    console.log("retrieved session is : ", session);

    if(session.expiresAt < now){
        await prisma.session.delete({ where: { id: sessionId } }).catch(() => {});
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

export async function deleteSession(sessionId: string) {
    await prisma.session.delete({ where: { id: sessionId } }).catch(() => {});
}

export async function deleteAllSessions(userType: UserType, userId: number) {
    const whereClause = {
        student:           { studentId:           userId },
        animator:          { animatorId:          userId },
        associationMember: { associationMemberId: userId },
    }[userType];

    if (!whereClause) {
        console.error(`[deleteAllSessions] userType inconnu : ${userType}`);
        return;
    }

    await prisma.session.deleteMany({ where: whereClause }).catch(() => {});
}