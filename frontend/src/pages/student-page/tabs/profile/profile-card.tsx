import type { User } from '@/api/auth'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils';
import { BookMarkedIcon } from 'lucide-react';

const ProfileCard = ({student} : {student : User}) => {
    const firstName = student.firstName;
    const lastName = student.lastName;
    const level = student.level?.label;
    const initials = `${firstName.slice(0,1)}${lastName.slice(0,1)}`
  return (
    <Card className='mt-6'>
        <CardContent>
            <div className='flex gap-2 font-outfit'>
                <div className={cn('w-14 h-14 rounded-full flex items-center justify-center font-bold text-xl bg-amber-300')}>
                    {initials}
                </div>
                <div className='flex flex-col justify-evenly'>
                    <span className='font-bold text-xl'>{firstName} {lastName}</span>
                    <p className='opacity-75 leading-4 tracking-tight flex items-center justify-start gap-2'><span className='flex items-center justify-center gap-1'><BookMarkedIcon className='size-4'/> {level}</span></p>
                </div>
            </div>
        </CardContent>
    </Card>
  )
}

export default ProfileCard