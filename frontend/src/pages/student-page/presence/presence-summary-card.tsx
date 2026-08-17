import type { User } from '@/api/auth'
import type { BilanEntry } from '@/api/student/apiCalls'
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { formatDate } from 'date-fns';
import { CheckCircle, CheckIcon, XCircle, XIcon } from 'lucide-react';

const IDEAL_PRESENCE_RATE = 0.65;

const PresenceSummaryCard = ({bilans, student} : {bilans : BilanEntry[], student : User}) => {
    const presentNum = bilans.filter((bilan) => bilan.presence === true).length;
    const absentNum = bilans.filter((bilan) => bilan.presence === false).length;
    const total = bilans.length;
    const presencePct = Math.round((presentNum/total)*100);

    return (
    <section>
        <div className={cn('flex justify-between items-center')}>
            <h2 className='text-xl md:text-2xl font-bold'>Présence</h2>
            {
                bilans.length > 0 &&
                <div className={cn('px-4 py-0.5 rounded-xl text-nowrap text-lg font-bold flex items-center gap-2 text-white', presencePct > IDEAL_PRESENCE_RATE ? 'bg-lime-500' : 'bg-red-500')}>
                    {
                        presencePct > IDEAL_PRESENCE_RATE
                        ? <CheckIcon/>
                        : <XIcon/>
                    }
                    <span>{bilans.length > 0 ? presencePct : 0} %</span>
                </div>
            }
        </div>
        {
            bilans.length > 0 && 
            <div className='relative  font-outfit bg-white shadow-md rounded-xl p-6 border border-zinc-200 overflow-hidden h-min mt-4'>
                <div className='font-bold text-lg'>Bilan de présence</div>
                <Separator className='my-6'/>
                <p className='relative z-30 text-lg opacity-85 mt-2'>Au cours de l'année scolaire 2025/2026, <span className='font-extrabold capitalize'>{student.firstName}</span> a participé à <span className='font-extrabold'>{presentNum}</span> des <span className='font-extrabold'>{total}</span> séances organisées.</p>
                <div className='flex items-center justify-center gap-6 mt-6'>
                    <div className='flex-1 rounded-xl h-24 border-2 border-lime-500 flex flex-col items-center justify-center gap-2'>
                        <span className='font-bold text-base'>{student.gender === 'm' ? 'Présent' : 'Présente'}</span>
                        <span className='font-bold text-lg text-lime-600'>{presentNum}/{total}</span>
                    </div>
                    <div className='flex-1 rounded-xl h-24 border-2 border-red-500 flex flex-col items-center justify-center gap-2'>
                        <span className='font-bold text-base'>{student.gender === 'm' ? 'Absent' : 'Absente'}</span>
                        <span className='font-bold text-lg text-red-500'>{absentNum}/{total}</span>
                    </div>
                </div>
                <Separator className='my-6'/>
                <div className='font-bold text-lg'>Historique de présence</div>
                <div className='relative z-30 flex flex-row flex-nowrap gap-2 overflow-x-auto w-full p-4 bg-zinc-50 border border-zinc-200 rounded-lg pb-4 mt-6'>
                    {
                        bilans.map((bilan, index) => (
                            <div key={index} className='flex flex-col items-center gap-2'>
                                <span className='text-sm font-bold opacity-75'>{formatDate(bilan.date, 'd/MM')}</span>
                                <Separator className='bg-zinc-300'/>
                                <div className={`w-10 h-10 ${bilan.presence? 'border-lime-600' : 'border-red-500 '} border-2 rounded-md flex items-center justify-center`}>
                                    {
                                        bilan.presence
                                        ?<CheckCircle className='size-4 text-lime-600'/>
                                        :<XCircle className='text-red-500 size-4'/>
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
                <p className='text-lg font-medium text-pretty opacity-75'>Aucun bilan n'a encore été soumis.</p>
            </div>
        }
    </section>
  )
}

export default PresenceSummaryCard