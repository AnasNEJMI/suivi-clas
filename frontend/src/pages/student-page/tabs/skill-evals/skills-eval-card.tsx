import type { SkillsEvalEntry } from "@/api/student/apiCalls"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { SKILL_CAROUSEL_CARD_STYLES } from "@/lib/types/data.types"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { BicepsFlexedIcon, CalendarIcon, TrendingDownIcon, TrendingUpIcon} from "lucide-react"

const SkillsEvalCard = ({skillsEval} : {skillsEval : SkillsEvalEntry}) => {
    const skillSliders = [
        {label : 'Autonomie', cardStyle : SKILL_CAROUSEL_CARD_STYLES['autonomy'], value : skillsEval.autonomy},
        {label : 'Discipline', cardStyle : SKILL_CAROUSEL_CARD_STYLES['discipline'], value : skillsEval.discipline},
        {label : 'Organisation', cardStyle : SKILL_CAROUSEL_CARD_STYLES['organisation'], value : skillsEval.organisation},
        {label : 'Ponctualité', cardStyle : SKILL_CAROUSEL_CARD_STYLES['ponctuality'], value : skillsEval.ponctuality},
        {label : 'Préparation', cardStyle : SKILL_CAROUSEL_CARD_STYLES['preparation'], value : skillsEval.preparation},
        {label : 'Régularité', cardStyle : SKILL_CAROUSEL_CARD_STYLES['regularity'], value : skillsEval.regularity},
    ]

    return (
    <>
        <Card className='shadow-card flex flex-col items-center justify-center w-full rounded-xl bg-white'>
            <CardHeader className='flex gap-2 w-full'>
                <div className='w-10 h-10 rounded-full bg-indigo-300 flex items-center justify-center font-bold text-xl'>
                    {skillsEval.animator.firstName.slice(0,1)}
                </div>
                <div className='flex flex-col'>
                    <CardTitle className='tracking-tight text-base'><span className='font-bold '>{skillsEval.animator.firstName} {skillsEval.animator.lastName}</span></CardTitle>
                    <CardDescription className='text-sm opacity-75 leading-4 tracking-tight flex items-center justify-start gap-2'><span className='flex items-center justify-center gap-1'><CalendarIcon className='size-4'/> Mise à jour : {format(skillsEval.updatedAt, 'd/MM/y', {locale : fr})}</span></CardDescription>
                </div>
            </CardHeader>
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
                    <p className="mt-2">{skillsEval.positive}</p>
                </div>
                <div className="bg-red-100/75 w-full p-4 rounded-lg">
                    <span className="font-bold text-red-700 flex gap-2 items-center"><TrendingDownIcon className="size-4"/> À améliorer</span>
                    <p className="mt-2">{skillsEval.negative}</p>
                </div>
                <div className="bg-sky-100/75 w-full p-4 rounded-lg">
                    <span className="font-bold text-sky-700 flex gap-2 items-center"><BicepsFlexedIcon className="size-4"/> Axes d'amélioration</span>
                    <p className="mt-2">{skillsEval.positive}</p>
                </div>
            </CardFooter>
        </Card>
    </>
  )
}

export default SkillsEvalCard