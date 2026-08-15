import type { SkillsEvalEntry } from "@/api/student/apiCalls"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface SkillsEvalAnimatorDropdownProps {
    className? : string,
    skillsEvals : SkillsEvalEntry[],
    selectedValue : string,
    onValueChange : React.Dispatch<React.SetStateAction<SkillsEvalEntry>>
}

const SkillsEvalAnimatorDropdown = ({className, skillsEvals, selectedValue, onValueChange} : SkillsEvalAnimatorDropdownProps) => {
  const updateValue = (value : string) => {
        const skillsEval = skillsEvals.find((se) => se.animator.id === parseInt(value));
        if(!skillsEval){
        throw Error(`Couldn't find skill eval for animatorId : ${value}`);
        }
        onValueChange(skillsEval);
    }
    return (
    <Select value={selectedValue} onValueChange={(value) => updateValue(value)}>
        <SelectTrigger className="w-45 bg-white text-lg font-medium font-outfit">
            <SelectValue/>
        </SelectTrigger>
        <SelectContent className={cn(className, '')}>
            <SelectGroup>
                {
                    skillsEvals.length>0 &&
                    skillsEvals.map((skillsEval, index) => (
                        <SelectItem key={index} value={skillsEval.animator.id.toString()} className='text-lg font-medium font-outfit'>{skillsEval.animator.firstName} {skillsEval.animator.lastName}</SelectItem>
                    ))
                }
            </SelectGroup>
        </SelectContent>
    </Select>
  )
}

export default SkillsEvalAnimatorDropdown