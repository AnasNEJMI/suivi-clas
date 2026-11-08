export const ACTIVITIES = ['course', 'exercises', 'both'] as const
export const ENGAGEMENT_LEVELS = ['high', 'medium', 'disruptive'] as const
export const NEXT_STEPS = ['sheet_and_exercises', 'learn_lesson', 'exercises'] as const
 
export const ACTIVITY_LABELS: Record<(typeof ACTIVITIES)[number], string> = {
  course: 'Cours',
  exercises: 'Exercices',
  both: 'Cours et exercices',
}
 
export const ENGAGEMENT_LABELS: Record<(typeof ENGAGEMENT_LEVELS)[number], string> = {
  high: 'Engagé et concentré',
  medium: 'Moyen, irrégulier',
  disruptive: 'Perturbateur',
}
 
export const NEXT_STEP_LABELS: Record<(typeof NEXT_STEPS)[number], string> = {
  sheet_and_exercises: 'Fiche de révision + refaire les exercices',
  learn_lesson: 'Apprendre le cours',
  exercises: 'Refaire des exercices',
}
 
export function toOptions<T extends string>(values: readonly T[], labels: Record<T, string>) {
  return values.map(value => ({ value, label: labels[value] }))
}

export type Activity           = (typeof ACTIVITIES)[number]
export type EngagementLevel    = (typeof ENGAGEMENT_LEVELS)[number]
export type NextStep           = (typeof NEXT_STEPS)[number]

export const AUTO_SUMMARY_FIELDS = [
  'activity', 'engagement', 'nextStep',
] as const