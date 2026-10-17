import { Controller, useFormContext, useWatch } from 'react-hook-form'
import type { CreateBilanFormValues } from '@/lib/schemas/create-bilan.schema'
import { Field, FieldError }  from '@/components/ui/field'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { BookCheckIcon, CheckIcon } from 'lucide-react'
import { StepBadge } from './step-badge'

export default function SummaryCard({step} : {step : number}) {
    const { control } = useFormContext<CreateBilanFormValues>()
    const lessonId    = useWatch({ control, name: 'lessonId' })
    const summary    = useWatch({ control, name: 'summary' })

    if (lessonId < 1) return null

    return (
        <Card className={cn("border-none shadow-card gap-0 relative rounded-2xl rounded-tr-none mt-8")}>
            <StepBadge step={step}/>
            <CardHeader className='gap-0'>
                <CardTitle className="text-base font-bold text-indigo-600 flex items-center gap-1">
                    <BookCheckIcon/> Bilan {summary.length >= 1 && <CheckIcon className='text-lime-500 size-4'/>}
                </CardTitle>
                <CardDescription className='text-sm'>Résumé de la séance</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2 mt-2">
                <Controller
                    name='summary'
                    control={control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
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
            </CardContent>
    </Card>
    )
}