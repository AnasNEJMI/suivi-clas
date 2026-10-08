import type { SkillsEvalEntry } from '@/api/student/apiCalls';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { SKILL_CAROUSEL_CARD_STYLES } from '@/lib/types/data.types';
import { SparklesIcon } from 'lucide-react';
import SkillCarouselCard from './skill-carousel-card';

const SKILL_KEYS = [
  'autonomy',
  'discipline',
  'organisation',
  'ponctuality',
  'preparation',
  'regularity',
] as const;

const SkillCarousel = ({ skillsEvals }: { skillsEvals: SkillsEvalEntry[] }) => {
  // État vide
  if (!skillsEvals || skillsEvals.length === 0) {
    return (
      <div className="font-outfit mt-6 space-y-3">
        <h3 className="text-lg lg:text-xl font-bold text-slate-900 tracking-tight">
          Compétences Méthodologiques
        </h3>
        <div className="flex flex-col items-center justify-center p-8 bg-white border border-dashed border-slate-200/80 rounded-2xl text-center">
          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mb-3">
            <SparklesIcon className="size-5 text-slate-400" />
          </div>
          <p className="text-sm font-semibold text-slate-700">
            Aucune évaluation de méthodologie enregistrée
          </p>
          <p className="text-xs text-slate-400 mt-1 max-w-md">
            Une fois vos évaluations soumises par vos enseignants, vous découvrirez ici votre moyenne pour chaque compétence.
          </p>
        </div>
      </div>
    );
  }

  // Cumul des scores et calcul des moyennes
  const totalScores = skillsEvals.reduce(
    (acc, curr) => ({
      autonomy: acc.autonomy + curr.autonomy,
      discipline: acc.discipline + curr.discipline,
      organisation: acc.organisation + curr.organisation,
      ponctuality: acc.ponctuality + curr.ponctuality,
      preparation: acc.preparation + curr.preparation,
      regularity: acc.regularity + curr.regularity,
    }),
    {
      autonomy: 0,
      discipline: 0,
      organisation: 0,
      ponctuality: 0,
      preparation: 0,
      regularity: 0,
    }
  );

  const count = skillsEvals.length;

  return (
    <div className="font-outfit">
      <Carousel opts={{ align: 'start' }} className="w-full">
        {/* En-tête : Titre & Navigation du carrousel */}
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold text-slate-900 tracking-tight">
            Compétences Méthodologiques
          </h3>
        </div>

        {/* Contenu du Carrousel */}
        <CarouselContent className="-ml-3 py-1">
          {SKILL_KEYS.map((key) => {
            const style = SKILL_CAROUSEL_CARD_STYLES[key];
            const avgScore = Math.round(totalScores[key] / count);

            if (!style) return null;

            return (
              <CarouselItem
                key={key}
                className="pl-3 max-w-48 h-40 shrink-0"
              >
                <SkillCarouselCard cardStyle={style} score={avgScore} />
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <div className="flex items-center gap-1.5 relative mt-4">
        <CarouselPrevious
                variant="outline"
                className="static translate-y-0 h-9 w-9 border-slate-200 hover:bg-white"
            />
            <CarouselNext
                variant="outline"
                className="static translate-y-0 h-9 w-9 border-slate-200 hover:bg-white"
            />
        </div>
      </Carousel>
    </div>
  );
};

export default SkillCarousel;