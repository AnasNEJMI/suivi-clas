import { Field, FieldError} from '@/components/ui/field'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import type { CreateBilanFormValues } from '@/lib/schemas/create-bilan.schema'
import { Controller, useFormContext, useWatch } from 'react-hook-form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import {MessageCircleQuestionIcon } from 'lucide-react'

const IncludeQcmField = () => {
    const { control } = useFormContext<CreateBilanFormValues>()
    const lessonId    = useWatch({ control, name: 'lessonId' })
    
    if (lessonId < 1) return null
  return (
    <Card className={cn("border-none shadow-card gap-0")}>
        <CardHeader className='gap-0'>
            <CardTitle className="text-base flex items-center gap-1">
                <MessageCircleQuestionIcon/> QCM
            </CardTitle>
            <CardDescription className='text-sm'>Voulez vous généré automatiquement un qcm pour l'élève autours de la leçon abordée?</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2 mt-2">
            <Controller
                name='includeQcm'
                control={control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <div className='flex flex-col justify-between gap-6'>
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
        </CardContent>
    </Card>
  )
}

export default IncludeQcmField