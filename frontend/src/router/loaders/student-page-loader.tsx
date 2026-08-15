import { fetchUser } from "@/api/auth";
import { studentApiCalls } from "@/api/student/apiCalls";
import { studentKeys } from "@/api/student/query-keys";
import {queryClient } from "@/lib/query/client";
import { queryKeys } from "@/lib/query/keys";
import {replace} from "react-router";

export async function studentPageLoader(){
    try{
        const user = await queryClient.ensureQueryData({
            queryKey : queryKeys.auth.user,
            queryFn : fetchUser,
            retry : false,
            staleTime : 10 * 60 * 1000,
            gcTime : 10 * 60 * 1000
        })

        console.log('profile user : ', user);

        if(!user || user.userType !== 'student'){
            throw replace(`/`);
        }

        void queryClient.prefetchQuery({
            queryKey : studentKeys.bilans({studentId : user.id}),
            queryFn : studentApiCalls.fetchBilans,
            staleTime : 2 * 60 * 1000,
        })

        return {user};

        // const studentData = await queryClient.ensureQueryData({
        //     queryKey : queryKeys.student.data,
        //     queryFn : fetchStudentData,
        //     staleTime : 24* 60 * 60 * 1000,
        // });

        // console.log('loaded student Data : ', studentData);

        // return {user : user, bilans : studentData.bilans, docs : studentData.docs, skill : studentData.skills, qcmWithQuestions : studentData.qcmWithQuestions};
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