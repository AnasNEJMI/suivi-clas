import { Button } from '@/components/ui/button'
import { Drawer, DrawerClose, DrawerContent,DrawerDescription,DrawerHeader,DrawerTitle,DrawerTrigger } from '@/components/ui/drawer'
import { useIsMobile } from '@/hooks/use-mobile'
import { cn, getElapsedDays } from '@/lib/utils'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { ArrowLeftIcon,Building2Icon,CalendarIcon,CheckIcon,ClockFadingIcon, GraduationCapIcon, NotebookTextIcon} from 'lucide-react'
import { useMemo, useState, type ReactNode } from 'react'
import type { BilanEntry, DeleteBilanEntry, SeanceEntry } from '@/api/animator/seances.types'
import { Separator } from '@/components/ui/separator'
import { Progress } from '@/components/ui/progress'
import AnimSeanceDetailsDialog from './seance-details-dialog'
import type { LessonsByLevelEntry } from '@/api/animator/types'

interface GroupSeancesListDrawerProps{
    seances : SeanceEntry[],
    lessonsByLevel: LessonsByLevelEntry[],
    onBilanSubmitted:  (bilan: BilanEntry) => void,
    group : string,
    onBilanDeleted : (bilan : DeleteBilanEntry) => void,
    children : ReactNode
}

const GroupSeancesListDrawer = ({
    group, seances, children, lessonsByLevel, onBilanSubmitted, onBilanDeleted
} : GroupSeancesListDrawerProps) => {
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
                    <Button variant={'ghost'} className='w-fit h-12 opacity-75'><ArrowLeftIcon className='size-6'/></Button>
                </DrawerClose>
                <DrawerTitle className='font-bold text-xl  md:text-3xl tracking-tight'>Liste des séances</DrawerTitle>
                <DrawerDescription className='flex flex-col text-sm'>
                    <span className='flex items-center'><GraduationCapIcon className='mr-1 size-4'/><span className='mr-4'>{group}</span></span>
                    <span className='flex items-center'><Building2Icon className='mr-1 size-4'/><span className='mr-4'>{seances.length} séances réalisées</span></span>
                </DrawerDescription>
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
                                            const completedBilans = seance.studentBilans.filter(s => s.bilan !== null).length;
                                            const studentsCount = seance.studentBilans.length;
                                            const completionRate = Math.round(100 * completedBilans / studentsCount);
                                            return (
                                                <AnimSeanceDetailsDialog
                                                    key={seance.id}
                                                    lessonsByLevel={lessonsByLevel}
                                                    onBilanSubmitted={onBilanSubmitted}
                                                    seance={seance}
                                                    group = {group}
                                                    onBilanDeleted = {onBilanDeleted}
                                                >
                                                    <div className={cn(`rounded-xl w-full h-full p-4 font-outfit bg-white cursor-pointer border border-zinc-200`)}>
                                                        <div className='flex justify-end font-medium text-sm'>
                                                            <span className='px-2 rounded-full border flex items-center gap-2 bg-amber-200 border-amber-400'><CalendarIcon className='size-4'/>{getElapsedDays(seance.date)}</span>
                                                        </div>
                                                        <div className=' flex items-center justify-between mt-6'>
                                                            <div className='flex items-center gap-1'>
                                                                <NotebookTextIcon className='size-4'/><span>{completedBilans}/{studentsCount} bilans soumis</span>
                                                            </div>
                                                            {completedBilans === studentsCount && <CheckIcon className='text-lime-600'/>}
                                                        </div>
                                                        <Progress
                                                            className='mt-2'
                                                            value={completionRate}
                                                        />
                                                        <div className='flex items-center justify-end gap-2 opacity-75 text-sm mt-2'><ClockFadingIcon className='size-4'/> {seance.seanceDuration.label}</div>
                                                    </div>
                                                </AnimSeanceDetailsDialog>
                                            )
                                        }
                                    )
                                    }
                                </div>
                            </div>
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