import type { SkillsEvalEntry } from '@/api/student/apiCalls'
import { CompetencesAccordian } from '@/components/student-profile/competences-accordians'
import { Card, CardContent} from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart'
import { useMemo, useState } from 'react'
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts'
import SkillsEvalAnimatorDropdown from './skills-eval-animator-dropdown'
import { Separator } from '@/components/ui/separator'

const chartConfig = {
  niveau: {
    label: "Compétence",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

const SkillsEvalCard = ({skillsEvals} : {skillsEvals : SkillsEvalEntry[]}) => {
    const [skillsEval, setskillsEval] = useState(skillsEvals[0]);

    const chartData = useMemo(() => {
        return [
          { competence: "Ponctualité", niveau: skillsEval.ponctuality},
          { competence: "Autonomie", niveau: skillsEval.autonomy },
          { competence: "Respect", niveau: skillsEval.respect },
          { competence: "Régularité", niveau: skillsEval.regularity },
          { competence: "Organisation", niveau: skillsEval.organisation },
          { competence: "Préparation", niveau: skillsEval.preparation },
        ]
      }, [skillsEval])

  return (
    <Card className="mt-6 border-none shadow-card">
        <CardContent className="pb-0">
          <div className='w-full flex flex-col lg:flex-row items-start gap-6'>
            <div className='flex-1 w-full'>
              <h3 className='font-semibold text-lg'>Bilan de méthodologie</h3>
              <Separator className='my-6'/>
              <div className='flex justify-between items-center mt-2'>
                  <h2 className='text-lg md:text-xl font-medium'>Soumis par</h2>
                  <SkillsEvalAnimatorDropdown skillsEvals = {skillsEvals} selectedValue={skillsEval.animator.id.toString()} onValueChange = {setskillsEval}/>
              </div>
              <div className='w-full '>
                <ChartContainer
                config={chartConfig}
                className="mx-auto aspect-3/2 min-h-xs max-h-80 mt-6"
                >
                  <RadarChart data={chartData}>
                      <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                      <PolarAngleAxis dataKey="competence" />
                      <PolarGrid />
                      <Radar
                      dataKey="niveau"
                      fill="var(--color-niveau)"
                      fillOpacity={0.6}
                      dot={{
                          r: 4,
                          fillOpacity: 1,
                      }}
                      />
                  </RadarChart>
                </ChartContainer>
              </div>
            </div>
            <CompetencesAccordian positive= {skillsEval.positive} negative= {skillsEval.negative} improvements= {skillsEval.improvements}/>
          </div>
        </CardContent>
    </Card>
  )
}

export default SkillsEvalCard