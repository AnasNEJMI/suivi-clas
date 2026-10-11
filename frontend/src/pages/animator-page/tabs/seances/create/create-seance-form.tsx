import { FormProvider, useForm } from 'react-hook-form'
import DateField from './seance/fields/date-field'
import { Field } from '@/components/ui/field'
import { BrandButton } from '@/components/brand-button'
import { SeanceFormSchema, type SeanceFormValues } from '@/lib/schemas/animator/seances/seance.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import type z from 'zod';
import { useMutation} from '@tanstack/react-query';
import { toast } from 'sonner';
import type { ClassEntry } from '@/api/animator/types';
import type { SeanceDurationEntry, SeanceEntry } from '@/api/animator/seances.types';
import { useState } from 'react';
import { animatorApiCalls } from '@/api/animator/apiCalls';
import type { User } from '@/api/auth';
import { TriangleAlertIcon } from 'lucide-react';
import GroupField from './seance/fields/group-field';
import SeanceDurationField from './seance/fields/seance-duration-field';

interface CreateSeanceFormProps {
    animator : User,
    classes : ClassEntry[],
    seanceDurations : SeanceDurationEntry[],
    seanceExists : (data : SeanceFormValues) => boolean,
    onSeanceCreated : (seance : SeanceEntry) => void,
}

const CreateSeanceForm = ({
    animator,
    classes,
    seanceDurations,
    seanceExists,
    onSeanceCreated
} : CreateSeanceFormProps) => {
    const [seanceExistsWarningVisible, setSeanceExistsWarningVisible] = useState(false);

    const form = useForm<z.infer<typeof SeanceFormSchema>>({
        resolver : zodResolver(SeanceFormSchema),
        defaultValues : {
            animatorId : animator.id,
            classId : -1,
            date : new Date(),
            seanceDurationId : -1,
        }
      })

    const onSubmit = (data : SeanceFormValues) => {
        const exists = seanceExists(data);
        if(exists){
            setSeanceExistsWarningVisible(true);
            return;
        }
        setSeanceExistsWarningVisible(false);
        if(!submitMutation.isPending){
            submitMutation.mutate(data);
        }
    }

    const submitMutation = useMutation({
        mutationFn: (data: SeanceFormValues) => 
            animatorApiCalls.submitSeance(data),
        onSuccess: (seance) => {
            console.log('seance that came back : ', seance)
            if(!seance){
                console.log('seance is null? : ', seance === null)
                toast.error('Erreur lors de la soumission de la séance.');
                return;
            }
            toast.success(`Séance soumise !`)
            onSeanceCreated(seance);
            console.log('seance soumise : ', seance)
        },
        onError: (err) => {
            console.log(err);
            toast.error('Erreur lors de la soumission de la séance.')
        },
    }) 

  return (
    <FormProvider {...form}>
        <form 
            id='create-seance-form'
            onSubmit={form.handleSubmit((data) => onSubmit(data))} 
            className='h-full flex flex-col justify-between gap2'
        >
            <div className='flex-1 flex flex-col gap-2'>
                <div className='bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs flex flex-col gap-4'>
                    <DateField/>
                    <SeanceDurationField seanceDurations={seanceDurations}/>
                    <GroupField classes={classes}/>
                </div>

                {seanceExistsWarningVisible &&
                    <div className='w-full border border-amber-300 bg-amber-100/50 rounded-2xl p-6 text-sm font-medium text-balance text-center flex flex-col items-center gap-2 shadow-2xs'>
                        <TriangleAlertIcon className='size-8 text-amber-500'/>
                        Une séance ayant la même date et le même groupe a déjà été soumise.
                    </div>
                }
            </div>

            <Field className='flex flex-row gap-2 mt-8'>
                <BrandButton
                    type='button'
                    variant='outline'
                    size='lg'
                    form='create-seance-form'
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
  )
}

export default CreateSeanceForm