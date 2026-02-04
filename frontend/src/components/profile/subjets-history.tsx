import type { bilanDataPresent, bilanDataType } from '@/lib/types/data.types'
import { cn } from '@/lib/utils';

interface SubjectsHistoryProps {
    className? : string,
    data : bilanDataType[],
}

const subjectCard : Record<string, {label : string, bgColor : string}> = {
    'math' : {
        label : 'Mathématiques',
        bgColor : 'bg-linear-135 from-25% from-amber-400 to-75% to-yellow-400'
    },
    'pc' : {
        label : 'Physique/Chimie',
        bgColor : 'bg-linear-135 from-25% from-red-400 to-75% to-rose-500'
    },
    'svt' : {
        label : 'Mathématiques',
        bgColor : 'bg-linear-135 from-25% from-indigo-400 to-75% to-blue-500 text-white'
    },
}

const SubjectsHistory = ({className, data} : SubjectsHistoryProps) => {

    console.log(subjectCard[(data[0] as bilanDataPresent).bilan.subject]);
  return (
    <>
        <h2 className='text-xl md:text-2xl font-bold bg'>Derniers sujets étudiés</h2>
        <div className={cn('relative z-10 overflow-x-auto py-4 w-full', className)}>
            <div className='inline-flex gap-6'>
                {
                    data && data.length>0 &&
                    data.map((item, index) => {
                        if(!item.present) return;

                        return <div key={index} className={`w-48 h-48 rounded-3xl ${subjectCard[(item as bilanDataPresent).bilan.subject].bgColor} flex flex-col items-center justify-center gap-4`}>
                            <span className='uppercase font-bold text-sm opacity-50'>{(item as bilanDataPresent).bilan.subject}</span>
                            <span className='text-xl font-bold md:text-2xl text-center px-4'>{(item as bilanDataPresent).bilan.lesson}</span>
                            <span className='uppercase font-bold text-base opacity-50'>{(item as bilanDataPresent).date}</span>
                        </div>
                    })
                }
                {/* <div className='w-48 h-48 rounded-3xl bg-linear-135 from-25% from-red-400 to-75% to-rose-500 flex flex-col items-center justify-center gap-4'>
                    <span className='uppercase font-bold text-sm opacity-50'>Physique/Chimie</span>
                    <span className='text-xl font-bold md:text-2xl text-center px-4'>Les Ions</span>
                    <span className='uppercase font-bold text-base opacity-50'>01/03</span>
                </div>
                <div className='w-48 h-48 rounded-3xl bg-linear-135 from-25% from-indigo-400 to-75% to-blue-500 text-white flex flex-col items-center justify-center gap-4'>
                    <span className='uppercase font-bold text-sm opacity-50'>SVT</span>
                    <span className='text-xl font-bold md:text-2xl text-center px-4'>Production Asexuée</span>
                    <span className='uppercase font-bold text-base opacity-50'>01/03</span>
                </div> */}
            </div>
        </div>
    </>
  )
}

export default SubjectsHistory