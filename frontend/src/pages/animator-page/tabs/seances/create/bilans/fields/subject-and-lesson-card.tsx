import { Controller, useFormContext, useWatch } from 'react-hook-form'
import type { CreateBilanFormValues } from '@/lib/schemas/create-bilan.schema'
import type { SubjectEntry } from '@/api/animator/types'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useMemo } from 'react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { BookCheckIcon, CheckIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { CARD_STYLES, type Subject } from '@/lib/types/data.types'

export default function SubjectAndLessonCard({ availableSubjects }: { availableSubjects: SubjectEntry[] }) {
  const { control, setValue } = useFormContext<CreateBilanFormValues>()
  const presence = useWatch({ control, name: 'presence' })
  const subjectId = useWatch({ control, name: 'subjectId' })
  const lessonId = useWatch({ control, name: 'lessonId' })

  const availableLessons = useMemo(
    () => availableSubjects.find((subject) => subject.id === subjectId)?.lessons ?? [],
    [availableSubjects, subjectId],
  )

  if (!presence) return null

  function clearLessonDependentFields() {
    setValue('lessonId', -1)
    setValue('curriculumSkillIds', [])
    setValue('summary', '')
  }

  return (
    <Card className={cn('border-none shadow-card gap-0 rounded-2xl rounded-tr-none relative mt-8')}>
      <div className="absolute -top-6 right-0 h-6 px-3 text-xs font-bold rounded-t-md bg-indigo-600 text-white flex items-center justify-center uppercase">
        ÉTAPE 2
      </div>
      <CardHeader className="space-y-0.5">
        <CardTitle className="text-base flex items-center gap-1 font-bold text-indigo-600">
          <BookCheckIcon /> Leçon abordée
        </CardTitle>
        <CardDescription className="text-xs">Choisir la matière et la leçon étudiées en priorité.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 mt-6">
        <Controller
          name="subjectId"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-2">
              <FieldLabel className="text-base font-medium">
                Matière {subjectId >= 1 && <CheckIcon className="text-lime-500 size-4" />}
              </FieldLabel>
              <ToggleGroup
                type="single"
                value={field.value > 0 ? field.value.toString() : ''}
                onValueChange={(value) => {
                  field.onChange(value ? Number.parseInt(value, 10) : -1)
                  clearLessonDependentFields()
                }}
                variant="outline"
                className="items-center flex-wrap gap-2"
              >
                {availableSubjects.map((subject) => (
                  <ToggleGroupItem key={subject.id} value={subject.id.toString()} className="h-10 rounded-sm">
                    <span className="text-sm Capitalize">{CARD_STYLES[subject.label as Subject].label}</span>
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {subjectId >= 1 && (
          <Controller
            name="lessonId"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <div className="flex justify-between gap-6 mt-4">
                  <FieldLabel className="text-base font-medium">
                    Leçon {lessonId >= 1 && <CheckIcon className="text-lime-500 size-4" />}
                  </FieldLabel>
                  <Select
                    value={field.value > 0 ? field.value.toString() : ''}
                    onValueChange={(value) => {
                      field.onChange(Number.parseInt(value, 10))
                      setValue('curriculumSkillIds', [], { shouldDirty: true, shouldValidate: true })
                      setValue('summary', '', { shouldDirty: true, shouldValidate: true })
                    }}
                  >
                    <SelectTrigger className="w-full max-w-48 md:max-w-72 truncate text-sm font-medium h-10!">
                      <SelectValue placeholder="Choisir une leçon" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {availableLessons.map((lesson) => (
                          <SelectItem key={lesson.id} value={lesson.id.toString()} className="text-base">
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
        )}
      </CardContent>
    </Card>
  )
}
