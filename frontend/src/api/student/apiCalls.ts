import type { Bilan, QcmWithQuestions, Skill } from "../api.types";
import { apiRequest } from "../client";

const studentEndpoints = {
    me : 'me',
    bilans : 'bilans',
    skills : 'skills',
    qcmsWithQuestions : 'qcmWithQuestions',
}

export function fetchStudentData<T>(studentEndpoint : string){
    return () => apiRequest<T>(`/api/student/${studentEndpoint}`);
}


export const studentApiCalls = {
    fetchProfile : fetchStudentData<Bilan>(studentEndpoints.me),
    fetchBilans : fetchStudentData<Bilan[]>(studentEndpoints.bilans),
    fetchSkills : fetchStudentData<Skill[]>(studentEndpoints.skills),
    fetchQcms : fetchStudentData<QcmWithQuestions[]>(studentEndpoints.qcmsWithQuestions),
}