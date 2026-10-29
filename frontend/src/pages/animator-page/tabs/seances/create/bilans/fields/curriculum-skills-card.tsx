import { useMemo } from 'react'
import { Controller, useFormContext, useWatch } from 'react-hook-form'
import { BookOpenCheck, CheckCheck } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Field, FieldError } from '@/components/ui/field'
import { cn } from '@/lib/utils'
import type { CurriculumSkillEntry } from '@/api/animator/types'
import type { CreateBilanFormValues } from '@/lib/schemas/create-bilan.schema'

export default function CurriculumSkillsCard({ skills }: { skills: CurriculumSkillEntry[] }) {
  const { control, setValue } = useFormContext<CreateBilanFormValues>()
  const presence = useWatch({ control, name: 'presence' })
  const lessonId = useWatch({ control, name: 'lessonId' })
  const selectedIds = useWatch({ control, name: 'curriculumSkillIds' }) ?? []
  const selectedSet = useMemo(() => new Set(selectedIds), [selectedIds])

  if (!presence || lessonId < 1) return null

  function toggleSkill(skillId: number, checked: boolean) {
    const next = checked
      ? [...new Set([...(selectedIds ?? []), skillId])]
      : (selectedIds ?? []).filter((id) => id !== skillId)

    setValue('curriculumSkillIds', next, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    })
  }

  function selectAll() {
    setValue('curriculumSkillIds', skills.map((skill) => skill.id), {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    })
  }

  function clearAll() {
    setValue('curriculumSkillIds', [], {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    })
  }

  return (
    <Card className={cn('border-none shadow-card gap-0 rounded-2xl rounded-tr-none relative mt-8')}>
      <div className="absolute -top-6 right-0 h-6 px-3 text-xs font-bold rounded-t-md bg-indigo-600 text-white flex items-center justify-center uppercase">
        ÉTAPE 3
      </div>
      <CardHeader className="space-y-0.5">
        <CardTitle className="text-base flex items-center gap-1 font-bold text-indigo-600">
          <BookOpenCheck /> Compétences étudiées
        </CardTitle>
        <CardDescription className="text-xs">
          Facultatif : sélectionnez les compétences réellement travaillées pendant cette séance. Vous pouvez n’en choisir aucune ou en sélectionner plusieurs.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 mt-4">
        {skills.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Aucune compétence n’est renseignée pour cette leçon.
          </p>
        ) : (
          <>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs text-muted-foreground">
                {selectedIds.length} compétence{selectedIds.length === 1 ? '' : 's'} sélectionnée{selectedIds.length === 1 ? '' : 's'} sur {skills.length}
              </p>
              <div className="flex gap-2">
                <button type="button" onClick={selectAll} className="text-xs underline underline-offset-4" disabled={selectedIds.length === skills.length}>
                  Tout sélectionner
                </button>
                <button type="button" onClick={clearAll} className="text-xs underline underline-offset-4" disabled={selectedIds.length === 0}>
                  Tout désélectionner
                </button>
              </div>
            </div>
            <Controller
              name="curriculumSkillIds"
              control={control}
              render={({ fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-3">
                  <div className="grid gap-2">
                    {skills.map((skill) => {
                      const checked = selectedSet.has(skill.id)
                      const checkboxId = `curriculum-skill-${skill.id}`
                      return (
                        <div key={skill.id} className="flex items-start gap-3 rounded-xl border p-3">
                          <Checkbox
                            id={checkboxId}
                            checked={checked}
                            onCheckedChange={(value) => toggleSkill(skill.id, value === true)}
                            className="mt-1"
                          />
                          <label htmlFor={checkboxId} className="min-w-0 flex-1 cursor-pointer">
                            <span className="flex items-center gap-2 text-sm font-medium">
                              {skill.label}
                              {checked && <CheckCheck aria-label="Sélectionnée" className="size-4 text-lime-600" />}
                            </span>
                            <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
                              {skill.description}
                            </span>
                          </label>
                        </div>
                      )
                    })}
                  </div>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </>
        )}
      </CardContent>
    </Card>
  )
}
