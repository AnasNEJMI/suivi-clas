import type { ClassPresenceStats } from '@/api/association-member/apiCalls'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { cn } from '@/lib/utils'
import { CalendarCheck2Icon, CalendarX2Icon, GraduationCapIcon, PieChartIcon, RotateCwFadingClockIcon} from 'lucide-react'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const AssocClassPresenceCarousel = ({classPresence} : {classPresence : ClassPresenceStats}) => {
    classPresence.students.sort((a, b) => b.presence - a.presence); 
    return (
    <>
        <div className="flex items-center justify-between mt-6">
            <div className="flex items-center gap-2">
                <div className='w-8 h-8 rounded-full  flex items-center justify-center font-bold text-base'>
                <GraduationCapIcon className='text-sky-600'/>
            </div>
            <span className="font-semibold">{classPresence.class.label}</span>
            </div>
            <span className="px-2 rounded-full bg-white border border-zinc-200 text-sm opacity-75">{classPresence.students.length} élèves</span>
        </div>
        {
            classPresence.students.length === 0 &&
            <Card className='border-2 border-dashed border-zinc-200 shadow-none h-64 flex flex-col items-center justify-center w-full rounded-xl bg-transparent mt-4 p-4'>
                <CardHeader className='flex flex-col items-center justify-center w-full'>
                    <RotateCwFadingClockIcon className='size-10 opacity-70'/>
                    <CardTitle className='text-base font-medium opacity-70 text-center text-balance'>Les données de présence n'ont pas été enregistrées pour le moment.</CardTitle>
                    <CardDescription className='text-pretty text-sm max-w-xl text-center'>Toutes les données de présence enregistrées seront affichées ici dès leur réalisation.</CardDescription>
                </CardHeader>   
            </Card>
        }
        {
            classPresence.students.length > 0 &&
            <Carousel
                opts={{align :'start'}}
                className='mt-2'
            >
                <CarouselContent className='-ml-2 pt-2'>
                    {
                        classPresence.students.map((student) => {
                            const totalSeances = student.presence + student.absence;
                            const present = totalSeances === 0? 0 : student.presence;
                            const absent = totalSeances === 0? 0 : student.absence;

                            const presenceRate = totalSeances === 0? 0 : Math.round(100 * present / totalSeances);
                            return (
                                <CarouselItem key={student.id} className="group pl-2 max-w-60 pb-4">
                                    <div className={cn(`rounded-xl w-full h-full p-4 font-outfit flex flex-col justify-between shadow-sm bg-white border`, presenceRate > 75 ? 'border-emerald-300' : presenceRate === 0 && totalSeances === 0 ? '' : 'border-red-300')}>
                                        <div className=''>
                                            <div className='text-base flex items-center gap-2 tracking-tight font-semibold'><div className='capitalize h-8 w-8 rounded-full bg-amber-200 flex items-center justify-center'>{student.firstName.slice(0,1)}</div><span><span className='capitalize'>{student.firstName}</span> <span className='uppercase'>{student.lastName}</span></span></div>
                                            <div className='text-sm leading-4 tracking-tight flex flex-col items-start font-semibold opacity-75'><span className='flex items-center justify-center gap-1'><div className='h-8 w-8 flex items-center justify-center'><GraduationCapIcon className='size-4'/></div>{classPresence.class.label}</span></div>
                                            <div className='mt-4 py-2 text-sm leading-4 tracking-tight flex items-center justify-between w-full'>
                                                <span className='flex items-center gap-1'>
                                                    <CalendarCheck2Icon className='size-4'/>
                                                    Présence
                                                </span>
                                                <span className='font-bold'>
                                                    {present}/{present+absent}
                                                </span>
                                            </div>
                                            <div className='text-sm leading-4 tracking-tight flex items-center justify-between w-full'>
                                                <span className='flex items-center gap-1'>
                                                    <CalendarX2Icon className='size-4'/>
                                                    Absence
                                                </span>
                                                <span className='font-bold'>
                                                    {absent}/{present+absent}
                                                </span>
                                            </div>
                                        </div>
                                        <div className='flex justify-end font-medium text-sm mt-4'>
                                            <span className={cn('px-2 rounded-full flex items-center gap-2 text-sm tracking-tight', presenceRate > 75 ? 'bg-emerald-200 border border-emerald-500' : presenceRate === 0 && totalSeances === 0 ? 'border-zinc-200 bg-zinc-100' : 'bg-red-200 border border-red-500')}><PieChartIcon className={cn('size-4', presenceRate > 75 ? 'text-emerald-700' : 'text-red-700')}/>{presenceRate}%</span>
                                        </div>
                                    </div>
                                </CarouselItem>
                            )
                        })
                    }
                </CarouselContent>
                <div className=' flex justify-between items-center'>
                    <div>
                        <CarouselPrevious variant={'outline'}/>
                        <CarouselNext variant={'outline'}/>
                    </div>
                </div>
            </Carousel>
        }
    </>
  )
}

export default AssocClassPresenceCarousel