import { getCachedUser } from "@/lib/query/client";
import { redirect} from "react-router";

export async function protectedRouteLoader(){
    const user = getCachedUser();

    console.log('user ', user)

    if(!user){
        throw redirect(`/login`);
    }

    return {user}
}