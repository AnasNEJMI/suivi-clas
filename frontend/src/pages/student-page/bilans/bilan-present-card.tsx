import type { BilanEntry } from '@/api/student/apiCalls'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

const BilanPresentCard = ({bilan} : {bilan : BilanEntry}) => {
  return (
    <Card className={cn('bg-linear-330 from-15% from-lime-200 to-60% to-lime-300 shadow-md rounded-xl border border-lime-400 mt-4')}>
        <CardContent className=''>
            <div className='uppercase font-bold opacity-75 text-sm'>Animée par : <span className='capitalize text-base font-medium text-black opacity-100!'>{bilan.submittedBy.firstName} {bilan.submittedBy.lastName}</span></div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
                <div className='flex flex-col'>
                    <span className='uppercase font-bold opacity-75 text-sm'>Matière</span>
                    <span className='text-lg font-medium'>{bilan.lesson!.subject!.label!}</span>
                </div>
                <div className='flex flex-col'>
                    <span className='uppercase font-bold opacity-75 text-sm'>Leçon(s)</span>
                    <span className='text-lg font-medium'>{bilan.lesson!.label}</span>
                </div>
            </div>
            <div className='uppercase font-bold opacity-75 text-sm mt-6'>Bilan</div>
            <p className='text-base font-medium text-pretty'>{bilan.summary!}</p>
        </CardContent>
    </Card>
  )
}

export default BilanPresentCard