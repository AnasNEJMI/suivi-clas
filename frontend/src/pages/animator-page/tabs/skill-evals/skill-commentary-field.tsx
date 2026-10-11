import { SkillFieldLabels, type SkillFieldType } from '@/api/animator/types'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Textarea } from '@/components/ui/textarea'
import type { SkillEvalFormValues } from '@/lib/schemas/skill-eval.schema'
import { cn } from '@/lib/utils'
import { BicepsFlexedIcon, TrendingDownIcon, TrendingUpIcon } from 'lucide-react'
import { Controller, useFormContext } from 'react-hook-form'

interface AnimSkillCommentaryFieldProps {
  name: SkillFieldType
}

const CONFIG_BY_NAME = {
  positive: {
    label: 'Points forts',
    icon: TrendingUpIcon,
    bgColor: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    focusRing: 'focus-visible:ring-emerald-500/30 focus-visible:border-emerald-300',
    placeholder: 'Ex: Excellente prise d’initiative, travail autonome et rigoureux...',
  },
  negative: {
    label: 'Points à améliorer',
    icon: TrendingDownIcon,
    bgColor: 'bg-rose-50 text-rose-700 border-rose-100',
    focusRing: 'focus-visible:ring-rose-500/30 focus-visible:border-rose-300',
    placeholder: 'Ex: Difficulté à maintenir la concentration, manque de préparation...',
  },
  improvements: {
    label: 'Axes d’amélioration',
    icon: BicepsFlexedIcon,
    bgColor: 'bg-sky-50 text-sky-700 border-sky-100',
    focusRing: 'focus-visible:ring-sky-500/30 focus-visible:border-sky-300',
    placeholder: 'Ex: Préparer ses fiches de révision à l’avance, planifier son travail...',
  },
}

const AnimSkillCommentaryField = ({ name }: AnimSkillCommentaryFieldProps) => {
  const { control } = useFormContext<SkillEvalFormValues>()

  const config = CONFIG_BY_NAME[name as keyof typeof CONFIG_BY_NAME] ?? {
    label: SkillFieldLabels[name] ?? name,
    icon: BicepsFlexedIcon,
    bgColor: 'bg-indigo-50 text-indigo-700 border-indigo-100',
    focusRing: 'focus-visible:ring-indigo-500/30 focus-visible:border-indigo-300',
    placeholder: 'Saisissez vos remarques...',
  }

  const IconComp = config.icon

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="space-y-2 font-outfit">
          <FieldLabel className="flex items-center gap-2 m-0 text-sm font-bold text-slate-800">
            <div
              className={cn(
                'size-6 rounded-lg border flex items-center justify-center shrink-0 shadow-2xs',
                config.bgColor
              )}
            >
              <IconComp className="size-3.5" />
            </div>
            <span>{config.label}</span>
          </FieldLabel>

          <Textarea
            {...field}
            value={field.value as string}
            placeholder={config.placeholder}
            aria-invalid={fieldState.invalid}
            autoComplete="off"
            className={cn(
              'min-h-21 bg-slate-50 border-slate-200/80 rounded-2xl text-xs sm:text-sm font-medium text-slate-800 leading-relaxed placeholder:text-slate-400 shadow-2xs transition-all resize-none p-3.5',
              config.focusRing
            )}
          />

          {fieldState.invalid && (
            <FieldError errors={[fieldState.error]} className="text-xs mt-1" />
          )}
        </Field>
      )}
    />
  )
}

export default AnimSkillCommentaryField