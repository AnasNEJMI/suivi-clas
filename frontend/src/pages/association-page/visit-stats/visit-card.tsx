import type {VisitStatsPerScolarYear } from "@/api/association-member/apiCalls"
import { useState } from "react"
import VisitStatsDropdown from "./visit-stats-dropdown"
import VisitStatsTable from "./visit-stats-table"

const VisitStatsCard = ({visitStatsPerScolarYear: visitStatsPerScolarYear} : {visitStatsPerScolarYear : VisitStatsPerScolarYear[]}) => {
  const [selectedScolarYear, setSelectedScolarYear] = useState(visitStatsPerScolarYear[0])
    return (
    <section className='mt-16 w-full px-6 max-w-5xl'>
        <div className='flex items-start justify-between'>
            <h2 className='text-xl md:text-2xl font-bold bg'>Consultation bilans</h2>
            <VisitStatsDropdown visitStatsPerScolarYear = {visitStatsPerScolarYear} selectedValue={selectedScolarYear.scolarYear.id.toString()} onValueChange = {setSelectedScolarYear}/>
        </div>
        <VisitStatsTable key={selectedScolarYear.scolarYear.id} selectedScolarYear = {selectedScolarYear}/>
    </section>
  )
}

export default VisitStatsCard