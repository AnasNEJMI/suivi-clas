import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import type { BilanFormValues } from '@/lib/schemas/bilans-bilan.schema'
import { Controller, useFormContext } from 'react-hook-form'

const PresenceField = () => {
    const { control, setValue } = useFormContext<BilanFormValues>()
  return (
    <Controller
        name='presence'
        control={control}
        render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
                <div className='flex justify-between gap-6'>
                    <FieldLabel>Présence</FieldLabel>
                    <ToggleGroup
                        type='single'
                        value={field.value ? 'présent' : 'absent'}
                        onValueChange={(v) => {
                            if (!v) return
                            field.onChange(v === 'présent')
                            setValue('subjectId', -1)
                            setValue('lessonId',  -1)
                            setValue('summary',   '')
                        }}
                        variant='outline'
                        className='w-full md:max-w-xs justify-end gap-4'
                    >
                        {(['présent', 'absent'] as const).map(p => (
                            <ToggleGroupItem
                                key={p}
                                value={p}
                                className='flex-1 h-10 rounded-xl capitalize'
                            >
                                {p}
                            </ToggleGroupItem>
                        ))}
                    </ToggleGroup>
                </div>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
        )}
    />
  )
}

export default PresenceField