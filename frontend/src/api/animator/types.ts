import type { Bilan, Lesson, LessonEval, Level, Skill } from "../api.types";

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
    level: {
        id:      number;
        label:   string;
        order:   number;
    } | null;
    bilans: BilanEntry[];
    skill:  SkillEntry;
};

export type ClassEntry = {
    id:       number;
    label:    string;
    contractId : number,
    association : {id : number, label : string},
    students: StudentEntry[];
};

export type ScolarYearEntry = {
    id: number;
    label: string;
    classes: ClassEntry[];
};

export type AnimatorBaseDataResponse = {
    scolarYears: ScolarYearEntry[];
    lessonsByLevel : LessonsByLevelEntry[],
};

export type Animator = {
    id : number, 
    firstName : string,
    lastName : string,
    username : string,
    gender : 'f' | 'm',
}

export type AnimatorBaseData = {
    associations : AssociationData[]
}

type AssociationData = {
    Classes : ClassData[]
}

type ClassData = {
    students : StudentData[],
    subjects : string[],
    lessons : Lesson[],
}

type StudentData = {
    level : Level,
    bilans : Bilan[]
    skill : Skill,
}


export type SeanceEntry = {
    id : number,
    animatorId : number,
    classId : number,
    date : Date,
    scolarYearId : number,
    students : SeanceStudentEntry[],
}

export type SeanceStudentEntry = {
    id : number,
    firstName : string,
    lastName : string,
    gender : 'm' | 'f',
    level : {id : number, label : string},
    bilan : SeanceBilanEntry | null,
}

export type SeanceBilanEntry = {
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
    submittedById: number;
}


export type SeancePayload = {
    scolarYearId : number,
    animatorId : number,
    classId : number,
    date : Date,
}

export type SeanceQueryParams = {
    animatorId:   number
    scolarYearId: number
    classId:      number
    date:         Date
}

export type LessonEvalQueryParams = {
    animatorId:   number
    scolarYearId: number
    classId:      number
    studentId : number
}

export type SkillEvalQueryParams = {
    animatorId:   number
    studentId : number
}

export type LessonEvalsEntry = {
    animatorId : number,
    studentId : number,
    evaluations : LessonEvalEntry[]
}

export type LessonEvalEntry = {
    id : number,
    lesson : {
        id : number,
        label : string,
        subject : {
            id : number, 
            label : string
        },
    },
    evaluation : LessonEval
}



export type SkillEvalEntry = {
    id : number,
    studentId : number,
    animatorId : number,
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
    updatedAt : Date,
}



export const SKILL_FIELDS = ['autonomy', 'discipline', 'organisation', 'ponctuality', 'regularity', 'respect', 'preparation', 'positive', 'negative', 'improvements'] as const
export const SkillFieldLabels : Record <SkillFieldType, string> = {
    'autonomy' : 'Autonomie',
    'discipline' : 'Discipline',
    'organisation' : 'Organisation',
    'ponctuality' : 'Ponctualité',
    'regularity' : 'Régularité',
    'respect' : 'Respect',
    'preparation' : 'Préparation',
    'positive' : 'Points positifs',
    'negative' : 'Points négatifs',
    'improvements' : 'Axes d\'amélioration',
}

export type SkillFieldType = typeof SKILL_FIELDS[number];