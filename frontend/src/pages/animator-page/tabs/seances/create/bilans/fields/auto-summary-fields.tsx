// src/routes/animator/bilan/fields/auto-summary-card.tsx

import { Controller, useFormContext, useWatch } from 'react-hook-form'
import { CheckIcon, Loader2Icon, SparklesIcon } from 'lucide-react'
import type { CreateBilanFormValues } from '@/lib/schemas/create-bilan.schema'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { BrandButton } from '@/components/brand-button'
import { ACTIVITIES, ACTIVITY_LABELS, ENGAGEMENT_LABELS, ENGAGEMENT_LEVELS, METHODOLOGY_SKILLS, METHODOLOGY_TRENDS, NEXT_STEP_LABELS, NEXT_STEPS, SKILL_LABELS, toOptions, TREND_LABELS } from '@/api/animator/auto-summary-options'
import { StepBadge } from './step-badge'

const ACTIVITY_OPTIONS    = toOptions(ACTIVITIES, ACTIVITY_LABELS)
const ENGAGEMENT_OPTIONS = toOptions(ENGAGEMENT_LEVELS, ENGAGEMENT_LABELS) 
const SKILL_OPTIONS       = toOptions(METHODOLOGY_SKILLS, SKILL_LABELS)
const TREND_OPTIONS       = toOptions(METHODOLOGY_TRENDS, TREND_LABELS)
const NEXT_STEP_OPTIONS   = toOptions(NEXT_STEPS, NEXT_STEP_LABELS)

type ToggleFieldName = 'activity' | 'engagement' | 'methodologyTrend' | 'nextStep'

function ToggleField({ name, label, options }: {
  name:    ToggleFieldName
  label:   string
  options: { value: string; label: string }[]
}) {
  const { control } = useFormContext<CreateBilanFormValues>()
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className='gap-2'>
          <FieldLabel className='text-base font-medium'>
            {label} {field.value && <CheckIcon className='text-lime-500 size-4' />}
          </FieldLabel>
          <ToggleGroup
            type='single'
            variant='outline'
            value={field.value ?? ''}
            onValueChange={(v) => field.onChange(v || undefined)}
            className='items-center flex-wrap gap-2'
          >
            {options.map(o => (
              <ToggleGroupItem key={o.value} value={o.value} className='h-10 rounded-sm'>
                <span className='text-sm'>{o.label}</span>
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  )
}

interface AutoSummaryCardProps {
  onGenerate:   () => void
  isGenerating: boolean
}

export default function AutoSummaryCard({ onGenerate, isGenerating }: AutoSummaryCardProps) {
    const { control } = useFormContext<CreateBilanFormValues>()

    const [presence, lessonId, activity, engagement, skill, trend, nextStep] = useWatch({
    control,
    name: ['presence', 'lessonId', 'activity', 'engagement', 'methodologySkill', 'methodologyTrend', 'nextStep'],
    })

    // Same gating as the other steps: only once presence is true and a lesson is chosen
    if (!presence || lessonId < 1) return null

    const isComplete = !!(activity && engagement && skill && trend && nextStep)

  return (
    <Card className='border-none shadow-card gap-0 rounded-2xl rounded-tr-none relative mt-8'>
      <StepBadge step={3} />
      <CardHeader className='space-y-0.5'>
        <CardTitle className='text-base flex items-center gap-1 font-bold text-indigo-600'>
          <SparklesIcon /> Résumé automatique
        </CardTitle>
        <CardDescription className='text-xs'>
          Décrire la séance pour générer un résumé que vous pourrez modifier.
        </CardDescription>
      </CardHeader>

      <CardContent className='flex flex-col gap-5 mt-6'>
        <ToggleField name='activity'    label='Contenu de la séance'     options={ACTIVITY_OPTIONS} />
        <ToggleField name='engagement' label='Implication pendant la séance' options={ENGAGEMENT_OPTIONS} />
        <Controller
          name='methodologySkill'
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <div className='flex justify-between gap-6'>
                <FieldLabel className='text-base font-medium'>
                  Compétence {field.value && <CheckIcon className='text-lime-500 size-4' />}
                </FieldLabel>
                <Select value={field.value ?? ''} onValueChange={field.onChange}>
                  <SelectTrigger className='w-full max-w-48 md:max-w-72 truncate text-sm font-medium h-10!'>
                    <SelectValue placeholder='Choisir une compétence' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {SKILL_OPTIONS.map(o => (
                        <SelectItem key={o.value} value={o.value} className='text-base'>
                          {o.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <ToggleField name='methodologyTrend' label='Évolution'       options={TREND_OPTIONS} />
        <ToggleField name='nextStep'         label='À faire ensuite' options={NEXT_STEP_OPTIONS} />

        {/* type='button' is essential — a default button inside the <form> would submit the bilan */}
        <BrandButton
          type='button'
          variant='outline'
          size='lg'
          onClick={onGenerate}
          disabled={!isComplete || isGenerating}
          className='w-full py-6 text-base font-medium mt-2'
        >
          {isGenerating && <Loader2Icon className='animate-spin' />}
          {isGenerating ? 'Génération...' : 'Générer le résumé'}
        </BrandButton>
      </CardContent>
    </Card>
  )
}