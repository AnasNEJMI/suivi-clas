import type { BilanEntry } from '@/api/student/apiCalls'
import { CalendarCheck2Icon, CalendarIcon, CalendarX2Icon, PieChartIcon } from 'lucide-react'

const SeanceStats = ({bilans} : {bilans : BilanEntry[]}) => {
    let presentBilansCount : string | number = '', absentBilansCount : string | number = '', presenceRate : string | number = '';
    if(bilans.length === 0){
        presentBilansCount = '-';
        absentBilansCount = '-';
        presenceRate = '-';
    }else{
        presentBilansCount = bilans.filter(b => b.presence).length;
        absentBilansCount = bilans.filter(b => !b.presence).length;
        presenceRate = Math.round(100 * presentBilansCount/bilans.length)
    }
  return (
    <div className='mt-12 grid xl:grid-cols-4 gap-4 grid-cols-2'>
        <div className='rounded-xl p-6 shadow-sm bg-white flex flex-col gap-4'>
            <div className='flex items-center justify-center gap-4'>
                <CalendarIcon className='text-indigo-500 size-8'/>
                <span className='text-indigo-500 text-4xl font-bold'>{bilans.length}</span>
            </div>
            <h4 className='opacity-75 text-sm text-center'>Séances réalisées</h4>
        </div>
        <div className='rounded-xl p-6 shadow-sm bg-white flex flex-col gap-4'>
            <div className='flex items-center justify-center gap-4'>
                <CalendarCheck2Icon className='text-lime-600 size-8'/>
                <span className='text-lime-600 text-4xl font-bold'>{presentBilansCount}/{bilans.length}</span>
            </div>
            <h4 className='opacity-75 text-sm text-center'>Nombre de présences</h4>
        </div>
        <div className='rounded-xl p-6 shadow-sm bg-white flex flex-col gap-4'>
            <div className='flex items-center justify-center gap-4'>
                <CalendarX2Icon className='text-red-500 size-8'/>
                <span className='text-red-500 text-4xl font-bold'>{absentBilansCount}/{bilans.length}</span>
            </div>
            <h4 className='opacity-75 text-sm text-center'>Nombre d'absences</h4>
        </div>
        <div className='rounded-xl p-6 shadow-sm bg-white flex flex-col gap-4'>
            <div className='flex items-center justify-center gap-4'>
                <PieChartIcon className='text-amber-600 size-8'/>
                <span className='text-amber-600 text-4xl font-bold'>{presenceRate}%</span>
            </div>
            <h4 className='opacity-75 text-sm text-center'>Taux de présence</h4>
        </div>
    </div>
  )
}

export default SeanceStats