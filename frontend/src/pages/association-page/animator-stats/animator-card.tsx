import type { AnimatorStatsPerScolarYear } from "@/api/association-member/apiCalls"
import { useState } from "react"
import ScolarYearDropdown from "./scolar-year-dropdown"
import AnimatorSummaryCards from "./animator-summary-cards"
import AnimatorStatsCard from "./animator-stats-per-class"

const AnimatorCard = ({animatorStatsPerScolarYear} : {animatorStatsPerScolarYear : AnimatorStatsPerScolarYear[]}) => {
  const [selectedScolarYear, setSelectedScolarYear] = useState(animatorStatsPerScolarYear[0])
    return (
    <section className='mt-16 w-full px-6 max-w-5xl'>
        <div className='flex items-start justify-between'>
            <h2 className='text-xl md:text-2xl font-bold bg'>Animateurs Participants</h2>
            <ScolarYearDropdown scolarYears = {animatorStatsPerScolarYear} selectedValue={selectedScolarYear.scolarYear.id.toString()} onValueChange = {setSelectedScolarYear}/>
        </div>
        <AnimatorSummaryCards key={`${selectedScolarYear.scolarYear.id}-summaries`} selectedScolarYear = {selectedScolarYear}/>
        <AnimatorStatsCard key={`${selectedScolarYear.scolarYear.id}-stats`} selectedScolarYear = {selectedScolarYear}/>
    </section>
  )
}

export default AnimatorCard