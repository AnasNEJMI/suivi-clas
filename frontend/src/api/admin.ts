import type { User } from "./auth"
import { apiRequest } from "./client"
import { ApiError } from "@/lib/errors/apiError.class"
import { ErrorCodes, ErrorStatusMap } from "@/lib/errors/errors.constants"

export type AdminBaseData = {
    users : User[],
    bilans : Bilan[],
    lessons : Lesson[],
    docs : Doc[],
    skills : Skill[],
    subjects : string[],
}

export type Bilan = {
    id : number,
    user : {id : number, firstName : string, lastName : string},
    lesson : {id : number, label:string, subject : string} | null,
    date : Date,
    presence : boolean,
    className : string,
    subject : string | null,
    summary : string | null,
}

export type Skill = {
    id : number,
    userId : number,
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
    lessonId : number,
    link : string,
    type : string,
}


export async function fetchAdminBaseDate() : Promise<AdminBaseData>{
    return apiRequest<AdminBaseData>('/api/admin/base');
}




///////////////////ADD BILAN/////////////////////
type BilanPayload = {
    userId : number,
    date : Date,
    lessonId? : number,
    subject? : string,
    presence : boolean,
    summary? : string,
}

export async function requestAddBilan(payload : BilanPayload) : Promise<Bilan | null>{
    try{
        const response =  await apiRequest<{bilan : Bilan}>('/api/admin/add-bilan',{
            method : 'POST',
            body : JSON.stringify(payload)
        })
        return response.bilan;
    }catch(error){
        if(error instanceof ApiError
        && error.statusCode === ErrorStatusMap[ErrorCodes.UNAUTHORIZED]){
            return null;
        }

        throw error;
    }
}