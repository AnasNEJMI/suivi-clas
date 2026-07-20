import { animatorApiCalls } from "@/api/animator/apiCalls";
import { animatorKeys } from "@/api/animator/query-keys";
import {queryClient } from "@/lib/query/client";
import { queryKeys } from "@/lib/query/keys";
import {replace} from "react-router";

export async function AnimatorPageLoader(){
    try{
        const animator = await queryClient.ensureQueryData({
            queryKey : animatorKeys.me,
            queryFn : animatorApiCalls.fetchProfile,
            staleTime : 10 * 60 * 1000,
        })
        
        console.log('animator profile response : ',JSON.stringify(animator, null, 2))
        
        if(!animator){
            throw replace(`/`);
        }

        const baseData = await queryClient.ensureQueryData({
            queryKey : animatorKeys.baseData,
            queryFn : animatorApiCalls.fetchBaseData,
            staleTime : 10 * 60 * 1000,
        }) 
        
        console.log('animator base data response : ',JSON.stringify(baseData, null, 2))

        return {animator, baseData};
    }catch(error){
        if(error instanceof Response && error.status === 302){
            throw error;
        }

        //connection error  
        queryClient.setQueryData(queryKeys.auth.user, null);
        console.error('Une erreur de connexion a survenue.', error);
        throw replace('/');
    }
}