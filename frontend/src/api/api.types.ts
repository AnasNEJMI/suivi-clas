export type Bilan = {
    id: number;
    createdAt: Date;
    date: Date;
    presence: boolean;
    summary: string | null;
    seance: {id: number;date: Date};
    submittedBy: {username: string; id: number; firstName: string; lastName: string;} | null;
    lesson: {id: number; label: string; subject: {id: number; label: string;};} | null;
}

export type Skill = {
    id : number,
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

export type Difficulty = (typeof Difficulty)[keyof typeof Difficulty]

export const UserType = {
    student : "student",
    associationMember : "associationMember",
    animator : "animator",
} as const;

export const USER_TYPES = ["student", "associationMember","animator"]
export type UserType = (typeof UserType)[keyof typeof UserType]
export const USER_TYPE_LABELS : Record<UserType, string> = {
    "animator" : "Animateur(trice)",
    "student" : "Élève",
    "associationMember" : "Membre d'association",
}
