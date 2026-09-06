import type { SkillsEvalEntry } from '@/api/student/apiCalls'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { RotateCwFadingClockIcon } from 'lucide-react'
import SkillsEvalCard from './skills-eval-card'

const SkillsEvalsCardList = ({skillsEvals} : {skillsEvals : SkillsEvalEntry[]}) => {
  
    if(skillsEvals.length === 0) {
        return (
            <>
                <h3 className='mt-6 font-semibold text-lg lg:text-xl text-zinc-900 tracking-tight'>Évaluations des animateurs</h3>
                <Card className='border-2 mt-4 border-dashed border-zinc-200 shadow-none h-64 flex flex-col items-center justify-center w-full rounded-xl bg-transparent p-4'>
                    <CardHeader className='flex flex-col items-center justify-center w-full'>
                        <RotateCwFadingClockIcon className='size-10 opacity-70'/>
                        <CardTitle className='text-base font-medium opacity-70 text-center text-balance'>Aucune évaluation de méthodologie n'est enregistrée pour le moment.</CardTitle>
                        <CardDescription className='text-pretty text-sm max-w-xl text-center'>Une fois les évaluations soumises, vous découvrirez les commentaires de chacun des animateurs qui vous accompagnent.</CardDescription>
                    </CardHeader>
                </Card>
            </>
        )
    }
    
    return (
        <>
            <div className='mt-6 flex items-center justify-between'>
                <h3 className='font-semibold text-lg lg:text-xl text-zinc-900 tracking-tight'>Évaluations des animateurs</h3>
                <span className='bg-white border border-zinc-200 px-4 py-1 text-sm tracking-tight rounded-full text-zinc-800'>{skillsEvals.length} évaluations</span>
            </div>
            <div className='w-full flex flex-col gap-4 mt-4'>
                {
                    skillsEvals.map((skillsEval) => (
                        <SkillsEvalCard key = {skillsEval.id} skillsEval = {skillsEval}/>
                    ))
                }
            </div>
        </>
    )
}

export default SkillsEvalsCardList