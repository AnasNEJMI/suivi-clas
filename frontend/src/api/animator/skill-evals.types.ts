export type SkillEvalData = {
  id : number,
  studentId : number,
  animatorId : number,
  ponctuality:  number
  preparation:  number
  autonomy:     number
  organisation: number
  regularity:   number
  discipline:   number
  respect:      number
  positive:     string
  negative:     string
  improvements: string
  updatedAt:    Date
}

export type SkillEvalStudentEntry = {
  id:        number
  firstName: string
  lastName:  string
  gender:    'f' | 'm'
  level:     { id: number; label: string } | null
  skillEval: SkillEvalData | null   // null = not yet evaluated by this animator
}

export type SkillEvalClassEntry = {
  id:          number
  label:       string
  contractId:  number
  association: { id: number; label: string }
  scolarYear:  { id: number; label: string }
  students:    SkillEvalStudentEntry[]
}

export type SkillEvalsResponse = {
  classes: SkillEvalClassEntry[]
}