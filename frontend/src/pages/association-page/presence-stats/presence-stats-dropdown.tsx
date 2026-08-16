import type { PresenceStatsPerScolarYear } from "@/api/association-member/apiCalls"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'

interface PresenceStatsDropdownProps {
    className? : string,
    presenceStatsPerScolarYear : PresenceStatsPerScolarYear[],
    selectedValue : string,
    onValueChange : React.Dispatch<React.SetStateAction<PresenceStatsPerScolarYear>>
}
const PresenceStatsDropdown = ({className, presenceStatsPerScolarYear, selectedValue, onValueChange} : PresenceStatsDropdownProps) => {
    const updateValue = (value : string) => {
        const scolarYearStats = presenceStatsPerScolarYear.find((s) => s.scolarYear.id === parseInt(value));
        if(!scolarYearStats){
        throw Error(`Couldn't find scolarYear with id : ${value}`);
        }
        onValueChange(scolarYearStats);
    }
    return (
    <Select value={selectedValue} onValueChange={(value) => updateValue(value)}>
        <SelectTrigger className="w-45 bg-white text-lg font-medium font-outfit">
            <SelectValue/>
        </SelectTrigger>
        <SelectContent className={cn(className, '')}>
            <SelectGroup>
                {
                    presenceStatsPerScolarYear.length>0 && 
                    presenceStatsPerScolarYear.map((yearStats, index) => {
                        return (
                            <SelectItem key={index} value={yearStats.scolarYear.id.toString()} className='text-lg font-medium font-outfit'>{yearStats.scolarYear.label}</SelectItem>
                        )
                    }
                    )
                }
            </SelectGroup>
        </SelectContent>
    </Select>
  )
}

export default PresenceStatsDropdown