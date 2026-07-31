import type { ScolarYearEntry } from '@/api/animator/types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { cn } from '@/lib/utils'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type z from 'zod'
import { submitSeanceSchema } from '@/lib/schemas/submitSeance.schema'
import { useState } from 'react'
import SuccessToast from './toasts/success-toast'
import { animatorApiCalls } from '@/api/animator/apiCalls'
import { Field, FieldError, FieldGroup, FieldLabel } from './ui/field'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Button } from './ui/button'
import { ChevronDownIcon } from 'lucide-react'
import { format } from 'date-fns'
import { Calendar } from './ui/calendar'
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group'

interface AnimatorBilanFormProps {
    scolarYear : ScolarYearEntry,
    className? : string,
}
const AnimatorBilanForm = ({className, scolarYear} : AnimatorBilanFormProps) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const seanceForm = useForm<z.infer<typeof submitSeanceSchema>>({
        resolver : zodResolver(submitSeanceSchema),
        defaultValues : {
        date : new Date(),
        animatorId : -1,
        classId : -1,
        scolarYearId : -1,
        }
    })

    async function onSubmitSeance(data : z.infer<typeof submitSeanceSchema>){
      setIsSubmitting(true);
      try{
        const submitSeanceResponse = await animatorApiCalls.submitSeance({
            date : data.date,
            animatorId : data.animatorId,
            classId : data.classId,
            scolarYearId : data.scolarYearId,
        });

        console.log('seance submitted successfully : ', JSON.stringify(submitSeanceResponse, null));
        SuccessToast({
          message : 'Séance soumise avec succès !',
        })
      }catch(error){
        console.error(error);
      }finally{
        setIsSubmitting(false);
      }
    }

    function updateSeanceFormValue<T extends number | Date>(
      label : "date" | "animatorId" | "classId" | "scolarYearId",
      value : T,
      isInvalid : () => boolean = () => !value){

        console.log(`${label} : `, value);
        if(isInvalid()) return;
        seanceForm.setValue(label, value);
        console.log('form updated : ', seanceForm.getValues())
    }

    const updateDate = (value : Date) => updateSeanceFormValue<Date>('date', value);
    const updateClassId = (value : string) => updateSeanceFormValue<number>('classId', parseInt(value));
    return (
    <Card className={cn(className, 'font-outfit')}>
        <CardHeader>
            <CardTitle>Ajouter une séance</CardTitle>
            <CardDescription>
                Sumettre les données de la séance en respectant l'ordre établi des champs à compléter.
            </CardDescription>
            <CardContent className="mt-2">
                <form id = 'form-add-seance' onSubmit={seanceForm.handleSubmit(onSubmitSeance)}>
                    <FieldGroup>
                        <Controller
                            name = 'date'
                            control={seanceForm.control}
                            render = {({field, fieldState}) => (
                            <Field data-invalid = {fieldState.invalid}>
                                <div className='flex justify-between gap-6'>
                                <FieldLabel htmlFor="form-submit-seance-date">Date</FieldLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                    <Button
                                        size='lg'
                                        variant="outline"
                                        data-empty={!field.value}
                                        className="flex-1 md:w-full md:max-w-xs data-[empty=true]:text-muted-foreground justify-between text-left font-normal text-base"
                                    >
                                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                        <ChevronDownIcon />
                                    </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        id="form-submit-seance-date"
                                        mode="single"
                                        selected={field.value}
                                        onSelect={updateDate}
                                        className="rounded-lg border"
                                        disabled = {isSubmitting}
                                        aria-invalid={fieldState.invalid}
                                        required
                                    />
                                    </PopoverContent>
                                </Popover>
                                </div>
                                {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                            )}
                        >
                        </Controller>
                        <Controller
                            name = 'classId'
                            control={seanceForm.control}
                            render = {({field, fieldState}) => (
                            <Field data-invalid = {fieldState.invalid}>
                                <FieldLabel htmlFor="form-submit-seance-class">Classe</FieldLabel>
                                <ToggleGroup
                                type="single"
                                value={field.value.toString()}
                                onValueChange={updateClassId}
                                id="form-submit-seance-class"
                                aria-invalid={fieldState.invalid}
                                variant="outline"
                                spacing={1}
                                className='w-full items-center justify-start flex-wrap'
                                >
                                {
                                    scolarYear.classes.map((studentClass, index) => (
                                    <ToggleGroupItem
                                        key={index}  
                                        value={studentClass.id.toString()}
                                        aria-label={`${studentClass.label}`}
                                        className="flex h-16 px-6 flex-col items-center justify-center rounded-lg"
                                    >
                                        <div className='flex items-center justify-center flex-col gap-1'>
                                            <span className="text-base leading-none">{studentClass.label}</span>
                                            <span className=''>{studentClass.association.label}</span>
                                        </div>
                                    </ToggleGroupItem>
                                    ))
                                }
                                </ToggleGroup>
                                {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                            )}
                        >
                        </Controller>
                    </FieldGroup>
                </form>
            </CardContent>
        </CardHeader>
    </Card>
  )
}

export default AnimatorBilanForm