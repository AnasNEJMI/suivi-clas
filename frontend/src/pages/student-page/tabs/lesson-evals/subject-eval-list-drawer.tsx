import type { Lesson, LessonsBySubject } from '@/api/student/apiCalls';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerClose, DrawerContent,DrawerDescription,DrawerHeader,DrawerTitle,DrawerTrigger } from '@/components/ui/drawer'
import { useIsMobile } from '@/hooks/use-mobile';
import type { CardStyle } from '@/lib/types/data.types';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { ArrowLeftIcon, BicepsFlexedIcon, CalendarIcon, LoaderPinwheelIcon, StarsIcon, TrendingUpIcon, UserIcon } from 'lucide-react';
import React, { useMemo, useState } from 'react'

const EVAL_WEIGHT : Record<'notAcquired' | 'acquiring' | 'acquired' | 'expert', number> = {
    'notAcquired' : 1,
    'acquiring' : 2,
    'acquired' : 3,
    'expert' : 4,
}

const SubjectEvalListDrawer = ({subject, cardStyle,children} : {subject : LessonsBySubject, cardStyle : CardStyle, children : React.ReactNode}) => {
    const isMobile = useIsMobile();
    const [filter, setFilter] = useState<'all' | 'notAcquired' | 'acquiring' | 'acquired' | 'expert'>('all')

    const selectedLessons = useMemo(()=>{
        let lessons : Lesson[] = [];
        if(filter === 'all') lessons =  subject.lessons;
        if(filter === 'notAcquired') lessons =  subject.lessons.filter(l => l.eval === null || l.eval?.evaluation === 'notAcquired');
        if(filter === 'acquiring') lessons = subject.lessons.filter(l => l.eval && l.eval.evaluation === 'acquiring');
        if(filter === 'acquired') lessons = subject.lessons.filter(l => l.eval && l.eval.evaluation === 'acquired');
        if(filter === 'expert') lessons = subject.lessons.filter(l => l.eval && l.eval.evaluation === 'expert');
        
        return lessons.sort((a, b) => {
            const aEval = a.eval?.evaluation;
            const bEval = b.eval?.evaluation;

            if(!aEval && !bEval) return 0;
            if(!aEval && bEval) return 1;
            if(aEval && !bEval) return -1;

            const aEvalWeight = EVAL_WEIGHT[aEval!];
            const bEvalWeight = EVAL_WEIGHT[bEval!];
            return bEvalWeight - aEvalWeight;
        })
    }, [filter, subject.lessons])

    return (
    <Drawer direction={isMobile? 'left' : 'right'}>
        <DrawerTrigger asChild>
            {children}
        </DrawerTrigger>
        <DrawerContent className='h-dvh pl-4 pr-2 pb-2 font-outfit shadow-none border-none bg-zinc-100 md:rounded-t-xl'>
            <DrawerHeader className='flex'>
                <DrawerClose asChild>
                    <Button variant={'ghost'} className='w-fit h-12 opacity-75'><ArrowLeftIcon className='size-6'/> <span>Retour</span></Button>
                </DrawerClose>
                <DrawerTitle className='font-bold text-xl  md:text-3xl tracking-tight'>{subject.label}</DrawerTitle>
                <DrawerDescription className='text-sm'>{subject.lessons.length} leçons au programme</DrawerDescription>
                <div className='mt-4 flex flex-wrap gap-2'>
                    <span onClick={() => setFilter('all')} className={cn('px-4 py-2 border border-zinc-200 rounded-full', filter === 'all'? 'bg-zinc-900 text-white hover:bg-zinc-900' : 'bg-transparent text-zinc-900 hover:bg-zinc-200')}>Tout</span>
                    <span onClick={() => setFilter('notAcquired')} className={cn('px-4 py-2 border border-zinc-200 rounded-full ', filter === 'notAcquired'? 'bg-zinc-900 text-white hover:bg-zinc-900' : 'bg-transparent text-zinc-900 hover:bg-zinc-200')}>Pas acquis</span>
                    <span onClick={() => setFilter('acquiring')} className={cn('px-4 py-2 border border-zinc-200 rounded-full', filter === 'acquiring'? 'bg-zinc-900 text-white hover:bg-zinc-900' : 'bg-transparent text-zinc-900 hover:bg-zinc-200')}>En cours</span>
                    <span onClick={() => setFilter('acquired')} className={cn('px-4 py-2 border border-zinc-200 rounded-full', filter === 'acquired'? 'bg-zinc-900 text-white hover:bg-zinc-900' : 'bg-transparent text-zinc-900 hover:bg-zinc-200')}>Acquis</span>
                    <span onClick={() => setFilter('expert')} className={cn('px-4 py-2 border border-zinc-200 rounded-full', filter === 'expert'? 'bg-zinc-900 text-white hover:bg-zinc-900' : 'bg-transparent text-zinc-900 hover:bg-zinc-200')}>Maîtrise</span>
                </div>
            </DrawerHeader>
            <div className="brand-v-scrollbar overflow-x-hidden overflow-y-auto px-2 flex flex-col gap-2 mt-4">
                {
                    selectedLessons && selectedLessons.map((lesson => {
                        if(!lesson.eval || lesson.eval?.evaluation === 'notAcquired'){
                            return (
                                <div key={lesson.id} className={cn('w-full p-4 rounded-lg bg-white shadow-sm opacity-50')}>
                                    <div className='flex gap-2 w-full'>
                                        <cardStyle.icon className={cn('size-14 p-3 rounded-xl', cardStyle.iconBgColor, cardStyle.highlightTextColor)}/>
                                        <div className='flex flex-col w-full'>
                                            <div className='flex items-start justify-between w-full'>
                                                <span className={cn('font-bold tracking-tight uppercase text-sm',cardStyle.highlightTextColor)}>{cardStyle.label}</span>
                                                <div className='flex justify-end font-medium text-sm'>
                                                    <span className={cn('px-2 h-5 leading-1 tracking-tight rounded-full border flex items-center gap-2 bg-red-200 text-red-700 border-red-400')}><LoaderPinwheelIcon className='w-4'/>Pas acquis</span>
                                                </div>
                                            </div>
                                            <h3 className='text-base lg:text-xl font-semibold mt-2 lg:max-w-full'>{lesson.label}</h3>
                                        </div>
                                    </div>
                                </div>
                            )
                        }else{
                            
                            return (
                                <div key={lesson.id} className={cn('w-full p-4 rounded-lg bg-white shadow-sm')}>
                                    <div className='flex gap-2 w-full'>
                                        <cardStyle.icon className={cn('size-14 p-3 rounded-xl', cardStyle.iconBgColor, cardStyle.highlightTextColor)}/>
                                        <div className='flex flex-col w-full'>
                                            <div className='flex items-start justify-between w-full'>
                                                <span className={cn('font-bold tracking-tight uppercase text-sm',cardStyle.highlightTextColor)}>{cardStyle.label}</span>
                                                <div className='flex justify-end font-medium text-sm'>
                                                    {lesson.eval.evaluation === 'acquiring' && <span className={cn('px-2 h-5 leading-1 tracking-tight rounded-full border flex items-center gap-2 bg-amber-200 text-amber-700 border-amber-400')}><TrendingUpIcon className='w-4'/> En cours</span>}
                                                    {lesson.eval.evaluation === 'acquired' && <span className={cn('px-2 h-5 leading-1 rounded-full border flex items-center gap-2 bg-sky-200 text-sky-700 border-sky-400')}><BicepsFlexedIcon className='w-4'/> Acquis</span>}
                                                    {lesson.eval.evaluation === 'expert' && <span className={cn('px-2 h-5 leading-1 rounded-full border flex items-center gap-2 bg-emerald-200 text-emerald-700 border-emerald-400')}><StarsIcon className='w-4'/> Maîtrise</span>}
                                                </div>
                                            </div>
                                            <h3 className='text-base lg:text-xl font-semibold mt-2 lg:max-w-full'>{lesson.label}</h3>
                                        </div>
                                    </div>
                                    <div className='mt-2 flex justify-between'>
                                        <p className='text-sm opacity-75 flex items-center gap-2 tracking-tight'><UserIcon className='size-4'/><span><span className='capitalize'> Évaluée par {lesson.eval.submittedBy.firstName}</span> <span className='uppercase'>{lesson.eval.submittedBy.lastName}</span></span></p>
                                        <p className='text-sm opacity-75 leading-4 tracking-tight flex flex-col items-start'><span className='flex items-center justify-center gap-1'><CalendarIcon className='size-4'/> {format(lesson.eval.updatedAt, 'd/MM/y', {locale : fr})}</span></p>
                                    </div>
                                </div>
                            )
                        }
                        
                    }))
                }
            </div>
        </DrawerContent>
    </Drawer>
  )
}

export default SubjectEvalListDrawer