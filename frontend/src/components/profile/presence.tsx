import { Separator } from '../ui/separator'
import { CheckCircle, XCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Bilan } from '@/api/api.types'
import { formatDate } from 'date-fns'

interface PresenceProps {
    className? : string,
    bilans : Bilan[],
    student : string,
}

const Presence = ({className, bilans, student} : PresenceProps) => {
    const presentNum = bilans.filter((bilan) => bilan.presence === true).length;
    const absentNum = bilans.filter((bilan) => bilan.presence === false).length;
    const total = bilans.length;

  return (
    <>
        <div className={cn('flex justify-between items-center', className)}>
            <h2 className='text-xl md:text-2xl font-bold'>Présence</h2>
            <span className='px-4 py-0.5 bg-zinc-800 text-white rounded-xl text-nowrap text-lg font-bold'>{Math.round((presentNum/total)*100)} %</span>
        </div>
        {
            bilans.length > 0 && 
            <div className='relative bg-white shadow-md rounded-xl p-6 border border-zinc-200 overflow-hidden h-min mt-4'>
                <p className='relative z-30 text-lg opacity-85'>Au cours de l'année scolaire 2025/2026, <span className='font-extrabold'>{student}</span> a participé à <span className='font-extrabold'>{presentNum}</span> des <span className='font-extrabold'>{total}</span> séances organisées par le pôle scientifique.</p>
                <div className='flex items-center justify-center gap-6 mt-6'>
                    <div className='flex-1 rounded-xl h-24 bg-green-300 flex flex-col items-center justify-center gap-2'>
                        <span className='font-bold text-sm opacity-75 text-green-700'>Présent</span>
                        <span className='font-bold text-lg opacity-75'>{presentNum}/{total}</span>
                    </div>
                    <div className='flex-1 rounded-xl h-24 bg-red-400/85 border border-orange-500/50 flex flex-col items-center justify-center gap-2'>
                        <span className='font-bold text-sm opacity-75 text-red-700'>Absent</span>
                        <span className='font-bold text-lg opacity-75'>{absentNum}/{total}</span>
                    </div>
                </div>
                <div className='relative z-30 flex flex-row flex-nowrap gap-2 overflow-x-auto w-full p-4 bg-zinc-50 rounded-lg mt-4 pb-4'>
                    {
                        bilans.map((bilan, index) => (
                            <div key={index} className='flex flex-col items-center gap-2'>
                                <span className='text-sm font-light opacity-75'>{formatDate(bilan.date, 'd/MM')}</span>
                                <Separator/>
                                <div className={`w-10 h-10 ${bilan.presence? 'bg-linear-330 from-30% from-green-400 to-80% to-lime-400 border-lime-400 border' : 'bg-red-zinc-50 border-zinc-200 border'} rounded-md flex items-center justify-center`}>
                                    {
                                        bilan.presence
                                        ?<CheckCircle className='opacity-25 size-4'/>
                                        :<XCircle className='opacity-25 size-4'/>
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        }
        {
            bilans.length <= 0 && 
            <div className='relative bg-white shadow-md rounded-xl p-6 border border-zinc-200 overflow-hidden h-min mt-4'>
                <p className='relative z-30 text-lg opacity-85'>Aucune présence n'a été encore enregistrée.</p>
            </div>
        }
    </>
  )
}


export default Presence