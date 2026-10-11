import type { SeanceDurationEntry } from "@/api/animator/seances.types"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { SeanceFormValues } from "@/lib/schemas/animator/seances/seance.schema"
import { CheckIcon } from "lucide-react"
import { Controller, useFormContext, useWatch } from "react-hook-form"

const SeanceDurationField = ({seanceDurations} : {seanceDurations : SeanceDurationEntry[]}) => {
    const {control} = useFormContext<SeanceFormValues>()
    const seanceDurationId = useWatch({ control, name: 'seanceDurationId' })

    return (
    <Controller
        name='seanceDurationId'
        control={control}
        render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
                <div className='flex justify-between gap-6'>
                    <FieldLabel className="text-base font-bold text-nowrap tracking-tight">Durée de séance {seanceDurationId >=1 && <CheckIcon className='text-lime-500 size-4'/>}</FieldLabel>
                    <Select
                        value={field.value > 0 ? field.value.toString() : ''}
                        onValueChange={(v) => {
                            field.onChange(parseInt(v))
                        }}
                    >
                        <SelectTrigger className='w-42 truncate text-base h-10!'>
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