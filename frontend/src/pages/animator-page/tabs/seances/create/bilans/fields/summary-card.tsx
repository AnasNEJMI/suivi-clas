import { Controller, useFormContext, useWatch } from 'react-hook-form'
import type { CreateBilanFormValues } from '@/lib/schemas/create-bilan.schema'
import { Field, FieldError }  from '@/components/ui/field'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { BookCheckIcon } from 'lucide-react'

export default function SummaryCard() {
    const { control } = useFormContext<CreateBilanFormValues>()
    const lessonId    = useWatch({ control, name: 'lessonId' })

    if (lessonId < 1) return null

    return (
        <Card className={cn("border-none shadow-card gap-0")}>
            <CardHeader className='gap-0'>
                <CardTitle className="text-base flex items-center gap-1">
                    <BookCheckIcon/> Bilan
                </CardTitle>
                <CardDescription className='text-sm'>Résumé de la séance.</CardDescription>
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