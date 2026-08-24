import { SkillFieldLabels, type SkillFieldType } from '@/api/animator/types'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Textarea } from '@/components/ui/textarea'
import type { SkillEvalFormValues } from '@/lib/schemas/skill-eval.schema'
import { CheckIcon, RocketIcon, XIcon } from 'lucide-react'
import { Controller, useFormContext } from 'react-hook-form'

const SkillCommentaryField = ({name} : {name : SkillFieldType}) => {
    const { control} = useFormContext<SkillEvalFormValues>()

  return (
    <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className='gap-2'>
                    <FieldLabel className='flex items-center justify-start'>
                        {SkillFieldLabels[name]}
                        {name === 'positive' && <CheckIcon className='text-lime-500'/>}
                        {name === 'negative' && <XIcon className='text-red-500'/>}
                        {name === 'improvements' && <RocketIcon className='text-indigo-500'/>}
                    </FieldLabel>
                    <Textarea
                        {...field}
                        placeholder='Résumé de la séance'
                        aria-invalid={fieldState.invalid}
                        autoComplete='off'
                        className='bg-white focus-visible:ring-lime-500/50 focus-visible:border-lime-200 border-zinc-200 text-base!'
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
            )}
        />
  )
}

export default SkillCommentaryField