import type { User } from '@/api/auth'
import { studentApiCalls, type BilanEntry, type QcmEntry } from '@/api/student/apiCalls';
import { studentKeys } from '@/api/student/query-keys';
import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import StudentLastSeanceCard from './last-seance-card';
import StudentSeanceHistoryCarousel from './seance-history-carousel';
import StudentSeanceStats from './seance-stats';

const StudentSeancesTabDataWrapper = ({student} : {student : User}) => {
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
        <StudentLastSeanceCard onQcmSubmit={onQcmSubmit} bilans = {bilans}/>
        <StudentSeanceHistoryCarousel onQcmSubmit={onQcmSubmit} bilans = {bilans}/>
        <StudentSeanceStats bilans = {bilans}/>
    </>
  )
}

export default StudentSeancesTabDataWrapper