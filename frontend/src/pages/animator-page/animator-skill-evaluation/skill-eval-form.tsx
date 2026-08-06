import type { SkillEvalEntry }    from '@/api/animator/types'
import { Button }                 from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Field }                  from '@/components/ui/field'
import { skillEvalFormSchema, type SkillEvalFormValues } from '@/lib/schemas/skill-eval.schema'
import { zodResolver }            from '@hookform/resolvers/zod'
import { FormProvider, useForm }  from 'react-hook-form'
import SkillCommentaryField       from './fields/skill-commentary-field'
import SkillSliderField from './fields/skill-silder-field'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

interface SkillEvalFormProps {
    skillEval:  SkillEvalEntry | null
    isPending:  boolean
    onSubmit:   (data: SkillEvalFormValues) => void
}

const SkillEvalForm = ({ skillEval, isPending, onSubmit }: SkillEvalFormProps) => {
    const form = useForm<SkillEvalFormValues>({
        resolver: zodResolver(skillEvalFormSchema),
        defaultValues: {
            autonomy:     skillEval?.autonomy     ?? 10,
            discipline:   skillEval?.discipline   ?? 10,
            organisation: skillEval?.organisation ?? 10,
            ponctuality:  skillEval?.ponctuality  ?? 10,
            regularity:   skillEval?.regularity   ?? 10,
            respect:      skillEval?.respect      ?? 10,
            preparation:  skillEval?.preparation  ?? 10,
            positive:     skillEval?.positive     ?? '',
            negative:     skillEval?.negative     ?? '',
            improvements: skillEval?.improvements ?? '',
        },
    })

    return (
        <Card className='font-outfit border-none shadow-card'>
            <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                    <div className='w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-sm'>
                        2
                    </div>
                    <span className='text-xl lg:text-2xl'>Évaluation des compétences méthodologiques</span>
                </CardTitle>
                {
                    skillEval &&  
                    <CardDescription className='flex gap-2'>
                        <span>Dernière mise à jour : </span>
                        <span className='px-2 bg-lime-200 border border-lime-400 rounded-full capitalize'>{format(skillEval.updatedAt, 'PPPp', {locale : fr})}</span>
                    </CardDescription>
                }
            </CardHeader>
            <CardContent className='flex flex-col gap-6'>
                <FormProvider {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className='flex flex-col lg:flex-row justify-evenly gap-4 mt-12'>
                            <SkillSliderField name='autonomy' />
                            <SkillSliderField name='discipline' />
                            <SkillSliderField name='organisation' />
                            <SkillSliderField name='ponctuality' />
                            <SkillSliderField name='regularity' />
                            <SkillSliderField name='respect' />
                            <SkillSliderField name='preparation' />
                        </div>
                        <div className='mt-12 flex flex-col gap-4'>
                            <SkillCommentaryField name='positive' />
                            <SkillCommentaryField name='negative' />
                            <SkillCommentaryField name='improvements' />
                        </div>
                        <Field className='flex flex-row gap-2 mt-8'>
                            <Button
                                type='button'
                                variant='outline'
                                size='lg'
                                onClick={() => form.reset()}
                                disabled={isPending}
                                className='flex-1 py-6 text-base font-medium'
                            >
                                Annuler
                            </Button>
                            <Button
                                type='submit'
                                size='lg'
                                disabled={isPending}
                                className='flex-1 py-6 text-base font-medium'
                            >
                                {isPending ? 'Chargement...' : 'Soumettre'}
                            </Button>
                        </Field>
                    </form>
                </FormProvider>
            </CardContent>
        </Card>
    )
}

export default SkillEvalForm