import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { UserRoundPenIcon } from 'lucide-react';
import { Fragment } from 'react/jsx-runtime';

const AssocAnimatorsCard = ({animators}:{animators : {id: number;firstName: string;lastName: string;gender: "f" | "m";}[]}) => {
  return (
    <Card className='mt-4 font-outfit gap-0 flex-1'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2 text-lg'><UserRoundPenIcon className='text-indigo-500 size-6'/> Mes Animateurs</CardTitle>
      </CardHeader>
        <CardContent className='mt-0'>
            <div className='flex flex-col gap-1 text-base w-full'>
                {
                    animators.map((animator, index) => {
                        const subjects = ['Maths','Physique/Chimie','SVT']
                        return(
                            <Fragment key={animator.id} >
                                <div className={cn('flex items-start justify-between gap-6')}>
                                    <span>Nom</span>
                                    <span className='font-semibold'>{animator.firstName} {animator.lastName}</span>
                                </div>
                                <div className={cn('flex items-start justify-between gap-6')}>
                                    <span>Matières</span>
                                    <div className='font-semibold text-sm justify-end text-end flex flex-wrap gap-1'>
                                        {
                                            subjects.map((subject, index) => (
                                                <span key={index} className='rounded-md px-2 py-1 bg-zinc-100 border border-zinc-200'>{subject}</span>
                                            ))
                                        }
                                    </div>
                                </div>
                                {index < animators.length - 1 && <Separator/>}
                            </Fragment>
                        )
                    })
                }
            </div>
        </CardContent>
    </Card>
  )
}

export default AssocAnimatorsCard