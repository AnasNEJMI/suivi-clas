import type { LessonsBySubject } from '@/api/student/apiCalls'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { BookOpenIcon, RotateCwFadingClockIcon } from 'lucide-react'

const LessonEvalsRecap = ({lessonsBySubject} : {lessonsBySubject : LessonsBySubject[]}) => {
    if(!lessonsBySubject){
        return(
            <>
                <h3 className='mt-6 font-semibold text-lg lg:text-xl text-zinc-900 tracking-tight'>Bilan global</h3>
                <Card className='border-2 mt-4 border-dashed border-zinc-200 shadow-none h-64 flex flex-col items-center justify-center w-full rounded-xl bg-transparent p-4'>
                    <CardHeader className='flex flex-col items-center justify-center w-full'>
                        <RotateCwFadingClockIcon className='size-10 opacity-70'/>
                        <CardTitle className='text-base font-medium opacity-70 text-center text-balance'>Aucune leçon n'a encore été évaluée pour le moment.</CardTitle>
                        <CardDescription className='text-pretty text-sm max-w-xl text-center'>Une fois des évaluations de leçons soumises, vous découvrirez ici le bilan global de maîtrise.</CardDescription>
                    </CardHeader>
                </Card>
            </>
        )
    }
    
    const lessonsEvaluatedMap = [];
    for(const subject of lessonsBySubject){
        lessonsEvaluatedMap.push([...subject.lessons.filter(l => l.eval !== null)]);
    }
    
    const lessonsEvaluated = lessonsEvaluatedMap.flat();

    if(lessonsEvaluated.length === 0){
        return(
            <>
                <h3 className='mt-6 font-semibold text-lg lg:text-xl text-zinc-900 tracking-tight'>Bilan global</h3>
                <Card className='border-2 mt-4 border-dashed border-zinc-200 shadow-none h-64 flex flex-col items-center justify-center w-full rounded-xl bg-transparent p-4'>
                    <CardHeader className='flex flex-col items-center justify-center w-full'>
                        <RotateCwFadingClockIcon className='size-10 opacity-70'/>
                        <CardTitle className='text-base font-medium opacity-70 text-center text-balance'>Aucune leçon n'a encore été évaluée pour le moment.</CardTitle>
                        <CardDescription className='text-pretty text-sm max-w-xl text-center'>Une fois des évaluations de leçons soumises, vous découvrirez ici le bilan global de maîtrise.</CardDescription>
                    </CardHeader>
                </Card>
            </>
        )
    }

    const lessonsNotAcquiredCount = lessonsEvaluated.flat().filter(l => l.eval!.evaluation === 'notAcquired').length;
    const lessonsAquiringCount = lessonsEvaluated.flat().filter(l => l.eval!.evaluation === 'acquiring').length;
    const lessonsAcquiredCount = lessonsEvaluated.flat().filter(l => l.eval!.evaluation === 'acquired').length;
    const lessonsExpertCount = lessonsEvaluated.flat().filter(l => l.eval!.evaluation === 'expert').length;
    return (
    <>
        <h3 className='mt-6 font-semibold text-lg lg:text-xl text-zinc-900 tracking-tight'>Bilan global</h3>
        <Card className='mt-4 shadow-card flex flex-col items-start justify-start w-full rounded-xl bg-white'>
            <CardHeader className='w-full flex justify-between'>
                <BookOpenIcon className='size-12 p-2 bg-indigo-100 rounded-md text-indigo-800'/>
                <div className='flex flex-col items-end'>
                    <CardTitle className='text-3xl font-bold'>{lessonsEvaluated.flat().length}</CardTitle>
                    <CardDescription className='text-sm text-center'>Leçons abordées</CardDescription>
                </div>
            </CardHeader>

            <CardFooter className='grid grid-cols-2 lg:grid-cols-4 w-full gap-2'>
                <div className='bg-red-100 p-4 rounded-md flex flex-col items-center'>
                    <span className='font-bold text-xl'>{lessonsNotAcquiredCount}</span>
                    <span className='text-sm opacity-75 tracking-tight'>Pas Acquis</span>
                </div>
                <div className='bg-orange-100 p-4 rounded-md flex flex-col items-center'>
                    <span className='font-bold text-xl'>{lessonsAquiringCount}</span>
                    <span className='text-sm opacity-75 tracking-tight'>En cours</span>
                </div>
                <div className='bg-lime-100 p-4 rounded-md flex flex-col items-center'>
                    <span className='font-bold text-xl'>{lessonsAcquiredCount}</span>
                    <span className='text-sm opacity-75 tracking-tight'>Acquis</span>
                </div>
                <div className='bg-emerald-100 p-4 rounded-md flex flex-col items-center'>
                    <span className='font-bold text-xl'>{lessonsExpertCount}</span>
                    <span className='text-sm opacity-75 tracking-tight'>Maîtrise</span>
                </div>
            </CardFooter>
        </Card>
    </>
  )
}

export default LessonEvalsRecap