import { Gender } from "../generated/prisma/enums.js";
import { UserType } from "../types/data.types.js";

///////////////////CLASSNAMES//////////////////////
export const CLASS_NAMES = ['4ème'] as const;
export type ClassName = typeof CLASS_NAMES[number];

export const DOC_TYPES = ['fiche', 'qcm', 'exercices'] as const;
export type DocType = typeof DOC_TYPES[number];

///////////////////USERS//////////////////////
export type userData = {
    firstName: string,
    lastName: string,
    username: string,
    gender: Gender,
    password: string,
    role: UserType;
}


//////////////////LESSONS/////////////////////////////
export const SUBJECTS = ['math', 'pc', 'svt'] as const;
export type Subject = typeof SUBJECTS[number];


////////////////QCM QUESTIONS////////////////////////
export type QcmBankQuestionSeed = {
    question : string,
    difficulty : 'e' | 'm' | 'h',
    answerA : string,
    answerB : string,
    answerC : string,
    answerD : string,
    correctAnswer : 'a' | 'b' | 'c' | 'd',
    explanation : string,
}