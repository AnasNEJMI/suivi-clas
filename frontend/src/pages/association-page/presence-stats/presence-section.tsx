import { associationMemberApiCalls } from '@/api/association-member/apiCalls'
import { associationMemberQueryKeys } from '@/api/association-member/query-keys'
import { useSuspenseQuery } from '@tanstack/react-query'
import PresenceStatsCard from './presence-card'
import NoPresenceStatsCard from './no-presence-stats-card'

const PresenceStatsSection = () => {
    const {data : {presenceStatsPerScolarYear}} = useSuspenseQuery({
        queryKey : associationMemberQueryKeys.presenceStats,
        queryFn : associationMemberApiCalls.fetchPresenceStats,
        staleTime : 2 * 60 * 1000
    }) 

  if(presenceStatsPerScolarYear.length === 0)return <NoPresenceStatsCard/>
  return <PresenceStatsCard presenceStatsPerScolarYear = {presenceStatsPerScolarYear} />
}

export default PresenceStatsSection