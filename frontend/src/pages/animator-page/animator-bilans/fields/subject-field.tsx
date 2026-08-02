import { Controller, useFormContext, useWatch } from 'react-hook-form'
import type { BilanFormValues }                 from '@/lib/schemas/bilans-bilan.schema'
import type { SubjectEntry }                    from '@/api/animator/types'
import { Field, FieldError, FieldLabel }        from '@/components/ui/field'
import { ToggleGroup, ToggleGroupItem }         from '@/components/ui/toggle-group'


export default function SubjectField({ availableSubjects }: { availableSubjects: SubjectEntry[] }) {
    const { control, setValue } = useFormContext<BilanFormValues>()
    const presence = useWatch({ control, name: 'presence' })

    if (!presence) return null

    return (
        <Controller
            name='subjectId'
            control={control}
            render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Matière</FieldLabel>
                    <ToggleGroup
                        type='single'
                        value={field.value > 0 ? field.value.toString() : ''}
                        onValueChange={(v) => {
                            field.onChange(v ? parseInt(v) : -1)
                            setValue('lessonId', -1)
                            setValue('summary',  '')
                        }}
                        variant='outline'
                        className='items-center flex-wrap gap-2'
                    >
                        {availableSubjects.map(subject => (
                            <ToggleGroupItem
                                key={subject.id}
                                value={subject.id.toString()}
                                className='h-10 rounded-xl'
                            >
                                <span className='text-sm uppercase'>{subject.label}</span>
                            </ToggleGroupItem>
                        ))}
                    </ToggleGroup>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
            )}
        />
    )
}