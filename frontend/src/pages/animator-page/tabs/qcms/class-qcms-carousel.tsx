import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { cn } from '@/lib/utils'
import { CalendarCheck2Icon, CalendarX2Icon, GraduationCapIcon, RotateCwFadingClockIcon} from 'lucide-react'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { QcmEntry, SeancesByClassEntry } from '@/api/animator/seances.types'
import type { ScolarYearEntry } from '@/api/animator/types'

const AnimClassQCMsCarousel = ({classStats, baseData} : {classStats: SeancesByClassEntry, baseData : ScolarYearEntry}) => {
    const bilans = classStats.seances.flatMap(s => s.studentBilans);
    const qcms = bilans.map(bilan => bilan.bilan?.qcm).filter(qcm => qcm !== null && qcm !== undefined);
    
    if(!qcms || qcms.length === 0){
        return (
            <div className='mt-6'>
                <h3 className='font-semibold text-lg lg:text-xl text-zinc-900'>Bilan des QCMs</h3>
                <Card className='border-2 border-dashed border-zinc-200 shadow-none h-64 flex flex-col items-center justify-center w-full rounded-xl bg-transparent mt-4 p-4'>
                    <CardHeader className='flex flex-col items-center justify-center w-full'>
                        <RotateCwFadingClockIcon className='size-10 opacity-70'/>
                        <CardTitle className='text-base font-medium opacity-70 text-center text-balance'>Aucun QCM enregistré pour le moment.</CardTitle>
                        <CardDescription className='text-pretty text-sm max-w-xl text-center'>Les statistiques des QCMS générés seront affichées ici dès leur enregistrement.</CardDescription>
                    </CardHeader>   
                </Card>
            </div>
        )
    }

    type QCMBucket  = {
        id : number
        firstName : string,
        lastName : string,
        gender : 'm' | 'f',
        qcms : QcmEntry[]
    }

    const studentsMap = new Map<number, QCMBucket>();
    const classData = baseData.classes.find(c => c.id === classStats.id)!;

    for (let i = 0; i < qcms.length; i++) {
        const qcm = qcms[i];

        if(!studentsMap.has(qcm.studentId)){
            const student = baseData.classes.flatMap(c => c.students).find(s => s.id === qcm.studentId);
            if(!student) continue;
            studentsMap.set(qcm.studentId, {
                id : student.id,
                firstName : student.firstName,
                lastName : student.lastName,
                gender : student.gender, 
                qcms : []
            })
        }
        studentsMap.get(qcm.studentId)!.qcms.push(qcm);
    }

    for (let i = 0; i < classData.students.length; i++) {
        const student = classData.students[i];

        if(!studentsMap.has(student.id)){
            studentsMap.set(student.id, {
                id : student.id,
                firstName : student.firstName,
                lastName : student.lastName,
                gender : student.gender, 
                qcms : []
            })
        }
    }

    const students = [...studentsMap.values()].sort((a,b) => {
        const aQcmsCompleted = a.qcms.filter(q => q.completed).length;
        const aTotalQcms = a.qcms.length;
        const aQcmCompletionRate = aTotalQcms > 0 ? Math.round(100 * aQcmsCompleted / aTotalQcms) : -1;
        
        const bQcmsCompleted = b.qcms.filter(q => q.completed).length;
        const bTotalQcms = b.qcms.length;
        const bQcmCompletionRate = bTotalQcms > 0 ? Math.round(100 * bQcmsCompleted / bTotalQcms) : -1;

        return bQcmCompletionRate - aQcmCompletionRate;
    });

    return (
        <>
            <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-2">
                    <GraduationCapIcon className='text-sky-600 size-6'/>
                    <span className="font-medium">{classStats.label}</span>
                </div>
                <span className="px-2 rounded-full bg-white border border-zinc-200 text-sm opacity-75">{students.length} élèves</span>
            </div>
            {
                students.length === 0 &&
                <Card className='border-2 border-dashed border-zinc-200 shadow-none h-64 flex flex-col items-center justify-center w-full rounded-xl bg-transparent mt-4 p-4'>
                    <CardHeader className='flex flex-col items-center justify-center w-full'>
                        <RotateCwFadingClockIcon className='size-10 opacity-70'/>
                        <CardTitle className='text-base font-medium opacity-70 text-center text-balance'>Les données de présence n'ont pas été enregistrées pour le moment.</CardTitle>
                        <CardDescription className='text-pretty text-sm max-w-xl text-center'>Toutes les données de présence enregistrées seront affichées ici dès leur réalisation.</CardDescription>
                    </CardHeader>   
                </Card>
            }
            {
                students.length > 0 &&
                <Carousel
                    opts={{align :'start'}}
                    className='mt-2'
                >
                    <CarouselContent className='-ml-2 pt-2'>
                        {
                            students.map((student) => {
                                const qcmsCompleted = student.qcms.filter(q => q.completed).length;
                                const totalQcms = student.qcms.length;
                                const qcmCompletionRate = totalQcms > 0 ? Math.round(100 * qcmsCompleted / totalQcms) : -1;
                                const qcmTotalPoints = student.qcms.reduce((accumulator, currentValue) => accumulator + (currentValue?.score?? 0), 0)
                                const averageQCMScore = totalQcms > 0 ? qcmTotalPoints/totalQcms : '-';
                                return (
                                    <CarouselItem key={student.id} className="group pl-2 max-w-60 pb-4">
                                        {/* todo : make student qcms visitable and consultable */}
                                        <div className={cn(`rounded-xl w-full h-full p-4 font-outfit flex flex-col justify-between shadow-sm bg-white`, qcmCompletionRate > 75 ? 'border-emerald-300 border-2' : qcmCompletionRate >= 0 ? 'border-red-300 border-2' : 'border-zinc-100 border')}>
                                            <div className=''>
                                                <div className='text-sm flex items-center gap-2 tracking-tight font-semibold'><div className='capitalize h-6 w-6 rounded-full bg-amber-200 flex items-center justify-center'>{student.firstName.slice(0,1)}</div><span><span className='capitalize'>{student.firstName}</span> <span className='uppercase'>{student.lastName}</span></span></div>
                                                <div className='text-sm tracking-tight flex flex-col items-start font-semibold opacity-75'><span className='flex items-center justify-center gap-1'><div className='h-6 w-6 flex items-center justify-center'><GraduationCapIcon className='size-4'/></div>{classStats.label}</span></div>
                                                <div className='mt-4 text-sm tracking-tight flex items-center justify-between w-full'>
                                                    <span className='flex items-center gap-1 opacity-75'>
                                                        <CalendarCheck2Icon className='size-4'/>
                                                        QCMs envoyés
                                                    </span>
                                                    <span className='font-bold'>
                                                        {totalQcms}
                                                    </span>
                                                </div>
                                                <div className='text-sm tracking-tight flex items-center justify-between w-full'>
                                                    <span className='flex items-center gap-1 opacity-75'>
                                                        <CalendarCheck2Icon className='size-4'/>
                                                        QCMs complétés
                                                    </span>
                                                    <span className={cn('font-bold', qcmCompletionRate >= 75 ? 'text-emerald-700' : 'text-red-700')}>
                                                        {qcmsCompleted}/{totalQcms}
                                                    </span>
                                                </div>
                                                <div className='text-sm tracking-tight flex items-center justify-between w-full'>
                                                    <span className='flex items-center gap-1 opacity-75'>
                                                        <CalendarX2Icon className='size-4 '/>
                                                        Note moyenne
                                                    </span>
                                                    <span className='font-bold'>
                                                        {averageQCMScore}/10
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

export default AnimClassQCMsCarousel