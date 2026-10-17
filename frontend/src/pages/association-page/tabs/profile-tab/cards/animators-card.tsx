import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CARD_STYLES, type Subject } from '@/lib/types/data.types';
import { cn } from '@/lib/utils';
import { UserRoundPenIcon, UserIcon } from 'lucide-react';

interface Animator {
  id: number;
  firstName: string;
  lastName: string;
  gender: 'f' | 'm';
  specializations: { id: number; label: string }[];
}

const AssocAnimatorsCard = ({ animators }: { animators: Animator[] }) => {
  return (
    <Card className="mt-4 gap-0 font-outfit flex-1 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:shadow-sm transition-all duration-200 overflow-hidden">
      
      {/* Header */}
      <CardHeader className="pb-3 pt-2 px-6">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-3 text-lg font-bold text-slate-800">
            <div className="flex items-center justify-center size-9 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100/80 shadow-2xs">
              <UserRoundPenIcon className="size-5" />
            </div>
            <span>Mes Animateurs</span>
          </CardTitle>

          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200/60">
            {animators.length} {animators.length > 1 ? 'animateurs' : 'animateur'}
          </span>
        </div>
      </CardHeader>

      <CardContent className="px-6">
        {animators.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center bg-slate-50/60 rounded-2xl border border-dashed border-slate-200">
            <UserIcon className="size-8 text-slate-400 mb-2" />
            <p className="text-sm font-medium text-slate-600">Aucun animateur sous contrat</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2.5">
            {animators.map((animator) => {
              const initials = `${animator.firstName[0] || ''}${animator.lastName[0] || ''}`.toUpperCase();

              return (
                <div
                  key={animator.id}
                  className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-3.5 rounded-2xl bg-slate-50/70 hover:bg-slate-100/80 border border-slate-100 transition-all duration-150"
                >
                  {/* Avatar + Personal Info */}
                  <div className="flex items-center gap-3.5">
                    <div
                      className={cn(
                        'flex items-center justify-center size-10 rounded-full font-bold text-sm shrink-0 border shadow-2xs',
                        animator.gender === 'f'
                          ? 'bg-rose-50 text-rose-600 border-rose-200/60'
                          : 'bg-sky-50 text-sky-600 border-sky-200/60'
                      )}
                    >
                      {initials}
                    </div>

                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-900 text-base leading-snug group-hover:text-indigo-600 transition-colors">
                        {animator.firstName} {animator.lastName}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">
                        {animator.gender === 'f' ? 'Animatrice' : 'Animateur'}
                      </span>
                    </div>
                  </div>

                  {/* Dynamically Styled Subject Chips using CARD_STYLES */}
                  <div className="flex items-center gap-1.5 flex-wrap sm:justify-end">
                    {animator.specializations.map((subject, index) => {
                      // Lookup theme from CARD_STYLES with fallback to 'none'
                      const style = CARD_STYLES[subject.label as Subject] || CARD_STYLES['none'];
                      const IconComponent = style.icon;

                      return (
                        <span
                          key={subject.id ?? index}
                          className={cn(
                            'inline-flex items-center gap-1.5 rounded-xl px-2.5 py-1 text-xs font-semibold border border-opacity-40 shadow-2xs transition-transform hover:scale-105',
                            style.bgColor,
                            style.highlightTextColor,
                            style.borderColor
                          )}
                        >
                          {IconComponent && <IconComponent className="size-3.5 shrink-0" />}
                          <span>{style.label || subject.label}</span>
                        </span>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AssocAnimatorsCard;