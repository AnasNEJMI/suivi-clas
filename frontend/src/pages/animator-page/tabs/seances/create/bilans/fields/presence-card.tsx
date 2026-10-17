import { AUTO_SUMMARY_FIELDS } from '@/api/animator/auto-summary-options'
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
    const labels = student.gender === 'f'
        ? (['présente', 'absente'] as const)
        : (['présent', 'absent'] as const)
    
    function resetDependentFields() {
        setValue('subjectId',  -1)
        setValue('lessonId',   -1)
        setValue('summary',    '')
        setValue('includeQcm', false)
        AUTO_SUMMARY_FIELDS.forEach(name => setValue(name, undefined))
    }
  return (
    <Card className={cn("border-none shadow-card gap-0 font-outfit relative rounded-2xl rounded-tr-none")}>
        <div className='absolute -top-6 right-0 h-6 px-3 text-xs font-bold rounded-t-md bg-indigo-600 text-white flex items-center justify-center uppercase'>ÉTAPE 1</div>
        <CardHeader className='gap-0 space-y-0.5'>
            <CardTitle className="text-base font-bold flex items-center gap-1 text-indigo-600">
                <BookCheckIcon/>Présence
            </CardTitle>
            <CardDescription className='text-xs mt-1'>Choisir si l'élève était présent ou pas lors de cette séance.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2 mt-4">
            <Controller
                name='presence'
                control={control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <div className='flex justify-between gap-6'>
                            <ToggleGroup
                                type='single'
                                value={field.value ? labels[0] : labels[1]}
                                onValueChange={(v) => {
                                    if (!v) return
                                    field.onChange(v === labels[0])
                                    resetDependentFields()
                                }}
                                variant='outline'
                                className='w-full md:max-w-xs justify-end gap-2'
                            >
                                {labels.map(p => (
                                    <ToggleGroupItem
                                        key={p}
                                        value={p}
                                        className='flex-1 h-10 rounded-md capitalize text-sm font-semibold'
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

export default PresenceCard