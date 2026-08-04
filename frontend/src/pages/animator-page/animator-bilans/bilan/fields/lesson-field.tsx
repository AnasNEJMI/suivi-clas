import { useMemo }                              from 'react'
import { Controller, useFormContext, useWatch } from 'react-hook-form'
import type { BilanFormValues }                 from '@/lib/schemas/bilans-bilan.schema'
import type { SubjectEntry }                    from '@/api/animator/types'
import { Field, FieldError, FieldLabel }        from '@/components/ui/field'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function LessonField({ availableSubjects }: { availableSubjects: SubjectEntry[] }) {
    const { control, setValue } = useFormContext<BilanFormValues>()
    const subjectId = useWatch({ control, name: 'subjectId' })

    const availableLessons = useMemo(
        () => availableSubjects.find(s => s.id === subjectId)?.lessons ?? [],
        [availableSubjects, subjectId],
    )

    if (subjectId < 1) return null

    return (
        <Controller
            name='lessonId'
            control={control}
            render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                    <div className='flex justify-between gap-6'>
                        <FieldLabel>Leçon</FieldLabel>
                        <Select
                            value={field.value > 0 ? field.value.toString() : ''}
                            onValueChange={(v) => {
                                field.onChange(parseInt(v))
                                setValue('summary', '')
                            }}
                        >
                            <SelectTrigger className='w-full md:max-w-xs text-base h-10!'>
                                <SelectValue placeholder='Choisir une leçon' />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {availableLessons.map(lesson => (
                                        <SelectItem key={lesson.id} value={lesson.id.toString()} className='text-base'>
                                            {lesson.label}
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