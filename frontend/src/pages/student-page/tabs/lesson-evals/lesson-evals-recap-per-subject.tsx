import type { LessonsBySubject } from '@/api/student/apiCalls';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CARD_STYLES, type Subject } from '@/lib/types/data.types';
import { cn } from '@/lib/utils';
import { ChevronRightIcon, RotateCwFadingClockIcon } from 'lucide-react';
import SubjectEvalListDrawer from './subject-eval-list-drawer';

interface LessonEvalsRecapPerSubjectProps {
  lessonsBySubject: LessonsBySubject[];
}

const LessonEvalsRecapPerSubject = ({
  lessonsBySubject,
}: LessonEvalsRecapPerSubjectProps) => {
  if (!lessonsBySubject || lessonsBySubject.length === 0) {
    return (
      <div className="font-outfit mt-6 space-y-3">
        <h3 className="text-lg lg:text-xl font-bold text-slate-900 tracking-tight">
          Par matière
        </h3>
        <Card className="border-2 border-dashed border-slate-200 shadow-none h-64 flex flex-col items-center justify-center w-full rounded-2xl bg-transparent p-4">
          <CardHeader className="flex flex-col items-center justify-center w-full p-0 text-center">
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mb-3">
              <RotateCwFadingClockIcon className="size-5 text-slate-400" />
            </div>
            <CardTitle className="text-base font-semibold text-slate-700">
              Aucune leçon n'a encore été évaluée pour le moment.
            </CardTitle>
            <p className="text-xs text-slate-400 mt-1 max-w-md">
              Une fois des évaluations de leçons soumises, vous découvrirez ici le bilan de maîtrise par matière.
            </p>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="font-outfit mt-6 space-y-3">
      <h3 className="text-lg lg:text-xl font-bold text-slate-900 tracking-tight">
        Par matière
      </h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {lessonsBySubject.map((subject) => {
          const cardStyle = CARD_STYLES[subject.label as Subject];
          const totalLessons = subject.lessons.length;

          // Pas abordé : absence d'évaluation OU évaluation = 'notAcquired'
          const notAddressedCount = subject.lessons.filter(
            (l) => !l.eval || l.eval.evaluation === 'notAcquired'
          ).length;

          const acquiringCount = subject.lessons.filter(
            (l) => l.eval?.evaluation === 'acquiring'
          ).length;
          const acquiredCount = subject.lessons.filter(
            (l) => l.eval?.evaluation === 'acquired'
          ).length;
          const expertCount = subject.lessons.filter(
            (l) => l.eval?.evaluation === 'expert'
          ).length;

          // Leçons évaluées (en cours + acquis + maîtrise)
          const lessonsEvaluated = acquiringCount + acquiredCount + expertCount;

          const lessonsEvaluatedPct = totalLessons
            ? Math.round((100 * lessonsEvaluated) / totalLessons)
            : 0;

          return (
            <Card
              key={subject.id}
              className={cn(
                'font-outfit border-none shadow-none flex flex-col justify-between w-full rounded-2xl transition-all duration-200',
                cardStyle.bgColor
              )}
            >
              <CardHeader className="w-full flex flex-row items-start justify-between pb-3">
                <div className="space-y-1">
                  <cardStyle.icon
                    className={cn(
                      'size-9 p-2 rounded-xl',
                      cardStyle.iconBgColor,
                      cardStyle.highlightTextColor
                    )}
                  />
                  <CardTitle className="font-bold text-lg pt-1">
                    {cardStyle.label}
                  </CardTitle>
                  <p className="text-xs font-medium opacity-75">
                    {lessonsEvaluated}/{totalLessons} leçons évaluées
                  </p>
                </div>
                <span
                  className={cn(
                    'px-3 py-1 text-xs font-bold rounded-full whitespace-nowrap border tracking-tight',
                    cardStyle.borderColor,
                    cardStyle.iconBgColor,
                    cardStyle.highlightTextColor
                  )}
                >
                  Progression : {lessonsEvaluatedPct}%
                </span>
              </CardHeader>

              <CardContent className="w-full space-y-3">
                <Progress
                  rootColor={cardStyle.progressBgColor}
                  indicatorColor={cardStyle.progressIndicatorColor}
                  value={lessonsEvaluatedPct}
                  className="w-full h-2"
                />

                <div className="text-xs space-y-1.5 opacity-80 pt-1 font-medium">
                  <div className="flex justify-between items-center">
                    <span>Pas abordé</span>
                    <span className="font-semibold">
                      {notAddressedCount} {notAddressedCount > 1 ? 'leçons' : 'leçon'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>En cours</span>
                    <span className="font-semibold">
                      {acquiringCount} {acquiringCount > 1 ? 'leçons' : 'leçon'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Acquis</span>
                    <span className="font-semibold">
                      {acquiredCount} {acquiredCount > 1 ? 'leçons' : 'leçon'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Maîtrise</span>
                    <span className="font-semibold">
                      {expertCount} {expertCount > 1 ? 'leçons' : 'leçon'}
                    </span>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex justify-end w-full pt-2">
                <SubjectEvalListDrawer subject={subject} cardStyle={cardStyle}>
                  <Button
                    variant="ghost"
                    className="text-xs font-semibold hover:bg-slate-900 hover:text-white flex items-center gap-1.5 rounded-xl transition-colors"
                  >
                    Voir le programme <ChevronRightIcon className="size-4" />
                  </Button>
                </SubjectEvalListDrawer>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default LessonEvalsRecapPerSubject;