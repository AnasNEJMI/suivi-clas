import type { BilanEntry, LessonsBySubject } from '@/api/student/apiCalls'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ChartLine } from 'lucide-react';

const StatsCard = ({lessonsBySubject, bilans} : {lessonsBySubject : LessonsBySubject[], bilans : BilanEntry[]}) => {
  const seancesCount = bilans.length;
  const presentCount = bilans.filter(b => b.presence).length;
  const qcmCount = bilans.filter(b => b.qcm).length;
  const qcmCompletedCount = bilans.filter(b => b.qcm && b.qcm.completed).length;
  
  const lessonsEvaluatedMap = [];
  for(const subject of lessonsBySubject){
      lessonsEvaluatedMap.push([...subject.lessons.filter(l => l.eval !== null)]);
  }
  
  const lessonsEvaluated = lessonsEvaluatedMap.flat();

  return (
    <Card className='mt-4 font-outfit gap-0'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2 text-lg'><ChartLine className='text-indigo-400 size-6'/>Mes statistiques</CardTitle>
      </CardHeader>
        <CardContent className='mt-0'>
            <div className='flex flex-col gap-2 text-sm w-full opacity-75'>
                <div className={cn('flex items-center justify-between')}>
                  <span>Séances suivies</span>
                    <span className='font-bold'>{presentCount}/{seancesCount}</span>
                </div>
                <div className={cn('flex items-center justify-between')}>
                  <span>QCMs complétés</span>
                    <span className='font-bold'>{qcmCompletedCount}/{qcmCount}</span>
                </div>
                <div className={cn('flex items-center justify-between')}>
                  <span>Leçons abordées</span>
                    <span className='font-bold'>{lessonsEvaluated.length}</span>
                </div>
            </div>
        </CardContent>
    </Card>
  )
}

export default StatsCard