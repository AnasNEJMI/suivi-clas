import type { QcmEntry } from '@/api/student/apiCalls'
import { CARD_STYLES, type Subject } from '@/lib/types/data.types'
import { cn } from '@/lib/utils'
import { useMemo, useState } from 'react'
import QcmQuestionnaire from '../../bilans/qcm-questionnaire'
import { AlertTriangleIcon, CalendarIcon, RotateCwFadingClockIcon, TrophyIcon, UserIcon } from 'lucide-react'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import QcmResultsQuestionnaire from '../../bilans/qcm-results-questionnaire'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const QcmsList = ({onQcmSubmit, qcms} : {qcms : QcmEntry[], onQcmSubmit : (qcm: QcmEntry) => void}) => {
    const [filter, setFilter] = useState<'all' | 'completed' | 'notCompleted'>('all')

    const selectedQcms = useMemo(()=>{
        if(filter === 'all') return qcms;
        if(filter === 'completed') return qcms.filter(q => q.completed);
        if(filter === 'notCompleted') return qcms.filter(q => !q.completed);
    }, [filter, qcms])
    return (
    <div>
        <div className="flex flex-col gap-2 mt-4">
            <div className='mt-6 flex gap-2'>
                <span onClick={() => setFilter('all')} className={cn('px-4 py-2 border border-zinc-200 rounded-full cursor-pointer', filter === 'all'? 'bg-zinc-900 text-white hover:bg-zinc-900' : 'bg-transparent text-zinc-900 hover:bg-zinc-200')}>Tout</span>
                <span onClick={() => setFilter('completed')} className={cn('px-4 py-2 border border-zinc-200 rounded-full cursor-pointer ', filter === 'completed'? 'bg-zinc-900 text-white hover:bg-zinc-900' : 'bg-transparent text-zinc-900 hover:bg-zinc-200')}>Complétés</span>
                <span onClick={() => setFilter('notCompleted')} className={cn('px-4 py-2 border border-zinc-200 rounded-full cursor-pointer', filter === 'notCompleted'? 'bg-zinc-900 text-white hover:bg-zinc-900' : 'bg-transparent text-zinc-900 hover:bg-zinc-200')}>À faire</span>
            </div>
            {
                (!qcms || qcms.length === 0) &&
                <Card className='border-2 border-dashed border-zinc-200 shadow-none h-64 flex flex-col items-center justify-center w-full rounded-xl bg-transparent p-4'>
                    <CardHeader className='flex flex-col items-center justify-center w-full'>
                        <RotateCwFadingClockIcon className='size-10 opacity-70'/>
                        <CardTitle className='text-base font-medium opacity-70 text-center text-balance'>Aucun QCM enregistrée pour le moment.</CardTitle>
                        <CardDescription className='text-pretty text-sm max-w-xl text-center'>Tous les QCMs enregistrées seront affichées ici dès leur soumission.</CardDescription>
                    </CardHeader>
                </Card>
            }
            {
                qcms && selectedQcms && selectedQcms.map((qcm => {
                    const cardStyle = CARD_STYLES[qcm.lesson!.subject.label as Subject];
                    
                    if(qcm.completed){
                        return (
                            <QcmResultsQuestionnaire key={qcm.id} qcm={qcm}>
                                <div className={cn('flex items-center gap-4 w-full p-4 rounded-lg bg-white shadow-sm hover:shadow-md hover:-translate-y-1 transition-all ease-out duration-100 cursor-pointer')}>
                                    <div key={qcm.id} className={cn('flex-1')}>
                                        <div className='flex gap-2 w-full'>
                                            <cardStyle.icon className={cn('size-14 p-3 rounded-xl', cardStyle.iconBgColor, cardStyle.highlightTextColor)}/>
                                            <div className='flex flex-col w-full'>
                                                <div className='flex items-start justify-between w-full'>
                                                    <span className={cn('font-bold tracking-tight uppercase text-sm',cardStyle.highlightTextColor)}>{cardStyle.label}</span>
                                                    <div className='flex justify-end font-medium text-sm'>
                                                        <span className={cn('px-2 h-5 leading-1 rounded-full border flex items-center gap-2 bg-emerald-200 text-emerald-600')}>Qcm : <TrophyIcon className='w-4'/> {qcm.score!}/{qcm.qcmQuestions.length}</span>
                                                    </div>
                                                </div>
                                                <h3 className='text-lg lg:text-xl font-semibold mt-2 max-w-48 lg:max-w-full truncate'>{qcm.lesson!.label}</h3>
                                            </div>
                                        </div>
                                        <div className='mt-2 flex justify-between'>
                                            <p className='text-sm opacity-75 flex items-center gap-2 tracking-tight'><UserIcon className='size-4'/><span><span className='capitalize'>{qcm.submittedBy.firstName}</span> <span className='uppercase'>{qcm.submittedBy.lastName}</span></span></p>
                                            <p className='text-sm opacity-75 leading-4 tracking-tight flex flex-col items-start'><span className='flex items-center justify-center gap-1'><CalendarIcon className='size-4'/> {format(qcm.date, 'd/MM/y', {locale : fr})}</span></p>
                                        </div>
                                    </div>
                                </div>
                            </QcmResultsQuestionnaire>
                        )
                    }else{
                        return (
                            <QcmQuestionnaire key={qcm.id} onQcmSubmit={onQcmSubmit} qcm={qcm}>
                                <div className={cn('flex items-center gap-4 w-full p-4 rounded-lg bg-white shadow-sm hover:shadow-md hover:-translate-y-1 transition-all ease-out duration-100 cursor-pointer')}>
                                    <div key={qcm.id} className={cn('flex-1')}>
                                        <div className='flex gap-2 w-full'>
                                            <cardStyle.icon className={cn('size-14 p-3 rounded-xl', cardStyle.iconBgColor, cardStyle.highlightTextColor)}/>
                                            <div className='flex flex-col w-full'>
                                                <div className='flex items-start justify-between w-full'>
                                                    <span className={cn('font-bold tracking-tight uppercase text-sm',cardStyle.highlightTextColor)}>{cardStyle.label}</span>
                                                    <div className='flex justify-end font-medium text-sm'>
                                                        <span className={cn('px-2 h-5 leading-1 rounded-full border flex items-center gap-2 bg-red-200 text-red-600')}><AlertTriangleIcon className='w-4'/>À faire</span>
                                                    </div>
                                                </div>
                                                <h3 className='text-lg lg:text-xl font-semibold mt-2 max-w-48 lg:max-w-full truncate'>{qcm.lesson!.label}</h3>
                                            </div>
                                        </div>
                                        <div className='mt-2 flex justify-between'>
                                            <p className='text-sm opacity-75 flex items-center gap-2 tracking-tight'><UserIcon className='size-4'/><span><span className='capitalize'>{qcm.submittedBy.firstName}</span> <span className='uppercase'>{qcm.submittedBy.lastName}</span></span></p>
                                            <p className='text-sm opacity-75 leading-4 tracking-tight flex flex-col items-start'><span className='flex items-center justify-center gap-1'><CalendarIcon className='size-4'/> {format(qcm.date, 'd/MM/y', {locale : fr})}</span></p>
                                        </div>
                                    </div>
                                </div>
                            </QcmQuestionnaire>
                        )
                    }
                }))
            }
        </div>
    </div>
  )
}

export default QcmsList