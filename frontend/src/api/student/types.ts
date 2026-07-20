import type { Bilan, Doc, QcmWithQuestions, Skill } from "../api.types";

export type StudentData = {
    bilans : Bilan[],
    skill : Skill,
    docs : Doc[],
    qcmWithQuestions : QcmWithQuestions[],
}