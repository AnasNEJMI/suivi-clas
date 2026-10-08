import type { SkillsEvalEntry } from '@/api/student/apiCalls';
import { Progress } from '@/components/ui/progress';
import { SKILL_CAROUSEL_CARD_STYLES } from '@/lib/types/data.types';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import {
  BicepsFlexedIcon,
  CalendarIcon,
  TrendingDownIcon,
  TrendingUpIcon,
} from 'lucide-react';

interface SkillsEvalCardProps {
  skillsEval: SkillsEvalEntry;
}

const SkillsEvalCard = ({ skillsEval }: SkillsEvalCardProps) => {
  const skillSliders = [
    {
      label: 'Autonomie',
      cardStyle: SKILL_CAROUSEL_CARD_STYLES['autonomy'],
      value: skillsEval.autonomy,
    },
    {
      label: 'Discipline',
      cardStyle: SKILL_CAROUSEL_CARD_STYLES['discipline'],
      value: skillsEval.discipline,
    },
    {
      label: 'Organisation',
      cardStyle: SKILL_CAROUSEL_CARD_STYLES['organisation'],
      value: skillsEval.organisation,
    },
    {
      label: 'Ponctualité',
      cardStyle: SKILL_CAROUSEL_CARD_STYLES['ponctuality'],
      value: skillsEval.ponctuality,
    },
    {
      label: 'Préparation',
      cardStyle: SKILL_CAROUSEL_CARD_STYLES['preparation'],
      value: skillsEval.preparation,
    },
    {
      label: 'Régularité',
      cardStyle: SKILL_CAROUSEL_CARD_STYLES['regularity'],
      value: skillsEval.regularity,
    },
  ];

  const animatorInitials = `${skillsEval.animator.firstName.slice(0, 1)}${skillsEval.animator.lastName.slice(0, 1)}`;

  return (
    <div className="group font-outfit w-full bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs hover:shadow-md hover:border-slate-300 transition-all duration-200 space-y-5">
      {/* En-tête : Avatar Animateur, Nom & Date */}
      <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-indigo-50 border border-indigo-100/80 text-indigo-700 font-bold flex items-center justify-center shrink-0 text-sm tracking-wider shadow-2xs">
            {animatorInitials}
          </div>
          <div>
            <h4 className="text-base font-bold text-slate-900 tracking-tight">
              <span className="capitalize">{skillsEval.animator.firstName}</span>{' '}
              <span className="uppercase">{skillsEval.animator.lastName}</span>
            </h4>
            <span className="text-xs text-slate-400 font-medium flex items-center gap-1.5 mt-0.5">
              <CalendarIcon className="size-3.5 text-slate-400" />
              Mise à jour :{' '}
              {skillsEval.updatedAt
                ? format(new Date(skillsEval.updatedAt), 'd MMMM yyyy', { locale: fr })
                : '-'}
            </span>
          </div>
        </div>

        <span className="text-xs font-semibold text-slate-500 bg-slate-100/80 border border-slate-200/60 px-3 py-1 rounded-full">
          Animateur
        </span>
      </div>

      {/* Grille des 6 Compétences Méthodologiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3.5 bg-slate-50/60 rounded-xl border border-slate-100">
        {skillSliders.map((slider, index) => {
          const progressPercentage = (slider.value / 20) * 100;

          return (
            <div
              key={index}
              className="flex items-center justify-between gap-3 bg-white p-2.5 rounded-lg border border-slate-200/60 shadow-2xs"
            >
              <div className="flex items-center gap-2 min-w-28 shrink-0">
                <div
                  className={cn(
                    'w-7 h-7 rounded-lg flex items-center justify-center shrink-0',
                    slider.cardStyle.bgColor,
                    slider.cardStyle.highlightTextColor
                  )}
                >
                  <slider.cardStyle.icon className="size-4" />
                </div>
                <span className="text-xs font-bold text-slate-700 truncate">
                  {slider.label}
                </span>
              </div>

              {/* Jauge de progression */}
              <div className="flex-1 flex items-center gap-2.5 min-w-0">
                <Progress
                  value={progressPercentage}
                  className="h-2 bg-slate-100 flex-1"
                />
                <span className="text-xs font-extrabold text-slate-800 shrink-0 w-8 text-right">
                  {slider.value}
                  <span className="text-[10px] font-normal text-slate-400">/20</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Retours de l'animateur (Points positifs, À améliorer, Axes) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
        {/* Points positifs */}
        {skillsEval.positive && (
          <div className="p-3.5 rounded-xl bg-emerald-50/50 border border-emerald-200/60 text-slate-800 space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-xs text-emerald-800">
              <div className="p-1 rounded-md bg-emerald-100 text-emerald-700">
                <TrendingUpIcon className="size-3.5" />
              </div>
              <span>Points positifs</span>
            </div>
            <p className="text-xs leading-relaxed text-slate-700 font-medium">
              {skillsEval.positive}
            </p>
          </div>
        )}

        {/* À améliorer */}
        {skillsEval.negative && (
          <div className="p-3.5 rounded-xl bg-rose-50/50 border border-rose-200/60 text-slate-800 space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-xs text-rose-800">
              <div className="p-1 rounded-md bg-rose-100 text-rose-700">
                <TrendingDownIcon className="size-3.5" />
              </div>
              <span>À améliorer</span>
            </div>
            <p className="text-xs leading-relaxed text-slate-700 font-medium">
              {skillsEval.negative}
            </p>
          </div>
        )}

        {/* Axes d'amélioration */}
        {skillsEval.positive && (
          <div className="p-3.5 rounded-xl bg-sky-50/50 border border-sky-200/60 text-slate-800 space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-xs text-sky-800">
              <div className="p-1 rounded-md bg-sky-100 text-sky-700">
                <BicepsFlexedIcon className="size-3.5" />
              </div>
              <span>Axes d'amélioration</span>
            </div>
            <p className="text-xs leading-relaxed text-slate-700 font-medium">
              {skillsEval.positive}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillsEvalCard;