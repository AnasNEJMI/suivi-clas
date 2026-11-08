export const ACTIVITIES = ['course', 'exercises', 'both'] as const
export const ENGAGEMENT_LEVELS = ['high', 'medium', 'disruptive'] as const
export const NEXT_STEPS = ['sheet_and_exercises', 'learn_lesson', 'exercises'] as const

export type Activity = (typeof ACTIVITIES)[number]
export type EngagementLevel = (typeof ENGAGEMENT_LEVELS)[number]
export type NextStep = (typeof NEXT_STEPS)[number]

/** Same literal values as the Prisma `Gender` enum (m | f). */
export type SummaryGender = 'm' | 'f'

export type AutoSummaryParams = {
  firstName: string
  gender: SummaryGender
  lessonLabel: string
  subjectLabel: string
  /** Labels of the curriculum skills ticked in the form, in lesson order. Empty = no skill selected. */
  skillLabels: string[]
  activity: Activity
  engagement: EngagementLevel
  nextStep: NextStep
}