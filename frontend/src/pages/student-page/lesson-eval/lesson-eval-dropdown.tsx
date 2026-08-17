import type { LessonsBySubject } from '@/api/student/apiCalls'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'
import React from 'react'

interface LessonEvalDropdownProps {
    className? : string,
    lessonsBySubject : LessonsBySubject[],
    selectedValue : string,
    onValueChange : React.Dispatch<React.SetStateAction<LessonsBySubject>>
}

const LessonEvalDropdown = ({className, lessonsBySubject, selectedValue, onValueChange} : LessonEvalDropdownProps) => {
  const updateValue = (value : string) => {
        const subject = lessonsBySubject.find((s) => s.id === parseInt(value));
        if(!subject){
        throw Error(`Couldn't find subject with id : ${value}`);
        }
        onValueChange(subject);
    }

    function hasEval(lessonsBySubject : LessonsBySubject){
        for(const lesson of lessonsBySubject.lessons){
            if(lesson.eval) return true;
        }
        return false;
    }
    return (
    <Select value={selectedValue} onValueChange={(value) => updateValue(value)}>
        <SelectTrigger className="w-45 bg-white text-lg font-medium font-outfit border-none shadow-card">
            <SelectValue/>
        </SelectTrigger>
        <SelectContent className={cn(className, '')}>
            <SelectGroup>
                {
                    lessonsBySubject.length>0 && 
                    lessonsBySubject.map((subject, index) => {
                        if(!hasEval(subject)) return null;
                        return (
                            <SelectItem key={index} value={subject.id.toString()} className='text-lg font-medium font-outfit'>{subject.label}</SelectItem>
                        )
                    }
                    )
                }
            </SelectGroup>
        </SelectContent>
    </Select>
    )
}

export default LessonEvalDropdown