import type { BilanEntry, LessonsBySubject } from '@/api/student/apiCalls';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  CalendarCheck2Icon,
  CheckCircle2Icon,
  BookOpenIcon,
  ChartLineIcon,
} from 'lucide-react';

export const StatsCard = ({
  lessonsBySubject,
  bilans,
}: {
  lessonsBySubject: LessonsBySubject[];
  bilans: BilanEntry[];
}) => {
  const seancesCount = bilans.length;
  const presentCount = bilans.filter((b) => b.presence).length;
  const presenceRate = seancesCount === 0 ? 0 : Math.round((presentCount / seancesCount) * 100);

  const qcmCount = bilans.filter((b) => b.qcm).length;
  const qcmCompletedCount = bilans.filter((b) => b.qcm && b.qcm.completed).length;
  const qcmRate = qcmCount === 0 ? 0 : Math.round((qcmCompletedCount / qcmCount) * 100);

  const lessonsEvaluated = lessonsBySubject
    .flatMap((s) => s.lessons)
    .filter((l) => l.eval !== null);

  return (
    <Card className="bg-white border-slate-200 rounded-3xl p-5 lg:p-6 shadow-xs flex flex-col justify-between">
      <div>
        <CardHeader className="p-0 mb-4">
          <CardTitle className="flex items-center gap-2 text-lg font-extrabold text-slate-900">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center">
              <ChartLineIcon className="size-5 text-indigo-600" />
            </div>
            Mes Statistiques
          </CardTitle>
        </CardHeader>

        <CardContent className="p-0 space-y-3">
          {/* Séances suivies */}
          <div className="p-3 bg-slate-50/80 border border-slate-200/80 rounded-2xl">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1.5">
              <span className="flex items-center gap-1.5 text-slate-800">
                <CalendarCheck2Icon className="size-4 text-emerald-600" />
                Séances suivies
              </span>
              <span className="text-slate-900 font-extrabold">
                {presentCount} / {seancesCount}
              </span>
            </div>
            <div className="w-full bg-slate-200/70 h-2 rounded-full overflow-hidden">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${presenceRate}%` }}
              />
            </div>
          </div>

          {/* QCMs complétés */}
          <div className="p-3 bg-slate-50/80 border border-slate-200/80 rounded-2xl">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1.5">
              <span className="flex items-center gap-1.5 text-slate-800">
                <CheckCircle2Icon className="size-4 text-indigo-600" />
                QCMs complétés
              </span>
              <span className="text-slate-900 font-extrabold">
                {qcmCompletedCount} / {qcmCount}
              </span>
            </div>
            <div className="w-full bg-slate-200/70 h-2 rounded-full overflow-hidden">
              <div
                className="bg-indigo-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${qcmRate}%` }}
              />
            </div>
          </div>

          {/* Leçons abordées */}
          <div className="p-3 bg-slate-50/80 border border-slate-200/80 rounded-2xl flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
              <BookOpenIcon className="size-4 text-amber-500" />
              Notions & leçons révisées
            </span>
            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-extrabold">
              {lessonsEvaluated.length} leçon{lessonsEvaluated.length > 1 ? 's' : ''}
            </span>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default StatsCard;