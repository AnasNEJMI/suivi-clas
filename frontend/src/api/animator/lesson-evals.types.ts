import type { LessonEval } from "../api.types"

export type LessonEvalData = {
  id:         number,
  studentId : number,
  lesson:     { id: number; label: string }
  subject:    { id: number; label: string }
  level:      { id: number; label: string }
  evaluation: LessonEval
  updatedAt : Date
}

export type LessonEvalsBySubjectEntry = {
  id: number
  subject : {id : number, label : string},
  lessonEvals: LessonEvalData[] 
}
export type StudentLessonEvalsEntry = {
  id: number
  firstName: string
  lastName:  string
  gender: 'f' | 'm'
  level: { id: number; label: string }
  lessonEvalsBySubject: LessonEvalsBySubjectEntry[] 
}

export type LessonEvalClassEntry = {
  id:          number
  label:       string
  contractId:  number
  association: { id: number; label: string }
  scolarYear:  { id: number; label: string }
  students:    StudentLessonEvalsEntry[]
}

export type LessonEvalsResponse = {
  classes: LessonEvalClassEntry[]
}