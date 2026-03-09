import { fetchUser } from "@/api/auth";
import { fetchStudentProfile } from "@/api/profile";
import {queryClient } from "@/lib/query/client";
import { queryKeys } from "@/lib/query/keys";
import {replace} from "react-router";

export async function profileRouteLoader(){
    try{
        const user = await queryClient.ensureQueryData({
            queryKey : queryKeys.auth.user,
            queryFn : fetchUser,
            retry : false,
            staleTime : 10 * 60 * 1000,
            gcTime : 10 * 60 * 1000
        })

        if(!user || user.role !== 'student'){
            throw replace(`/`);
        }

        const profile = await queryClient.ensureQueryData({
            queryKey : queryKeys.student.profile,
            queryFn : fetchStudentProfile,
            staleTime : 24* 60 * 60 * 1000,
        });

        console.log('loaded profile : ', profile);

        return {user : user, bilans : profile.bilans, docs : profile.docs, skill : profile.skill, qcmWithQuestions : profile.qcmWithQuestions};
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