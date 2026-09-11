import { associationMemberApiCalls } from '@/api/association-member/apiCalls';
import { associationMemberQueryKeys } from '@/api/association-member/query-keys';
import {useSuspenseQuery } from '@tanstack/react-query';
import AssocVisitStatsRecap from './visits-stats-recap';
import AssocVisitStatsPerClass from './visit-stats-per-class';

const AssocVisitTabDataWrapper = () => {
    const {data : {visitStatsPerScolarYear}} = useSuspenseQuery({
        queryKey : associationMemberQueryKeys.visitStats,
        queryFn : associationMemberApiCalls.fetchVisitStats,
        staleTime : 2 * 60 * 1000
    })

  return (
    <>
        <AssocVisitStatsRecap visitStatsPerScolarYear = {visitStatsPerScolarYear}/>
        <AssocVisitStatsPerClass visitStatsPerScolarYear = {visitStatsPerScolarYear}/>
        {/* <AssocSeanceHistoryCarousel animatorStatsPerScolarYear = {animatorStatsPerScolarYear}/> */}
    </>
  )
}

export default AssocVisitTabDataWrapper