import type {DeleteBilanEntry, SeanceDurationEntry, StudentEntry } from '@/api/animator/seances.types'
import { Button } from '@/components/ui/button';
import { Drawer, DrawerClose, DrawerContent,DrawerDescription,DrawerHeader,DrawerTitle,DrawerTrigger } from '@/components/ui/drawer'
import { useIsMobile } from '@/hooks/use-mobile';
import { getElapsedDays } from '@/lib/utils';
import { ArrowLeftIcon, CalendarIcon, ClockFadingIcon, UserIcon } from 'lucide-react';
import {type ReactNode } from 'react'
import AnimCompletedBilanDetails from './completed-bilan-details';
import DeleteBilanDialog from './delete-bilan-dialog';

interface AnimBilanCompletedDrawerProps{
    studentBilan : StudentEntry,
    seanceDate : Date,
    seanceDuration : SeanceDurationEntry,
    children : ReactNode
    onBilanDeleted : (bilan : DeleteBilanEntry) => void
}

const AnimBilanCompletedDrawer = ({
    studentBilan, seanceDate, seanceDuration, children,onBilanDeleted
} : AnimBilanCompletedDrawerProps) => {
    const isMobile = useIsMobile();
    const name = `${studentBilan.firstName} ${studentBilan.lastName}`;
    return (
    <Drawer direction={isMobile? 'left' : 'right'}>
        <DrawerTrigger asChild>
            {children}
        </DrawerTrigger>
        <DrawerContent className='h-dvh flex flex-col font-outfit shadow-none border-none bg-zinc-100 md:rounded-t-xl pb-6 px-2'>
            <DrawerHeader className='flex'>
                <DrawerClose asChild>
                    <Button variant={'ghost'} className='w-fit h-12'><ArrowLeftIcon className='size-6'/></Button>
                </DrawerClose>
                <div className='flex items-start justify-between'>
                    <div className=''>
                        <DrawerTitle className='font-bold text-xl tracking-tight'>Bilan de séance</DrawerTitle>
                        <DrawerDescription className='text-sm text-pretty leading-4 flex flex-col gap-1'>
                            <span className='flex items-center gap-1'>
                                <UserIcon className='size-4'/>
                                <span className='font-bold'>{name}</span>
                            </span>
                            <span className='flex items-center gap-1'>
                                <CalendarIcon className='size-4'/>
                                {getElapsedDays(seanceDate)}
                            </span>
                            <span className='flex items-center gap-1'>
                                <ClockFadingIcon className='size-4'/>
                                {seanceDuration.label}
                            </span>
                        </DrawerDescription>

                    </div>
                    <DeleteBilanDialog studentBilan = {studentBilan} onBilanDeleted={onBilanDeleted}/>
                </div>
            </DrawerHeader>
            <AnimCompletedBilanDetails
                studentBilan={studentBilan}
                seanceDuration = {seanceDuration}
            />
            {/* {editMode &&
                <div className='brand-v-scrollbar overflow-x-hidden overflow-y-auto px-2 flex-1'>
                    <AnimEditBilanForm
                        studentBilan={studentBilan}
                        seanceId = {seanceId}
                        animatorId={animatorId}
                        seanceDate={seanceDate}
                        lessonsByLevel={lessonsByLevel}
                        onBilanEdited={onBilanEdited}
                    />
                </div>
            }
            {
                !editMode &&
            } */}
        </DrawerContent>
    </Drawer>
  )
}

export default AnimBilanCompletedDrawer