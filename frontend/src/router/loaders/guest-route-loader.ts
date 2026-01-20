import { getCachedUser } from "@/lib/query/client";
import { redirect } from "react-router";

export async function guestRouteLoader(){
    const user = getCachedUser();

    if(user){
        throw redirect(`/dashboard`);
    }

    return null;
}