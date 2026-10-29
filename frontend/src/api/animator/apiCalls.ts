import { ApiError } from "@/lib/errors/apiError.class";
import { apiRequest } from "../client";
import { ErrorCodes, ErrorStatusMap } from "@/lib/errors/errors.constants";
import { type LessonEvalsEntry, type AnimatorBaseDataResponse, type Animator as AnimatorProfile, type SkillEvalEntry } from "./types";
import {type LessonEval } from "../api.types";
import { fetchPayloadlessData } from "../helper-functions";
import type { QcmEntry } from "../student/apiCalls";
import type { BilanEntry, DeleteBilanEntry, SeanceEntry, SeancesDataResponse } from "./seances.types";
import type { ProfileDataResponse } from "./profile.types";
import type { SkillEvalData, SkillEvalsResponse } from "./skill-evals.types";
import type { LessonEvalData, LessonEvalsResponse } from "./lesson-evals.types";
import type { Activity, ComprehensionLevel, EngagementLevel, MethodologySkill, MethodologyTrend, NextStep } from "./auto-summary-options";

const ANIMATOR_API_ENDPOINT = '/api/animator/';

const animatorEndpoints = {
    me : 'me',
    baseData : 'base',
    seances : 'seances',
    profile : 'profile',
    skills : 'skills',
    qcmsWithQuestions : 'qcmWithQuestions',
    seance : 'seance',
    bilan : 'bilan',
    bilanAutoSummary : 'bilan/auto-summary',
    lessonEvals : 'lesson-evals',
    lessonEval : 'lesson-eval',
    skillEval : 'skill-eval',
    skillEvals : 'skill-evals',
    qcms : 'qcms',
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

type DeleteBilanPayload = {
    bilanId : number
}

type SeanceSubmitPayload = {
    date : Date,
    animatorId : number,
    classId : number,
    seanceDurationId : number,
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
    curriculumSkillIds? : number[],
    summary? : string,
    includeQcm? : boolean,
}

export type AutoSummaryPayload = {
  studentId:        number
  lessonId:         number
  activity:         Activity
  comprehension:    ComprehensionLevel
  engagement:       EngagementLevel
  methodologySkill: MethodologySkill
  methodologyTrend: MethodologyTrend
  nextStep:         NextStep
}

export type AutoSummaryResponse = { paragraphs: string[] }


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

const deleteBilan = async (deleteBilanPayload : DeleteBilanPayload) : Promise<DeleteBilanEntry | null> => {
    const res = await apiRequest<{ data: DeleteBilanEntry | null; }>(
        `${ANIMATOR_API_ENDPOINT}bilan/${deleteBilanPayload.bilanId}`,
        { method: 'DELETE' }
    );
    return res.data;
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
    fetchBaseData : fetchPayloadlessData<AnimatorBaseDataResponse>(animatorEndpoints.baseData, ANIMATOR_API_ENDPOINT),
    fetchSeancesData : fetchPayloadlessData<SeancesDataResponse>(animatorEndpoints.seances, ANIMATOR_API_ENDPOINT),
    generateBilanSummary: (payload: AutoSummaryPayload) =>submitData<AutoSummaryPayload, AutoSummaryResponse>(payload, animatorEndpoints.bilanAutoSummary),
    fetchProfileData : fetchPayloadlessData<ProfileDataResponse>(animatorEndpoints.profile, ANIMATOR_API_ENDPOINT),
    fetchSkillEvalsData : fetchPayloadlessData<SkillEvalsResponse>(animatorEndpoints.skillEvals, ANIMATOR_API_ENDPOINT),
    fetchLessonEvalsData : fetchPayloadlessData<LessonEvalsResponse>(animatorEndpoints.lessonEvals, ANIMATOR_API_ENDPOINT),
    submitSeance : (payload : SeanceSubmitPayload) =>  submitData<SeanceSubmitPayload, SeanceEntry | null>(payload, animatorEndpoints.seance),
    submitBilan : (payload : BilanPayload) => submitData<BilanPayload, BilanEntry | null>(payload, animatorEndpoints.bilan),
    deleteSeance : (payload : SeancePayload) =>  deleteData<SeancePayload, SeanceEntry | null>(payload, animatorEndpoints.seance),
    deleteBilan,
    fetchSeance : (payload : SeancePayload) => fetchData<SeancePayload, SeanceEntry | null>(payload, animatorEndpoints.seance),

    fetchLessonEvals : (payload : StudentAnimatorPayload) => fetchData<StudentAnimatorPayload, LessonEvalsEntry>(payload, animatorEndpoints.lessonEvals),
    submitLessonEval : (payload : LessonEvalPayload) => submitData<LessonEvalPayload, LessonEvalData | null>(payload, animatorEndpoints.lessonEval),

    fetchSkillEval : (payload : StudentAnimatorPayload) => fetchData<StudentAnimatorPayload, SkillEvalEntry | null>(payload, animatorEndpoints.skillEval),
    submitSkillEval : (payload : SkillEvalPayload) => submitData<SkillEvalPayload, SkillEvalData | null>(payload, animatorEndpoints.skillEval),
    
    fetchQcms : (payload : StudentAnimatorPayload) => fetchData<StudentAnimatorPayload, QcmEntry[]>(payload, animatorEndpoints.qcms),
    
}