import type { SeanceDurationEntry } from "@/api/animator/seances.types"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { SeanceFormValues } from "@/lib/schemas/animator/seances/seance.schema"
import { Controller, useFormContext } from "react-hook-form"

const SeanceDurationField = ({seanceDurations} : {seanceDurations : SeanceDurationEntry[]}) => {
    const {control} = useFormContext<SeanceFormValues>()
    return (
    <Controller
        name='seanceDurationId'
        control={control}
        render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
                <div className='flex justify-between gap-6'>
                    <FieldLabel className="text-base text-nowrap tracking-tight">Durée de séance</FieldLabel>
                    <Select
                        value={field.value > 0 ? field.value.toString() : ''}
                        onValueChange={(v) => {
                            field.onChange(parseInt(v))
                        }}
                    >
                        <SelectTrigger className='w-full max-w-full md:max-w-72 truncate text-base h-10!'>
                            <SelectValue placeholder='Choisir une durée' />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {seanceDurations.map(seanceDuration => (
                                    <SelectItem key={seanceDuration.id} value={seanceDuration.id.toString()} className='text-base'>
                                        {seanceDuration.label}
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
  )
}

export default SeanceDurationField