import { useCallback, useMemo, useState, type ReactNode } from 'react'
import type { CarouselSeance } from './seance-history-carousel'
import { Drawer, DrawerClose, DrawerContent,DrawerDescription,DrawerHeader,DrawerTitle,DrawerTrigger } from '@/components/ui/drawer'
import { useIsMobile } from '@/hooks/use-mobile'
import AssocSeanceDetailsDrawer from './seance-details-drawer'
import { Button } from '@/components/ui/button'
import { ArrowLeftIcon, CalendarIcon, ClockIcon, GraduationCapIcon, RotateCwFadingClockIcon, UserIcon } from 'lucide-react'
import { cn, getElapsedDays } from '@/lib/utils'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { Separator } from '@/components/ui/separator'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const AssocSeancesListDrawer = ({seances, filters, children} : {seances : CarouselSeance[], filters : string[], children : ReactNode}) => {
    const isMobile = useIsMobile();
    console.log('seances ', seances)

    
    const [filter, setFilter] = useState<string>('all')
    const getFilteredSeances = useCallback((filter : string) => {
        let newSeances : CarouselSeance[] = [];
        for(const f of filters){
            if(filter === f){
                if(f === 'all') newSeances = seances;
                else newSeances = seances.filter(s => s.class.label === f);
            } 
        }
        const seancesMap = new Map<string, CarouselSeance[]>();
        for(const s of newSeances){
            const month = format(s.seance.date, 'MMMM y', {locale : fr});
            if(!seancesMap.has(month)){
                console.log(month);
                seancesMap.set(month, []);
            }
            const seancesBucket = seancesMap.get(month)!;
            seancesBucket.push(s);
        }

        const seanceBuckets : {month : string, seances : CarouselSeance[]}[] = []
        for(const [month, seances] of seancesMap.entries()){
            seanceBuckets.push({month, seances})
        }
        return seanceBuckets;
    }, [seances, filters])


    const selectedSeanceBuckets = useMemo(()=>{
        return getFilteredSeances(filter);
    }, [filter,getFilteredSeances])
    
    if(seances.length === 0){
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
                        <DrawerTitle className='text-lg'>Séances</DrawerTitle>
                        <DrawerDescription>0 Séances réalisées</DrawerDescription>
                    </DrawerHeader>
                    <div className=''>
                        <Card className='border-2 border-dashed border-zinc-200 shadow-none h-64 flex flex-col items-center justify-center w-full rounded-xl bg-transparent mt-4 p-4'>
                            <CardHeader className='flex flex-col items-center justify-center w-full'>
                                <RotateCwFadingClockIcon className='size-10 opacity-70'/>
                                <CardTitle className='text-base font-medium opacity-70 text-center text-balance'>Aucune séance enregistrée pour le moment.</CardTitle>
                                <CardDescription className='text-pretty text-sm max-w-xl text-center'>Toutes les séance enregistrées seront affichées ici dès leur réalisation.</CardDescription>
                            </CardHeader>   
                        </Card>
                    </div>
                </DrawerContent>
            </Drawer>
        )
    }

    const animatorName = `${seances[0].animator.firstName} ${seances[0].animator.lastName}`

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
                    <DrawerTitle className='font-bold text-xl  md:text-3xl tracking-tight flex items-center gap-2'>
                        <div className='w-10 h-10 rounded-full bg-sky-300 flex items-center justify-center font-bold text-xl'>
                            {animatorName.slice(0,1)}
                        </div>
                        <span>{animatorName}</span>
                    </DrawerTitle>
                    <DrawerDescription className='text-base'>{seances.length} séances réalisées</DrawerDescription>
                    <div className='mt-2 flex gap-2 flex-wrap'>
                        {
                            filters.map((f, index) => (
                                <span key={index} onClick={() => setFilter(f)} className={cn('px-4 py-2 text-sm tracking-tight text-nowrap border border-zinc-200 rounded-full', filter === f? 'bg-zinc-900 text-white hover:bg-zinc-900' : 'bg-transparent text-zinc-900 hover:bg-zinc-200')}>{f === 'all'?'Tout' : f}</span>
                            ))
                        }
                    </div>
                </DrawerHeader>
                <div className="brand-v-scrollbar overflow-x-hidden overflow-y-auto px-2 flex flex-col gap-2 pb-4">
                    {
                        selectedSeanceBuckets && selectedSeanceBuckets.map((seanceBucket, index) => {
                                return (
                                    <div key = {index} className='mt-4'>
                                        <div className='w-full flex gap-6 items-center capitalize opacity-75 text-sm tracking-tight'>
                                            <Separator className='flex-1'/>
                                            <span className='text-center font-bold '>{seanceBucket.month}</span>
                                            <Separator className='flex-1'/>
                                        </div>
                                        <div className='mt-4 flex flex-col gap-2'>
                                            {
                                                seanceBucket.seances.map((seance) => (
                                                    <AssocSeanceDetailsDrawer key={seance.seance.id} seance={seance}>
                                                        <div className={cn(`rounded-xl w-full h-full p-4 font-outfit flex flex-col justify-between group-hover:border shadow-sm bg-white`)}>
                                                            <div className='flex justify-end font-medium text-sm'>
                                                            <span className={cn('px-2 rounded-full flex items-center gap-2 text-sm tracking-tight bg-amber-200 border border-amber-500')}><CalendarIcon className='size-4 text-amber-700'/>{getElapsedDays(seance.seance.date)}</span>
                                                            </div>
                                                            <div className='mt-2'>
                                                            <p className='text-sm flex items-center gap-2 tracking-tight'><UserIcon className='size-4'/><span><span className='capitalize'>{seance.animator.firstName}</span> <span className='uppercase'>{seance.animator.lastName}</span></span></p>
                                                            <p className='text-sm leading-4 tracking-tight flex flex-col items-start'><span className='flex items-center justify-center gap-1'><GraduationCapIcon className='size-4'/> {seance.class.label}</span></p>
                                                            <p className='text-sm leading-4 tracking-tight flex flex-col items-start'><span className='flex items-center justify-center gap-1'><ClockIcon className='size-4'/> {seance.seance.duration}</span></p>
                                                            </div>
                                                        </div>
                                                    </AssocSeanceDetailsDrawer>
                                                ))
                                            }
                                        </div>
                                    </div>
                                )
                            }
                            
                        )
                    }
                </div>
            </DrawerContent>
        </Drawer>
  )
}

export default AssocSeancesListDrawer