import { fetchAssociationData } from "@/api/association";
import { fetchUser } from "@/api/auth";
import {queryClient } from "@/lib/query/client";
import { queryKeys } from "@/lib/query/keys";
import {replace} from "react-router";

export async function associationPageLoader(){
    try{
        const user = await queryClient.fetchQuery({
            queryKey : queryKeys.auth.user,
            queryFn : fetchUser,
            retry : false,
            staleTime : 10 * 60 * 1000,
            gcTime : 10 * 60 * 1000
        })

        if(!user || user.userType !== 'associationMember'){
            throw replace(`/`);
        }

        const associationData = await queryClient.ensureQueryData({
            queryKey : queryKeys.associationMember.data,
            queryFn : fetchAssociationData,
            staleTime : 24* 60 * 60 * 1000,
        });

        console.log('loaded association Data : ', associationData);

        return {user : user, animators : associationData.animators, seances : associationData.seances, classes : associationData.classes};
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