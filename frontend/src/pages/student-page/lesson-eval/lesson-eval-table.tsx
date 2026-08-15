import type { LessonEval } from '@/api/api.types'
import type { LessonsBySubject } from '@/api/student/apiCalls'
import { Card, CardContent } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useIsBigScreen } from '@/hooks/use-bigScreen'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

const lessonEvalBars : Record<LessonEval, {label : string, level : number}> = {
    'notAcquired' : {label : 'Non acquis', level : 0},
    'acquiring' : {label : 'En cours', level : 1},
    'acquired' : {label : 'Acquis', level : 2},
    'expert' : {label : 'Maîtrise', level : 3},
}

const LessonEvalTable = ({selectedSubject} : {selectedSubject : LessonsBySubject}) => {
    const  isBigScreen = useIsBigScreen();
  return (
    <Card className='mt-6'>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead >Chapitre</TableHead>
                        {
                            !isBigScreen
                        ?   <>
                                <TableHead  className='text-center'>Niveau</TableHead>
                                <TableHead className="text-right">Date</TableHead>
                            </>
                        :   <TableHead className="text-right">Niveau</TableHead>
                        }
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        selectedSubject.lessons.length>0 &&
                        selectedSubject.lessons.map((lesson) => {
                            const label = lesson.label
                            const evalLabel = lesson.eval?.evaluation ? lessonEvalBars[lesson.eval?.evaluation].label : lessonEvalBars['notAcquired'].label;
                            const evalLevel = lesson.eval?.evaluation ? lessonEvalBars[lesson.eval?.evaluation].level : 0
                            return (
                                <TableRow key={lesson.id}>
                                    <TableCell className="font-medium max-w-32 truncate">{label}</TableCell>
                                    <TableCell className='text-right flex items-center justify-center gap-1'>
                                        <div className={cn('flex gap-2 w-full', !isBigScreen ? 'justify-center' : 'justify-end')}>
                                            <span className={`${evalLevel >= 3 ? ' text-lime-500 font-bold' : 'text-black'} rounded-full`}>{evalLabel}</span>
                                            
                                            <div className='flex gap-px items-end h-4'>
                                                <span className={`h-1 w-1 ${evalLevel >= 1 ? 'bg-lime-400' : 'bg-zinc-100'} rounded-full`}></span>
                                                <span className={`h-2 w-1 ${evalLevel >= 2 ? 'bg-lime-400' : 'bg-zinc-100'} rounded-full`}></span>
                                                <span className={`h-3 w-1 ${evalLevel >= 3 ? 'bg-lime-400' : 'bg-zinc-100'} rounded-full`}></span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    {
                                        !isBigScreen &&
                                        <TableCell className="text-right capitalize">{lesson.eval?.updatedAt ? format(lesson.eval?.updatedAt, 'PPP', {locale : fr}) : '-'}</TableCell>
                                    }
                                </TableRow>
                            )}
                        )
                    }
                </TableBody>
            </Table>
        </CardContent>
    </Card>
  )
}

export default LessonEvalTable