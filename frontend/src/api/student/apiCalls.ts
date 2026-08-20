import type { Bilan, LessonEval, QcmWithQuestions} from "../api.types";
import { apiRequest } from "../client";

export const AnswerChoice = {
  a: 'a',
  b: 'b',
  c: 'c',
  d: 'd'
} as const

export type AnswerChoice = (typeof AnswerChoice)[keyof typeof AnswerChoice]

export const Difficulty = {
  e: 'e',
  m: 'm',
  h: 'h'
} as const

export const Gender = {
  m: 'm',
  f: 'f'
} as const

export type Gender = (typeof Gender)[keyof typeof Gender]

export type Difficulty = (typeof Difficulty)[keyof typeof Difficulty]

export type BilansPayload = {
    studentId : number
}

export type QcmEntry = {
    id : number,
    completed : boolean,
    score : number | null,
    qcmQuestions : QcmQuestionsEntry[]
}

export type QcmQuestionsEntry = {
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

export type BilanEntry  = {
    date: Date;
    presence: boolean;
    summary: string | null;
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
    submittedBy : {
        id : number,
        firstName : string,
        lastName : string,
        gender : Gender
    }
    qcm : QcmEntry | null
}

export type BilansResponse = {
    bilans : BilanEntry[]
}

export type SkillsEvalsResponse = {
    skillsEvals : SkillsEvalEntry[]
}

export type SkillsEvalEntry = {
    id : number,
    animator : {
        id : number,
        firstName : string,
        lastName : string,
        gender : 'm' | 'f'
    }
    updatedAt : Date,
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

export type LessonEvalsResponse = {
    lessonsBySubject : LessonsBySubject[]
}

export type LessonsBySubject = {
    id : number,
    label : string,
    lessons : Lesson[]
}

export type Lesson = {
    id : number,
    label : string,
    eval : LessonEvalEntry | null
}

export type LessonEvalEntry = {
    id : number,
    submittedBy : {
        id : number,
        firstName : string,
        lastName : string
    },
    evaluation : LessonEval
    updatedAt : Date,
}

export type VisitTrackingResponse = {
    tracked : boolean
}

const studentEndpoints = {
    me : 'me',
    bilans : 'bilans',
    skillsEvals : 'skills-evals',
    qcmsWithQuestions : 'qcmWithQuestions',
    lessonEvals : 'lesson-evals'
}

export function fetchStudentData<T>(studentEndpoint : string){
    return () => apiRequest<T>(`/api/student/${studentEndpoint}`);
}


export const studentApiCalls = {
    fetchProfile : fetchStudentData<Bilan>(studentEndpoints.me),
    fetchBilans : fetchStudentData<BilansResponse>(studentEndpoints.bilans),
    fetchSkillEvals : fetchStudentData<SkillsEvalsResponse>(studentEndpoints.skillsEvals),
    fetchLessonEvals : fetchStudentData<LessonEvalsResponse>(studentEndpoints.lessonEvals),
    fetchQcms : fetchStudentData<QcmWithQuestions[]>(studentEndpoints.qcmsWithQuestions),
    trackVisit : fetchStudentData<VisitTrackingResponse | null>('visit'),
}