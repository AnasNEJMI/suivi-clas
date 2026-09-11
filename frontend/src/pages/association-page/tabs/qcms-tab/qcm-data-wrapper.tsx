import { associationMemberApiCalls } from '@/api/association-member/apiCalls';
import { associationMemberQueryKeys } from '@/api/association-member/query-keys';
import {useSuspenseQuery } from '@tanstack/react-query';
import AssocQCMStatsRecap from './qcm-stats-recap';
import AssocVisitStatsPerClass from './qcm-stats-per-class';

const AssocQCMTabDataWrapper = () => {
    const {data : {qcmStatsPerScolarYear}} = useSuspenseQuery({
        queryKey : associationMemberQueryKeys.qcmStats,
        queryFn : associationMemberApiCalls.fetchQcmStats,
        staleTime : 2 * 60 * 1000
    })

  return (
    <>
        <AssocQCMStatsRecap qcmStatsPerScolarYear = {qcmStatsPerScolarYear}/>
        <AssocVisitStatsPerClass qcmStatsPerScolarYear = {qcmStatsPerScolarYear}/>
    </>
  )
}

export default AssocQCMTabDataWrapper