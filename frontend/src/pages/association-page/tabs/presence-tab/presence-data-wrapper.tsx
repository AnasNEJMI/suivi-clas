import { associationMemberApiCalls } from '@/api/association-member/apiCalls';
import { associationMemberQueryKeys } from '@/api/association-member/query-keys';
import {useSuspenseQuery } from '@tanstack/react-query';
import AssocPresenceStatsRecap from './presence-stats-recap';
import AssocPresenceStatsPerClass from './presence-stats-per-class';

const AssocPresenceTabDataWrapper = () => {
    const {data : {presenceStatsPerScolarYear}} = useSuspenseQuery({
        queryKey : associationMemberQueryKeys.presenceStats,
        queryFn : associationMemberApiCalls.fetchPresenceStats,
        staleTime : 2 * 60 * 1000
    })

  return (
    <>
        <AssocPresenceStatsRecap presenceStatsPerScolarYear = {presenceStatsPerScolarYear}/>
        <AssocPresenceStatsPerClass presenceStatsPerScolarYear = {presenceStatsPerScolarYear}/>
        {/* <AssocSeanceHistoryCarousel animatorStatsPerScolarYear = {animatorStatsPerScolarYear}/> */}
    </>
  )
}

export default AssocPresenceTabDataWrapper