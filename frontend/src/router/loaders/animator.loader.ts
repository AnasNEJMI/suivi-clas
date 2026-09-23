import { animatorApiCalls } from "@/api/animator/apiCalls";
import { animatorKeys } from "@/api/animator/query-keys";
import {queryClient } from "@/lib/query/client";
import { queryKeys } from "@/lib/query/keys";
import {replace} from "react-router";

export async function AnimatorPageLoader(){
    try{
        const user = await queryClient.ensureQueryData({
            queryKey : animatorKeys.me,
            queryFn : animatorApiCalls.fetchProfile,
            staleTime : 10 * 60 * 1000,
        })
        
        console.log('animator profile response : ',JSON.stringify(user, null, 2))
        
        if(!user){
            throw replace(`/`);
        }
        
        //base data (shared between tabs)
        void queryClient.prefetchQuery({
            queryKey : animatorKeys.baseData,
            queryFn : animatorApiCalls.fetchBaseData,
            staleTime : 365* 24 *60 * 60 * 1000
        })
        
        
        //seance tab data
        void queryClient.prefetchQuery({
            queryKey : animatorKeys.seances,
            queryFn : animatorApiCalls.fetchSeancesData,
            staleTime : 2 * 60 * 1000
        })
        
        //profile data
        void queryClient.prefetchQuery({
            queryKey : animatorKeys.profile,
            queryFn : animatorApiCalls.fetchProfileData,
            staleTime : 2 * 60 * 1000
        })
        
        return {user};
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