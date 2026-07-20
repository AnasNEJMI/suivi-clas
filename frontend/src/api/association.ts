import { apiRequest } from "./client";

export type Animator = {
        id : number,
        firstName : string,
        lastName : string,
}

export type Seance = {
    id : number,
    submittedBy : Animator,
    date : Date,
    duration : number,
}

export type StudentData = {
    id : number,
    firstName : string,
    lastName : string,
    level : {id : number, label : string},
    stats : StudentStats,
    observations : StudentObservation[],
}

export type StudentStats = {
    numPresence : number,
    numAbsence : number,
    numVisits : number,
    lastVisit : Date,
}

export type Class = {
    id : number,
    label : string,
    studentsData : StudentData[]
}
export type StudentObservation = {
    id : number,
    date : Date,
    submittedBy : Animator
}

export type AssociationData = {
    animators : Animator[],
    seances : Seance[],
    classes : Class[]
}


export async function fetchAssociationData() : Promise<AssociationData>{
    return apiRequest<AssociationData>('/api/association/data');
}

/* 
    data needed for association :
    - animators : id, firstName, lastName, numSeances
    - seances : id, date, submittedBy, duration
    - classes : id, label
        - students : id, firstName, lastName
            - stats : numPresence, numAbsence, numConsultations
            - commentary : submittedBy (id, firstName, lastName)
*/