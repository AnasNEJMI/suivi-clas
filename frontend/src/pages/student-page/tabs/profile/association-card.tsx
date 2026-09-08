import type { User } from '@/api/auth'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Building2Icon } from 'lucide-react';

const AssociationCard = ({student} : {student : User}) => {
  const name = student.association?.label;
  const group = student.class?.label;
  return (
    <Card className='mt-4 font-outfit gap-0'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2 text-lg'><Building2Icon className='text-emerald-400 size-6'/> Mon association</CardTitle>
      </CardHeader>
        <CardContent className='mt-0'>
            <div className='flex flex-col gap-2 text-sm w-full opacity-75'>
                <div className={cn('flex items-center justify-between')}>
                  <span>Nom</span>
                    <span className='font-bold'>{name}</span>
                </div>
                <div className={cn('flex items-center justify-between')}>
                  <span>Groupe</span>
                    <span className='font-bold'>{group}</span>
                </div>
            </div>
        </CardContent>
    </Card>
  )
}

export default AssociationCard