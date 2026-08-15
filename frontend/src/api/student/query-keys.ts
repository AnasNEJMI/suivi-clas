export type StudentQueryParams = {
    studentId : number
}

export const studentKeys = {
    bilans : ({studentId} : StudentQueryParams) => ['student', 'bilans', studentId] as const,
    skillEvals : ({studentId} : StudentQueryParams) => ['student', 'skillEvals', studentId] as const,
    lessonEvals : ({studentId} : StudentQueryParams) => ['student', 'lessonEvals', studentId] as const,
}