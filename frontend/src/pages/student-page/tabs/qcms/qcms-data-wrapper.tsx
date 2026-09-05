import type { User } from '@/api/auth'
import { studentApiCalls, type BilanEntry, type QcmEntry } from '@/api/student/apiCalls';
import { studentKeys } from '@/api/student/query-keys';
import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import QcmsRecap from './qcms-recap';
import QcmsList from './qcms-list';

const QcmsTabDataWrapper = ({student} : {student : User}) => {
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

    const qcms = bilans.map(b => {
        if(b.qcm) return b.qcm;
        else return null;
    }).filter(q => q !== null);
  return (
    <>
        <QcmsRecap qcms = {qcms} />
        <QcmsList onQcmSubmit = {onQcmSubmit} qcms = {qcms}/>
    </>
  )
}

export default QcmsTabDataWrapper