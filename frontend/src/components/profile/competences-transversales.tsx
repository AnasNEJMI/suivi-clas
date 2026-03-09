import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { CompetencesAccordian } from "./competences-accordians"
import { cn } from "@/lib/utils"
import type { Skill } from "@/api/api.types"
import { useMemo } from "react"

export const description = "Evolution des compétences transversales de Bilal au cours de l'année"

const chartConfig = {
  niveau: {
    label: "Compétence",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig


interface CompetencesMethodologiquesProps{
    className? : string,
    skill : Skill
}


export function CompetencesMethodologiques({className, skill} : CompetencesMethodologiquesProps) {

  const chartData = useMemo(() => {
    return [
      { competence: "Ponctualité", niveau: skill.ponctuality},
      { competence: "Autonomie", niveau: skill.autonomy },
      { competence: "Respect", niveau: skill.respect },
      { competence: "Régularité", niveau: skill.regularity },
      { competence: "Organisation", niveau: skill.organisation },
      { competence: "Préparation", niveau: skill.preparation },
    ]
  }, [skill])

  return (
    <>
        <h2 className={cn('text-xl md:text-2xl font-bold', className)}>Compétences méthodologiques</h2>
        <Card className="mt-4">
        <CardHeader className="items-center">
            <CardDescription className="opacity-85 text-primary font-outfit text-balance">
            Evolution des compétences méthodologiques au cours de l'année
            </CardDescription>
        </CardHeader>
        <CardContent className="pb-0">
            <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-3/2 min-h-xs"
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
        </CardContent>
        <CardFooter className="text-sm flex-col items-start w-full">
            <CompetencesAccordian positive= {skill.positive} negative= {skill.negative} improvements= {skill.improvements}/>
        </CardFooter>
        </Card>
    </>
  )
}
