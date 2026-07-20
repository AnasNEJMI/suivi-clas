import { Request, Response, NextFunction } from "express";
import { sendSuccess } from "../utils/response.utils.js";
import { ApiError } from "../classes/ApiError.class.js";
import { prisma } from "../db/prisma.js";

export type Animator = {
    id : number,
    firstName : string,
    lastName : string,
}

export type Seance = {
    id : number,
    submittedBy : Animator,
    date : Date,
    duration : number,
}

export type StudentData = {
    id : number,
    firstName : string,
    lastName : string,
    level : {id : number, label : string},
    stats : StudentStats,
    observations : StudentObservation[],
}

export type StudentStats = {
    numPresence : number,
    numAbsence : number,
    numVisits : number,
    lastVisit : Date,
}

export type Class = {
    id : number,
    label : string,
    studentsData : StudentData[]
}
export type StudentObservation = {
    id : number,
    date : Date,
    submittedBy : Animator
}

type AssociationDataSuccessResponse = {
    animators : Animator[],
    seances : Seance[],
    classes : Class[]
    // qcmWithQuestions : QcmWithQuestions[],
}

export async function associationDataHandler(
    req : Request,
    res : Response,
    next : NextFunction
){
    try{
        //if auth lets you pass user should be available (fingers crossed)
        const user = req.user!;

        if(user.userType !== 'associationMember') throw ApiError.unauthorized("Seuls les membres d'une association sont autorisés.")
        if(!user.association) throw ApiError.unauthorized("Seuls les membres d'une association sont autorisés.")
            
            const associationClasses = await prisma.class.findMany({
                where : {
                    associationId : user.association.id
                },
                select : {
                    id : true,
                    label : true,
                },
            })
            
        if(!associationClasses || associationClasses.length <= 0) throw ApiError.unauthorized("Aucune classe n'a été trouvée pour cette association.")
            
            for (let i = 0; i < associationClasses.length; i++) {
                const associationClass = associationClasses[i]!;
                const students = await prisma.student.findMany({
                    where : {classId : associationClass.id},
                    select : {
                        id : true,
                        firstName : true,
                        lastName : true,
                        level : {
                            select : {
                                id : true,
                                label : true,
                            }
                        }
                    }
                    
                })
                
                if(!students || students.length <= 0) throw ApiError.unauthorized("Aucun élève n'a été trouvé pour cette association.")
            
                for (let j = 0; j < students.length; j++) {
                    const student = students[j]!;
                    
                    const numPresence = await prisma.bilan.count({
                        where : {
                            id : student.id,
                            presence : true,
                        },
                    })
                    const numAbsence = await prisma.bilan.count({
                        where : {
                            id : student.id,
                            presence : false,
                        },
                    })

                }
            }

        return sendSuccess<AssociationDataSuccessResponse>(
            res,
            {
                animators : [],
                classes : [],
                seances : []
            }
        )
    }catch(error){
        next(error);
    }
}