import type { User } from '@/api/auth'
import { studentApiCalls } from '@/api/student/apiCalls'
import { studentKeys } from '@/api/student/query-keys'
import { Card, CardContent } from '@/components/ui/card'
import { useSuspenseQuery } from '@tanstack/react-query'
import SkillsEvalCard from './skills-eval-card'

const SkillsEvalSection = ({student} : {student : User}) => {
    const {data : {skillsEvals}} = useSuspenseQuery({
        queryKey : studentKeys.skillEvals({studentId : student.id}),
        queryFn : studentApiCalls.fetchSkillEvals,
        staleTime : 2 * 60 * 100
    })
  return (
    <section className='mt-16 w-full px-6 max-w-7xl'>
        <h2 className='text-xl md:text-2xl font-bold bg'>Méthodologie</h2>
        {
            skillsEvals.length === 0
            ? <Card className='bg-white shadow-md rounded-xl border border-zinc-200 mt-4'>
                <CardContent className='flex items-center justify-center'>
                    <p className='text-lg font-medium text-pretty opacity-75'>Aucune évaluation des compétences méthodologie n'a encore été soumise.</p>
                </CardContent>
            </Card>
            : <SkillsEvalCard skillsEvals={skillsEvals}/>
        }
    </section>
  )
}

export default SkillsEvalSection