import type { User } from '@/api/auth'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import {Building2Icon } from 'lucide-react';

const AssocProfileCard = ({association} : {association : User}) => {
    const name = association.association?.label;
    const address = 'Dammarie-les-Lys';
    // const initials = `${firstName.slice(0,1)}${lastName.slice(0,1)}`
  return (
    <Card className='mt-4 font-outfit gap-0'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2 text-lg'><Building2Icon className='text-emerald-400 size-6'/> Mon association</CardTitle>
      </CardHeader>
        <CardContent className='mt-0'>
            <div className='flex flex-col gap-1 text-base w-full'>
                <div className={cn('flex items-start justify-between gap-6')}>
                    <span>Nom</span>
                    <span className='font-semibold'>{name}</span>
                </div>
                <div className={cn('flex items-start justify-between gap-6')}>
                    <span>Localisation</span>
                    <span className='font-semibold'>{address}</span>
                </div>
            </div>
        </CardContent>
    </Card>
  )
}

export default AssocProfileCard