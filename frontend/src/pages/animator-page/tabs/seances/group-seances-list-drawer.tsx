import { Button } from '@/components/ui/button'
import { Drawer, DrawerClose, DrawerContent,DrawerDescription,DrawerHeader,DrawerTitle,DrawerTrigger } from '@/components/ui/drawer'
import { useIsMobile } from '@/hooks/use-mobile'
import { cn, getElapsedDays } from '@/lib/utils'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { ArrowLeftIcon,ClockIcon} from 'lucide-react'
import { useMemo, useState } from 'react'
import type { SeanceEntry } from '@/api/animator/seances.types'
import { Separator } from '@/components/ui/separator'

const GroupSeancesListDrawer = ({seances, children} : {seances : SeanceEntry[], children : React.ReactNode}) => {
    const isMobile = useIsMobile();
    const [filter, setFilter] = useState<'all' | 'complete' | 'toComplete'>('all')

    const selectedSeancesBuckets = useMemo(()=>{
        let newSeances : SeanceEntry[] = [];
        if(filter === 'all') newSeances =  seances;
        if(filter === 'complete') newSeances = seances.filter(s => s.studentBilans.filter(b => b.bilan === null).length === 0);
        if(filter === 'toComplete') newSeances = seances.filter(s => s.studentBilans.filter(b => b.bilan === null).length > 0);
        const seancesMap = new Map<string, SeanceEntry[]>();
        for(const s of newSeances){
            const month = format(s.date, 'MMMM y', {locale : fr});
            if(!seancesMap.has(month)){
                seancesMap.set(month, []);
            }
            const seancesBucket = seancesMap.get(month)!;
            seancesBucket.push(s);
        }

        const seanceBuckets : {month : string, seances : SeanceEntry[]}[] = []
        for(const [month, seances] of seancesMap.entries()){
            seanceBuckets.push({month, seances})
        }
        return seanceBuckets;
    }, [filter, seances])
  return (
    <Drawer direction={isMobile? 'left' : 'right'}>
        <DrawerTrigger asChild>
            {children}
        </DrawerTrigger>
        <DrawerContent className='h-dvh pl-4 pr-2 pb-2 font-outfit shadow-none border-none bg-zinc-100 md:rounded-t-xl'>
            <DrawerHeader className='flex'>
                <DrawerClose asChild>
                    <Button variant={'ghost'} className='w-fit h-12 opacity-75'><ArrowLeftIcon className='size-6'/> <span>Retour à l'historique</span></Button>
                </DrawerClose>
                <DrawerTitle className='font-bold text-xl  md:text-3xl tracking-tight'>Liste des séances</DrawerTitle>
                <DrawerDescription className='text-base'>{seances.length} séances réalisées</DrawerDescription>
                <div className='mt-2 flex gap-2'>
                    <span onClick={() => setFilter('all')} className={cn('px-4 py-2 border border-zinc-200 rounded-full', filter === 'all'? 'bg-zinc-900 text-white hover:bg-zinc-900' : 'bg-transparent text-zinc-900 hover:bg-zinc-200')}>Tout</span>
                    <span onClick={() => setFilter('complete')} className={cn('px-4 py-2 border border-zinc-200 rounded-full ', filter === 'complete'? 'bg-zinc-900 text-white hover:bg-zinc-900' : 'bg-transparent text-zinc-900 hover:bg-zinc-200')}>Complétée</span>
                    <span onClick={() => setFilter('toComplete')} className={cn('px-4 py-2 border border-zinc-200 rounded-full', filter === 'toComplete'? 'bg-zinc-900 text-white hover:bg-zinc-900' : 'bg-transparent text-zinc-900 hover:bg-zinc-200')}>À compléter</span>
                </div>
            </DrawerHeader>
            <div className="brand-v-scrollbar overflow-x-hidden overflow-y-auto px-2 flex flex-col gap-2 ">
                {
                    selectedSeancesBuckets && selectedSeancesBuckets.map(((seancesBucket, index) => {                        
                        return (
                            <div key={index} className='mt-4'>
                                <div className='w-full flex gap-6 items-center capitalize opacity-75 text-sm tracking-tight'>
                                    <Separator className='flex-1'/>
                                    <span className='text-center font-bold '>{seancesBucket.month}</span>
                                    <Separator className='flex-1'/>
                                </div>
                                <div className='mt-4 flex flex-col gap-2'>
                                    {
                                        seancesBucket.seances.map((seance) => {
                                            const studentsPresent = seance.studentBilans.filter(s => s.bilan !== null).length;
                                            const studentsAbsent = seance.studentBilans.filter(s => s.bilan === null).length;
                                            const presenceRate = Math.round(100 * studentsPresent/(studentsPresent+studentsAbsent))
                                            return (
                                                <div key={seance.id} className={cn(`rounded-xl w-full h-full p-4 font-outfit flex flex-col justify-between group-hover:border shadow-sm bg-white`)}>
                                                    <div className='flex justify-end font-medium text-sm'>
                                                        {/* <span className={cn('px-2 rounded-full flex items-center gap-2 text-sm tracking-tight bg-amber-200 border border-amber-500')}><CalendarIcon className='size-4 text-amber-700'/>{getElapsedDays(seance.seance.date)}</span> */}
                                                    </div>
                                                    <div className='mt-2'>
                                                    {/* <p className='text-sm flex items-center gap-2 tracking-tight'><UserIcon className='size-4'/><span><span className='capitalize'>{seance.animator.firstName}</span> <span className='uppercase'>{seance.animator.lastName}</span></span></p> */}
                                                    <p className='text-sm leading-4 tracking-tight flex flex-col items-start'><span className='flex items-center justify-center gap-1'><ClockIcon className='size-4'/> {getElapsedDays(seance.date)}</span></p>
                                                    </div>
                                                    <div className='flex justify-start mt-4'>
                                                        <span className={cn('border px-2 text-sm',presenceRate >= 50 ? 'bg-emerald-200 text-emerald-700 border-emerald-400 rounded-full' : 'bg-red-200 text-red-700 border-red-400')}>{studentsPresent}/{studentsPresent+studentsAbsent} élèves présents</span>
                                                    </div>
                                                </div>
                                                // <AssocSeanceDetailsDrawer key={seance.seance.id} seance={seance}>
                                                // </AssocSeanceDetailsDrawer>
                                            )
                                        }
                                    )
                                    }
                                </div>
                            </div>
                            // <StudentSeanceDetailsDrawer key={seance.id} onQcmSubmit={onQcmSubmit} bilan={seance} cardStyle={cardStyle}>
                            //     <div className={cn('flex items-center gap-4 w-full p-4 rounded-lg bg-white shadow-sm hover:shadow-md hover:-translate-y-1 transition-all ease-out duration-100 cursor-pointer')}>
                            //         <div key={seance.id} className={cn(' flex-1')}>
                            //             <div className='flex gap-2 w-full'>
                            //                 <cardStyle.icon className={cn('size-14 p-3 rounded-xl', cardStyle.iconBgColor, cardStyle.highlightTextColor)}/>
                            //                 <div className='flex flex-col w-full'>
                            //                     <div className='flex items-start justify-between w-full'>
                            //                         <span className={cn('font-bold tracking-tight uppercase text-sm',cardStyle.highlightTextColor)}>{cardStyle.label}</span>
                            //                         <div className='flex justify-end font-medium text-sm'>
                            //                             {seance.qcm && !seance.qcm.completed && <span className={cn('px-2 h-5 leading-1 tracking-tight rounded-full border flex items-center gap-2', cardStyle.borderColor, cardStyle.iconBgColor)}><AlertTriangleIcon className='w-4'/> Qcm à faire</span>}
                            //                             {seance.qcm && seance.qcm.completed && <span className={cn('px-2 h-5 leading-1 rounded-full border flex items-center gap-2', cardStyle.borderColor, cardStyle.iconBgColor)}>Qcm : <TrophyIcon className='w-4'/> {seance.qcm.score!}/{seance.qcm.qcmQuestions.length}</span>}
                            //                             {!seance.qcm && <span className='px-2 h-5 leading-1 rounded-full border'>Pas de QCM</span>}
                            //                         </div>
                            //                     </div>
                            //                     <h3 className='text-lg lg:text-xl font-semibold mt-2 max-w-48 lg:max-w-full truncate'>{seance.lesson.label}</h3>
                            //                 </div>
                            //             </div>
                            //             <div className='mt-2 flex justify-between'>
                            //                 <p className='text-sm opacity-75 flex items-center gap-2 tracking-tight'><UserIcon className='size-4'/><span><span className='capitalize'>{seance.submittedBy.firstName}</span> <span className='uppercase'>{seance.submittedBy.lastName}</span></span></p>
                            //                 <p className='text-sm opacity-75 leading-4 tracking-tight flex flex-col items-start'><span className='flex items-center justify-center gap-1'><CalendarIcon className='size-4'/> {format(seance.date, 'd/MM/y', {locale : fr})}</span></p>
                            //             </div>
                            //         </div>
                            //     </div>
                            // </StudentSeanceDetailsDrawer>
                        )
                        }
                    ))
                }
            </div>
        </DrawerContent>
    </Drawer>
  )
}

export default GroupSeancesListDrawer