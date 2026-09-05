import type { User } from '@/api/auth'
import { studentApiCalls, type BilanEntry, type QcmEntry } from '@/api/student/apiCalls';
import { studentKeys } from '@/api/student/query-keys';
import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import LastSeanceCard from './last-seance-card';
import SeanceHistoryCarousel from './seance-history-carousel';

const SeancesTabDataWrapper = ({student} : {student : User}) => {
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
        <LastSeanceCard onQcmSubmit={onQcmSubmit} bilans = {bilans}/>
        <SeanceHistoryCarousel onQcmSubmit={onQcmSubmit} bilans = {bilans}/>
    </>
  )
}

export default SeancesTabDataWrapper