import type { Bilan } from '@/api/api.types';
import { cn } from '@/lib/utils';

interface SubjectsHistoryProps {
    className? : string,
    bilans : Bilan[],
}

// const subjectCard : Record<string, {label : string, bgColor : string}> = {
//     'math' : {
//         label : 'Mathématiques',
//         bgColor : 'bg-linear-135 from-25% from-amber-400 to-75% to-yellow-400'
//     },
//     'pc' : {
//         label : 'Physique/Chimie',
//         bgColor : 'bg-linear-135 from-25% from-red-400 to-75% to-rose-500'
//     },
//     'svt' : {
//         label : 'Mathématiques',
//         bgColor : 'bg-linear-135 from-25% from-indigo-400 to-75% to-blue-500 text-white'
//     },
// }

const SubjectsHistory = ({className, bilans} : SubjectsHistoryProps) => {

  return (
    <>
        <h2 className='text-xl md:text-2xl font-bold bg'>Derniers sujets étudiés</h2>
        <div className={cn('relative z-10 overflow-x-auto py-4 w-full', className)}>
            <div className='inline-flex gap-6'>
                <pre>{JSON.stringify(bilans, null, 2)}</pre>
                {/* {
                    bilans && bilans.length>0 &&
                    bilans.map((bilan, index) => {
                        if(!bilan.presence) return;

                        return <div key={index} className={`w-48 py-8 rounded-3xl ${subjectCard[bilan.subject!].bgColor} flex flex-col items-center justify-center gap-4`}>
                            <span className='uppercase font-bold text-sm opacity-50'>{bilan.subject!}</span>
                            <span className='text-lg font-bold md:text-xl text-center px-4'>{bilan.lesson!.label}</span>
                            <span className='uppercase font-bold text-base opacity-50'>{formatDate(bilan.date, 'd/MM/y')}</span>
                        </div>
                    })
                } */}
            </div>
        </div>
    </>
  )
}

export default SubjectsHistory