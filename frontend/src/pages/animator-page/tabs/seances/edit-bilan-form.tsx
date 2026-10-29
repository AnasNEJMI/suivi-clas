import { animatorApiCalls } from "@/api/animator/apiCalls"
import type { BilanEntry, StudentEntry } from "@/api/animator/seances.types"
import type { LessonsByLevelEntry } from "@/api/animator/types"
import { createBilanFormSchema, type CreateBilanFormValues } from "@/lib/schemas/create-bilan.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useMemo } from "react"
import { toast } from "sonner"
import { FormProvider, useForm } from 'react-hook-form'
import PresenceCard from "./create/bilans/fields/presence-card"
import SubjectAndLessonCard from "./create/bilans/fields/subject-and-lesson-card"
import SummaryCard from "./create/bilans/fields/summary-card"
import IncludeQcmCard from "./create/bilans/fields/include-qcm-field"
import { Field } from "@/components/ui/field"
import { BrandButton } from "@/components/brand-button"

interface AnimEditBilanFormProps{
    studentBilan : StudentEntry,
    seanceDate : Date,
    seanceId : number,
    animatorId : number,
    lessonsByLevel: LessonsByLevelEntry[]
    onBilanEdited:  (bilan: BilanEntry) => void
}
const AnimEditBilanForm = ({
    studentBilan, seanceDate, seanceId, animatorId, lessonsByLevel, onBilanEdited
} : AnimEditBilanFormProps) => {

    const availableSubjects = useMemo(
        () => lessonsByLevel.find(l => l.id === studentBilan.level.id)?.subjects ?? [],
        [lessonsByLevel, studentBilan.level.id]
    )

    const methods = useForm<CreateBilanFormValues>({
        resolver : zodResolver(createBilanFormSchema),
        defaultValues : {
            presence : studentBilan.bilan?.presence ?? true,
            subjectId : studentBilan.bilan?.lesson?.subject.id ?? -1,
            lessonId : studentBilan.bilan?.lesson?.id ?? -1,
            summary : studentBilan.bilan?.summary ?? '',
            includeQcm : studentBilan.bilan?.qcm ? true : false,
        }
    })

    const editMutation = useMutation({
        mutationFn: (data: CreateBilanFormValues) =>
            animatorApiCalls.submitBilan({
                animatorId,
                seanceId,
                studentId: studentBilan.id,
                date:      seanceDate,
                presence:  data.presence,
                ...(data.presence && {
                    lessonId: data.lessonId,
                    summary:  data.summary,
                    includeQcm : data.includeQcm
                }),
            }),
        onSuccess: (bilan) => {
            if(!bilan){
                toast.error('Erreur lors de la mise à jour du bilan.');
                return;
            }
            onBilanEdited(bilan);
            toast.success(`Bilan de ${studentBilan.firstName} mis à jour !`)
            console.log('bilan mis à jour : ', bilan)
        },
        onError: () => toast.error('Erreur lors de la mise à jour du bilan.'),
    }) 

  return (
    <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit((data) => editMutation.mutate(data))} className='h-full flex flex-col justify-between p-2 gap2'>
            <div className='flex-1 flex flex-col gap-2'>
                <PresenceCard student = {studentBilan}/>
                <SubjectAndLessonCard availableSubjects={availableSubjects}/>
                <SummaryCard step={3} />
                <IncludeQcmCard step={4} />
            </div>
            <Field className='flex flex-row gap-2 mt-8'>
                <BrandButton
                    type='button'
                    variant='outline'
                    size='lg'
                    onClick={() => methods.reset()}
                    disabled={editMutation.isPending}
                    className='flex-1 py-6 text-base font-medium'
                >
                    Annuler
                </BrandButton>
                <BrandButton
                    type='submit'
                    size='lg'
                    disabled={editMutation.isPending}
                    className='flex-1 py-6 text-base font-medium'
                >
                    {editMutation.isPending ? 'Chargement...' : 'Soumettre'}
                </BrandButton>
            </Field>
        </form>
    </FormProvider>
  )
}

export default AnimEditBilanForm