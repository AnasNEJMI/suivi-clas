import { fetchUser } from "@/api/auth";
import {queryClient } from "@/lib/query/client";
import { queryKeys } from "@/lib/query/keys";
import { redirect} from "react-router";

export async function protectedRouteLoader(){
    try{
        const user = await queryClient.fetchQuery({
            queryKey : queryKeys.auth.user,
            queryFn : fetchUser,
            retry : false,
            staleTime : 0,
            gcTime : 10 * 60 * 1000
        })

        if(!user){
            throw redirect(`/login`);
        }

        return {user};
    }catch(error){
        if(error instanceof Response && error.status === 302){
            throw error;
        }

        //connection error  
        queryClient.setQueryData(queryKeys.auth.user, null);
        console.error('Une erreur de connexion a survenue.', error);
        throw redirect('/login');
    }
}