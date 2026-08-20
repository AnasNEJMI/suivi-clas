import type { AnimatorStatsPerScolarYear } from "@/api/association-member/apiCalls"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

const AnimatorSummaryCards = ({selectedScolarYear} : {selectedScolarYear : AnimatorStatsPerScolarYear}) => {

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 mt-6 ">
      {
        selectedScolarYear.animators.length > 0 &&
        selectedScolarYear.animators.map((animStats) => (
          <Card key={animStats.animator.id} className=" shadow-card border-lime-500 ">
            <CardContent className="flex flex-col items-center">
              <h3 className="font-bold text-lg"><span>{animStats.animator.firstName}</span> <span>{animStats.animator.lastName}</span></h3>
              <div className="flex items-center gap-2 w-full mt-2">
                <p className="flex-1 text-center"><span className="font-bold text-lg">{animStats.totalSeances}</span> Séances</p>
                <Separator orientation="vertical"/>
                <p className="flex-1 text-center"><span className="font-bold text-lg">{animStats.totalBilans}</span> Bilans</p>
              </div>
            </CardContent>
          </Card>
        ))
      }
        
    </section>
  )
}

export default AnimatorSummaryCards