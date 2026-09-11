import type {VisitStatsPerScolarYear } from '@/api/association-member/apiCalls'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getDaysSinceLastVisit } from '@/lib/utils';
import { CalendarCheck2Icon, CalendarX2Icon, RotateCwFadingClockIcon} from 'lucide-react';

const AssocVisitStatsRecap = ({visitStatsPerScolarYear} : {visitStatsPerScolarYear : VisitStatsPerScolarYear[]}) => {
    const visitStats = visitStatsPerScolarYear[0];
    if(!visitStats || visitStats.classes.length === 0){
        return (
            <Card className='border-2 border-dashed border-zinc-200 shadow-none h-64 flex flex-col items-center justify-center w-full rounded-xl bg-transparent mt-4 p-4'>
                <CardHeader className='flex flex-col items-center justify-center w-full'>
                    <RotateCwFadingClockIcon className='size-10 opacity-70'/>
                    <CardTitle className='text-base font-medium opacity-70 text-center text-balance'>Les données de visites n'ont pas été enregistrées pour le moment.</CardTitle>
                    <CardDescription className='text-pretty text-sm max-w-xl text-center'>Toutes les données de visites enregistrées seront affichées ici dès leur réalisation.</CardDescription>
                </CardHeader>   
            </Card>
        )
    }

    const studentVisitsThisWeekCount = visitStats.classes.map(c => c.students.filter(s => s.lastVisit  && getDaysSinceLastVisit(s.lastVisit!) <= 7)).flat().length;
    const studentVisitsMoreThanAWeekCount = visitStats.classes.map(c => c.students.filter(s => !s.lastVisit  || getDaysSinceLastVisit(s.lastVisit!) > 7)).flat().length;
    
    return (
        <>
            <h3 className='mt-6 font-semibold text-lg lg:text-xl text-zinc-900'>Visites cette semaine</h3>
            <div className='mt-2 flex flex-col lg:flex-row gap-2 lg:gap-4'>
                <div className='rounded-xl p-4 flex items-start justify-between bg-emerald-100 shadow-sm flex-1'>
                    <div className='flex flex-col'>
                        <span className='font-bold text-2xl'>{studentVisitsThisWeekCount}/{studentVisitsThisWeekCount+studentVisitsMoreThanAWeekCount}</span>
                        <span className='opacity-75 text-sm font-medium'>Élèves ayant visité leur profile cette semaine</span>
                    </div>
                    <CalendarCheck2Icon className='size-8 text-emerald-600'/>
                </div>
                <div className='rounded-xl p-4 flex items-start justify-between bg-red-100 shadow-sm flex-1'>
                    <div className='flex flex-col'>
                        <span className='font-bold text-2xl'>{studentVisitsMoreThanAWeekCount}/{studentVisitsThisWeekCount+studentVisitsMoreThanAWeekCount}</span>
                        <span className='opacity-75 text-sm font-medium'>Élèves n'ayant pas visité leur profile cette semaine</span>
                    </div>
                    <CalendarX2Icon className='size-8 text-red-600'/>
                </div>
            </div>
        </>
    )
}

export default AssocVisitStatsRecap