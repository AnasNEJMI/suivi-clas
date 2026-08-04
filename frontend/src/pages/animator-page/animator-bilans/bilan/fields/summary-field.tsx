import { Controller, useFormContext, useWatch } from 'react-hook-form'
import type { BilanFormValues }                 from '@/lib/schemas/bilans-bilan.schema'
import { Field, FieldError, FieldLabel }        from '@/components/ui/field'
import { Textarea }                             from '@/components/ui/textarea'

// SummaryField subscribes only to `lessonId`.
// It only appears once the animator has selected a lesson.
// When presence becomes false, PresenceField resets lessonId → this unmounts.
// When subject changes, LessonField resets lessonId → this unmounts.
// The cascade is entirely implicit — no prop drilling of disabled/visible state needed.
export default function SummaryField() {
    const { control } = useFormContext<BilanFormValues>()
    const lessonId    = useWatch({ control, name: 'lessonId' })

    if (lessonId < 1) return null

    return (
        <Controller
            name='summary'
            control={control}
            render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Bilan</FieldLabel>
                    {/* Using Controller (not register) because Textarea may be a
                        custom component that doesn't forward refs correctly.
                        If it's a plain <textarea>, {...field} with register works too. */}
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