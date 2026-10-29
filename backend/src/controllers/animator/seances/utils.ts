import { AnswerChoice, Difficulty, Gender } from "../../../generated/prisma/enums.js"
import { prisma } from "../../../db/prisma.js";

export type QcmEntry = {
    id : number,
    completed : boolean,
    score : number | null,
    studentId : number,
    lesson : {id : number, label : string, subject : {id : number, label : string}} | null,
    qcmQuestions : QcmQuestionEntry[],
    createdAt : Date,
    updatedAt : Date,
}

export type QcmQuestionEntry = {
    id : number,
    correct : boolean,
    selectedChoice : AnswerChoice | null,
    bankQuestion : BankQuestionEntry
}

export type BankQuestionEntry = {
    id : number,
    question : string,
    difficulty : Difficulty,
    answerA : string,
    answerB : string,
    answerC : string,
    answerD : string,
    correctAnswer : AnswerChoice,
    explanation : string,
}

export type BilanEntry = {
    date: Date;
    presence: boolean;
    summary: string | null;
    curriculumSkills : {id : number, label : string, description : string}[] | null,
    lesson: {
        id: number;
        label: string;
        subject: {
            id: number;
            label: string;
        };
    } | null;
    id: number;
    studentId: number;
    seanceId: number;
    submittedById: number;
    qcm : QcmEntry | null;
}
export type StudentEntry = {
    id : number,
    firstName : string,
    lastName : string,
    gender : 'm' | 'f',
    level : {id : number, label : string},
    bilan : BilanEntry | null,
}
export type SeanceEntry = {
    id : number,
    date : Date,
    animatorId : number,
    classId : number,
    scolarYearId : number,
    seanceDuration : SeanceDurationEntry,
    studentBilans : StudentEntry[],
}
export type SeancesByClassEntry = {
    id : number,
    label : string,
    seances : SeanceEntry[]
}
export type SeancesByScolarYearEntry = {
    id : number,
    label : string,
    classes : SeancesByClassEntry[]
}

export type SeanceDurationEntry = {id : number,label : string,durationMin : number};

export type SeancesDataResponse = {
    scolarYears : SeancesByScolarYearEntry[];
}

export type PrismaSeance = {
    id: number;
    class: {
        label: string;
        id: number;
        association: {
            label: string;
            id: number;
        } | null;
        students: {
            level: {
                label: string;
                id: number;
            } | null;
            id: number;
            firstName: string;
            lastName: string;
            gender: Gender;
        }[];
    } | null;
    scolarYear: {
        label: string;
        id: number;
    } | null;
    bilans: BilanEntry[];
    date: Date;
    animatorId : number | null,
    seanceDuration: SeanceDurationEntry;
}

export async function buildSeancesByScolarYear(seances : PrismaSeance[], animatorId : number) : Promise<SeancesByScolarYearEntry[]> {
    type ScolarYearBucket = Map<number, {id : number, label : string, classBucket : ClassBucket}>;
    type ClassBucket = Map<number, {id : number, label : string, seances : SeanceEntry[]}>;

    const contracts = await prisma.animatorContract.findMany({
        where : {animatorId},
        select : {
            scolarYear : {select : {id : true, label : true}},
            class : {select : {id : true, label : true},
        }}
    });

    const scolarYearMap : ScolarYearBucket = new Map();
    for (let i = 0; i < seances.length; i++) {
        const seance = seances[i]!;
        
        if(!seance.scolarYear || !seance.class || !seance.class.association || !seance.animatorId) continue;
        if(!scolarYearMap.has(seance.scolarYear.id)){
            scolarYearMap.set(seance.scolarYear.id,{
                ...seance.scolarYear,
                classBucket : new Map()
            })
        }
        
        const classMap = scolarYearMap.get(seance.scolarYear.id)!.classBucket;
        if(!classMap.has(seance.class.id)){
            classMap.set(seance.class.id, {
                id : seance.class.id,
                label : seance.class.label,
                seances : []
            });
        }
        const classSeances = classMap.get(seance.class.id)!.seances;
        
        const validStudents = seance.class.students.filter(s => s.level!== null);
        classSeances.push({
            id : seance.id, date : seance.date, seanceDuration : seance.seanceDuration, animatorId : seance.animatorId!, classId : seance.class.id, scolarYearId : seance.scolarYear.id,
            studentBilans : validStudents.map(s => (
                {
                    ...s,
                    level : s.level!,
                    bilan : getStudentBilan(s.id, seance)?? null
                }
            ))})
    }

    for (let i = 0; i < contracts.length; i++) {
        const contract = contracts[i]!;
        if(!contract.scolarYear || !contract.class) continue;

        const scolarYear = contract.scolarYear;
        
        if(!scolarYearMap.has(scolarYear.id)){
            scolarYearMap.set(scolarYear.id, {id : scolarYear.id, label : scolarYear.label, classBucket : new Map()})
        }

        const classBucket = scolarYearMap.get(scolarYear.id)!.classBucket;

        if(!classBucket.has(contract.class.id)){
            classBucket.set(contract.class.id, {id : contract.class.id, label : contract.class.label, seances : []});
        }
    }

    const seancesByScolarYear : SeancesByScolarYearEntry[] = []

    for(const scolarYearEntry of scolarYearMap.values()){
        const seancesByClassEntry : SeancesByClassEntry[] = []
        for(const classEntry of scolarYearEntry.classBucket.values()){
            seancesByClassEntry.push(classEntry)
        }
        seancesByScolarYear.push({
            id : scolarYearEntry.id,
            label : scolarYearEntry.label,
            classes : seancesByClassEntry
        })
    }   
    
    return seancesByScolarYear
}

function getStudentBilan(studentId : number, seance : PrismaSeance){
    return seance.bilans.find(b => b.studentId === studentId);
}