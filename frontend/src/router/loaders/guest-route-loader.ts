import {queryClient } from "@/lib/query/client";
import { queryKeys } from "@/lib/query/keys";
import { fetchUser } from "@/api/auth";

export async function guestRouteLoader(){
    try{
        const user = await queryClient.fetchQuery({
            queryKey : queryKeys.auth.user,
            queryFn : fetchUser,
            retry : false,
            staleTime : 5 * 60 * 1000,
            gcTime : 10 * 60 * 1000
        })

        return user;
    }catch(error){
        if(error instanceof Response && error.status === 302){
            throw error;
        }

        //connection error
        queryClient.setQueryData(queryKeys.auth.user, null);
        console.error('Une erreur de connexion a survenue.', error);
        return null;
    }
}