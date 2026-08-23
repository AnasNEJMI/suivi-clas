import { associationMemberApiCalls } from '@/api/association-member/apiCalls'
import { associationMemberQueryKeys } from '@/api/association-member/query-keys'
import { useSuspenseQuery } from '@tanstack/react-query'
import QcmStatsCard from './qcm-stats-card'
import NoPresenceStatsCard from './no-qcm-stats-card'

const QcmStatsSection = () => {
    const {data : {qcmStatsPerScolarYear}} = useSuspenseQuery({
        queryKey : associationMemberQueryKeys.qcmStats,
        queryFn : associationMemberApiCalls.fetchQcmStats,
        staleTime : 2 * 60 * 1000
    }) 

  if(qcmStatsPerScolarYear.length === 0)return <NoPresenceStatsCard/>
  return <QcmStatsCard qcmStatsPerScolarYear = {qcmStatsPerScolarYear} />
}

export default QcmStatsSection