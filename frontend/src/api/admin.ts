import type { Bilan, Doc, Lesson, Skill } from "./api.types"
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

////////////////ADD SKILL///////////////////////
type SkillPayload = {
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

export async function requestAddSkill(payload : SkillPayload) : Promise<Skill | null>{
    try{
        const response =  await apiRequest<{skill : Skill}>('/api/admin/add-skill',{
            method : 'POST',
            body : JSON.stringify(payload)
        })
        return response.skill;
    }catch(error){
        if(error instanceof ApiError
        && error.statusCode === ErrorStatusMap[ErrorCodes.UNAUTHORIZED]){
            return null;
        }

        throw error;
    }
}

////////////////ADD SKILL///////////////////////
type DocPayload = {
    docId : number | undefined,
    lessonId : number,
    type : string,
    link : string,
}

export async function requestAddDoc(payload : DocPayload) : Promise<Doc | null>{
    try{
        const response =  await apiRequest<{doc : Doc}>('/api/admin/add-doc',{
            method : 'POST',
            body : JSON.stringify(payload)
        })
        return response.doc;
    }catch(error){
        if(error instanceof ApiError
        && error.statusCode === ErrorStatusMap[ErrorCodes.UNAUTHORIZED]){
            return null;
        }

        throw error;
    }
}