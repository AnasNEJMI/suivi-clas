import type { SkillEvalData } from "@/api/animator/skill-evals.types"
import { EmptyStateCard } from "@/components/ui/empty-state-card"
import { Progress } from "@/components/ui/progress"
import { SKILL_CAROUSEL_CARD_STYLES } from "@/lib/types/data.types"
import { cn } from "@/lib/utils"
import { BicepsFlexedIcon, RotateCwFadingClockIcon, TrendingDownIcon, TrendingUpIcon } from "lucide-react"

const AnimSkillEvalCard = ({ skillEval }: { skillEval: SkillEvalData | null }) => {
    if (!skillEval) {
        return (
            <div className="space-y-3 mt-6">
                <h3 className="font-bold text-lg text-slate-900 tracking-tight">
                    Commentaires & Retours
                </h3>
                <EmptyStateCard
                    icon={RotateCwFadingClockIcon}
                    title="Aucun commentaire enregistré"
                    description="Les retours de l'animateur s'afficheront ici dès leur enregistrement."
                />
            </div>
        );
    }

    const skillSliders = [
        { label: 'Autonomie', cardStyle: SKILL_CAROUSEL_CARD_STYLES['autonomy'], value: skillEval.autonomy },
        { label: 'Discipline', cardStyle: SKILL_CAROUSEL_CARD_STYLES['discipline'], value: skillEval.discipline },
        { label: 'Organisation', cardStyle: SKILL_CAROUSEL_CARD_STYLES['organisation'], value: skillEval.organisation },
        { label: 'Ponctualité', cardStyle: SKILL_CAROUSEL_CARD_STYLES['ponctuality'], value: skillEval.ponctuality },
        { label: 'Respect', cardStyle: SKILL_CAROUSEL_CARD_STYLES['respect'], value: skillEval.respect },
        { label: 'Préparation', cardStyle: SKILL_CAROUSEL_CARD_STYLES['preparation'], value: skillEval.preparation },
        { label: 'Régularité', cardStyle: SKILL_CAROUSEL_CARD_STYLES['regularity'], value: skillEval.regularity },
    ];

    return (
        <div className="space-y-3 mt-6">
            <h3 className="font-bold text-lg text-slate-900 tracking-tight">
                Commentaires & Retours
            </h3>
            
            <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-2xs space-y-6">
                {/* Grille des 6 Compétences (Jauges) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3.5 bg-slate-50/60 rounded-2xl border border-slate-100">
                    {skillSliders.map((slider, index) => {
                        const progressPercentage = (slider.value / 20) * 100;

                        return (
                            <div
                                key={index}
                                className="flex items-center justify-between gap-3 bg-white p-2.5 rounded-xl border border-slate-200/60 shadow-2xs"
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

                                <div className="flex-1 flex items-center gap-2.5 min-w-0">
                                    <Progress
                                        value={progressPercentage}
                                        className="h-2 bg-slate-100 flex-1 rounded-full overflow-hidden"
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

                {/* Blocs de commentaires (Points positifs, À améliorer, Axes) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {/* Points positifs */}
                    {skillEval.positive && (
                        <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/60 text-slate-800 space-y-2">
                            <div className="flex items-center gap-2 font-bold text-xs text-emerald-800">
                                <div className="p-1.5 rounded-xl bg-emerald-100 text-emerald-700">
                                    <TrendingUpIcon className="size-4" />
                                </div>
                                <span>Points positifs</span>
                            </div>
                            <p className="text-xs leading-relaxed text-slate-700 font-medium">
                                {skillEval.positive}
                            </p>
                        </div>
                    )}

                    {/* À améliorer */}
                    {skillEval.negative && (
                        <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-200/60 text-slate-800 space-y-2">
                            <div className="flex items-center gap-2 font-bold text-xs text-rose-800">
                                <div className="p-1.5 rounded-xl bg-rose-100 text-rose-700">
                                    <TrendingDownIcon className="size-4" />
                                </div>
                                <span>Points négatifs</span>
                            </div>
                            <p className="text-xs leading-relaxed text-slate-700 font-medium">
                                {skillEval.negative}
                            </p>
                        </div>
                    )}

                    {/* Axes d'amélioration */}
                    {skillEval.positive && (
                        <div className="p-4 rounded-2xl bg-sky-50/60 border border-sky-200/60 text-slate-800 space-y-2">
                            <div className="flex items-center gap-2 font-bold text-xs text-sky-800">
                                <div className="p-1.5 rounded-xl bg-sky-100 text-sky-700">
                                    <BicepsFlexedIcon className="size-4" />
                                </div>
                                <span>Axes d'amélioration</span>
                            </div>
                            <p className="text-xs leading-relaxed text-slate-700 font-medium">
                                {skillEval.positive}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AnimSkillEvalCard;