import type { User } from '@/api/auth'
import { studentApiCalls} from '@/api/student/apiCalls';
import { studentKeys } from '@/api/student/query-keys';
import { useSuspenseQuery } from '@tanstack/react-query';
import ProfileCard from './profile-card';
import AssociationCard from './association-card';
import StatsCard from './stats-card';
import LogoutCard from '../../../logout-card';

const ProfileTabDataWrapper = ({student} : {student : User}) => {
    const {data : {bilans}} = useSuspenseQuery({
        queryKey : studentKeys.bilans({studentId : student.id}),
        queryFn : studentApiCalls.fetchBilans,
        staleTime : 2 * 60 * 100
    })

    const {data : {lessonsBySubject}} = useSuspenseQuery({
        queryKey : studentKeys.lessonEvals({studentId : student.id}),
        queryFn : studentApiCalls.fetchLessonEvals,
        staleTime : 2 * 60 * 100
    })

  return (
    <>
        <ProfileCard student = {student}/>
        <AssociationCard student = {student}/>
        <StatsCard lessonsBySubject = {lessonsBySubject} bilans = {bilans}/>
        <LogoutCard/>
    </>
  )
}

export default ProfileTabDataWrapper