
export type bilanDataPresent = {
    date: string;
    present: boolean;
    bilan: {
        subject: 'math' | 'pc' | 'svt';
        lesson: string;
        summary: string;
    };
}

export type bilanDataAbsent = {
    date: string;
    present: boolean;
}

export type bilanDataType = bilanDataAbsent | bilanDataPresent


//////////////////////////////////////////////////////////////

export type TodoLinksType = {
    fiche : string,
    qcm : string,
    exercices : string,
}

//////////////////////////////////////////////////////////////
export const CLASS_NAMES = ['4ème', '2nde', '1ère', 'T'] as const;
export type ClassName = typeof CLASS_NAMES[number];

/////////////////////////////////////////////////////////////
export const SUBJECTS = ['math', 'pc', 'svt'] as const;
export type Subject = typeof SUBJECTS[number];