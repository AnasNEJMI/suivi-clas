import { SkillFieldLabels, type SkillFieldType } from '@/api/animator/types'
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Slider } from '@/components/ui/slider';
import { useIsBigScreen } from '@/hooks/use-bigScreen';
import type { SkillEvalFormValues } from '@/lib/schemas/skill-eval.schema';
import { Controller, useFormContext } from 'react-hook-form';

const SkillSliderField = ({name} : {name : SkillFieldType}) => {
    const { control} = useFormContext<SkillEvalFormValues>()
    const isBigScreen = useIsBigScreen();
  return (
    <Controller
        name = {name}
        control={control}
        render = {({field, fieldState}) => (
        <Field data-invalid = {fieldState.invalid} className='flex-row lg:flex-col lg:w-min'>
            <FieldLabel ><span className='text-base lg:text-sm'>{SkillFieldLabels[name]}</span></FieldLabel>
            <Slider
                value={[field.value as number]}
                step={1}
                min={0}
                max={20}
                onValueChange={(values) => {field.onChange(values[0]);}}
                aria-invalid={fieldState.invalid}
                className="lg:h-40 lg:w-min"
                orientation={isBigScreen? 'horizontal': 'vertical'}
            />
            {fieldState.invalid && (
            <FieldError errors={[fieldState.error]} />
            )}
        </Field>
        )}
    >
    </Controller>
  )
}

export default SkillSliderField