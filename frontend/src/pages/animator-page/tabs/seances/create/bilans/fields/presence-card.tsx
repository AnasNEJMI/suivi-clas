import type { StudentEntry } from '@/api/animator/seances.types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldError} from '@/components/ui/field'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import type { CreateBilanFormValues } from '@/lib/schemas/create-bilan.schema'
import { cn } from '@/lib/utils'
import { BookCheckIcon } from 'lucide-react'
import { Controller, useFormContext } from 'react-hook-form'

const PresenceCard = ({student} : {    student : StudentEntry}) => {
    const { control, setValue } = useFormContext<CreateBilanFormValues>();
  return (
    <Card className={cn("border-none shadow-card gap-0")}>
        <CardHeader className='gap-0'>
            <CardTitle className="text-base flex items-center gap-1">
                <BookCheckIcon/> Présence
            </CardTitle>
            <CardDescription className='text-sm'>Choisir si l'élève était présent ou pas lors de cette séance.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2 mt-2">
            <Controller
                name='presence'
                control={control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <div className='flex justify-between gap-6'>
                            {/* <FieldLabel className='text-base'>Présence</FieldLabel> */}
                            {
                                student.gender === 'm' &&
                                <ToggleGroup
                                    type='single'
                                    value={field.value ? 'présent' : 'absent'}
                                    onValueChange={(v) => {
                                        if (!v) return
                                        field.onChange(v === 'présent')
                                        setValue('subjectId', -1)
                                        setValue('lessonId',  -1)
                                        setValue('summary',   '')
                                        setValue('includeQcm',   false);
                                    }}
                                    variant='outline'
                                    className='w-full md:max-w-xs justify-end gap-2'
                                >
                                    {(['présent', 'absent'] as const).map(p => (
                                        <ToggleGroupItem
                                            key={p}
                                            value={p}
                                            className='flex-1 h-10 rounded-md capitalize'
                                        >
                                            {p}
                                        </ToggleGroupItem>
                                    ))}
                                </ToggleGroup>
                            }
                            {
                                student.gender === 'f' &&
                                <ToggleGroup
                                    type='single'
                                    value={field.value ? 'présente' : 'absente'}
                                    onValueChange={(v) => {
                                        if (!v) return
                                        field.onChange(v === 'présente')
                                        setValue('subjectId', -1)
                                        setValue('lessonId',  -1)
                                        setValue('summary',   '')
                                        setValue('includeQcm',   false);
                                    }}
                                    variant='outline'
                                    className='w-full md:max-w-xs justify-end gap-2'
                                >
                                    {(['présente', 'absente'] as const).map(p => (
                                        <ToggleGroupItem
                                            key={p}
                                            value={p}
                                            className='flex-1 h-10 rounded-md capitalize'
                                        >
                                            {p}
                                        </ToggleGroupItem>
                                    ))}
                                </ToggleGroup>
                            }
                        </div>
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )}
            />
        </CardContent>
    </Card>
  )
}

export default PresenceCard