import type { BilanEntry, StudentEntry } from '@/api/animator/seances.types'
import type { LessonsByLevelEntry } from '@/api/animator/types';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerClose, DrawerContent,DrawerDescription,DrawerHeader,DrawerTitle,DrawerTrigger } from '@/components/ui/drawer'
import { useIsMobile } from '@/hooks/use-mobile';
import { getElapsedDays } from '@/lib/utils';
import { ArrowLeftIcon, CalendarIcon, UserIcon } from 'lucide-react';
import type { ReactNode } from 'react'
import AnimCreateBilanForm from './create/bilans/create-bilan-form';

interface AnimBilanToDoDrawerProps{
    studentBilan : StudentEntry,
    seanceDate : Date,
    seanceId : number,
    animatorId : number,
    lessonsByLevel: LessonsByLevelEntry[]
    onBilanSubmitted:  (bilan: BilanEntry) => void
    children : ReactNode
}
const AnimBilanToDoDrawer = ({
    studentBilan, seanceDate, children, seanceId, animatorId, lessonsByLevel, onBilanSubmitted,
} : AnimBilanToDoDrawerProps) => {
  const isMobile = useIsMobile();
    const name = `${studentBilan.firstName} ${studentBilan.lastName}`;

    return (
        <Drawer direction={isMobile? 'left' : 'right'}>
            <DrawerTrigger asChild>
                {children}
            </DrawerTrigger>
            <DrawerContent className='h-dvh flex flex-col pb-2 font-outfit shadow-none border-none bg-zinc-100 md:rounded-t-xl'>
                <DrawerHeader className='flex'>
                    <DrawerClose asChild>
                        <Button variant={'ghost'} className='w-fit h-12'><ArrowLeftIcon className='size-6'/></Button>
                    </DrawerClose>
                    <DrawerTitle className='font-bold text-xl tracking-tight pl-2'>Création de bilan</DrawerTitle>
                    <DrawerDescription className='text-sm text-pretty leading-4 flex flex-col gap-1 pl-2'><span className='flex items-center gap-1'><UserIcon className='size-4'/> <span>{name}</span></span><span className='flex items-center gap-1'><CalendarIcon className='size-4'/> {getElapsedDays(seanceDate)}</span></DrawerDescription>
                </DrawerHeader>
                <div className='brand-v-scrollbar overflow-x-hidden overflow-y-auto px-2 flex-1'>
                    <AnimCreateBilanForm
                        studentBilan={studentBilan}
                        seanceId = {seanceId}
                        animatorId={animatorId}
                        seanceDate={seanceDate}
                        lessonsByLevel={lessonsByLevel}
                        onBilanSubmitted={onBilanSubmitted}
                    />  
                </div>
                
            </DrawerContent>
        </Drawer>
    )
}

export default AnimBilanToDoDrawer