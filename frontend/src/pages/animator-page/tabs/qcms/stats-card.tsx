import type { SeancesByScolarYearEntry } from '@/api/animator/seances.types'
import { MessageCircleCheckIcon, MessageCircleQuestionIcon, MessageCircleXIcon, RotateCwFadingClockIcon } from 'lucide-react';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const AnimQcmsStatsCard = ({seancesByScolarYear}: {seancesByScolarYear : SeancesByScolarYearEntry[]}) => {
    const seancesData = seancesByScolarYear[0];
    if(!seancesData || seancesData.classes.length === 0){
        return (
            <div className='mt-6'>
                <h3 className='font-semibold text-lg lg:text-xl text-zinc-900'>Bilan des QCMs</h3>
                <Card className='border-2 border-dashed border-zinc-200 shadow-none h-64 flex flex-col items-center justify-center w-full rounded-xl bg-transparent mt-4 p-4'>
                    <CardHeader className='flex flex-col items-center justify-center w-full'>
                        <RotateCwFadingClockIcon className='size-10 opacity-70'/>
                        <CardTitle className='text-base font-medium opacity-70 text-center text-balance'>Aucune séance enregistrée pour le moment.</CardTitle>
                        <CardDescription className='text-pretty text-sm max-w-xl text-center'>Les statistiques des séance réalisées seront affichées ici dès leur enregistrement.</CardDescription>
                    </CardHeader>   
                </Card>
            </div>
        )
    }
     
    const bilans = seancesData.classes.flatMap(c => c.seances.flatMap(s => s.studentBilans));
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

    const qcmsCount = qcms.length;
    const qcmCompletionRate = (100 * qcms.filter(qcm => qcm?.completed).length / qcmsCount);
    const qcmTotalPoints = qcms.reduce((accumulator, currentValue) => accumulator + (currentValue?.score?? 0), 0)
    const qcmAverageScore = (qcmTotalPoints / (qcmsCount * 10));

    console.log('qcmsCount',qcmsCount)
    console.log('qcmCompletionRate',qcmCompletionRate)
    console.log('qcmTotalPoints',qcmTotalPoints)
    return (
        <div className='mt-6'>
            <h3 className='font-semibold text-lg lg:text-xl text-zinc-900'>Bilan des QCMs</h3>
            <div className='flex flex-col lg:flex-row gap-2 mt-4'>
                <div className='flex-1/3 flex flex-col items-center p-4 rounded-md shadow-md bg-white gap-2'>
                    <div className='flex items-center gap-2'>
                        <MessageCircleQuestionIcon className='text-indigo-700 size-8'/>
                        <span className='font-bold text-3xl'>{qcmsCount}</span>
                    </div>
                    <span className='text-sm opacity-75'>QCMs somis</span>
                </div>
                <div className='flex-2/3 flex items-center gap-2'>
                    <div className='flex flex-col items-center p-4 rounded-md shadow-md bg-white gap-2 flex-1'>
                        <div className='flex items-center gap-2'>
                            <MessageCircleCheckIcon className='text-emerald-700 size-8'/>
                            <span className='font-bold text-3xl'>{qcmCompletionRate} %</span>
                        </div>
                        <span className='text-sm opacity-75'>QCMs complétés</span>
                    </div>
                    <div className='flex flex-col items-center p-4 rounded-md shadow-md bg-white gap-2 flex-1'>
                        <div className='flex items-center gap-2'>
                            <MessageCircleXIcon className='text-amber-600 size-8'/>
                            <span className='font-bold text-3xl'>{qcmAverageScore}/10</span>
                        </div>
                        <span className='text-sm opacity-75'>Note moyenne</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AnimQcmsStatsCard