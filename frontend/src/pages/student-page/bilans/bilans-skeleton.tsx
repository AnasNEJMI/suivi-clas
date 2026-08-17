import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'

const Skeleton = () => {
  return (
    <>
      <section className='mt-12 w-full px-6 max-w-7xl'>
          <h2 className='text-xl md:text-2xl font-bold bg'>Derniers sujets étudiés</h2>
          <div className="flex flex-row gap-4 mt-6 flex-nowrap w-dvh overflow-x-auto">
          {
            [...Array(3)].map((_, index) => (
              <Card key={index} className={`min-w-48 py-8 rounded-3xl bg-zinc-100 border-none`}>
                  <CardContent className="flex flex-col items-center justify-center h-full">
                      <div className='uppercase font-bold text-sm bg-white text-center px-2 rounded-md animate-pulse w-full'><span className='opacity-0'>.</span></div>
                      <Separator className="opacity-20 mt-2"/>
                      <div className='uppercase font-bold text-sm bg-white text-center px-2 rounded-md animate-pulse w-full mt-4'><span className='opacity-0'>.</span></div>
                      <div className='uppercase font-bold text-sm bg-white text-center px-2 rounded-md animate-pulse w-full mt-2'><span className='opacity-0'>.</span></div>
                      <Separator className="opacity-20  mt-4"/>
                      <div className='uppercase font-bold text-sm bg-white text-center px-2 rounded-md animate-pulse w-full mt-2'><span className='opacity-0'>.</span></div>
                      <div className='uppercase font-bold text-sm bg-white text-center px-2 rounded-md animate-pulse w-full mt-2'><span className='opacity-0'>.</span></div>
                  </CardContent>
              </Card>
            ))
          }

    </div>
      </section>
      <section className='mt-12 w-full px-6 max-w-7xl'>
          <div className='flex justify-between items-center'>
            <h2 className='text-xl md:text-2xl font-bold'>Bilan séance</h2>
            <div className='w-48 rounded-lg bg-zinc-100 h-10 animate-pulse border border-zinc-300 flex items-center justify-end px-4'>
                <ChevronDown size={16}/>
            </div>
      </div>
      <Card className={cn('shadow-md rounded-xl mt-6')}>
          <CardContent className=''>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div className='flex flex-col'>
                      <div className='uppercase font-bold text-lg bg-zinc-100 text-center px-2 rounded-md animate-pulse w-full mt-2'><span className='opacity-0'>.</span></div>
                  </div>
                  <div className='flex flex-col'>
                      <div className='uppercase font-bold text-lg bg-zinc-100 text-center px-2 rounded-md animate-pulse w-full mt-2'><span className='opacity-0'>.</span></div>
                  </div>
              </div>
              <div className='uppercase font-bold text-lg bg-zinc-100 text-center px-2 rounded-md animate-pulse w-full mt-6'><span className='opacity-0'>.</span></div>
              <div className='uppercase font-bold text-lg bg-zinc-100 text-center px-2 rounded-md animate-pulse w-full mt-6'><span className='opacity-0'>.</span></div>
              <div className='uppercase font-bold text-lg bg-zinc-100 text-center px-2 rounded-md animate-pulse w-full mt-6'><span className='opacity-0'>.</span></div>
          </CardContent>
      </Card>
      </section>
    </>
  )
}

export default Skeleton