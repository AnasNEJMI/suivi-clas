import type { SkillEvalData, SkillEvalStudentEntry } from '@/api/animator/skill-evals.types'
import { useState, type ReactNode } from 'react'
import { Drawer, DrawerClose, DrawerContent,DrawerDescription,DrawerHeader,DrawerTitle,DrawerTrigger } from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import { ArrowLeftIcon, NotebookPenIcon, UserIcon } from 'lucide-react'
import { useIsMobile } from '@/hooks/use-mobile'
import { FormProvider, useForm } from 'react-hook-form'
import { skillEvalFormSchema, type SkillEvalFormValues } from '@/lib/schemas/skill-eval.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { animatorApiCalls } from '@/api/animator/apiCalls'
import { toast } from 'sonner'
import SkillSliderField from '../../animator-skill-evaluation/fields/skill-silder-field'
import SkillCommentaryField from '../../animator-skill-evaluation/fields/skill-commentary-field'
import { Field } from '@/components/ui/field'
import { BrandButton } from '@/components/brand-button'

const AnimSkillEvalDrawer = ({student, animatorId, onSkillEvalUpserted, children} : {student : SkillEvalStudentEntry, animatorId : number, onSkillEvalUpserted : (skillEval : SkillEvalData)  => void, children : ReactNode}) => {
    const isMobile = useIsMobile();
    const [open, setOpen] = useState(false);

    const form = useForm<SkillEvalFormValues>({
        resolver: zodResolver(skillEvalFormSchema),
        defaultValues: {
            autonomy:     student.skillEval?.autonomy     ?? 0,
            discipline:   student.skillEval?.discipline   ?? 0,
            organisation: student.skillEval?.organisation ?? 0,
            ponctuality:  student.skillEval?.ponctuality  ?? 0,
            regularity:   student.skillEval?.regularity   ?? 0,
            respect:      student.skillEval?.respect      ?? 0,
            preparation:  student.skillEval?.preparation  ?? 0,
            positive:     student.skillEval?.positive     ?? '',
            negative:     student.skillEval?.negative     ?? '',
            improvements: student.skillEval?.improvements ?? '',
        },
    })

    const submitMutation = useMutation({
        mutationFn : (data : SkillEvalFormValues) => {
            console.log('data ', data);

            return animatorApiCalls.submitSkillEval({
                animatorId : animatorId,
                studentId : student.id,
                autonomy : data.autonomy,
                discipline : data.discipline,
                organisation : data.organisation,
                ponctuality : data.ponctuality,
                regularity : data.regularity,
                respect : data.respect,
                preparation : data.preparation,
                positive : data.positive,
                negative :  data.negative,
                improvements : data.improvements,
                })
        },
        onSuccess : (skillEval) => {
            console.log('skillEval : ',skillEval)
            if(!skillEval){
                toast.error('Erreur lors de la soumission de l\'évaluation.');
            }else{
                toast.success('Évalution soumise avec succès.');
                onSkillEvalUpserted(skillEval);
                setOpen(false);
            }
        },
        onError : (err) => {
            console.error(err)
            toast.error('Erreur lors de l\'enregistrement de l\'évaluation.');
        },
    })

    return (
        <Drawer direction={isMobile? 'left' : 'right'} open = {open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                {children}
            </DrawerTrigger>
            <DrawerContent className='h-dvh pl-4 pr-2 pb-2 font-outfit shadow-none border-none bg-zinc-100 md:rounded-t-xl'>
                <DrawerHeader className='flex'>
                    <DrawerClose asChild>
                        <Button variant={'ghost'} className='w-fit h-12 opacity-75'><ArrowLeftIcon className='size-6'/></Button>
                    </DrawerClose>
                    <DrawerTitle className='font-bold text-xl  md:text-3xl tracking-tight'>Créer/Modifier l'évalation de la méthodologique</DrawerTitle>
                    <DrawerDescription className='text-base'>
                        <span className="flex items-center gap-1 text-sm"><UserIcon className="size-4"/> <span>{student.firstName} {student.lastName}</span></span>
                    </DrawerDescription>
                </DrawerHeader>
                    <FormProvider {...form}>
                        <div className="brand-v-scrollbar overflow-x-hidden overflow-y-auto px-2 flex flex-col gap-2 ">
                            <form onSubmit={form.handleSubmit((data) => submitMutation.mutate(data))}>
                                <span className='flex items-center gap-2 font-medium text-lg mt-4'><NotebookPenIcon/> Notes</span>
                                <div className='flex flex-col lg:flex-row justify-evenly gap-4 bg-white border border-zinc-100 shadow-sm p-4 rounded-md mt-2'>
                                    <SkillSliderField name='autonomy' />
                                    <SkillSliderField name='discipline' />
                                    <SkillSliderField name='organisation' />
                                    <SkillSliderField name='ponctuality' />
                                    <SkillSliderField name='regularity' />
                                    <SkillSliderField name='respect' />
                                    <SkillSliderField name='preparation' />
                                </div>
                                <div className='mt-6 flex flex-col gap-6'>
                                    <SkillCommentaryField name='positive' />
                                    <SkillCommentaryField name='negative' />
                                    <SkillCommentaryField name='improvements' />
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
                        </div>
                    </FormProvider>
            </DrawerContent>
        </Drawer>
  )
}

export default AnimSkillEvalDrawer