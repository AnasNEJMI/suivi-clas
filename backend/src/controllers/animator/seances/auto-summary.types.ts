export const ACTIVITIES           = ['course_review', 'exercises', 'mixed'] as const
export const ENGAGEMENT_LEVELS = ['engaged', 'moderate', 'disengaged'] as const
export const COMPREHENSION_LEVELS = ['secure', 'in_progress', 'needs_review'] as const
export const METHODOLOGY_SKILLS   = [
    'ponctuality', 'preparation', 'autonomy', 'organisation',
    'regularity', 'discipline', 'respect',
] as const
export const METHODOLOGY_TRENDS   = ['improving', 'regressing', 'stagnating', 'excelling'] as const
export const NEXT_STEPS           = ['redo_exercises', 'more_exercises', 'review_course', 'mind_map'] as const

export type Activity           = (typeof ACTIVITIES)[number]
export type EngagementLevel    = (typeof ENGAGEMENT_LEVELS)[number]
export type ComprehensionLevel    = (typeof COMPREHENSION_LEVELS)[number]
export type MethodologySkill   = (typeof METHODOLOGY_SKILLS)[number]
export type MethodologyTrend   = (typeof METHODOLOGY_TRENDS)[number]
export type NextStep           = (typeof NEXT_STEPS)[number]

export type SummaryParagraphBank = {
  version:             1
  generatedAt:         string   // ISO date of the last save
  model:               string   // model behind the most recent batch
  variationsPerOption: number

  /** Paragraph 1 — opens with "Bonjour, lors de la séance d'aujourd'hui,". Markers: {name} {lesson} */
  session: Record<Activity, Record<EngagementLevel, string[]>>
  /** Paragraph 2 — one pool per trend. Markers: {name} {skill} */
  methodology: Record<MethodologyTrend, string[]>
  comprehension: Record<ComprehensionLevel, string[]>
  /** Paragraph 3 — advice + closing sentence. Markers: {name} */
  nextSteps:   Record<NextStep, string[]>
}

export type AutoSummaryParams = {
  firstName: string
  lessonLabel: string
  activity: Activity
  engagement: EngagementLevel
  comprehension: ComprehensionLevel
  methodologySkill: MethodologySkill
  methodologyTrend: MethodologyTrend
  nextStep: NextStep
}