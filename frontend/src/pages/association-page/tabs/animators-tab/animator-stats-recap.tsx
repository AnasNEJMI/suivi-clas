import type { AnimatorStatsPerScolarYear } from '@/api/association-member/apiCalls'
import { LibraryBigIcon, MessageCircleQuestionIcon, NotebookTextIcon } from 'lucide-react';

const AssocAnimatorStatsRecap = ({animatorStatsPerScolarYear} : {animatorStatsPerScolarYear : AnimatorStatsPerScolarYear[]}) => {
    const animatorStats = animatorStatsPerScolarYear[0];
    const totalSeancesArray = animatorStats.animators.map(a => a.totalSeances);
    let totalSeances = 0;
    for (let i = 0; i < totalSeancesArray.length; i++) {
        const total = totalSeancesArray[i];
        totalSeances+=total;
        
    }
    const totalBilansArray = animatorStats.animators.map(a => a.totalBilans);
    let totalBilans = 0;
    for (let i = 0; i < totalBilansArray.length; i++) {
        const total = totalBilansArray[i];
        totalBilans+=total;
        
    }

    const totalQcmsArray = animatorStats.animators.map(a => a.totalQcms);
    let totalQcms = 0;
    for (let i = 0; i < totalQcmsArray.length; i++) {
        const total = totalQcmsArray[i];
        totalQcms+=total;
        
    }
    return (
        <>
            <h3 className='mt-6 font-semibold text-lg lg:text-xl text-zinc-900'>Bilan de l'année</h3>
            <div className='mt-2 flex flex-col lg:flex-row gap-2 lg:gap-4'>
                <div className='rounded-xl p-4 flex items-center justify-between bg-white shadow-sm lg:flex-1/3'>
                    <div className='flex flex-col'>
                        <span className='font-bold text-2xl'>{totalSeances}</span>
                        <span className='opacity-75 text-sm font-medium'>séances réalisées</span>
                    </div>
                    <LibraryBigIcon className='size-8'/>
                </div>
                <div className='flex  lg:flex-2/3 gap-2 lg:gap-4'>
                    <div className='rounded-xl p-4 flex items-center justify-between bg-emerald-100 shadow-sm flex-1'>
                        <div className='flex flex-col'>
                            <span className='font-bold text-2xl'>{totalBilans}</span>
                            <span className='opacity-75 text-sm font-medium'>bilans soumis</span>
                        </div>
                        <NotebookTextIcon className='size-8 text-emerald-600'/>
                    </div>
                    <div className='rounded-xl p-4 flex items-center justify-between bg-indigo-100 shadow-sm flex-1'>
                        <div className='flex flex-col'>
                            <span className='font-bold text-2xl'>{totalQcms}</span>
                            <span className='opacity-75 text-sm font-medium'>qcms envoyés</span>
                        </div>
                        <MessageCircleQuestionIcon className='size-8 text-indigo-600'/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AssocAnimatorStatsRecap