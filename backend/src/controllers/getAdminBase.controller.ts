import { Request, Response, NextFunction } from "express";
import { sendSuccess } from "../utils/response.utils.js";
import { Bilan, Doc, Lesson, Skill, User } from "../types/data.types.js";
import { prisma } from "../db/prisma.js";
import { Subject, SUBJECTS } from "../db/seed.data.js";

type profileSuccessResponse = {
    users : User[],
    bilans : Bilan[],
    lessons : Lesson[],
    docs : Doc[],
    skills : Skill[],
    subjects : string[],
}

export async function getAdminBaseHandler(
    req : Request,
    res : Response,
    next : NextFunction
){
    try{
        const users = await prisma.user.findMany({
            select : {
                id : true,
                username : true,
                firstName : true,
                lastName : true,
                gender : true,
                class : {
                    select : {
                        label : true,
                    }
                },
                createdAt : true,
                role : true,

            }
        });
        
        const lessons = await prisma.lesson.findMany({
            select : {
                id : true,
                class : {
                    select : {
                        id : true,
                        label : true,
                    }
                },
                label : true,
                subject : true,
            }
        })

        const bilans = await prisma.bilan.findMany({
            select : {
                id : true,
                user : {
                    select : {
                        id : true,
                        firstName : true,
                        lastName : true,
                    }
                },
                date : true,
                presence : true,
                subject : true,
                lesson : {
                    select : {
                        id : true,
                        label : true,
                        subject : true,
                    }
                },
                createdAt : true,
                summary : true,

            },orderBy : {
                date : 'desc',
            }
        })

        const skills = await prisma.skill.findMany({
            select : {
                id : true,
                user : {
                    select : {
                        id : true,
                        firstName : true,
                        lastName : true,
                    }
                },
                autonomy : true,
                discipline : true,
                organisation : true,
                ponctuality : true,
                regularity : true,
                respect : true,
                preparation : true,
                positive : true,
                negative : true,
                improvements : true,
            }
        })

        const subjects = SUBJECTS.map((subject) => {return subject});

        console.log('users : ', JSON.stringify(users))
        console.log('lessons : ', JSON.stringify(lessons))
        console.log('subjects : ', JSON.stringify(subjects))
        console.log('bilans : ', JSON.stringify(bilans))

        return sendSuccess<profileSuccessResponse>(
            res,
            {
                users,
                bilans,
                lessons,
                skills,
                subjects,
                docs : [],
            }
        )
    }catch(error){
        next(error);
    }
}