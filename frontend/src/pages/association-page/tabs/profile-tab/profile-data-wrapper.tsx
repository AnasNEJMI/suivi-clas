import { associationMemberApiCalls } from '@/api/association-member/apiCalls';
import { associationMemberQueryKeys } from '@/api/association-member/query-keys';
import type { User } from '@/api/auth'
import {useSuspenseQuery } from '@tanstack/react-query';
import AssocProfileCard from './cards/profile-card';
import LogoutCard from '@/pages/logout-card';
import AssocClassesCard from './cards/classes-card';
import AssocAnimatorsCard from './cards/animators-card';

const ProfileTabDataWrapper = ({association} : {association : User}) => {

    const {data : {visitStatsPerScolarYear}} = useSuspenseQuery({
        queryKey :  associationMemberQueryKeys.visitStats,
        queryFn : associationMemberApiCalls.fetchVisitStats,
        staleTime : 2 * 60 * 1000
    })

    const {data : {animatorStatsPerScolarYear}} = useSuspenseQuery({
        queryKey : associationMemberQueryKeys.animatorStats,
        queryFn : associationMemberApiCalls.fetchAnimatorStats,
        staleTime : 2 * 60 * 1000
    })

    const animators = animatorStatsPerScolarYear[0].animators.map(animator => animator.animator);
    const classes = visitStatsPerScolarYear[0].classes;

  return (
    <>
        <AssocProfileCard association = {association}/>
        <div className='flex flex-col lg:flex-row w-full lg:gap-4'>
            <AssocAnimatorsCard animators = {animators}/>
            <AssocClassesCard classes = {classes}/>
        </div>
        <LogoutCard/>
    </>
  )
}

export default ProfileTabDataWrapper