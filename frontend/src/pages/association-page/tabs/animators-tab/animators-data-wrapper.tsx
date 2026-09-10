import { associationMemberApiCalls } from '@/api/association-member/apiCalls';
import { associationMemberQueryKeys } from '@/api/association-member/query-keys';
import {useSuspenseQuery } from '@tanstack/react-query';
import AssocAnimatorStatsRecap from './animator-stats-recap';
import AssocSeanceHistoryCarousel from './seance-history-carousel';

const AnimatorsTabDataWrapper = () => {
    const {data : {animatorStatsPerScolarYear}} = useSuspenseQuery({
        queryKey : associationMemberQueryKeys.animatorStats,
        queryFn : associationMemberApiCalls.fetchAnimatorStats,
        staleTime : 2 * 60 * 1000
    })

  return (
    <>
        <AssocAnimatorStatsRecap animatorStatsPerScolarYear = {animatorStatsPerScolarYear}/>
        <AssocSeanceHistoryCarousel animatorStatsPerScolarYear = {animatorStatsPerScolarYear}/>
    </>
  )
}

export default AnimatorsTabDataWrapper