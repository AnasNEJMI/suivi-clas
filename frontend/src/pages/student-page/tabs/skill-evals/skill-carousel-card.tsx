import type { SkillCarouselCardStyle } from '@/lib/types/data.types';
import { cn } from '@/lib/utils';

interface SkillCarouselCardProps {
  cardStyle: SkillCarouselCardStyle;
  score: number;
}

const SkillCarouselCard = ({ cardStyle, score }: SkillCarouselCardProps) => {
  return (
    <div
      className={cn(
        'group relative w-full h-full p-4 rounded-2xl border transition-all duration-200 flex flex-col justify-between overflow-hidden font-outfit shadow-2xs hover:shadow-md hover:-translate-y-0.5',
        cardStyle.bgColor,
        cardStyle.borderColor
      )}
    >
      {/* En-tête : Icône stylisée + Note /20 */}
      <div className="flex items-start justify-between gap-2">
        <div className="p-2 rounded-xl bg-white/70 backdrop-blur-xs shadow-2xs shrink-0 transition-transform group-hover:scale-105 duration-200">
          <cardStyle.icon className={cn('size-5', cardStyle.highlightTextColor)} />
        </div>

        {/* Score */}
        <div className="flex items-baseline gap-0.5 font-bold">
          <span className={cn('text-2xl tracking-tight', cardStyle.highlightTextColor)}>
            {score}
          </span>
          <span className={cn('text-xs font-semibold opacity-60', cardStyle.highlightTextColor)}>
            /20
          </span>
        </div>
      </div>

      {/* Pied de carte : Nom de la compétence + Barre de progression */}
      <div className="mt-2">
        <h4
          className={cn(
            'text-xs font-bold uppercase tracking-wider opacity-80 group-hover:opacity-100 transition-opacity',
            cardStyle.highlightTextColor
          )}
        >
          {cardStyle.label}
        </h4>

        {/* Micro-barre de progression */}
        <div className="w-full h-1.5 bg-black/5 rounded-full mt-2 overflow-hidden">
          <div
            className={cn(
              'h-full rounded-full transition-all duration-500 opacity-80',
              cardStyle.highlightTextColor?.replace('text-', 'bg-')
            )}
            style={{ width: `${Math.min(100, Math.max(0, (score / 20) * 100))}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default SkillCarouselCard;