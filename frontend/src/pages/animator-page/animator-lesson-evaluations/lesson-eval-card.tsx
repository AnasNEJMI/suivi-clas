import { animatorApiCalls } from '@/api/animator/apiCalls'
import { animatorKeys } from '@/api/animator/query-keys'
import type { LessonEvalEntry, LessonEvalQueryParams, LessonEvalsEntry, LessonsByLevelEntry, ScolarYearEntry, StudentEntry } from '@/api/animator/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import LessonEvalSkeletonCard from './cards/lesson-eval-skeleton-card'
import LessonEvalErrorCard from './cards/lesson-eval-error-card'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FormProvider, useForm } from 'react-hook-form'
import { lessonEvalFormSchema, type LessonEvalFormValues } from '@/lib/schemas/lesson-eval.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMemo, useState } from 'react'
import LessonField from './fields/lesson-field'
import SubjectField from './fields/subject-field'
import EvaluationField from './fields/evaluation-field'
import { Field } from '@/components/ui/field'
import { BrandButton } from '@/components/brand-button'

interface LessonEvalCardProps{
  params:        LessonEvalQueryParams,
  lessonsByLevel: LessonsByLevelEntry[],
  scolarYears : ScolarYearEntry[],
}

const LessonEvalCard = ({
    params,
    lessonsByLevel,
    scolarYears
} : LessonEvalCardProps) => {
    const [selectedStudent] = useState<StudentEntry | null>(
        params
        ? scolarYears.find(sy => sy.id === params.scolarYearId)?.classes.find(c => c.id === params.classId)?.students.find(s => s.id === params.studentId) ?? null
        : null
    );
    const queryClient = useQueryClient();
    const queryKey = animatorKeys.lessonEval(params);

    
    const {data : lessonEvals, isLoading, isError} = useQuery({
        queryKey,
        queryFn : () => animatorApiCalls.fetchLessonEvals(params),
        staleTime : 0,
        gcTime : 45 * 60 * 1000
    })
    
    const form = useForm<LessonEvalFormValues>({
        resolver : zodResolver(lessonEvalFormSchema),
        defaultValues : {
            subjectId : -1,
            lessonId : -1,
            evaluation : 'notAcquired',
        }
    })

    const submitMutation = useMutation({
        mutationFn : (data : LessonEvalFormValues) => 
            animatorApiCalls.submitLessonEval({
                animatorId : params.animatorId,
                studentId : params.studentId,
                lessonId : data.lessonId,
                evaluation : data.evaluation
            }),
        onSuccess : (lessonEval) => {
            console.log('lessonEval : ',lessonEval)
            if(!lessonEval){
                toast.error('Erreur lors de la soumission de l\'évaluation.');
                return;
            }
            handleLessonEvalSubmitted(lessonEval);
            toast.success('Évalution soumise avec succès.');
        },
        onError : () => toast.error('Erreur lors de l\'enregistrement de l\'èvaluation.'),
    })

    function handleLessonEvalSubmitted(lessonEval : LessonEvalEntry){
        queryClient.setQueryData<LessonEvalsEntry| null>(queryKey, (prev) =>{
            if(!prev) return null;

            const exists = prev.evaluations.some(lev => lev.id === lessonEval.id);
            if(exists){
                return {
                    ...prev,
                    evaluations : exists
                    ? prev.evaluations.map(lev => lev.id === lessonEval.id ? lessonEval : lev )
                    : [...prev.evaluations, lessonEval]
                }
            }else{
                prev.evaluations.push(lessonEval)
            }
        })
    }

    const availableSubjects = useMemo(() =>{
        if(!selectedStudent) return [];
        return lessonsByLevel.find(l => l.id === selectedStudent.level!.id)?.subjects ?? []
    }
    , [selectedStudent, lessonsByLevel])

    if(isLoading) return <LessonEvalSkeletonCard/>
    if(isError) return <LessonEvalErrorCard/>
    return (
        <Card className='font-outfit border-none shadow-card'>
            <CardHeader>
                <CardTitle className='flex items-center justify-start gap-2'>
                    <div className='w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-sm'>
                        2
                    </div>
                    <span className='text-lg lg:text-xl'>Évaluation de maîtrise</span>
                </CardTitle>
                <CardDescription className='text-sm lg:text-base'>
                    Sélectionner la matière puis la leçon pour accéder à l'évaluation.
                </CardDescription>
            </CardHeader>
            <CardContent className='flex flex-col gap-2'>
                <FormProvider {...form }>
                    <form onSubmit={form.handleSubmit((data) => submitMutation.mutate(data))}>
                        <div className='flex flex-col gap-2'>
                            <SubjectField availableSubjects = {availableSubjects}/>
                            <LessonField lessonEvals = {lessonEvals?? null} availableSubjects = {availableSubjects}/>
                            <EvaluationField/>
                        </div>
                        <Field className='flex flex-row gap-2 mt-8'>
                            <BrandButton
                                type='button'
                                variant='outline'
                                size='lg'
                                onClick={() => form.reset()}
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
            </CardContent>
        </Card>
    )

}

export default LessonEvalCard