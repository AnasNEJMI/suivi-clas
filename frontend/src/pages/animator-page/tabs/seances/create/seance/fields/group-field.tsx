import type { ClassEntry } from "@/api/animator/types"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import type {SeanceFormValues } from "@/lib/schemas/animator/seances/seance.schema"
import { CheckIcon } from "lucide-react"
import { Controller, useFormContext, useWatch } from "react-hook-form"


const GroupField = ({
    classes} : {classes : ClassEntry[]}) => {
    const {control} = useFormContext<SeanceFormValues>()
    const classId = useWatch({ control, name: 'classId' })

  return (
    <Controller
        name = 'classId'
        control={control}
        render = {({field, fieldState}) => (
        <Field data-invalid = {fieldState.invalid} className='gap-2'>
            <FieldLabel className="text-base font-bold">Classe {classId >=1 && <CheckIcon className='text-lime-500 size-4'/>}</FieldLabel>
            <ToggleGroup
            type="single"
            value={field.value > 0 ? field.value.toString() : ''}
            onValueChange={(v) => field.onChange(v ? parseInt(v) : -1)}
            aria-invalid={fieldState.invalid}
            variant="outline"
            spacing={1}
            className='w-full items-center justify-start flex-wrap mt-2 gap-2'
            >
            {
                classes.map((studentClass) => (
                <ToggleGroupItem
                    key={studentClass.id}  
                    value={studentClass.id.toString()}
                    aria-label={`${studentClass.label}`}
                    className='h-14'
                >
                    <div className='flex flex-col items-center justify-center px-4 gap-2'>
                    <span className="text-sm font-bold leading-none">{studentClass.label}</span>
                    <span className="text-xs font-light leading-none">{studentClass.association.label}</span>
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
  )
}

export default GroupField