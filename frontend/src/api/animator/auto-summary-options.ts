// src/lib/auto-summary.options.ts

// Replace with your own username — only this user sees the auto-summary step
export const AUTO_SUMMARY_USERNAME = 'your-username'

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

export const ACTIVITY_LABELS: Record<Activity, string> = {
  course_review: 'Révision du cours',
  exercises:     'Exercices',
  mixed:         'Cours et exercices',
}

export const ENGAGEMENT_LABELS: Record<EngagementLevel, string> = {
  engaged:    'Forte implication',
  moderate:   'Implication moyenne',
  disengaged: 'Faible implication',
}
export const COMPREHENSION_LABELS: Record<ComprehensionLevel, string> = {
  secure :    'Bonne compréhension',
  in_progress:   'Compréhension moyenne',
  needs_review: 'Faible compréhension',
}

export const SKILL_LABELS: Record<MethodologySkill, string> = {
  ponctuality:  'Ponctualité',
  preparation:  'Préparation',
  autonomy:     'Autonomie',
  organisation: 'Organisation',
  regularity:   'Régularité',
  discipline:   'Discipline',
  respect:      'Respect',
}

export const TREND_LABELS: Record<MethodologyTrend, string> = {
  improving:  "S'améliore",
  regressing: 'Régresse',
  stagnating: 'Stagne',
  excelling:  'Excelle',
}

export const NEXT_STEP_LABELS: Record<NextStep, string> = {
  redo_exercises: 'Refaire les exercices',
  more_exercises: "Faire plus d'exercices",
  review_course:  'Revoir le cours régulièrement',
  mind_map:       'Faire une carte mentale',
}

export function toOptions<T extends string>(values: readonly T[], labels: Record<T, string>) {
  return values.map(value => ({ value, label: labels[value] }))
}

export const AUTO_SUMMARY_FIELDS = [
  'activity', 'engagement', 'methodologySkill', 'methodologyTrend', 'nextStep',
] as const