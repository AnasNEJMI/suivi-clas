import { studentApiCalls, type BilanEntry, type QcmEntry } from '@/api/student/apiCalls'
import { studentKeys } from '@/api/student/query-keys'
import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import BilansHistoryCard from './bilans-history-card'
import BilansSummaryCard from './bilans-summary-card'
import type { User } from '@/api/auth'
import PresenceSummaryCard from '../presence/presence-summary-card'

const BilansSection = ({student} : {student : User}) => {
    const queryKey = studentKeys.bilans({studentId : student.id});

    const {data : {bilans}} = useSuspenseQuery({
        queryKey,
        queryFn : studentApiCalls.fetchBilans,
        staleTime : 2 * 60 * 1000
    })

    
    const queryClient = useQueryClient();

    const onQcmSubmit = (updatedQcm : QcmEntry) => {
        const storageKey = `qcm-progress-${updatedQcm.id}`;
        localStorage.removeItem(storageKey);
        
        console.log('cache state updated :', queryClient.getQueryData(queryKey))
        queryClient.setQueryData<{bilans : BilanEntry[]} | undefined>(queryKey, (prev) => 
            {
                console.log('prev', prev);
                if (!prev) return prev
                return {
                    bilans: prev.bilans.map(b =>
                    b.qcm?.id === updatedQcm.id ? { ...b, qcm: updatedQcm } : b
                ),
            }
        })

        console.log('cache state updated :', queryClient.getQueryData(queryKey))
    }

    return (
        <>
            <section className='mt-16 w-full max-w-7xl'>
                <h2 className='text-xl md:text-2xl font-bold bg px-6'><span>Dernières séances</span></h2>
                <BilansHistoryCard bilans={bilans}/>
            </section>
            <div className='mt-16 w-full px-6 max-w-7xl grid grid-cols-1 lg:grid-cols-2 items-start gap-16 lg:gap-12'>
                <BilansSummaryCard bilans = {bilans} student = {student} onQcmSubmit = {onQcmSubmit}/>
                <PresenceSummaryCard bilans = {bilans} student = {student}/>
            </div>
        </>
    )
}

export default BilansSection