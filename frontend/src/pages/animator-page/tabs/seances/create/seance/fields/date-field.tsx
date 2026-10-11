import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import type {SeanceFormValues } from "@/lib/schemas/animator/seances/seance.schema"
import { format, isValid } from "date-fns"
import { fr } from "date-fns/locale"
import { CheckIcon, ChevronDownIcon } from "lucide-react"
import { Controller, useFormContext, useWatch } from "react-hook-form"

const DateField = () => {
    const {control} = useFormContext<SeanceFormValues>()
    const date = useWatch({ control, name: 'date' })
  return (
    <Controller
        name = 'date'
        control={control}
        render = {({field, fieldState}) => (
        <Field data-invalid = {fieldState.invalid}>
            <div className='flex justify-between gap-6'>
            <FieldLabel className="text-base font-bold text-nowrap">Date de séance {date && <CheckIcon className='text-lime-500 size-4'/>}</FieldLabel>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        size='lg'
                        variant="outline"
                        className="w-42 data-[empty=true]:text-muted-foreground justify-between text-left font-medium text-sm capitalize"
                    >
                        {field.value  && isValid(field.value) ? <span className='truncate'>{format(field.value, "PPP", {locale : fr})}</span> : <span>Choisir une date</span>}
                        <ChevronDownIcon />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    locale={fr}
                    mode="single"
                    selected={field.value}
                    onSelect={(date) => {
                        if (!date) {
                        field.onChange(new Date());
                        return;
                        }
                        const normalizedDate = new Date(date);
                        normalizedDate.setHours(12, 0, 0, 0);
                        field.onChange(normalizedDate);
                    }}
                    className="rounded-lg border"
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
  )
}

export default DateField