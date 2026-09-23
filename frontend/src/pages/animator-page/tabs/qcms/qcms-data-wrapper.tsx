import type { User } from '@/api/auth'
import {useSuspenseQuery } from '@tanstack/react-query';
import { animatorKeys } from '@/api/animator/query-keys';
import { animatorApiCalls } from '@/api/animator/apiCalls';
import AnimQcmsStatsCard from './stats-card';
import AnimQcmsStatsPerClass from './qcms-stats-per-class';

const AnimQcmsTabDataWrapper = ({animator} : {animator : User}) => {

    const baseDataQueryKey = animatorKeys.baseData;
    const seancesQueryKey = animatorKeys.seances;

    const {data : {scolarYears : baseDataPerScolarYear}} = useSuspenseQuery({
        queryKey : baseDataQueryKey,
        queryFn : animatorApiCalls.fetchBaseData,
        staleTime : 2 * 60 * 1000
    })
    const {data : {scolarYears : seancesByScolarYear}} = useSuspenseQuery({
        queryKey : seancesQueryKey,
        queryFn : animatorApiCalls.fetchSeancesData,
        staleTime : 2 * 60 * 1000
    })
    
    
    console.log('animator :', animator)
    console.log('seancesByScolarYear :', seancesByScolarYear)
  return (
    <>
        <AnimQcmsStatsCard seancesByScolarYear = {seancesByScolarYear}/>
        <AnimQcmsStatsPerClass seancesByScolarYear = {seancesByScolarYear} baseData = {baseDataPerScolarYear[0]}/>
    </>
  )
}

export default AnimQcmsTabDataWrapper