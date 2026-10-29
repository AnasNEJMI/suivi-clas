import { animatorApiCalls } from '@/api/animator/apiCalls'
import type { LessonsByLevelEntry } from '@/api/animator/types'
import { Field } from '@/components/ui/field'
import { createBilanFormSchema, type CreateBilanFormValues } from '@/lib/schemas/create-bilan.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { FormProvider, useForm, useWatch } from 'react-hook-form'
import { toast } from 'sonner'
import PresenceCard from './fields/presence-card'
import SubjectAndLessonCard from './fields/subject-and-lesson-card'
import CurriculumSkillsCard from './fields/curriculum-skills-card'
import SummaryCard from './fields/summary-card'
import IncludeQcmField from './fields/include-qcm-field'
import { BrandButton } from '@/components/brand-button'
import type { BilanEntry, StudentEntry } from '@/api/animator/seances.types'
import { useMemo } from 'react'
import AutoSummaryCard from './fields/auto-summary-fields'

interface AnimBilanFormProps {
  studentBilan: StudentEntry
  seanceDate: Date
  seanceId: number
  animatorId: number
  lessonsByLevel: LessonsByLevelEntry[]
  canAutoSummary?: boolean
  onBilanSubmitted: (bilan: BilanEntry) => void
}

const AnimCreateBilanForm = ({
  studentBilan,
  seanceDate,
  seanceId,
  animatorId,
  lessonsByLevel,
  onBilanSubmitted,
  canAutoSummary = false,
}: AnimBilanFormProps) => {
  const availableSubjects = useMemo(
    () => lessonsByLevel.find((l) => l.id === studentBilan.level.id)?.subjects ?? [],
    [lessonsByLevel, studentBilan.level.id],
  )

  const methods = useForm<CreateBilanFormValues>({
    resolver: zodResolver(createBilanFormSchema),
    defaultValues: {
      presence: studentBilan.bilan?.presence ?? false,
      subjectId: studentBilan.bilan?.lesson?.subject.id ?? -1,
      lessonId: studentBilan.bilan?.lesson?.id ?? -1,
      summary: studentBilan.bilan?.summary ?? '',
      includeQcm: false,
      curriculumSkillIds: [],
    },
  })

  const presence = useWatch({ control: methods.control, name: 'presence' })
  const selectedSubjectId = useWatch({ control: methods.control, name: 'subjectId' })
  const selectedLessonId = useWatch({ control: methods.control, name: 'lessonId' })

  const selectedLesson = useMemo(() => {
    const selectedSubject = availableSubjects.find((subject) => subject.id === selectedSubjectId)
    return selectedSubject?.lessons.find((lesson) => lesson.id === selectedLessonId)
  }, [availableSubjects, selectedSubjectId, selectedLessonId])

  const submitMutation = useMutation({
    mutationFn: (data: CreateBilanFormValues) =>
      animatorApiCalls.submitBilan({
        animatorId,
        seanceId,
        studentId: studentBilan.id,
        date: seanceDate,
        presence: data.presence,
        ...(data.presence && {
          lessonId: data.lessonId,
          summary: data.summary,
          includeQcm: data.includeQcm,
          curriculumSkillIds: data.curriculumSkillIds ?? [],
        }),
      }),
    onSuccess: (bilan) => {
      if (!bilan) {
        toast.error('Erreur lors de la soumission du bilan.')
        return
      }
      onBilanSubmitted(bilan)
      toast.success(`Bilan de ${studentBilan.firstName} soumis !`)
      console.log('bilan soumis : ', bilan)
    },
    onError: () => toast.error('Erreur lors de la soumission du bilan.'),
  })

  const generateMutation = useMutation({
    mutationFn: animatorApiCalls.generateBilanSummary,
    onSuccess: (res) => {
      if (!res?.paragraphs?.length) {
        toast.error(`Erreur lors de la génération du résumé. res : ${res}`)
        return
      }
      methods.setValue('summary', res.paragraphs.join('\n\n'), {
        shouldDirty: true,
        shouldValidate: true,
      })
      toast.success('Résumé généré — relisez-le avant de soumettre.')
    },
    onError: (err) => toast.error(`Erreur lors de la génération du résumé. error : ${err}`),
  })

  function handleGenerate() {
    const {
      lessonId,
      summary,
      activity,
      engagement,
      comprehension,
      methodologySkill,
      methodologyTrend,
      nextStep,
    } = methods.getValues()

    if (!activity || !engagement || !methodologySkill || !comprehension || !methodologyTrend || !nextStep || lessonId < 1) return
    if (summary?.trim() && !window.confirm('Remplacer le résumé actuel ?')) return

    generateMutation.mutate({
      studentId: studentBilan.id,
      lessonId,
      activity,
      engagement,
      comprehension,
      methodologySkill,
      methodologyTrend,
      nextStep,
    })
  }

  // The skills card is step 3, so subsequent steps move down by one.
  const summaryStep = canAutoSummary ? 6 : 5
  const includeQcmStep = canAutoSummary ? 7 : 6

  return (
    <FormProvider {...methods}>
      <form
        id="create-bilan-form"
        onSubmit={methods.handleSubmit((data) => submitMutation.mutate(data))}
        className="h-full flex flex-col p-2 pb-0"
      >
        <div className="flex-1 flex flex-col gap-2">
          <PresenceCard student={studentBilan} />
          <SubjectAndLessonCard availableSubjects={availableSubjects} />
          {presence && selectedLessonId > 0 && (
            <CurriculumSkillsCard skills={selectedLesson?.curriculumSkills ?? []} />
          )}
          {canAutoSummary && (
            <AutoSummaryCard onGenerate={handleGenerate} isGenerating={generateMutation.isPending} />
          )}
          <SummaryCard step={summaryStep} />
          <IncludeQcmField step={includeQcmStep} />
        </div>
        <Field className="flex flex-row gap-2 mt-8 pb-6">
          <BrandButton
            type="button"
            variant="outline"
            size="lg"
            form="create-bilan-form"
            onClick={() => methods.reset()}
            disabled={submitMutation.isPending}
            className="flex-1 py-6 text-base font-medium"
          >
            Annuler
          </BrandButton>
          <BrandButton
            type="submit"
            size="lg"
            disabled={submitMutation.isPending}
            className="flex-1 py-6 text-base font-medium"
          >
            {submitMutation.isPending ? 'Chargement...' : 'Soumettre'}
          </BrandButton>
        </Field>
      </form>
    </FormProvider>
  )
}

export default AnimCreateBilanForm
