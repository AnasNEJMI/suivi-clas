import type { AnimatorProfileByScolarYear } from '@/api/animator/profile.types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CARD_STYLES, type Subject } from '@/lib/types/data.types';
import { cn } from '@/lib/utils';
import { Building2Icon, RotateCwFadingClockIcon, UserRoundPenIcon } from 'lucide-react';

interface AnimContractsCardProps {
  animatorProfilesByScolarYear: AnimatorProfileByScolarYear[];
}

const AnimContractsCard = ({
  animatorProfilesByScolarYear,
}: AnimContractsCardProps) => {
  const associations = animatorProfilesByScolarYear[0]?.associations || [];

  return (
    <Card className="mt-4 gap-0 font-outfit flex-1 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:shadow-sm transition-all duration-200">
      
      {/* Header */}
      <CardHeader className="pb-3  px-6">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-3 text-lg font-bold text-slate-800">
            <div className="flex items-center justify-center size-9 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100/80 shadow-2xs">
              <UserRoundPenIcon className="size-5" />
            </div>
            <span>Mes Contrats</span>
          </CardTitle>

          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200/60">
            {associations.length} {associations.length > 1 ? 'contrats' : 'contrat'}
          </span>
        </div>
      </CardHeader>

      {/* Content */}
      <CardContent className="px-6">
        {associations.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center bg-slate-50/60 rounded-2xl border border-dashed border-slate-200">
            <RotateCwFadingClockIcon className="size-8 text-slate-400 mb-2" />
            <p className="text-sm font-medium text-slate-600">Aucun contrat enregistré</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2.5">
            {associations.map((association) => {
              const specializations = association.specializations || [];
              // Concaténer l'adresse et le code postal pour l'affichage
              const locationStr = [association.address, association.postalCode]
                .filter(Boolean)
                .join(', ');

              return (
                <div
                  key={association.id}
                  className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-3.5 rounded-2xl bg-slate-50/70 hover:bg-slate-100/80 border border-slate-100 transition-all duration-150"
                >
                  {/* Icône Bâtiment + Infos Association */}
                  <div className="flex items-center gap-3.5">
                    <div className="flex items-center justify-center size-10 rounded-full font-bold text-sm shrink-0 border shadow-2xs bg-indigo-50 text-indigo-600 border-indigo-200/60">
                      <Building2Icon className="size-5" />
                    </div>

                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-900 text-base leading-snug group-hover:text-indigo-600 transition-colors">
                        {association.label}
                      </span>
                      <span className="text-xs text-slate-500 font-medium mt-0.5">
                        {locationStr || 'Adresse non renseignée'}
                      </span>
                    </div>
                  </div>

                  {/* Badges Dynamiques des Matières (Utilisant CARD_STYLES) */}
                  <div className="flex items-center gap-1.5 flex-wrap sm:justify-end">
                    {specializations.length > 0 ? (
                      specializations.map((subject, index) => {
                        // Supporte les cas où `subject` est une string ou un objet;
                        const style = CARD_STYLES[subject as Subject] || CARD_STYLES['none'];
                        const IconComponent = style?.icon;

                        return (
                          <span
                            key={index}
                            className={cn(
                              'inline-flex items-center gap-1.5 rounded-xl px-2.5 py-1 text-xs font-semibold border border-opacity-40 shadow-2xs transition-transform hover:scale-105',
                              style?.bgColor || 'bg-slate-100',
                              style?.highlightTextColor || 'text-slate-600',
                              style?.borderColor || 'border-slate-200'
                            )}
                          >
                            {IconComponent && <IconComponent className="size-3.5 shrink-0" />}
                            <span>{style?.label || subject}</span>
                          </span>
                        );
                      })
                    ) : (
                      <span className="text-xs text-slate-400 font-medium italic">
                        Aucune matière
                      </span>
                    )}
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

export default AnimContractsCard;