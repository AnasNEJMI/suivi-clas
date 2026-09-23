import type { AnimatorProfileByScolarYear } from '@/api/animator/profile.types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CARD_STYLES, type Subject } from '@/lib/types/data.types';
import { cn } from '@/lib/utils';
import { Building2Icon, RotateCwFadingClockIcon, UserRoundPenIcon } from 'lucide-react';
const AnimContractsCard = ({animatorProfilesByScolarYear}:{animatorProfilesByScolarYear : AnimatorProfileByScolarYear[]}) => {
    const associations = animatorProfilesByScolarYear[0]?.associations;
    console.log('associations ', associations);
    return (
    <Card className='mt-4 font-outfit gap-0 flex-1'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2 text-lg'><UserRoundPenIcon className='text-indigo-500 size-6'/> Mes contracts</CardTitle>
      </CardHeader>
        <CardContent className='mt-0'>
            {
                (!associations || associations.length === 0) &&
                <Card className='border-2 border-dashed border-zinc-200 shadow-none h-64 flex flex-col items-center justify-center w-full rounded-xl bg-transparent mt-4 p-4'>
                    <CardHeader className='flex flex-col items-center justify-center w-full'>
                        <RotateCwFadingClockIcon className='size-10 opacity-70'/>
                        <CardTitle className='text-base font-medium opacity-70 text-center text-balance'>Aucun contrat n'a encore été enregistré.</CardTitle>
                        <CardDescription className='text-pretty text-sm max-w-xl text-center'>Tous vos contrats seront affichés ici dès leur enregistrement.</CardDescription>
                    </CardHeader>   
                </Card>

            }
            {
                associations && associations.length > 0 &&
                <div className='flex flex-col gap-1 text-base w-full mt-4'>
                    {
                        associations.map((association, index) => {
                            const assocName = association.label;
                            const assocAddress = association.address;
                            const assocPostalConde = association.postalCode;
                            const specializations = association.specializations;
                            return(
                                <div key={association.id} className='rounded-md p-4 bg-zinc-50 border border-zinc-100'>
                                        <div className={cn('flex items-start justify-between gap-6')}>
                                            <span className='flex items-center gap-2 font-semibold '><Building2Icon className='size-4'/> <span>Association {assocName}</span></span>
                                        </div>
                                        <div className='text-sm mt-4'>
                                            <div className={cn('flex items-start justify-between gap-6')}>
                                                <span className='opacity-75'>Adresse</span>
                                                <span className='font-semibold'>{assocAddress}</span>
                                            </div>
                                            <div className={cn('flex items-start justify-between gap-6')}>
                                                <span className='opacity-75'>Code postal</span>
                                                <span className='font-semibold'>{assocPostalConde}</span>
                                            </div>
                                            <div className={cn('flex items-start justify-between gap-6')}>
                                                <span className='opacity-75'>Matières</span>
                                                <div className='font-semibold text-xs justify-end text-end flex flex-wrap gap-1'>
                                                    {
                                                        specializations.map((s, index) => (
                                                            <span key={index} className='rounded-md px-2 py-1 bg-zinc-900 text-white'>{CARD_STYLES[s as Subject].label}</span>
                                                        ))
                                                    }
                                                </div>
                                            </div>

                                        </div>
                                        {index < associations.length - 1 && <Separator/>}
                                </div>
                            )
                        })
                    }
                </div>
            }
        </CardContent>
    </Card>
  )
}

export default AnimContractsCard