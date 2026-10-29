import type { AnswerChoice, Difficulty } from "../api.types"
import type { CurriculumSkillEntry } from "./types"

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
    curriculumSkill : {id : number, label : string, description : string} | null
}

export type BilanEntry = {
    date: Date;
    presence: boolean;
    summary: string | null;
    curriculumSkills: CurriculumSkillEntry[] | null,
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



export type DeleteBilanEntry = {
    id : number,
    studentId : number,
    scolarYearId : number,
    seanceId : number,
    animatorId : number,
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
    scolarYears : SeancesByScolarYearEntry[]
}