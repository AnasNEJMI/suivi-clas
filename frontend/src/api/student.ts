import type { Bilan, Doc, QcmWithQuestions, Skill } from "./api.types";
import { apiRequest } from "./client";

export type StudentData = {
    bilans : Bilan[],
    skill : Skill,
    docs : Doc[],
    qcmWithQuestions : QcmWithQuestions[],
}


export async function fetchStudentProfile() : Promise<StudentData>{
    return apiRequest<StudentData>('/api/student/data');
}