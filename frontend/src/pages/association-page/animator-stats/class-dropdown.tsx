import type { AnimatorClassStats } from "@/api/association-member/apiCalls"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'

interface ClassDropdownProps {
    className? : string,
    classes : AnimatorClassStats[],
    selectedValue : string,
    onValueChange : React.Dispatch<React.SetStateAction<AnimatorClassStats>>
}
const ClassDropdown = ({className, classes, selectedValue, onValueChange} : ClassDropdownProps) => {
    const updateValue = (value : string) => {
        const animator = classes.find((a) => a.class.id === parseInt(value));
        if(!animator){
        throw Error(`Couldn't find class with id : ${value}`);
        }
        onValueChange(animator);
    }
    return (
    <Select value={selectedValue} onValueChange={(value) => updateValue(value)}>
        <SelectTrigger className="w-45 bg-white text-lg font-medium font-outfit border border-zinc-200">
            <SelectValue/>
        </SelectTrigger>
        <SelectContent className={cn(className, '')}>
            <SelectGroup>
                {
                    classes.length>0 && 
                    classes.map((c, index) => {
                        return (
                            <SelectItem key={index} value={c.class.id.toString()} className='text-lg font-medium font-outfit'>
                            {c.class.label}
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

export default ClassDropdown