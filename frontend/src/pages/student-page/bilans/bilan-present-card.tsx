import type { BilanEntry } from '@/api/student/apiCalls'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

const BilanPresentCard = ({bilan} : {bilan : BilanEntry}) => {
  return (
    <Card className={cn('bg-white mt-4 border-lime-500 border-2 shadow-card')}>
        <CardContent className=''>
            <div className='uppercase font-bold text-sm flex gap-2 items-center'><span className='px-2 py-1 bg-zinc-900 text-white rounded-md'>Animée par</span> <span className='capitalize text-base font-medium text-black opacity-100!'>{bilan.submittedBy.firstName} {bilan.submittedBy.lastName}</span></div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
                <div className='flex items-start gap-2'>
                    <span className='uppercase font-bold text-sm px-2 py-1 bg-zinc-900 text-white rounded-md'>Matière</span>
                    <span className='text-lg font-medium'>{bilan.lesson!.subject!.label!}</span>
                </div>
                <div className='flex gap-2 items-start'>
                    <span className='uppercase font-bold text-sm px-2 py-1 bg-zinc-900 text-white rounded-md'>Leçon</span>
                    <span className='text-lg font-medium'>{bilan.lesson!.label}</span>
                </div>
            </div>
            <div className='flex flex-col gap-2 mt-6'>
                <span className='uppercase font-bold text-sm px-2 py-1 bg-zinc-900 text-white rounded-md w-fit'>Bilan</span>
                <p className='text-base font-medium text-pretty'>{bilan.summary!}</p>
            </div>
        </CardContent>
    </Card>
  )
}

export default BilanPresentCard