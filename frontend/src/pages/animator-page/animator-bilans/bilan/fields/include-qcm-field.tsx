import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import type { BilanFormValues } from '@/lib/schemas/bilans-bilan.schema'
import { Controller, useFormContext, useWatch } from 'react-hook-form'

const IncludeQcmField = () => {
    const { control } = useFormContext<BilanFormValues>()
    const summary    = useWatch({ control, name: 'summary' })
    
    if (summary.length === 0) return null
  return (
    <Controller
        name='includeQcm'
        control={control}
        render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
                <div className='flex justify-between gap-6'>
                    <FieldLabel>Générer un QCM</FieldLabel>
                    <ToggleGroup
                        type='single'
                        value={field.value ? 'oui' : 'non'}
                        onValueChange={(v) => {
                            if (!v) return
                            field.onChange(v === 'oui')
                        }}
                        variant='outline'
                        className='w-full md:max-w-xs justify-end gap-4'
                    >
                        {(['oui', 'non'] as const).map(p => (
                            <ToggleGroupItem
                                key={p}
                                value={p}
                                className='flex-1 h-10 rounded-md capitalize'
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

export default IncludeQcmField