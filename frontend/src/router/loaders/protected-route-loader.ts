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
            staleTime : 5 * 6 * 1000,
            gcTime : 10 * 60 * 1000
        })

        console.log('finished fetching from protectedRouteLoader, user : ', user);

        if(!user){
            throw redirect(`/login`);
        }

        return {user};
    }catch(error){
        if(error instanceof Response && error.status === 302){
            throw error;
        }

        //connection error  
        console.error('Une erreur de connexion a survenue.', error);
        throw redirect('/login');
    }
}