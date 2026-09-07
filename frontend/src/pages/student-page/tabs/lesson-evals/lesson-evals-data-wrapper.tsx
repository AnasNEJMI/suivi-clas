import type { User } from '@/api/auth'
import { studentApiCalls} from '@/api/student/apiCalls';
import { studentKeys } from '@/api/student/query-keys';
import { useSuspenseQuery } from '@tanstack/react-query';
import LessonEvalsRecap from './lesson-evals-recap';
import LessonEvalsRecapPerSubject from './lesson-evals-recap-per-subject';

const LessonEvalsTabDataWrapper = ({student} : {student : User}) => {
    const {data : {lessonsBySubject}} = useSuspenseQuery({
        queryKey : studentKeys.lessonEvals({studentId : student.id}),
        queryFn : studentApiCalls.fetchLessonEvals,
        staleTime : 2 * 60 * 100
    })

  return (
    <>
        <LessonEvalsRecap lessonsBySubject = {lessonsBySubject} />
        <LessonEvalsRecapPerSubject lessonsBySubject = {lessonsBySubject}/>
    </>
  )
}

export default LessonEvalsTabDataWrapper