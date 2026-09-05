import type { User } from '@/api/auth'
import { studentApiCalls, type BilanEntry, type QcmEntry } from '@/api/student/apiCalls';
import { studentKeys } from '@/api/student/query-keys';
import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import LastSeanceCard from './last-seance-card';

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
        {/* <div className='absolute top-0 left-0 w-full h-[calc(100dvh-5rem)] md:h-[calc(100dvh-1rem)] bg-green-300 z-50'></div> */}
        <LastSeanceCard onQcmSubmit={onQcmSubmit} bilans = {bilans}/>
    </>
  )
}

export default SeancesTabDataWrapper