import { LESSON_EVALS, LessonEvalLabels } from '@/api/api.types'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import type { LessonEvalFormValues } from '@/lib/schemas/lesson-eval.schema'
import { cn } from '@/lib/utils'
import { BicepsFlexedIcon, CircleDashedIcon, StarsIcon, TrendingUpIcon } from 'lucide-react'
import { Controller, useFormContext } from 'react-hook-form'

const EVAL_CONFIG = {
  notAcquired: {
    label: LessonEvalLabels.notAcquired ?? 'Pas abordé',
    description: 'La leçon n\'a pas encore été travaillée ou abordée lors des séances qui ont eu lieu.',
    icon: CircleDashedIcon,
    bgColor: 'bg-slate-50',
    borderColor: 'border-slate-200/80',
    activeBg: 'bg-slate-900 text-white border-slate-900 shadow-md',
    badgeColor: 'bg-slate-100 text-slate-700 border-slate-200',
    iconColor: 'text-slate-500',
  },
  acquiring: {
    label: LessonEvalLabels.acquiring ?? 'En cours',
    description: 'Notions de base comprises mais nécessitent encore de la pratique.',
    icon: TrendingUpIcon,
    bgColor: 'bg-amber-50/50',
    borderColor: 'border-amber-200/70',
    activeBg: 'bg-amber-500 text-white border-amber-600 shadow-md shadow-amber-500/20',
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-200/80',
    iconColor: 'text-amber-500',
  },
  acquired: {
    label: LessonEvalLabels.acquired ?? 'Acquis',
    description: 'Les compétences de la leçon sont maîtrisées.',
    icon: BicepsFlexedIcon,
    bgColor: 'bg-sky-50/50',
    borderColor: 'border-sky-200/70',
    activeBg: 'bg-sky-600 text-white border-sky-700 shadow-md shadow-sky-600/20',
    badgeColor: 'bg-sky-50 text-sky-700 border-sky-200/80',
    iconColor: 'text-sky-500',
  },
  expert: {
    label: LessonEvalLabels.expert ?? 'Maîtrise',
    description: 'Niveau d\'excellence, l\'élève sait réinvestir et employer les compétences facilement.',
    icon: StarsIcon,
    bgColor: 'bg-emerald-50/50',
    borderColor: 'border-emerald-200/70',
    activeBg: 'bg-emerald-600 text-white border-emerald-700 shadow-md shadow-emerald-600/20',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
    iconColor: 'text-emerald-500',
  },
} as const

export default function EvaluationField() {
  const { control } = useFormContext<LessonEvalFormValues>()

  return (
    <Controller
      name="evaluation"
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="space-y-3 font-outfit">
          <FieldLabel className="text-xs font-bold text-slate-800 m-0">
            Niveau de maîtrise sélectionné
          </FieldLabel>

          {/* GRILLE DE CARTES D'ÉVALUATION (RADIO CARDS) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {LESSON_EVALS.map((evalKey) => {
              const config = EVAL_CONFIG[evalKey as keyof typeof EVAL_CONFIG]
              const isSelected = field.value === evalKey
              const IconComp = config.icon

              return (
                <button
                  key={evalKey}
                  type="button"
                  onClick={() => field.onChange(evalKey)}
                  className={cn(
                    'p-3.5 rounded-2xl border text-left flex items-start gap-3 transition-all duration-200 cursor-pointer select-none relative overflow-hidden group',
                    isSelected
                      ? config.activeBg
                      : cn('bg-white hover:bg-slate-50/80 border-slate-200/80 shadow-2xs', config.borderColor)
                  )}
                >
                  {/* Icône d'état */}
                  <div
                    className={cn(
                      'size-9 rounded-xl border flex items-center justify-center shrink-0 transition-colors',
                      isSelected
                        ? 'bg-white/20 border-white/30 text-white'
                        : cn('bg-slate-50 border-slate-200/60', config.iconColor)
                    )}
                  >
                    <IconComp className="size-4" />
                  </div>

                  {/* Libellé et description */}
                  <div className="min-w-0 flex-1 space-y-0.5">
                    <div className="flex items-center justify-between gap-1">
                      <span
                        className={cn(
                          'text-xs font-bold leading-snug truncate',
                          isSelected ? 'text-white' : 'text-slate-900'
                        )}
                      >
                        {config.label}
                      </span>

                      {/* Indicateur radio visuel */}
                      <span
                        className={cn(
                          'size-3.5 rounded-full border flex items-center justify-center shrink-0',
                          isSelected
                            ? 'border-white bg-white'
                            : 'border-slate-300 bg-transparent'
                        )}
                      >
                        {isSelected && <span className="size-1.5 rounded-full bg-slate-900" />}
                      </span>
                    </div>

                    <p
                      className={cn(
                        'text-[11px] leading-relaxed line-clamp-2 font-medium',
                        isSelected ? 'text-white/80' : 'text-slate-500'
                      )}
                    >
                      {config.description}
                    </p>
                  </div>
                </button>
              )
            })}
          </div>

          {fieldState.invalid && (
            <FieldError errors={[fieldState.error]} className="text-xs mt-1" />
          )}
        </Field>
      )}
    />
  )
}