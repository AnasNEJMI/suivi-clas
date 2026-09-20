import type { SeancesByScolarYearEntry } from '@/api/animator/seances.types'
import {GraduationCapIcon, MessageCircleQuestionIcon, NotebookTextIcon, RotateCwFadingClockIcon } from 'lucide-react';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const SeancesStats = ({seancesByScolarYear} : {seancesByScolarYear : SeancesByScolarYearEntry[]}) => {
    const seancesData = seancesByScolarYear[0];
    if(!seancesData || seancesData.classes.length === 0){
        return (
            <div className='mt-6'>
                <h3 className='font-semibold text-lg lg:text-xl text-zinc-900'>Bilan de l'année</h3>
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
    
    let seancesTotal = 0;
    let bilansTotal = 0;
    let qcmsTotal = 0;
    for (let i = 0; i < seancesData.classes.length; i++) {
        const clas = seancesData.classes[i]!;
        seancesTotal += clas.seances.length;
        for (let j = 0; j < clas.seances.length; j++) {
            const seance = clas.seances[j];
            bilansTotal += seance.studentBilans.filter(s => s.bilan !== null).length;
            qcmsTotal += seance.studentBilans.filter(s => s.bilan !== null && s.bilan.qcm !== null).length;
        }
    }

    return (
    <div className='mt-6'>
        <h3 className='font-semibold text-lg lg:text-xl text-zinc-900'>Bilan de l'année</h3>
        <div className='flex flex-col lg:flex-row gap-2 mt-4'>
            <div className='flex-1/3 flex flex-col items-center p-4 rounded-md shadow-md bg-white gap-2'>
                <div className='flex items-center gap-2'>
                    <GraduationCapIcon className='text-indigo-700 size-8'/>
                    <span className='font-bold text-3xl'>{seancesTotal}</span>
                </div>
                <span className='text-sm opacity-75'>Séances réalisées</span>
            </div>
            <div className='flex-2/3 flex items-center gap-2'>
                <div className='flex flex-col items-center p-4 rounded-md shadow-md bg-white gap-2 flex-1'>
                    <div className='flex items-center gap-2'>
                        <NotebookTextIcon className='text-emerald-700 size-8'/>
                        <span className='font-bold text-3xl'>{bilansTotal}</span>
                    </div>
                    <span className='text-sm opacity-75'>Bilans soumis</span>
                </div>
                <div className='flex flex-col items-center p-4 rounded-md shadow-md bg-white gap-2 flex-1'>
                    <div className='flex items-center gap-2'>
                        <MessageCircleQuestionIcon className='text-amber-600 size-8'/>
                        <span className='font-bold text-3xl'>{qcmsTotal}</span>
                    </div>
                    <span className='text-sm opacity-75'>Qcms générés</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SeancesStats