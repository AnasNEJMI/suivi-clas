import type { Bilan, Doc } from "./api.types";
import { apiRequest } from "./client";

export type StudentProfileData = {
    bilans : Bilan[],
    docs : Doc[],
    // skills : Skill
}


export async function fetchStudentProfile() : Promise<StudentProfileData>{
    return apiRequest<StudentProfileData>('/api/student/profile');
}