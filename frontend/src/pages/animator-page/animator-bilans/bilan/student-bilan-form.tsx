import { animatorApiCalls } from '@/api/animator/apiCalls'
import type { LessonsByLevelEntry, SeanceBilanEntry, SeanceStudentEntry } from '@/api/animator/types'
import { Field } from '@/components/ui/field'
import { bilanFormSchema, type BilanFormValues } from '@/lib/schemas/bilans-bilan.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useMemo } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import PresenceField from './fields/presence-field'
import SubjectField from './fields/subject-field'
import LessonField from './fields/lesson-field'
import SummaryField from './fields/summary-field'
import IncludeQcmField from './fields/include-qcm-field'
import { BrandButton } from '@/components/brand-button'

interface StudentBilanFormProps {
    student:       SeanceStudentEntry
    seanceId:      number
    seanceDate:    Date
    animatorId:    number
    lessonsByLevel: LessonsByLevelEntry[]
    onSuccess:     (bilan: SeanceBilanEntry) => void
}

const StudentBilanForm = ({
    student,
    seanceId,
    seanceDate,
    animatorId,
    lessonsByLevel,
    onSuccess,
} : StudentBilanFormProps) => {
    
    const availableSubjects = useMemo(
        () => lessonsByLevel.find(l => l.id === student.level.id)?.subjects ?? [],
        [lessonsByLevel, student.level.id]
    )

    const methods = useForm<BilanFormValues>({
        resolver : zodResolver(bilanFormSchema),
        defaultValues : {
            presence : student.bilan?.presence ?? true,
            subjectId : student.bilan?.lesson?.subject.id ?? -1,
            lessonId : student.bilan?.lesson?.id ?? -1,
            summary : student.bilan?.summary ?? '',
            includeQcm : student.bilan?.includeQcm ?? false,
        }
    })

    const submitMutation = useMutation({
        mutationFn: (data: BilanFormValues) =>
            animatorApiCalls.submitBilan({
                animatorId,
                seanceId,
                studentId: student.id,
                date:      seanceDate,
                presence:  data.presence,
                // Only send lesson/summary when student is present
                ...(data.presence && {
                    lessonId: data.lessonId,
                    summary:  data.summary,
                    includeQcm : data.includeQcm
                }),
            }),
        onSuccess: (bilan) => {
            if(!bilan){
                toast.error('Erreur lors de la soumission du bilan.');
                return;
            }
            onSuccess(bilan)
            toast.success(`Bilan de ${student.firstName} soumis !`)
            console.log('bilan soumis : ', bilan)
        },
        onError: () => toast.error('Erreur lors de la soumission du bilan.'),
    }) 
  return (
    <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit((data) => submitMutation.mutate(data))}>
            <div className='flex flex-col gap-2'>
                <PresenceField student = {student}/>
                <SubjectField availableSubjects={availableSubjects} />
                <LessonField  availableSubjects={availableSubjects} />
                <SummaryField />
                <IncludeQcmField />
            </div>
            <Field className='flex flex-row gap-2 mt-8'>
                <BrandButton
                    type='button'
                    variant='outline'
                    size='lg'
                    onClick={() => methods.reset()}
                    disabled={submitMutation.isPending}
                    className='flex-1 py-6 text-base font-medium'
                >
                    Annuler
                </BrandButton>
                <BrandButton
                    type='submit'
                    size='lg'
                    disabled={submitMutation.isPending}
                    className='flex-1 py-6 text-base font-medium'
                >
                    {submitMutation.isPending ? 'Chargement...' : 'Soumettre'}
                </BrandButton>
            </Field>
        </form>
    </FormProvider>
  )
}

export default StudentBilanForm