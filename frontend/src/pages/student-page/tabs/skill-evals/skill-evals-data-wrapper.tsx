import type { User } from '@/api/auth'
import { studentApiCalls} from '@/api/student/apiCalls';
import { studentKeys } from '@/api/student/query-keys';
import { useSuspenseQuery } from '@tanstack/react-query';
import SkillCarousel from './skill-carousel';
import SkillsEvalsCardList from './skills-evals-card-list';

const SkillEvalsTabDataWrapper = ({student} : {student : User}) => {
    const {data : {skillsEvals}} = useSuspenseQuery({
        queryKey : studentKeys.skillEvals({studentId : student.id}),
        queryFn : studentApiCalls.fetchSkillEvals,
        staleTime : 2 * 60 * 100
    })

  return (
    <>
        <SkillCarousel skillsEvals = {skillsEvals} />
        <SkillsEvalsCardList skillsEvals = {skillsEvals}/>
    </>
  )
}

export default SkillEvalsTabDataWrapper