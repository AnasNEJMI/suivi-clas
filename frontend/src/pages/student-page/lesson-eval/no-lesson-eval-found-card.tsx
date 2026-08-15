import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

const NoLessonEvalFoundCard = () => {
  return (
    <section>
      <div className={cn('flex justify-between items-center')}>
          <h2 className='text-xl md:text-2xl font-bold'>Bilan de séance</h2>
      </div>
      <Card className='bg-white shadow-md rounded-xl border border-zinc-200 mt-4'>
          <CardContent className='flex items-center justify-center'>
              <p className='text-lg font-medium text-pretty opacity-75'>Aucune évaluation de leçons n'a encore été soumise.</p>
          </CardContent>
      </Card>
    </section>
  )
}

export default NoLessonEvalFoundCard