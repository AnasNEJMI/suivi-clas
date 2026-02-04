
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