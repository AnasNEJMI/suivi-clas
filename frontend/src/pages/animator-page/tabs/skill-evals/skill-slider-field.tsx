import { SkillFieldLabels, type SkillFieldType } from '@/api/animator/types'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Slider } from '@/components/ui/slider'
import { SKILL_CAROUSEL_CARD_STYLES } from '@/lib/types/data.types'
import type { SkillEvalFormValues } from '@/lib/schemas/skill-eval.schema'
import { cn } from '@/lib/utils'
import { Controller, useFormContext } from 'react-hook-form'

interface AnimSkillSliderFieldProps {
  name: SkillFieldType
}

const AnimSkillSliderField = ({ name }: AnimSkillSliderFieldProps) => {
  const { control } = useFormContext<SkillEvalFormValues>()
  const cardStyle = SKILL_CAROUSEL_CARD_STYLES[name as keyof typeof SKILL_CAROUSEL_CARD_STYLES]

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const val = (field.value as number) ?? 0

        return (
          <Field
            data-invalid={fieldState.invalid}
            className="flex flex-col gap-2 p-3.5 rounded-2xl bg-slate-50/80 border border-slate-100 shadow-2xs font-outfit"
          >
            {/* Header du Slider : Icône, Label & Badge de note /20 */}
            <div className="flex items-center justify-between gap-2">
              <FieldLabel className="flex items-center gap-2 m-0 p-0 cursor-pointer">
                {cardStyle && (
                  <div
                    className={cn(
                      'size-7 rounded-lg flex items-center justify-center shrink-0 shadow-2xs',
                      cardStyle.bgColor,
                      cardStyle.highlightTextColor
                    )}
                  >
                    <cardStyle.icon className="size-3.5" />
                  </div>
                )}
                <span className="text-xs font-bold text-slate-800">
                  {SkillFieldLabels[name] ?? name}
                </span>
              </FieldLabel>

              {/* Badge dynamique montrant la valeur sur 20 */}
              <div
                className={cn(
                  'inline-flex items-baseline gap-0.5 px-2.5 py-0.5 rounded-full border text-xs font-extrabold shadow-2xs transition-colors',
                  val >= 15
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200/80'
                    : val >= 10
                    ? 'bg-amber-50 text-amber-700 border-amber-200/80'
                    : 'bg-rose-50 text-rose-700 border-rose-200/80'
                )}
              >
                <span>{val}</span>
                <span className="text-[10px] font-semibold opacity-60">/20</span>
              </div>
            </div>

            {/* Curseur de sélection */}
            <div className="pt-1.5 px-1">
              <Slider
                value={[val]}
                step={1}
                min={0}
                max={20}
                onValueChange={(values) => field.onChange(values[0])}
                aria-invalid={fieldState.invalid}
                className="w-full cursor-pointer"
              />
            </div>

            {fieldState.invalid && (
              <FieldError errors={[fieldState.error]} className="text-xs mt-1" />
            )}
          </Field>
        )
      }}
    />
  )
}

export default AnimSkillSliderField