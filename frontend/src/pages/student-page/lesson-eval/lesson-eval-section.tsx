import type { User } from '@/api/auth'
import { studentApiCalls } from '@/api/student/apiCalls'
import { studentKeys } from '@/api/student/query-keys'
import { useSuspenseQuery } from '@tanstack/react-query'
import NoLessonEvalFoundCard from './no-lesson-eval-found-card'
import LessonEvalCard from './lesson-eval-card'

const LessonEvalSection = ({student} : {student : User}) => {
    const {data : {lessonsBySubject}} = useSuspenseQuery({
        queryKey : studentKeys.lessonEvals({studentId : student.id}),
        queryFn : studentApiCalls.fetchLessonEvals,
        staleTime : 2 * 60 * 100
    })

    if(lessonsBySubject.length === 0) return (<NoLessonEvalFoundCard/>)

    return (<LessonEvalCard lessonsBySubject={lessonsBySubject}/>)
}

export default LessonEvalSection