import { associationMemberApiCalls } from '@/api/association-member/apiCalls'
import { associationMemberQueryKeys } from '@/api/association-member/query-keys'
import { useSuspenseQuery } from '@tanstack/react-query'
import AnimatorCard from './animator-card'
import NoAnimatorCard from './no-animator-card'

const AnimatorSection = () => {
    const {data : {animatorStatsPerScolarYear}} = useSuspenseQuery({
        queryKey : associationMemberQueryKeys.animatorStats,
        queryFn : associationMemberApiCalls.fetchAnimatorStats,
        staleTime : 2 * 60 * 1000
    }) 

  if(animatorStatsPerScolarYear.length === 0)return <NoAnimatorCard/>
  return <AnimatorCard animatorStatsPerScolarYear = {animatorStatsPerScolarYear} />
}

export default AnimatorSection