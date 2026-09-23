import type { User } from '@/api/auth'
import {useSuspenseQuery } from '@tanstack/react-query';
import { animatorKeys } from '@/api/animator/query-keys';
import { animatorApiCalls } from '@/api/animator/apiCalls';
import AnimProfileCard from './profile-card';
import AnimContractsCard from './contracts-card';
import LogoutCard from '@/pages/logout-card';

const AnimProfileTabDataWrapper = ({animator} : {animator : User}) => {
    const {data : {scolarYears, lessonsByLevel, seanceDurations}} = useSuspenseQuery({
        queryKey : animatorKeys.baseData,
        queryFn : animatorApiCalls.fetchBaseData,
        staleTime : 2 * 60 * 1000
    })

    const profileQueryKey = animatorKeys.profile;

    const {data : {scolarYears : animatorProfilesByScolarYear}} = useSuspenseQuery({
        queryKey : profileQueryKey,
        queryFn : animatorApiCalls.fetchProfileData,
        staleTime : 2 * 60 * 1000
    })
    
    
    console.log('animator :', animator)
    console.log('scolarYears :', scolarYears)
    console.log('lessonsByLevel :', lessonsByLevel)
    console.log('animatorProfilesByScolarYear :', animatorProfilesByScolarYear)
    console.log('seanceDurations :', seanceDurations)
  return (
    <>
        <AnimProfileCard animator = {animator}/>
        <AnimContractsCard animatorProfilesByScolarYear={animatorProfilesByScolarYear}/>
        <LogoutCard/>
    </>
  )
}

export default AnimProfileTabDataWrapper