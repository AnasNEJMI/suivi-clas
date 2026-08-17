import type { User } from '@/api/auth'
import type { BilanEntry } from '@/api/student/apiCalls'
import { Card, CardContent } from '@/components/ui/card'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

const BilanAbsentCard = ({bilan, student} : {bilan : BilanEntry, student : User}) => {
  return (
    <Card className='bg-white mt-4 border-2 border-red-500 shadow-card '>
        <CardContent>
            <p className='font-medium text-base text-red-600'><span className='font-bold capitalize'>{student.firstName}</span> <span className='font-bold uppercase'>{student.lastName}</span> était {student.gender === 'm'? 'absent':'absente'} durant la séeance du <span className='font-bold capitalize underline underline-offset-2'>{format(bilan.date, 'PPP', {locale : fr})}</span> animée par <span className='font-bold capitalize'>{bilan.submittedBy.firstName}</span> <span className='font-bold uppercase'>{bilan.submittedBy.lastName}</span>.</p>
        </CardContent>
    </Card>
  )
}

export default BilanAbsentCard