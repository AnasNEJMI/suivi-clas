import { animatorApiCalls } from '@/api/animator/apiCalls';
import { animatorKeys } from '@/api/animator/query-keys';
import type {QcmEvalQueryParams } from '@/api/animator/types'
import {useQuery} from '@tanstack/react-query';
import QcmSkeletonCard from './cards/qcm-skeleton-card';
import QcmErrorCard from './cards/qcm-error-card';
import QcmStatsCard from './qcm-stats-card';

interface QcmCardProps{
  params: QcmEvalQueryParams,
}

const   QcmCard = ({
    params,
} : QcmCardProps) => {
    const queryKey = animatorKeys.qcms(params);

    const {data : qcms, isLoading, isError} = useQuery({
        queryKey,
        queryFn : () => animatorApiCalls.fetchQcms(params),
        staleTime : 0,
        gcTime : 45 * 60 * 1000
    })


    if(isLoading) return <QcmSkeletonCard/>
    if(isError) return <QcmErrorCard/>

  return (
    <QcmStatsCard
        key = {params.studentId}
        qcms = {qcms ?? null}
    />
  )
}

export default QcmCard