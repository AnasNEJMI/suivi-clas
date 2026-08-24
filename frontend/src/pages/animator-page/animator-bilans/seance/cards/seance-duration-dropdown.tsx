import type { SeanceDurationEntry } from "@/api/animator/types"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'

interface AnimatorDropdownProps {
    className? : string,
    seanceDurations : SeanceDurationEntry[],
    selectedValue : string,
    onValueChange : (id: number) => void
}
const SeanceDurationDropdown = ({className, seanceDurations, selectedValue, onValueChange} : AnimatorDropdownProps) => {
    const updateValue = (value : string) => {
        const seanceDuration = seanceDurations.find((duration) => duration.id === parseInt(value));
        if(!seanceDuration){
        throw Error(`Couldn't find seance duration with id : ${value}`);
        }
        onValueChange(seanceDuration.id);
    }
    return (
    <Select value={selectedValue} onValueChange={(value) => updateValue(value)}>
        <SelectTrigger className="w-full max-w-36 lg:max-w-48 bg-white text-lg font-medium font-outfit border border-zinc-200">
            <SelectValue/>
        </SelectTrigger>
        <SelectContent className={cn(className, '')}>
            <SelectGroup>
                {
                    seanceDurations.length>0 && 
                    seanceDurations.map((seanceDuration, index) => {
                        return (
                            <SelectItem key={index} value={seanceDuration.id.toString()} className='text-lg font-medium font-outfit'>
                                <span className="font-medium">{seanceDuration.label}</span>
                            </SelectItem>
                        )
                    }
                    )
                }
            </SelectGroup>
        </SelectContent>
    </Select>
  )
}

export default SeanceDurationDropdown