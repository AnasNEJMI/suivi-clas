import { useState, type ReactNode } from 'react'
import { Drawer, DrawerClose, DrawerContent,DrawerDescription,DrawerHeader,DrawerTitle,DrawerTrigger } from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import { ArrowLeftIcon, NotebookPenIcon, UserIcon } from 'lucide-react'
import { useIsMobile } from '@/hooks/use-mobile'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { animatorApiCalls } from '@/api/animator/apiCalls'
import { toast } from 'sonner'
import { Field } from '@/components/ui/field'
import { BrandButton } from '@/components/brand-button'
import type { LessonEvalData, StudentLessonEvalsEntry } from '@/api/animator/lesson-evals.types'
import { lessonEvalFormSchema, type LessonEvalFormValues } from '@/lib/schemas/lesson-eval.schema'
import type { LessonEntry } from '@/api/animator/types'
import { cn, getElapsedDays } from '@/lib/utils'
import { type CardStyle } from '@/lib/types/data.types'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import EvaluationField from '../../animator-lesson-evaluations/fields/evaluation-field'

const AnimLessonEvalFormDrawer = ({
    student, animatorId, onLessonEvalUpserted, lesson, lessonEval, cardStyle, children
} : {student : StudentLessonEvalsEntry, animatorId : number, lesson : LessonEntry, cardStyle : CardStyle, lessonEval : LessonEvalData | undefined, onLessonEvalUpserted : (lessonEval : LessonEvalData)  => void, children : ReactNode}) => {
    const isMobile = useIsMobile();
    const [open, setOpen] = useState(false);

    const form = useForm<LessonEvalFormValues>({
        resolver: zodResolver(lessonEvalFormSchema),
        defaultValues: {
            evaluation : lessonEval?.evaluation?? 'notAcquired',
        },
    })

    const submitMutation = useMutation({
        mutationFn : (data : LessonEvalFormValues) => {
            console.log('data ', data);

            return animatorApiCalls.submitLessonEval({
                animatorId,
                studentId : student.id,
                lessonId : lesson.id,
                evaluation : data.evaluation
            })
        },
        onSuccess : (lessonEval) => {
            console.log('lessonEval : ',lessonEval)
            if(!lessonEval){
                toast.error('Erreur lors de l\'enregistrement de l\'évaluation de la leçon.');
            }else{
                toast.success('Évalution de la leçon soumise avec succès.');
                onLessonEvalUpserted(lessonEval);
                setOpen(false);
            }
        },
        onError : (err) => {
            console.error(err)
            toast.error('Erreur lors de l\'enregistrement de l\'évaluation de la leçon.');
        },
    })

    

    return (
        <Drawer direction={isMobile? 'left' : 'right'} open = {open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                {children}
            </DrawerTrigger>
            <DrawerContent className='h-dvh px-4 pb-2 font-outfit shadow-none border-none bg-zinc-100 md:rounded-t-xl'>
                <DrawerHeader className='flex'>
                    <DrawerClose asChild>
                        <Button variant={'ghost'} className='w-fit h-12 opacity-75'><ArrowLeftIcon className='size-6'/></Button>
                    </DrawerClose>
                    <DrawerTitle className='font-bold text-xl  md:text-3xl tracking-tight'>Créer/Modifier l'évaluation d'une leçon</DrawerTitle>
                    <DrawerDescription className='text-base'>
                        <span className="flex items-center gap-1 text-sm"><UserIcon className="size-4"/> <span>{student.firstName} {student.lastName}</span></span>
                    </DrawerDescription>
                </DrawerHeader>
                <Card 
                    className={cn(
                        'border-none shadow-none rounded-2xl flex flex-col lg:flex-row items-start justify-start lg:justify-between mt-6',
                        cardStyle.bgColor
                    )}
                >
                    <CardHeader className='flex flex-col items-center justify-start w-full'>
                        <div className='flex gap-2 w-full'>
                            <cardStyle.icon className={cn('size-12 p-3 rounded-xl', cardStyle.iconBgColor, cardStyle.highlightTextColor)}/>
                            <div className='flex flex-col w-full'>
                                <div className='flex items-start justify-between w-full'>
                                    <span className={cn('font-bold tracking-tight uppercase text-sm',cardStyle.highlightTextColor)}>{cardStyle.label}</span>
                                </div>
                                <CardTitle className='text-xl lg:text-2xl font-semibold'>{lesson.label}</CardTitle>
                            </div>
                        </div>
                    </CardHeader>
                </Card>
                <FormProvider {...form}>
                    <form onSubmit={form.handleSubmit((data) => submitMutation.mutate(data))} className='flex flex-col h-full'>
                        <div className='h-full'>
                            <span className='flex items-center gap-2 font-medium text-lg mt-6'><NotebookPenIcon/> Votre évaluation</span>
                            {lessonEval && <span className='text-sm text-lime-700 bg-lime-100 px-4 border border-lime-300 rounded-full mt-4'>Dernière évaluation : {getElapsedDays(lessonEval.updatedAt)}</span>}
                            {!lessonEval && <span className='text-sm text-zinc-700 bg-white px-4 border border-zinc-300 rounded-full mt-4'>Première évaluation</span>}
                            <div className='gap-4 bg-white border border-zinc-100 shadow-sm p-4 rounded-md mt-2'>
                                <EvaluationField/>
                            </div>
                        </div>
                        <Field className='flex flex-row gap-2 mt-12'>
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
            </DrawerContent>
        </Drawer>
  )
}

export default AnimLessonEvalFormDrawer