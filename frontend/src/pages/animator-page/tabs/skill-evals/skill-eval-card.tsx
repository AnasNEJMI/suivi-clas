import type { SkillEvalData } from "@/api/animator/skill-evals.types"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { SKILL_CAROUSEL_CARD_STYLES } from "@/lib/types/data.types"
import { BicepsFlexedIcon, RotateCwFadingClockIcon, TrendingDownIcon, TrendingUpIcon} from "lucide-react"

const AnimSkillEvalCard = ({skillEval} : {skillEval : SkillEvalData | null}) => {
    if(!skillEval) {
        return (
            <>
                <h3 className='mt-6 font-semibold text-lg lg:text-xl text-zinc-900'>Commentaires</h3>
                <Card className='border-2 border-dashed border-zinc-200 shadow-none h-64 flex flex-col items-center justify-center w-full rounded-xl bg-transparent mt-4 p-4'>
                    <CardHeader className='flex flex-col items-center justify-center w-full'>
                        <RotateCwFadingClockIcon className='size-10 opacity-70'/>
                        <CardTitle className='text-base font-medium opacity-70 text-center text-balance'>Aucune évaluation n'a encore été soumise pour le moment.</CardTitle>
                        <CardDescription className='text-pretty text-sm max-w-xl text-center'>les commentaires de l'évaluation seront affichées ici dès leur enregistrement.</CardDescription>
                    </CardHeader>   
                </Card>
            </>
        )
    }
    const skillSliders = [
        {label : 'Autonomie', cardStyle : SKILL_CAROUSEL_CARD_STYLES['autonomy'], value : skillEval.autonomy},
        {label : 'Discipline', cardStyle : SKILL_CAROUSEL_CARD_STYLES['discipline'], value : skillEval.discipline},
        {label : 'Organisation', cardStyle : SKILL_CAROUSEL_CARD_STYLES['organisation'], value : skillEval.organisation},
        {label : 'Ponctualité', cardStyle : SKILL_CAROUSEL_CARD_STYLES['ponctuality'], value : skillEval.ponctuality},
        {label : 'Préparation', cardStyle : SKILL_CAROUSEL_CARD_STYLES['preparation'], value : skillEval.preparation},
        {label : 'Régularité', cardStyle : SKILL_CAROUSEL_CARD_STYLES['regularity'], value : skillEval.regularity},
    ]

    return (
    <>
        <h3 className='mt-6 font-semibold text-lg lg:text-xl text-zinc-900'>Commentaires</h3>
        <Card className='shadow-card flex flex-col items-center justify-center w-full rounded-xl bg-white'>
            <CardContent className="w-full">
                {
                    skillSliders.map((slider, index) => (
                        <div key={index} className="flex items-center gap-2 w-full">
                            <p className="text-sm flex-1/3">{slider.label}</p>
                            <Progress
                                rootColor={slider.cardStyle.bgColor}
                                indicatorColor={slider.cardStyle.highlightTextColorBg}
                                value={slider.value * 5} //progress is from 0 to 100, my values are from 0 to 20
                                className="flex-2/3"/>
                        </div>

                    ))
                }
            </CardContent>
            <CardFooter className="w-full flex-col gap-2">
                <div className="bg-green-100/75 w-full p-4 rounded-lg">
                    <div className="font-bold text-green-700 flex gap-2 items-center"><TrendingUpIcon className="size-4"/> Points positifs</div>
                    <p className="mt-2">{skillEval.positive}</p>
                </div>
                <div className="bg-red-100/75 w-full p-4 rounded-lg">
                    <span className="font-bold text-red-700 flex gap-2 items-center"><TrendingDownIcon className="size-4"/> À améliorer</span>
                    <p className="mt-2">{skillEval.negative}</p>
                </div>
                <div className="bg-sky-100/75 w-full p-4 rounded-lg">
                    <span className="font-bold text-sky-700 flex gap-2 items-center"><BicepsFlexedIcon className="size-4"/> Axes d'amélioration</span>
                    <p className="mt-2">{skillEval.positive}</p>
                </div>
            </CardFooter>
        </Card>
    </>
  )
}

export default AnimSkillEvalCard