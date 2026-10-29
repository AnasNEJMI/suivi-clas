import type { SkillEvalData } from '@/api/animator/skill-evals.types';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { EmptyStateCard } from '@/components/ui/empty-state-card';
import { SKILL_CAROUSEL_CARD_STYLES } from '@/lib/types/data.types';
import SkillCarouselCard from '@/pages/student-page/tabs/skill-evals/skill-carousel-card';
import { RotateCwFadingClockIcon } from 'lucide-react';

const SKILL_KEYS = [
    'autonomy',
    'discipline',
    'organisation',
    'ponctuality',
    'respect',
    'preparation',
    'regularity',
] as const;

const AnimSkillNotesCarousel = ({ skillEval }: { skillEval: SkillEvalData | null }) => {
    if (!skillEval) {
        return (
            <div className="space-y-3">
                <h3 className="font-bold text-lg text-slate-900 tracking-tight">
                    Compétences Méthodologiques
                </h3>
                <EmptyStateCard
                    icon={RotateCwFadingClockIcon}
                    title="Aucune évaluation n'a encore été soumise"
                    description="Les notes de l'évaluation s'afficheront ici dès leur enregistrement."
                />
            </div>
        );
    }

    return (
        <div className="space-y-3">
            <h3 className="font-bold text-lg text-slate-900 tracking-tight">
                Compétences Méthodologiques
            </h3>
            <Carousel opts={{ align: 'start' }} className="w-full">
                <CarouselContent className="-ml-3 py-1">
                    {SKILL_KEYS.map((key) => {
                        const style = SKILL_CAROUSEL_CARD_STYLES[key];
                        const score = Math.round(skillEval[key] ?? 0);

                        if (!style) return null;

                        return (
                            <CarouselItem key={key} className="pl-3 max-w-48 h-40 shrink-0">
                                <SkillCarouselCard cardStyle={style} score={score} />
                            </CarouselItem>
                        );
                    })}
                </CarouselContent>
                <div className="flex items-center gap-1.5 relative mt-3">
                    <CarouselPrevious
                        variant="outline"
                        className="static translate-y-0 h-9 w-9 rounded-xl border-slate-200/80 bg-white hover:bg-slate-50 text-slate-700 shadow-2xs"
                    />
                    <CarouselNext
                        variant="outline"
                        className="static translate-y-0 h-9 w-9 rounded-xl border-slate-200/80 bg-white hover:bg-slate-50 text-slate-700 shadow-2xs"
                    />
                </div>
            </Carousel>
        </div>
    );
};

export default AnimSkillNotesCarousel;