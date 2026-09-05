import type { BilanEntry, QcmEntry } from '@/api/student/apiCalls'
import { Button } from '@/components/ui/button'
import { Drawer, DrawerClose, DrawerContent,DrawerDescription,DrawerHeader,DrawerTitle,DrawerTrigger } from '@/components/ui/drawer'
import { useIsMobile } from '@/hooks/use-mobile'
import { CARD_STYLES, type Subject } from '@/lib/types/data.types'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { AlertTriangleIcon, ArrowLeftIcon, CalendarIcon, CalendarX,TrophyIcon, UserIcon} from 'lucide-react'
import SeanceDetailsDrawer from './seance-details-drawer'
import { useMemo, useState } from 'react'

const SeancesListDrawer = ({bilans, onQcmSubmit, children} : {bilans : BilanEntry[], onQcmSubmit : (qcm: QcmEntry) => void, children : React.ReactNode}) => {
    const isMobile = useIsMobile();
    const [filter, setFilter] = useState<'all' | 'present' | 'absent'>('all')

    const selectedBilans = useMemo(()=>{
        if(filter === 'all') return bilans;
        if(filter === 'present') return bilans.filter(b => b.presence);
        if(filter === 'absent') return bilans.filter(b => !b.presence);
    }, [filter, bilans])
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
                <DrawerDescription className='text-base'>{bilans.length} séances réalisées</DrawerDescription>
                <div className='mt-2 flex gap-2'>
                    <span onClick={() => setFilter('all')} className={cn('px-4 py-2 border border-zinc-200 rounded-full', filter === 'all'? 'bg-zinc-900 text-white hover:bg-zinc-900' : 'bg-transparent text-zinc-900 hover:bg-zinc-200')}>Tout</span>
                    <span onClick={() => setFilter('present')} className={cn('px-4 py-2 border border-zinc-200 rounded-full ', filter === 'present'? 'bg-zinc-900 text-white hover:bg-zinc-900' : 'bg-transparent text-zinc-900 hover:bg-zinc-200')}>Présence</span>
                    <span onClick={() => setFilter('absent')} className={cn('px-4 py-2 border border-zinc-200 rounded-full', filter === 'absent'? 'bg-zinc-900 text-white hover:bg-zinc-900' : 'bg-transparent text-zinc-900 hover:bg-zinc-200')}>Absence</span>
                </div>
            </DrawerHeader>
            <div className="brand-v-scrollbar overflow-x-hidden overflow-y-auto px-2 flex flex-col gap-2 ">
                {
                    selectedBilans && selectedBilans.map((bilan => {
                        if(!bilan.presence || !bilan.lesson){
                            return (
                                <div key={bilan.id} className={cn('w-full p-4 bg-white rounded-lg opacity-70')}>
                                    <div className='flex gap-2 w-full'>
                                        <CalendarX className={cn('size-14 p-3 rounded-xl bg-red-200 text-red-500')}/>
                                        <div className='flex flex-col w-full'>
                                            <h3 className='text-lg lg:text-xl font-semibold mt-2'>Absence</h3>
                                        </div>
                                    </div>
                                    <div className='mt-2 flex justify-between'>
                                        <p className='text-sm opacity-75 flex items-center gap-2 tracking-tight'><UserIcon className='size-4'/><span><span className='capitalize'>{bilan.submittedBy.firstName}</span> <span className='uppercase'>{bilan.submittedBy.lastName}</span></span></p>
                                        <p className='text-sm opacity-75 leading-4 tracking-tight flex flex-col items-start'><span className='flex items-center justify-center gap-1'><CalendarIcon className='size-4'/> {format(bilan.date, 'd/MM/y', {locale : fr})}</span></p>
                                    </div>
                                </div>
                            )
                        }else{
                            const cardStyle = CARD_STYLES[bilan.lesson!.subject.label as Subject];
                            
                            return (
                                <SeanceDetailsDrawer key={bilan.id} onQcmSubmit={onQcmSubmit} bilan={bilan} cardStyle={cardStyle}>
                                    <div className={cn('flex items-center gap-4 w-full p-4 rounded-lg bg-white shadow-sm hover:shadow-md hover:-translate-y-1 transition-all ease-out duration-100 cursor-pointer')}>
                                        <div key={bilan.id} className={cn(' flex-1')}>
                                            <div className='flex gap-2 w-full'>
                                                <cardStyle.icon className={cn('size-14 p-3 rounded-xl', cardStyle.iconBgColor, cardStyle.highlightTextColor)}/>
                                                <div className='flex flex-col w-full'>
                                                    <div className='flex items-start justify-between w-full'>
                                                        <span className={cn('font-bold tracking-tight uppercase text-sm',cardStyle.highlightTextColor)}>{cardStyle.label}</span>
                                                        <div className='flex justify-end font-medium text-sm'>
                                                            {bilan.qcm && !bilan.qcm.completed && <span className={cn('px-2 h-5 leading-1 tracking-tight rounded-full border flex items-center gap-2', cardStyle.borderColor, cardStyle.iconBgColor)}><AlertTriangleIcon className='w-4'/> Qcm à faire</span>}
                                                            {bilan.qcm && bilan.qcm.completed && <span className={cn('px-2 h-5 leading-1 rounded-full border flex items-center gap-2', cardStyle.borderColor, cardStyle.iconBgColor)}>Qcm : <TrophyIcon className='w-4'/> {bilan.qcm.score!}/{bilan.qcm.qcmQuestions.length}</span>}
                                                            {!bilan.qcm && <span className='px-2 h-5 leading-1 rounded-full border'>Pas de QCM</span>}
                                                        </div>
                                                    </div>
                                                    <h3 className='text-lg lg:text-xl font-semibold mt-2 max-w-48 lg:max-w-full truncate'>{bilan.lesson.label}</h3>
                                                </div>
                                            </div>
                                            <div className='mt-2 flex justify-between'>
                                                <p className='text-sm opacity-75 flex items-center gap-2 tracking-tight'><UserIcon className='size-4'/><span><span className='capitalize'>{bilan.submittedBy.firstName}</span> <span className='uppercase'>{bilan.submittedBy.lastName}</span></span></p>
                                                <p className='text-sm opacity-75 leading-4 tracking-tight flex flex-col items-start'><span className='flex items-center justify-center gap-1'><CalendarIcon className='size-4'/> {format(bilan.date, 'd/MM/y', {locale : fr})}</span></p>
                                            </div>
                                        </div>
                                    </div>
                                </SeanceDetailsDrawer>
                            )
                        }
                        
                    }))
                }
            </div>
        </DrawerContent>
    </Drawer>
  )
}

export default SeancesListDrawer