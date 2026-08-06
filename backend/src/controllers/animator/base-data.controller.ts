import { Request, Response, NextFunction } from "express";
import { sendSuccess } from "../../utils/response.utils.js";
import { prisma } from "../../db/prisma.js";
import { ApiError } from "../../classes/ApiError.class.js";
import { ScolarYear } from "../../db/seed.users.data.js";
import { number } from "zod";
import { PrismaClientKnownRequestError } from "../../generated/prisma/internal/prismaNamespace.js";

export type LessonEntry = {
    id:      number;
    label:   string;
};

export type SubjectEntry = {
    id : number,
    label : string,
    lessons : LessonEntry[],
}

export type LessonsByLevelEntry = {
    id : number,
    label : string,
    subjects : SubjectEntry[]
}

export type BilanEntry = {
    id:       number;
    presence: boolean;
    summary:  string | null;
    seance:   { id: number; date: Date };
    lesson:   { id: number; label: string } | null;
};

export type SkillEntry = {
    ponctuality:  number;
    preparation:  number;
    autonomy:     number;
    organisation: number;
    regularity:   number;
    discipline:   number;
    respect:      number;
    positive:     string;
    negative:     string;
    improvements: string;
    updatedAt:    Date;
};

export type StudentEntry = {
    id:        number;
    username:  string;
    firstName: string;
    lastName:  string;
    gender:    'f' | 'm';
    // level est null si l'élève n'a pas encore de niveau assigné
    level: {
        id:      number;
        label:   string;
        order:   number;
    } | null;
    bilans: BilanEntry[];
    skills:  SkillEntry[];
};

export type ClassEntry = {
    id:       number;
    label:    string;
    contractId : number,
    association : {id : number, label : string},
    students: StudentEntry[];
};

export type ScolarYearEntry = {
    id:           number;
    label:          string;
    classes: ClassEntry[];
};

export type AnimatorBaseDataResponse = {
    scolarYears: ScolarYearEntry[];
    lessonsByLevel : LessonsByLevelEntry[],
};

export async function animatorBaseDataHandler(
    req : Request,
    res : Response,
    next : NextFunction
){
    try{
        const user = req.user!;
        const animatorId = user.id;

        const contracts = await prisma.animatorContract.findMany({
            where : {animatorId},
            orderBy : { scolarYear : {label : 'desc'}},
            select : {
                id : true,
                scolarYear : {select : {id : true, label : true}},
                class : {
                    select : {
                        id : true, label : true, 
                        association : {select : {id : true, label : true}},
                        students : {
                            orderBy : [
                                {lastName : 'asc'},
                                {firstName : 'asc'},
                            ],
                            select : {
                                id : true,
                                username:  true,
                                firstName: true,
                                lastName:  true,
                                gender:    true,
                                level : {
                                    select : {
                                        id : true,
                                        label : true,
                                        order : true,
                                        lessons : {
                                            orderBy : {label : 'asc'},
                                            select : {
                                                id : true,
                                                label : true,
                                                subject : {
                                                    select : {id : true, label : true}
                                                }
                                            }
                                        }
                                    },
                                },
                                bilans : {
                                    orderBy : {seance : {date : 'desc'}},
                                    select : {
                                        id : true,
                                        presence: true,
                                        summary:  true,
                                        seance : {select : {id : true, date : true,}},
                                        lesson : {select : {id : true, label : true, subject : {select : {id : true, label : true}}}}
                                    }
                                },
                                skills : {
                                    select : {
                                        animatorId : true,
                                        ponctuality:  true,
                                        preparation:  true,
                                        autonomy:     true,
                                        organisation: true,
                                        regularity:   true,
                                        discipline:   true,
                                        respect:      true,
                                        positive:     true,
                                        negative:     true,
                                        improvements: true,
                                        updatedAt:    true,
                                    }
                                }
                            }
                        }
                    }
                },
            }
        });

        const scolarYearMap = new Map<number, ScolarYearEntry>();
        const levelIdSet = new Set<number>();
        let lessonsByLevel : LessonsByLevelEntry[] = [];

        for (let i = 0; i < contracts.length; i++) {
            const contract = contracts[i];
            if (!contract || !contract.id || !contract.class || !contract.scolarYear) throw new Error("Contract Not Valid");
            
            //preparing levelLessons
            if(contract.class.students){
                for (let j = 0; j < contract.class.students.length; j++) {
                    const student = contract.class.students[j]!;
                    if(student.level){
                        levelIdSet.add(student.level.id);
                    }
                }
            }

            const levelLessons = levelIdSet.size > 0 
            ?   await prisma.level.findMany({
                where : {id : {in : [...levelIdSet]}},
                orderBy : { order : 'asc'},
                select : {
                    id : true,
                    label : true,
                    order : true,
                    lessons : {
                        orderBy : {label : 'asc'},
                        select : {
                            id : true,
                            label : true,
                            subject : {select : {id : true, label : true}},
                        }
                    }
                }
            })
            :   []
            
            lessonsByLevel = levelLessons.map(level => {
                const subjectsMap = new Map<number, {
                    id : number,
                    label : string,
                    lessons : LessonEntry[]
                }>();

                for (let i = 0; i < level.lessons.length; i++) {
                    const lesson = level.lessons[i];
                    
                    if(!subjectsMap.has(lesson!.subject.id)){
                        subjectsMap.set(lesson!.subject.id, {
                            id : lesson!.subject.id,
                            label : lesson!.subject.label,
                            lessons : []
                        })
                    }

                    const subject = subjectsMap.get(lesson!.subject.id)!;
                    subject.lessons.push({id : lesson!.id, label : lesson!.label})
                }

                return {
                    id : level.id,
                    label : level.label,
                    order : level.order,
                    subjects : Array.from(subjectsMap.values())
                }
            })
            const contractId = contract.id;
            const studentClass = contract.class;
            if (!studentClass.association) throw new Error("Contract Not Valid");
            
            const scolarYear = contract.scolarYear;

            if(!scolarYearMap.has(scolarYear.id)){
                scolarYearMap.set(scolarYear.id, {
                    id : scolarYear.id,
                    label : scolarYear.label,
                    classes : [],
                })
            }

            const scolarYearEntry = scolarYearMap.get(scolarYear.id)!;

            const classEntry : ClassEntry = {
                id : studentClass.id,
                label : studentClass.label,
                contractId,
                association : {id : studentClass.association.id, label : studentClass.association.label},
                students : studentClass.students!.map(student => ({
                    id : student.id,
                    firstName : student.firstName,
                    lastName : student.lastName,
                    username : student.username,
                    gender : student.gender,
                    level : {
                        id : student.level!.id,
                        label: student.level!.label,
                        order : student.level!.order,
                    },
                    bilans : student.bilans!.map(bilan => ({
                        id:       bilan.id,
                        presence: bilan.presence,
                        summary:  bilan.summary,
                        seance:   { id: bilan.seance.id, date: bilan.seance.date },
                        lesson:   bilan.lesson?{ id: bilan.lesson!.id, label: bilan.lesson!.label} : null,
                    })),
                    skills : student.skills.map(skill => ({
                        animatorId : skill.ponctuality,
                        ponctuality:  skill.ponctuality,
                        preparation:  skill.preparation,
                        autonomy:     skill.autonomy,
                        organisation: skill.organisation,
                        regularity:   skill.regularity,
                        discipline:   skill.discipline,
                        respect:      skill.respect,
                        positive:     skill.positive,
                        negative:     skill.negative,
                        improvements: skill.improvements,
                        updatedAt:    skill.updatedAt
                    })) 
                }))
            }

            scolarYearEntry.classes.push(classEntry);
        }

        const scolarYears = Array.from(scolarYearMap.values());

        return sendSuccess<AnimatorBaseDataResponse>(res, {scolarYears, lessonsByLevel})

    }catch(error){
        if (error instanceof PrismaClientKnownRequestError) {
            console.error('[animatorBaseData] Prisma error:', error);
            return next(ApiError.internalError());
        }
        next(error);
    }
}