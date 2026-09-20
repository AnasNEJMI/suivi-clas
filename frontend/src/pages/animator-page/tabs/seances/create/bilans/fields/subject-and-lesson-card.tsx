import { Controller, useFormContext, useWatch } from 'react-hook-form'
import type { CreateBilanFormValues } from '@/lib/schemas/create-bilan.schema'
import type { SubjectEntry } from '@/api/animator/types'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useMemo } from 'react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { BookCheckIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { CARD_STYLES, type Subject } from '@/lib/types/data.types'


export default function SubjectAndLessonCard({ availableSubjects }: { availableSubjects: SubjectEntry[] }) {
    const { control, setValue } = useFormContext<CreateBilanFormValues>()
    const presence = useWatch({ control, name: 'presence' })
    
    const subjectId = useWatch({ control, name: 'subjectId' })
    
    const availableLessons = useMemo(
        () => availableSubjects.find(s => s.id === subjectId)?.lessons ?? [],
        [availableSubjects, subjectId],
    )

    if (!presence) return null
    

    return (
        <Card className={cn("border-none shadow-card gap-0")}>
            <CardHeader>
                <CardTitle className="text-base flex items-center gap-1">
                    <BookCheckIcon/> Leçon abordée
                </CardTitle>
                <CardDescription>Choisir la matière et la leçon étudiées en priorité.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2 mt-2">
                <Controller
                    name='subjectId'
                    control={control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid} className='gap-2'>
                            <FieldLabel className='text-base'>Matière</FieldLabel>
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
                                        className='h-10 rounded-sm'
                                    >
                                        <span className='text-sm Capitalize'>{CARD_STYLES[subject.label as Subject].label}</span>
                                    </ToggleGroupItem>
                                ))}
                            </ToggleGroup>
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
                {
                    subjectId >= 1 &&
                    <Controller
                        name='lessonId'
                        control={control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <div className='flex justify-between gap-6'>
                                    <FieldLabel className='text-base'>Leçon</FieldLabel>
                                    <Select
                                        value={field.value > 0 ? field.value.toString() : ''}
                                        onValueChange={(v) => {
                                            field.onChange(parseInt(v))
                                            setValue('summary', '')
                                        }}
                                    >
                                        <SelectTrigger className='w-full max-w-48 md:max-w-72 truncate text-base h-10!'>
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
                }
            </CardContent>
        </Card>
    )
}