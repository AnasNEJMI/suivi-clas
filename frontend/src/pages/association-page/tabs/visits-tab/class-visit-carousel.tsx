import type { ClassVisitStats } from '@/api/association-member/apiCalls'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { cn, getDaysSinceLastVisit, getElapsedDays } from '@/lib/utils'
import { CalendarCheck2Icon, CalendarX2Icon, GraduationCapIcon, RotateCwFadingClockIcon} from 'lucide-react'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const AssocClassVisitCarousel = ({classVisits} : {classVisits: ClassVisitStats}) => {
    classVisits.students.sort((a, b) => {
        if(!a.lastVisit && !b.lastVisit) return 0;
        if(!a.lastName && b.lastVisit) return 1;
        if(a.lastName && !b.lastVisit) return -1;
        return new Date(b.lastVisit!).getTime() - new Date(a.lastVisit!).getTime()
    });
    return (
    <>
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <div className='w-8 h-8 rounded-full  flex items-center justify-center font-bold text-base'>
                <GraduationCapIcon className='text-sky-600'/>
            </div>
            <span className="font-semibold">{classVisits.class.label}</span>
            </div>
            <span className="px-2 rounded-full bg-white border border-zinc-200 text-sm opacity-75">{classVisits.students.length} élèves</span>
        </div>
        {
            classVisits.students.length === 0 &&
            <Card className='border-2 border-dashed border-zinc-200 shadow-none h-64 flex flex-col items-center justify-center w-full rounded-xl bg-transparent mt-4 p-4'>
                <CardHeader className='flex flex-col items-center justify-center w-full'>
                    <RotateCwFadingClockIcon className='size-10 opacity-70'/>
                    <CardTitle className='text-base font-medium opacity-70 text-center text-balance'>Les données de présence n'ont pas été enregistrées pour le moment.</CardTitle>
                    <CardDescription className='text-pretty text-sm max-w-xl text-center'>Toutes les données de présence enregistrées seront affichées ici dès leur réalisation.</CardDescription>
                </CardHeader>   
            </Card>
        }
        {
            classVisits.students.length > 0 &&
            <Carousel
                opts={{align :'start'}}
                className='mt-2'
            >
                <CarouselContent className='-ml-2 pt-2'>
                    {
                        classVisits.students.map((student) => {
                            const totalVisits = student.numVisits;
                            const lastVisited = student.lastVisit? getElapsedDays(student.lastVisit) : '-';
                            const daysSinceLastVisit = student.lastVisit? getDaysSinceLastVisit(student.lastVisit!) : null;
                            return (
                                <CarouselItem key={student.id} className="group pl-2 max-w-60 pb-4">
                                    <div className={cn(`rounded-xl w-full h-full p-4 font-outfit flex flex-col justify-between shadow-sm bg-white border`, daysSinceLastVisit && (daysSinceLastVisit > 7 || daysSinceLastVisit < 0) ? 'border-emerald-300' : 'border-red-300')}>
                                        <div className=''>
                                            <div className='text-base flex items-center gap-2 tracking-tight font-semibold'><div className='capitalize h-8 w-8 rounded-full bg-amber-200 flex items-center justify-center'>{student.firstName.slice(0,1)}</div><span><span className='capitalize'>{student.firstName}</span> <span className='uppercase'>{student.lastName}</span></span></div>
                                            <div className='text-sm leading-4 tracking-tight flex flex-col items-start font-semibold opacity-75'><span className='flex items-center justify-center gap-1'><div className='h-8 w-8 flex items-center justify-center'><GraduationCapIcon className='size-4'/></div>{classVisits.class.label}</span></div>
                                            <div className='mt-4 py-2 text-sm leading-4 tracking-tight flex items-center justify-between w-full'>
                                                <span className='flex items-center gap-1'>
                                                    <CalendarCheck2Icon className='size-4'/>
                                                    Nombre de visites
                                                </span>
                                                <span className='font-bold'>
                                                    {totalVisits}
                                                </span>
                                            </div>
                                            <div className='text-sm leading-4 tracking-tight flex items-center justify-between w-full'>
                                                <span className='flex items-center gap-1'>
                                                    <CalendarX2Icon className='size-4'/>
                                                    Dernière visite
                                                </span>
                                                <span className='font-bold'>
                                                    {lastVisited}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </CarouselItem>
                            )
                        })
                    }
                </CarouselContent>
                <div className=' flex justify-between items-center mb-6'>
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

export default AssocClassVisitCarousel