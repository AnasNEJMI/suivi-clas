import { Controller, useFormContext, useWatch } from 'react-hook-form'
import { Field, FieldError, FieldLabel }        from '@/components/ui/field'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import type { LessonEvalFormValues } from '@/lib/schemas/lesson-eval.schema'
import { LESSON_EVALS, LessonEvalLabels } from '@/api/animator/types'


export default function EvaluationField() {
    const { control } = useFormContext<LessonEvalFormValues>()
    const lessonId = useWatch({ control, name: 'lessonId' })
    if(lessonId < 1) return null;
    return (
        <Controller
            name='evaluation'
            control={control}
            render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                    <div className='flex justify-between gap-6'>
                        <FieldLabel>Évaluation</FieldLabel>
                        <Select
                            value={field.value}
                            onValueChange={(v) => {
                                field.onChange(v)
                            }}
                        >
                            <SelectTrigger className='w-full md:max-w-xs text-base h-10!'>
                                <SelectValue placeholder='Choisir une leçon' />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {LESSON_EVALS.map((lessonEval, index) => (
                                        <SelectItem key={index} value={lessonEval} className='text-base'>
                                            {LessonEvalLabels[lessonEval]}
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
    )
}