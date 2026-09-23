import type { User } from '@/api/auth'
import { Card, CardHeader, CardTitle } from '@/components/ui/card';

const AnimProfileCard = ({animator} : {animator : User}) => {
    const name = `${animator.firstName} ${animator.lastName}`;
  return (
    <Card className='mt-4 font-outfit gap-0'>
      <CardHeader>
        <CardTitle className='flex items-center justify-center gap-2 text-lg'><div className='text-white size-6 capitalize w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center'>{name.slice(0,1)}</div> <span>{name}</span></CardTitle>
      </CardHeader>
    </Card>
  )
}

export default AnimProfileCard