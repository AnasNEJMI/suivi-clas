import type { ClassPresenceStats } from "@/api/association-member/apiCalls"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'
import React from 'react'

interface ClassPresenceStatsDropdownProps {
    className? : string,
    classesStats : ClassPresenceStats[],
    selectedValue : string,
    onValueChange : React.Dispatch<React.SetStateAction<ClassPresenceStats>>
}

const AnimatorClassDropdown = ({className, classesStats, selectedValue, onValueChange} : ClassPresenceStatsDropdownProps) => {
    const updateValue = (value : string) => {
        const subject = classesStats.find((c) => c.class.id === parseInt(value));
        if(!subject){
        throw Error(`Couldn't find subject with id : ${value}`);
        }
        onValueChange(subject);
    }
    return (
    <Select value={selectedValue} onValueChange={(value) => updateValue(value)}>
        <SelectTrigger className="w-45 bg-white text-lg font-medium font-outfit">
            <SelectValue/>
        </SelectTrigger>
        <SelectContent className={cn(className, '')}>
            <SelectGroup>
                {
                    classesStats.length>0 && 
                    classesStats.map((classStats, index) => {
                        return (
                            <SelectItem key={index} value={classStats.class.id.toString()} className='text-lg font-medium font-outfit'>{classStats.class.label}</SelectItem>
                        )
                    }
                    )
                }
            </SelectGroup>
        </SelectContent>
    </Select>
  )
}

export default AnimatorClassDropdown