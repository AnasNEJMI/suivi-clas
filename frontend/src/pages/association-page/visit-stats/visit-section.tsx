import { associationMemberApiCalls } from '@/api/association-member/apiCalls'
import { associationMemberQueryKeys } from '@/api/association-member/query-keys'
import { useSuspenseQuery } from '@tanstack/react-query'
import VisitStatsCard from './visit-card'
import NoPresenceStatsCard from './no-visit-stats-card'

const VisitStatsSection = () => {
    const {data : {visitStatsPerScolarYear}} = useSuspenseQuery({
        queryKey : associationMemberQueryKeys.visitStats,
        queryFn : associationMemberApiCalls.fetchVisitStats,
        staleTime : 2 * 60 * 1000
    }) 

  if(visitStatsPerScolarYear.length === 0)return <NoPresenceStatsCard/>
  return <VisitStatsCard visitStatsPerScolarYear = {visitStatsPerScolarYear} />
}

export default VisitStatsSection