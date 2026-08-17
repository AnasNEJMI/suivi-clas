import { associationMemberApiCalls } from "@/api/association-member/apiCalls";
import { associationMemberQueryKeys } from "@/api/association-member/query-keys";
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

        void queryClient.prefetchQuery({
            queryKey : associationMemberQueryKeys.presenceStats,
            queryFn : associationMemberApiCalls.fetchPresenceStats,
            staleTime : 2 * 60 * 1000,
        })

        void queryClient.prefetchQuery({
            queryKey : associationMemberQueryKeys.visitStats,
            queryFn : associationMemberApiCalls.fetchVisitStats,
            staleTime : 2 * 60 * 1000,
        })

        return {user : user};
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