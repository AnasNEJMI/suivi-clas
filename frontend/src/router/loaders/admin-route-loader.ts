import { fetchAdminBaseDate } from "@/api/admin";
import { fetchUser } from "@/api/auth";
import {queryClient } from "@/lib/query/client";
import { queryKeys } from "@/lib/query/keys";
import {replace} from "react-router";

export async function adminRouteLoader(){
    try{
        const user = await queryClient.ensureQueryData({
            queryKey : queryKeys.auth.user,
            queryFn : fetchUser,
            staleTime : 10 * 60 * 1000,
        })

        if(!user || user.userType !== 'admin'){
            throw replace(`/`);
        }

        const data = await queryClient.ensureQueryData({
            queryKey : queryKeys.admin.base,
            queryFn : fetchAdminBaseDate,
            staleTime : 10 * 60 * 1000,
        }) 

        console.log('data received : ', JSON.stringify(data.skills, null));
        return data;
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