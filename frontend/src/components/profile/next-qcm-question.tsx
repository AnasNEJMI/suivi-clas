import { Button } from '../ui/button'
import { cn } from '@/lib/utils'

interface NextQcmQuestionProps{
  className ? : string
}
const NextQcmQuestion = ({className} : NextQcmQuestionProps) => {
  return (
    <Button className={cn('font-bold text-lg h-12! rounded-full', className)}>
        Valider
    </Button>
  )
}

export default NextQcmQuestion