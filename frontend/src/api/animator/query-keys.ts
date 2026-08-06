import { format } from "date-fns"
import type { SkillEvalQueryParams, SeanceQueryParams, LessonEvalQueryParams } from "./types"

export const animatorKeys = {
    me : ['animator', 'profile'] as const,
    baseData : ['animator', 'base-data'] as const,
    seance : ({animatorId, scolarYearId, classId, date} : SeanceQueryParams) =>
    ['animator', 'seance', animatorId, scolarYearId, classId, format(date, 'yyyy-MM-dd')] as const,
    lessonEval : ({animatorId, scolarYearId, classId, studentId} : LessonEvalQueryParams) =>
    ['animator', 'lesson-eval', animatorId, scolarYearId, classId, studentId] as const,
    skillEval : ({animatorId, studentId} : SkillEvalQueryParams) =>
    ['animator', 'skill-eval', animatorId, studentId] as const,
}