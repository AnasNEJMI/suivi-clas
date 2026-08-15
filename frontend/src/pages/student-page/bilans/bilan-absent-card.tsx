import type { User } from '@/api/auth'
import type { BilanEntry } from '@/api/student/apiCalls'
import { Card, CardContent } from '@/components/ui/card'

const BilanAbsentCard = ({bilan, student} : {bilan : BilanEntry, student : User}) => {
  return (
    <Card className='bg-linear-330 from-25% from-orange-700 to-75% to-red-500 shadow-md rounded-xl border border-red-400 mt-4'>
        <CardContent className='text-white'>
            <div className='mt-6'><span className='opacity-75 uppercase font-bold text-base '>Animée par : </span> <span className='capitalize text-base font-medium opacity-100!'>{bilan.submittedBy.firstName} {bilan.submittedBy.lastName}</span></div>
            <div className='mt-6'><span className='opacity-75 uppercase font-bold text-base '>Bilan : </span> <p className='text-base font-medium opacity-100!'><span className='capitalize'>{student.firstName}</span> était {student.gender === 'm'? 'absent' : 'absente'} lors de cette séance.</p></div>
        </CardContent>
    </Card>
  )
}

export default BilanAbsentCard