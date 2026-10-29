import { prisma } from "../../db/prisma.js";

export type LessonEntry = {
    id:      number;
    label:   string;
    curriculumSkills : CurriculumSkillEntry[]
};

export type CurriculumSkillEntry = {
    id : number,
    label : string,
    description : string
}

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

export async function fetchAnimatorLessons(animatorId : number) : Promise<{
    lessonsByLevel : LessonsByLevelEntry[],
    // specializationSubjectIds : Set<number>
}>{
    const contracts = await prisma.animatorContract.findMany({
        where : {animatorId},
        select : {
            contractSpecializations : {select : {subjectId : true,}},
            class : {select : {students : {select : {levelId : true}}}}
        }
    })

    const specializationIds = new Set<number>();
    const levelIds = new Set<number>();

    for (let i = 0; i < contracts.length; i++) {
        const contract = contracts[i]!;
        for (let j = 0; j < contract.contractSpecializations.length; j++) {
            const spec = contract.contractSpecializations[j]!;
            specializationIds.add(spec.subjectId);
        }
    }

    for (let i = 0; i < contracts.length; i++) {
        const contract = contracts[i]!;
        for (let j = 0; j < (contract.class?.students.length ?? 0); j++) {
            const level = contract.class!.students[j]!;
            if(level.levelId) specializationIds.add(level.levelId);
        }
    }

    const lessonsByLevel = await fetchLessonsByLevelAndSpec(levelIds, specializationIds);
    return {lessonsByLevel};
}

export async function fetchLessonsByLevelAndSpec(levelIdSet : Set<number>, specializationIdSet : Set<number>) : Promise<LessonsByLevelEntry[]>{
    if(levelIdSet.size === 0 || specializationIdSet.size === 0) return [];

    const levels = await prisma.level.findMany({
        where : {id : {in : [...levelIdSet]}},
        select : {id : true,label : true,
            lessons : {
                select : {id : true,label : true,
                    curriculumSkills : {
                        select : {id : true, label : true, description : true}
                    },
                    subject : {
                        select : {
                            id : true,
                            label : true
                        }
                    }
                }
            }
        }
    })

    const lessonsByLevel : LessonsByLevelEntry[] = [];
    for (let i = 0; i < levels.length; i++) {
        const level = levels[i]!;
        
        const subjectsMap = new Map<number, SubjectEntry>();
        const lessons = level.lessons;

        for (let j = 0; j < lessons.length; j++) {
            const lesson = lessons[j]!;
            if(!specializationIdSet.has(lesson.subject.id)) continue;
            
            if(!subjectsMap.has(lesson.subject.id)){
                subjectsMap.set(lesson.subject.id, {...lesson.subject, lessons : []});
            }

            const subjectsBucket = subjectsMap.get(lesson.subject.id)!;
            subjectsBucket.lessons.push({...lesson})
        }
        
        lessonsByLevel.push({id : level.id, label : level.label, subjects : Array.from(subjectsMap.values())})
    }

    return lessonsByLevel;
}