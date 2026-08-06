import { ApiError } from "@/lib/errors/apiError.class";
import { apiRequest } from "../client";
import { ErrorCodes, ErrorStatusMap } from "@/lib/errors/errors.constants";
import { type LessonEvalsEntry, type AnimatorBaseDataResponse, type Animator as AnimatorProfile, type SeanceBilanEntry, type SeanceEntry, type LessonEval, type LessonEvalEntry, type SkillEvalEntry } from "./types";

const animatorEndpoints = {
    me : 'me',
    baseData : 'base-data',
    skills : 'skills',
    qcmsWithQuestions : 'qcmWithQuestions',
    seance : 'seance',
    bilan : 'bilan',
    lessonEvals : 'lesson-evals',
    lessonEval : 'lesson-eval',
    skillEval : 'skill-eval',
}

type AnimatorProfileResponse = {
    animator : AnimatorProfile,
}

type SeancePayload = {
    date : Date,
    animatorId : number,
    classId : number,
    scolarYearId : number,
}

type StudentAnimatorPayload = {
    animatorId : number,
    studentId : number,
}

type LessonEvalPayload = {
    animatorId : number,
    studentId : number,
    lessonId : number,
    evaluation : LessonEval
}

export type SkillEvalPayload = {
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
}

type BilanPayload = {
    date : Date,
    animatorId : number,
    studentId : number,
    seanceId : number,
    presence : boolean,
    lessonId? : number,
    summary? : string
}



async function fetchAnimatorProfile():Promise<AnimatorProfile | null>{
    try{
        const response =  await apiRequest<AnimatorProfileResponse>('/api/animator/me')
        console.log('fetchAnimator response : ', response);
        return response.animator;
    }catch(error){
        if(error instanceof ApiError
        && error.statusCode === ErrorStatusMap[ErrorCodes.UNAUTHORIZED]){
            return null;
        }

        throw error;
    }
}

function fetchPayloadlessData<T>(endpoint : string) {
    return () =>  apiRequest<T>(`/api/animator/${endpoint}`);
}

export async function fetchData<T extends Record<string, unknown>, K>(payload : T, endpoint : string){
    try{
        const params = new URLSearchParams(
            Object.entries(payload).reduce((acc, [key, value]) => {
                if(value instanceof Date){
                    acc[key] = value.toISOString();
                }else{
                    acc[key] = String(value);
                }
                return acc;
            }, {} as Record<string, string>)
        )
        const response =  await apiRequest<{data : K}>(`/api/animator/${endpoint}?${params.toString()}`);
        
        return response.data;
    }catch(error){
        if(error instanceof ApiError
        && error.statusCode === ErrorStatusMap[ErrorCodes.UNAUTHORIZED]){
            return null;
        }

        throw error;
    }
}

export async function deleteData<T extends Record<string, unknown>, K>(payload : T, endpoint : string){
    try{
        const params = new URLSearchParams(
            Object.entries(payload).reduce((acc, [key, value]) => {
                if(value instanceof Date){
                    acc[key] = value.toISOString();
                }else{
                    acc[key] = String(value);
                }
                return acc;
            }, {} as Record<string, string>)
        )
        const response =  await apiRequest<{data : K}>(`/api/animator/${endpoint}?${params.toString()}`,{method : 'DELETE'});
        
        return response.data;
    }catch(error){
        if(error instanceof ApiError
        && error.statusCode === ErrorStatusMap[ErrorCodes.UNAUTHORIZED]){
            return null;
        }

        throw error;
    }
}

export async function submitData<T, K>(payload : T, endpoint : string) : Promise<K | null>{
    try{
        const response =  await apiRequest<{data : K}>(`/api/animator/${endpoint}`,{
            method : 'POST',
            body : JSON.stringify(payload)
        })
        return response.data;
    }catch(error){
        if(error instanceof ApiError
        && error.statusCode === ErrorStatusMap[ErrorCodes.UNAUTHORIZED]){
            return null;
        }

        throw error;
    }
}



export const animatorApiCalls = {
    fetchProfile : fetchAnimatorProfile,
    fetchBaseData : fetchPayloadlessData<AnimatorBaseDataResponse>(animatorEndpoints.baseData),
    submitSeance : (payload : SeancePayload) =>  submitData<SeancePayload, SeanceEntry | null>(payload, animatorEndpoints.seance),
    deleteSeance : (payload : SeancePayload) =>  deleteData<SeancePayload, SeanceEntry | null>(payload, animatorEndpoints.seance),
    fetchSeance : (payload : SeancePayload) => fetchData<SeancePayload, SeanceEntry | null>(payload, animatorEndpoints.seance),
    submitBilan : (payload : BilanPayload) => submitData<BilanPayload, SeanceBilanEntry | null>(payload, animatorEndpoints.bilan),

    fetchLessonEvals : (payload : StudentAnimatorPayload) => fetchData<StudentAnimatorPayload, LessonEvalsEntry>(payload, animatorEndpoints.lessonEvals),
    submitLessonEval : (payload : LessonEvalPayload) => submitData<LessonEvalPayload, LessonEvalEntry | null>(payload, animatorEndpoints.lessonEval),

    fetchSkillEval : (payload : StudentAnimatorPayload) => fetchData<StudentAnimatorPayload, SkillEvalEntry | null>(payload, animatorEndpoints.skillEval),
    submitSkillEval : (payload : SkillEvalPayload) => submitData<SkillEvalPayload, SkillEvalEntry | null>(payload, animatorEndpoints.skillEval)
}