import { format } from "date-fns"
import type { SeanceQueryParams } from "./types"

export const animatorKeys = {
    me : ['animator', 'profile'] as const,
    baseData : ['animator', 'base-data'] as const,
    detail : ({animatorId, scolarYearId, classId, date} : SeanceQueryParams) =>
    ['animator', 'seance', animatorId, scolarYearId, classId, format(date, 'yyyy-MM-dd')] as const,
}