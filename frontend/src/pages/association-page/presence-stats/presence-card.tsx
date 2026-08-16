import type { PresenceStatsPerScolarYear } from "@/api/association-member/apiCalls"
import { useState } from "react"
import PresenceStatsDropdown from "./presence-stats-dropdown"
import PresenceStatsTable from "./presence-stats-table"

const PresenceStatsCard = ({presenceStatsPerScolarYear} : {presenceStatsPerScolarYear : PresenceStatsPerScolarYear[]}) => {
  const [selectedScolarYear, setSelectedScolarYear] = useState(presenceStatsPerScolarYear[0])
    return (
    <section className='mt-16 w-full px-6 max-w-7xl'>
        <div className='flex items-start justify-between'>
            <h2 className='text-xl md:text-2xl font-bold bg'>Bilan présence</h2>
            <PresenceStatsDropdown presenceStatsPerScolarYear = {presenceStatsPerScolarYear} selectedValue={selectedScolarYear.scolarYear.id.toString()} onValueChange = {setSelectedScolarYear}/>
        </div>
        <PresenceStatsTable selectedScolarYear = {selectedScolarYear}/>
    </section>
  )
}

export default PresenceStatsCard