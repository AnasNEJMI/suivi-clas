import type { LessonsBySubject } from '@/api/student/apiCalls'
import { useState } from 'react'
import LessonEvalDropdown from './lesson-eval-dropdown'
import LessonEvalTable from './lesson-eval-table'

const LessonEvalCard = ({lessonsBySubject} : {lessonsBySubject : LessonsBySubject[]}) => {
    console.log('lessonsBySubject', [...lessonsBySubject.map(s => ({id : s.id, label : s.label}))])
    const [selectedSubject, setSelectedSubject] = useState<LessonsBySubject>(lessonsBySubject[0])
    
  return (
    <section className='mt-16 w-full px-6 max-w-7xl'>
        <div className='flex items-start justify-between'>
            <h2 className='text-xl md:text-2xl font-bold bg'>Évaluation des leçons</h2>
            <LessonEvalDropdown lessonsBySubject = {lessonsBySubject} selectedValue={selectedSubject.id.toString()} onValueChange = {setSelectedSubject}/>
        </div>
        <LessonEvalTable selectedSubject = {selectedSubject}/>
    </section>
  )
}

export default LessonEvalCard