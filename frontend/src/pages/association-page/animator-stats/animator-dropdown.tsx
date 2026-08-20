import type { AnimatorStats } from "@/api/association-member/apiCalls"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'

interface AnimatorDropdownProps {
    className? : string,
    animators : AnimatorStats[],
    selectedValue : string,
    onValueChange : React.Dispatch<React.SetStateAction<AnimatorStats>>
}
const AnimatorDropdown = ({className, animators, selectedValue, onValueChange} : AnimatorDropdownProps) => {
    const updateValue = (value : string) => {
        const animator = animators.find((a) => a.animator.id === parseInt(value));
        if(!animator){
        throw Error(`Couldn't find scolarYear with id : ${value}`);
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
                    animators.length>0 && 
                    animators.map((animator, index) => {
                        return (
                            <SelectItem key={index} value={animator.animator.id.toString()} className='text-lg font-medium font-outfit'>
                                <span className="font-medium capitalize">{animator.animator.firstName}</span> <span className="font-medium uppercase">{animator.animator.lastName}</span>
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

export default AnimatorDropdown