import type { QcmWithQuestions } from '@/api/api.types'
import { cn } from '@/lib/utils'
import { formatDate } from 'date-fns'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '../ui/button'

import { Progress } from "@/components/ui/progress"
import { Separator } from '../ui/separator'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import NextQcmQuestion from './next-qcm-question'

interface QcmsProps {
    className ? : string,
    qcmWithQuestions : QcmWithQuestions[]
}
const Qcms = ({className, qcmWithQuestions} : QcmsProps) => {
  return (
    <section className={cn(className, 'mt-12')}>
        <h2 className='text-xl md:text-2xl font-bold'>Liste des Qcms</h2>
        <div className='relative bg-white shadow-md rounded-xl p-6 border border-zinc-200 overflow-hidden h-min mt-4'>
            {
                qcmWithQuestions.length > 0 && 
                qcmWithQuestions.map((qcm, index) => (
                    <div key={index} className='rounded-lg w-full border border-zinc-200 p-4 flex'>
                        <div className='flex flex-1 flex-col'>
                            <span className='capitalise font-bold text-lg'>{qcm.lesson.label}</span>
                            <span className='font-light opacity-75'>{formatDate(qcm.createdAt, 'd/MM/y')}</span>
                        </div>
                         <Dialog>
                            <DialogTrigger asChild className=''>
                                <Button>Compléter</Button>
                            </DialogTrigger>
                            <DialogContent className='w-[calc(100%-3rem)]! sm:max-w-3xl flex flex-col'>
                                <DialogHeader>
                                    <DialogTitle className='flex items-center justify-start gap-4'>
                                        <span className='font-bold text-xl'>QCM</span>
                                        <span className='capitalise font-medium text-base px-4 py-1 bg-primary rounded-full text-primary-foreground'>{qcm.lesson.label}</span> 
                                    </DialogTitle>
                                    <DialogDescription className='text-base'>
                                        {/* Ce QCM a pour objectif de vous premettre d'évaluer votre maîtrise des notions essentielles de ce chapitre, testez votre compréhension et votre intuition ! */}
                                    </DialogDescription>
                                </DialogHeader>
                                <Separator/>
                                <div>
                                    <div>
                                        <span className='text-sm font-bold opacity-75'>Question : 3/10</span>
                                        <Progress value={33} className='mt-2 w-full'/>
                                    </div>
                                    <Carousel
                                        opts={{
                                            
                                        }}
                                        className='mt-8'
                                    >
                                        <CarouselContent className='w-full'>
                                            {
                                                qcm.qcmQuestions.map((qcmQuestion,index) => (
                                                    <CarouselItem key={index}>
                                                        <p className='font-bold text-2xl'>{qcmQuestion.bankQuestion.question}</p>
                                                        <NextQcmQuestion className='w-full'/>
                                                    </CarouselItem>

                                                ))
                                            }
                                            <CarouselItem>2</CarouselItem>
                                            <CarouselItem>3</CarouselItem>
                                        </CarouselContent>
                                    </Carousel>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                ))
            }
        </div>
    </section>
  )
}

export default Qcms