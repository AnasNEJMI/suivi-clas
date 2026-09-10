import { Fragment, type ReactNode } from 'react'
import type { CarouselSeance } from './seance-history-carousel'
import { useIsMobile } from '@/hooks/use-mobile';
import { Drawer, DrawerClose, DrawerContent,DrawerDescription,DrawerHeader,DrawerTitle,DrawerTrigger } from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import { ArrowLeftIcon, CalendarIcon, ClockIcon, NotebookPenIcon } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { cn, getElapsedDays } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

const AssocSeanceDetailsDrawer = ({seance, children} : {seance : CarouselSeance, children : ReactNode}) => {
    const isMobile = useIsMobile();
    return (
      <Drawer direction={isMobile? 'left' : 'right'}>
        <DrawerTrigger asChild>
            {children}
        </DrawerTrigger>
        <DrawerContent className='h-dvh pl-4 pr-2 pb-2 font-outfit shadow-none border-none bg-zinc-100 md:rounded-t-xl'>
            <DrawerHeader className='flex'>
                <DrawerClose asChild>
                    <Button variant={'ghost'} className='w-fit h-12 opacity-75'><ArrowLeftIcon className='size-6'/> <span>Retour</span></Button>
                </DrawerClose>
                <DrawerDescription>Séance du <span>{(new Date(seance.seance.date)).toLocaleDateString('fr-FR', {day: '2-digit',month: '2-digit',year: 'numeric',})}</span></DrawerDescription>
                <DrawerTitle className='font-bold text-xl  md:text-3xl tracking-tight'>Résumé de la séance</DrawerTitle>
            </DrawerHeader>
            <div className="brand-v-scrollbar overflow-x-hidden overflow-y-auto px-4">
                <Card 
                    className={cn(
                        'border-none shadow-none  rounded-2xl flex flex-col lg:flex-row items-start justify-start lg:justify-between',
                    )}
                >
                    <CardHeader className='flex flex-col items-center justify-start w-full'>
                        <div className='flex gap-2 w-full'>
                            <NotebookPenIcon className={cn('size-10 p-2 rounded-xl bg-amber-300')}/>
                            <div className='flex flex-col w-full'>
                                <div className='flex items-start justify-between w-full'>
                                    <span className={cn('font-bold tracking-tight uppercase text-xs')}>{seance.class.label}</span>
                                </div>
                                <CardTitle className='text-xl lg:text-2xl font-semibold'>Pôle scientifique</CardTitle>
                            </div>
                        </div>
                    </CardHeader>
                    <CardFooter className='flex items-start justify-between w-full'>
                        <div className='flex gap-2'>
                            <div className={cn('w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-bold text-xl bg-sky-300')}>
                                {seance.animator.firstName.slice(0,1)}
                            </div>
                            <div className='flex flex-col justify-between'>
                                <p className='tracking-tight text-base lg:text-lg'><span className='font-bold'>{seance.animator.firstName} {seance.animator.lastName}</span></p>
                                <p className='text-sm opacity-75 leading-4 tracking-tight flex items-center justify-start gap-2'><span className='flex items-center justify-center gap-1'><CalendarIcon className='size-4'/> {getElapsedDays(seance.seance.date)}</span> · <span className='flex items-center justify-center gap-1'><ClockIcon className='size-4'/> {seance.seance.duration}</span></p>
                            </div>
                        </div>
                    </CardFooter>
                </Card>
                <Card 
                    className={cn(
                        'border-none shadow-none  rounded-2xl flex flex-col items-start justify-start lg:justify-between mt-6',
                    )}
                >
                    <CardHeader className='flex flex-col items-center justify-start w-full'>
                        <div className='flex gap-2 w-full'>
                            <NotebookPenIcon className={cn('size-6 rounded-xl text-violet-600')}/>
                            <div className='flex flex-col w-full'>
                                <CardTitle className='text-xl lg:text-2xl font-semibold'>Participation</CardTitle>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className='flex flex-col w-full'>
                        {
                          seance.seance.students.map((student, index) => (
                            <Fragment key={index}>
                              <div className={cn('flex items-center justify-between p-2', index%2 === 0 && 'bg-zinc-100/75', index === 0 && 'rounded-t-md', index === seance.seance.students.length - 1 && 'rounded-b-md')}>
                                <span className={cn('font-medium tracking-tighter', !student.presence && 'opacity-75')}>{student.firstName} {student.lastName}</span>
                                <span className={cn('border px-2 rounded-full', student.presence ? 'border-emerald-400 bg-emerald-100 text-emerald-600' : 'border-red-400 bg-red-100 text-red-600')}>{student.presence? student.gender === 'm'? 'présent' : 'présente' : student.gender === 'm' ? 'absent' : 'absente'}</span>
                              </div>
                              {index < seance.seance.students.length - 1 && <Separator/>}
                            </Fragment>
                          ))
                        }
                    </CardContent>
                </Card>
            </div>
        </DrawerContent>
    </Drawer>
    )
}

export default AssocSeanceDetailsDrawer