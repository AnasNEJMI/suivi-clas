import { studentApiCalls } from '@/api/student/apiCalls'
import { studentKeys } from '@/api/student/query-keys'
import { useSuspenseQuery } from '@tanstack/react-query'
import BilansHistoryCard from './bilans-history-card'
import BilansSummaryCard from './bilans-summary-card'
import type { User } from '@/api/auth'
import PresenceSummaryCard from '../presence/presence-summary-card'

const BilansSection = ({student} : {student : User}) => {
    const {data : {bilans}} = useSuspenseQuery({
        queryKey : studentKeys.bilans({studentId : student.id}),
        queryFn : studentApiCalls.fetchBilans,
        staleTime : 2 * 60 * 1000
    }) 

    return (
        <>
            <section className='mt-16 w-full max-w-7xl'>
                <h2 className='text-xl md:text-2xl font-bold bg px-6'><span>Derniers sujets étudiés</span></h2>
                <BilansHistoryCard bilans={bilans}/>
            </section>
            <div className='mt-16 w-full px-6 max-w-7xl grid grid-cols-1 lg:grid-cols-2 items-start gap-16 lg:gap-12'>
                <BilansSummaryCard bilans = {bilans} student = {student}/>
                <PresenceSummaryCard bilans = {bilans} student = {student}/>
            </div>
        </>
    )
}

export default BilansSection