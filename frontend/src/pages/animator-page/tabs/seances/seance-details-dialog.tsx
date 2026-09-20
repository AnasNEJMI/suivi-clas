import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn, getElapsedDays } from '@/lib/utils'
import {BookCheckIcon, BookXIcon, CalendarIcon, ClockFadingIcon,GraduationCapIcon,NotebookPenIcon, PackageCheckIcon, PackageXIcon} from 'lucide-react'
import type { BilanEntry, DeleteBilanEntry, SeanceEntry } from '@/api/animator/seances.types'
import { Progress } from '@/components/ui/progress'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import AnimBilanCompletedCard from './bilan-completed-card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import AnimBilanToDoCard from './bilan-todo-card'
import type { LessonsByLevelEntry } from '@/api/animator/types'
import type { ReactNode } from 'react'


interface AnimSeanceDetailsDialogProps{
    lessonsByLevel: LessonsByLevelEntry[],
    onBilanSubmitted:  (bilan: BilanEntry) => void,
    group : string,
    seance : SeanceEntry
    children : ReactNode
    onBilanDeleted : (bilan : DeleteBilanEntry) => void
}

const AnimSeanceDetailsDialog = ({
    seance, group, children, lessonsByLevel, onBilanSubmitted, onBilanDeleted
} : AnimSeanceDetailsDialogProps) => {
    const bilansCompleted = seance.studentBilans.filter(s => s.bilan !== null);
    const bilansCompletedCount = bilansCompleted.length;

    const bilansToDo = seance.studentBilans.filter(s => s.bilan === null);
    const bilansToDoCount = bilansToDo.length;

    const studentsCount = seance.studentBilans.length;
    const completionRate = Math.round(100 * bilansCompletedCount / studentsCount);
    
  return (
    <Dialog>
        <DialogTrigger asChild>
            {children}
        </DialogTrigger>
        <DialogContent className={cn('h-dvh flex flex-col items-start w-full lg:w-[calc(100%-18rem)] lg:left-72 lg:translate-x-0 pr-0 pl-4 pb-2 font-outfit shadow-none border-none bg-zinc-100 md:rounded-t-xl')}>
            <DialogHeader className='flex w-full gap-0'>
                <DialogTitle className='font-bold text-xl  md:text-3xl tracking-tight text-start px-2 mt-4'>Détails de la séance</DialogTitle>
                <DialogDescription className='text-sm text-pretty lg:text-base leading-4 text-start px-2'>L'ensemble des données soumises pour la séance</DialogDescription>
            </DialogHeader>
            <div className="brand-v-scrollbar overflow-x-hidden overflow-y-auto  w-full">
                <Card 
                    className={cn(
                        'border-none shadow-none ',
                    )}
                >
                    <CardContent className=''>
                        <CardHeader className='w-full px-0'>
                            <CardTitle className='text-lg font-semibold flex items-center gap-2'><NotebookPenIcon/>Infromations générales</CardTitle>
                        </CardHeader>
                        <div className='flex items-center justify-between w-full mt-4'><span className='text-sm flex items-center gap-2 opacity-75'><GraduationCapIcon className='size-4'/> Groupe</span><span className='font-medium capitalize'>{group}</span></div>
                        <div className='flex items-center justify-between w-full mt-1'><span className='text-sm flex items-center gap-2 opacity-75'><CalendarIcon className='size-4'/> Date</span><span className='font-medium capitalize'>{getElapsedDays(seance.date)}</span></div>
                        <div className='flex items-center justify-between w-full mt-1'><span className='text-sm flex items-center gap-2 opacity-75'><ClockFadingIcon className='size-4'/> Durée</span><span className='font-medium'>{seance.seanceDuration.label}</span></div>
                        <div className={cn('flex items-center justify-between w-full mt-1', bilansCompletedCount === studentsCount && 'text-lime-600 opacity-100')}><span className={cn('text-sm flex items-center gap-2 opacity-75',  bilansCompletedCount === studentsCount && 'text-lime-600 opacity-100')}><BookCheckIcon className='size-4'/> Bilans soumis</span><span className={cn('font-medium', bilansCompletedCount === studentsCount && 'text-lime-600')}>{bilansCompletedCount}/{studentsCount} bilans</span></div>
                        <Progress
                            className='mt-2'
                            value={completionRate}
                        />
                    </CardContent>
                </Card>

                <div className='flex gap-4 flex-col mt-4 pb-4'>
                    <div className='flex-2/3 h-fit rounded-2xl bg-white p-4'>
                        <div className='flex items-center justify-between'>
                            <h3 className='flex gap-2'><BookCheckIcon/><span className='tracking-tight text-lg font-semibold'>Bilans soumis</span></h3>
                            <span className='bg-zinc-100 border border-zinc-200 px-2 text-sm rounded-full opacity-75'>{bilansCompletedCount}/{studentsCount} bilans</span>
                        </div>
                        <p className='text-sm opacity-75 leading-4'>Les bilans déjà soumis pour cette séance</p>
                        {
                            bilansCompletedCount === 0 &&
                            <Card className='border-2 border-dashed border-zinc-200 shadow-none h-32 flex flex-col items-center justify-center w-full rounded-xl bg-transparent mt-4 p-4'>
                                <CardHeader className='flex flex-col items-center justify-center w-full'>
                                    <PackageXIcon className='size-6 opacity-70'/>
                                    <CardTitle className='text-sm font-normal opacity-75 text-center text-balance'>Aucun bilan n'a encore été soumis pour cette séance.</CardTitle>
                                </CardHeader>   
                            </Card>
                        }
                        {
                            bilansCompletedCount > 0 &&
                            <Carousel
                                opts={{align :'start'}}
                                className='mt-2'
                            >
                                <CarouselContent className='-ml-4 pt-4'>
                                    {
                                        bilansCompleted.map((studentBilan) => (
                                            <CarouselItem key={studentBilan.id} className="group pl-4 max-w-64 hover:-translate-y-2 transition-transform duration-100 ease-out">
                                                <AnimBilanCompletedCard
                                                    seanceDuration={seance.seanceDuration}
                                                    studentBilan = {studentBilan}
                                                    seanceDate={seance.date}
                                                    onBilanDeleted={onBilanDeleted}
                                                />
                                            </CarouselItem>
                                        ))
                                    }
                                </CarouselContent>
                                <div className='mt-4 flex justify-between items-center'>
                                    <div>
                                        <CarouselPrevious variant={'outline'}/>
                                        <CarouselNext variant={'outline'}/>
                                    </div>
                                </div>
                            </Carousel>
                        }
                    </div>

                    <div className='flex-2/3 h-fit rounded-2xl bg-white p-4'>
                        <div className='flex items-center justify-between'>
                            <h3 className='flex gap-2'><BookXIcon/><span className='tracking-tight text-lg font-semibold'>Bilans à faire</span></h3>
                            <span className='bg-zinc-100 border border-zinc-200 px-2 text-sm rounded-full opacity-75'>{bilansToDoCount}/{studentsCount} bilans</span>
                        </div>
                        <p className='text-sm opacity-75 leading-4'>Les bilans encore à faire pour cette séance</p>
                        {
                            bilansToDoCount === 0 &&
                            <Card className='border-2 border-dashed border-zinc-200 shadow-none h-32 flex flex-col items-center justify-center w-full rounded-xl bg-transparent mt-4 p-4'>
                                <CardHeader className='flex flex-col items-center justify-center w-full'>
                                    <PackageCheckIcon className='size-6 opacity-70'/>
                                    <CardTitle className='text-sm font-normal opacity-75 text-center text-balance'>Tous les bilans ont été soumis pour cette séance.</CardTitle>
                                </CardHeader>   
                            </Card>
                        }
                        {
                            bilansToDoCount > 0 &&
                            <Carousel
                                opts={{align :'start'}}
                                className='mt-2'
                            >
                                <CarouselContent className='-ml-4 pt-4'>
                                    {
                                        bilansToDo.map((studentBilan) => (
                                            <CarouselItem key={studentBilan.id} className="group pl-4 max-w-64 hover:-translate-y-0.5 transition-transform duration-100 ease-out pb-4">
                                                <AnimBilanToDoCard
                                                    seanceId={seance.id}
                                                    animatorId={seance.animatorId}
                                                    lessonsByLevel={lessonsByLevel}
                                                    onBilanSubmitted={onBilanSubmitted}
                                                    seanceDate = {seance.date}
                                                    seanceDuration={seance.seanceDuration}
                                                    studentBilan = {studentBilan}/>
                                            </CarouselItem>
                                        ))
                                    }
                                </CarouselContent>
                                <div className='mt-4 flex justify-between items-center'>
                                    <div>
                                        <CarouselPrevious variant={'outline'}/>
                                        <CarouselNext variant={'outline'}/>
                                    </div>
                                </div>
                            </Carousel>
                        }
                    </div>
                </div>
            </div>
        </DialogContent>
    </Dialog>
  )
}

export default AnimSeanceDetailsDialog