import type { Bilan, Lesson, Level, Skill } from "../api.types";

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
        // on embarque les leçons dans le niveau de l'élève
        // → quand l'animateur sélectionne un élève, il a déjà
        //   tous les chapitres disponibles pour ce niveau sans requête supplémentaire
        lessons: LessonEntry[];
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
    id:           number;
    label:          string;
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