import type {QcmStatsPerScolarYear} from '@/api/association-member/apiCalls'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {FileCheckIcon, FileX2Icon, MessageCircleQuestionIcon, RotateCwFadingClockIcon} from 'lucide-react';

const AssocQCMStatsRecap = ({qcmStatsPerScolarYear} : {qcmStatsPerScolarYear : QcmStatsPerScolarYear[]}) => {
    const qcmStats = qcmStatsPerScolarYear[0];
    if(!qcmStats || qcmStats.classes.length === 0){
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

    const qcmsCompletedArr = qcmStats.classes.map(c => c.students.map(s => s.qcmCompletedCount)).flat();
    let qcmsCompleted = 0;
    for (let i = 0; i < qcmsCompletedArr.length; i++) {
        const completed = qcmsCompletedArr[i]!;
        qcmsCompleted+=completed;
    }

    const qcmsTotalArr = qcmStats.classes.map(c => c.students.map(s => s.totalQcms)).flat();
    let qcmsTotal = 0;
    for (let i = 0; i < qcmsTotalArr.length; i++) {
        const total = qcmsTotalArr[i]!;
        qcmsTotal+=total;
    }
    
    const qcmsTodo = qcmsTotal - qcmsCompleted;

    return (
        <>
            <h3 className='mt-6 font-semibold text-lg lg:text-xl text-zinc-900'>Bilan des QCMs</h3>
            <div className='mt-2 flex flex-col lg:flex-row gap-2 lg:gap-4'>
                <div className='rounded-xl p-4 flex items-start justify-between bg-white shadow-sm flex-1'>
                    <div className='flex flex-col'>
                        <span className='font-bold text-2xl'>{qcmsTotal}</span>
                        <span className='opacity-75 text-sm font-medium'>Total des QCMs soumis par les animateurs</span>
                    </div>
                    <MessageCircleQuestionIcon className='size-8 text-zinc-900'/>
                </div>
                <div className='rounded-xl p-4 flex items-start justify-between bg-emerald-100 shadow-sm flex-1'>
                    <div className='flex flex-col'>
                        <span className='font-bold text-2xl'>{qcmsCompleted}/{qcmsTotal}</span>
                        <span className='opacity-75 text-sm font-medium'>QCMs complétés par les élèves</span>
                    </div>
                    <FileCheckIcon className='size-8 text-emerald-600'/>
                </div>
                <div className='rounded-xl p-4 flex items-start justify-between bg-red-100 shadow-sm flex-1'>
                    <div className='flex flex-col'>
                        <span className='font-bold text-2xl'>{qcmsTodo}/{qcmsTotal}</span>
                        <span className='opacity-75 text-sm font-medium'>QCMs à faire par les élèves</span>
                    </div>
                    <FileX2Icon className='size-8 text-red-600'/>
                </div>
            </div>
        </>
    )
}

export default AssocQCMStatsRecap