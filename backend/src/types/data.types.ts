import { AnswerChoice, Difficulty } from "../generated/prisma/enums.js"

export type User = {
    id  : number,
    username : string,
    firstName : string,
    lastName : string,
    gender : 'm' | 'f',
    class : {label : string} | null,
    createdAt : Date,
    role : 'admin' | 'org' | 'student',
}

export type Bilan = {
    id : number,
    user : {id : number, firstName : string, lastName : string},
    lesson : {id : number, label:string, subject : string} | null,
    date : Date,
    presence : boolean,
    subject : string | null,
    summary : string | null,
}

export type Skill = {
    id : number,
    user : {id : number, firstName : string, lastName : string},
    autonomy : number,
    discipline : number,
    organisation : number,
    ponctuality : number,
    regularity : number,
    respect : number,
    preparation : number,
    positive : string,
    negative : string,
    improvements : string,
}

export type Lesson = {
    id : number,
    class : {id : number, label : string},
    label : string,
    subject : string,
}

export type Doc = {
    id : number,
    lesson : {id : number, label : string},
    link : string,
    type : string,
}

export type QcmWithQuestions = {
    id : number,
    createdAt: Date;
    completed: boolean;
    user: {
        id: number;
        firstName: string;
        lastName: string;
    };
    lesson: {
        id: number;
        label: string;
    };
    qcmQuestions: {
        selectedChoice: AnswerChoice | null;
        bankQuestion: {
            question: string;
            difficulty: Difficulty;
            answerA: string;
            answerB: string;
            answerC: string;
            answerD: string;
            correctAnswer: AnswerChoice;
        };
    }[];
}
