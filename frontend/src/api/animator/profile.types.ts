import type { Subject } from "@/lib/types/data.types"

export type ProfileDataResponse = {
    scolarYears : AnimatorProfileByScolarYear[]
}

export type AnimatorProfileByScolarYear = {
    id : number,
    label : string,
    associations : AssociationEntry[]
}

export type AssociationEntry = {
    id : number,
    label : string,
    postalCode : number,
    address : string,
    specializations : Subject[]
    classess : ClassEntry[]
}

export type ClassEntry = {
    id : number,
    label : string,
    contractTitle : string,
    Students : StudentEntry[]
}

export type StudentEntry = {
    firstName : string,
    lastName : string,
    gender : 'm' | 'f',
    level : {id : number, label : string},
}