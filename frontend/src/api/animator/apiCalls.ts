import { ApiError } from "@/lib/errors/apiError.class";
import { apiRequest } from "../client";
import { ErrorCodes, ErrorStatusMap } from "@/lib/errors/errors.constants";
import type { AnimatorBaseDataResponse, Animator as AnimatorProfile } from "./types";

const animatorEndpoints = {
    me : 'me',
    baseData : 'base-data',
    skills : 'skills',
    qcmsWithQuestions : 'qcmWithQuestions',
}

type AnimatorProfileResponse = {
    animator : AnimatorProfile,
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

function fetchAnimatorData<T>(animatorEndpoint : string){
    return () => apiRequest<T>(`/api/animator/${animatorEndpoint}`);
}


export const animatorApiCalls = {
    fetchProfile : fetchAnimatorProfile,
    fetchBaseData : fetchAnimatorData<AnimatorBaseDataResponse>(animatorEndpoints.baseData),
}