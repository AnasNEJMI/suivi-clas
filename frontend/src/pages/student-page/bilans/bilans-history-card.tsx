import type { BilansResponse } from "@/api/student/apiCalls"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { formatDate } from "date-fns"

export const SUBJECTS = [
  "Mathématiques",
  "Français",
  "Histoire-Géographie",
  "Sciences de la Vie et de la Terre",
  "Physique-Chimie",
  "Anglais",
] as const;

type Subject = (typeof SUBJECTS)[number];

const cardStyle : Record<Subject, string> = {
  'Anglais' : 'bg-linear-330 from-25% to-75% from-orange-600 to-red-700 text-black',
  'Français' : 'bg-linear-330 from-25% to-75% from-fuchsia-600 to-sky-600 text-white',
  'Histoire-Géographie' : 'bg-linear-330 from-25% to-75% from-teal-600 to-emerald-600 text-white',
  'Mathématiques' : 'bg-linear-330 from-25% to-75% from-blue-500 to-indigo-600 text-white',
  'Physique-Chimie' : 'bg-linear-330 from-25% to-75% from-blue-700 to-purple-500 text-white',
  'Sciences de la Vie et de la Terre' : 'bg-linear-330 from-25% to-75% from-green-600 to-lime-600 text-white',
}

const BilansHistoryCard = ({bilans} : BilansResponse) => {
    const eligibleBilans = bilans.filter(b => b.presence === true && b.lesson);
    console.log('eligibleBilans', eligibleBilans)
    if(eligibleBilans.length === 0){
      return (
        <p className='text-lg font-medium text-pretty opacity-75 mt-4'>Aucun bilan n'a encore été soumis.</p>
      )
    }
    
  return (
    <div className={cn("flex flex-row gap-2 mt-6 flex-nowrap overflow-x-auto px-6 py-6")}>
        {
          eligibleBilans.map((bilan, index) => (
            <Card key={index} className={cn("py-6 rounded-3xl border-none shadow-card", index === 0 && 'ml-6', bilan.lesson?.subject.label? cardStyle[bilan.lesson.subject.label as Subject] : '')}>
                <CardContent className="w-52! min-h-72! flex flex-col items-center justify-center h-full">
                    <span className='uppercase font-bold text-sm text-center'>{bilan.lesson!.subject.label}</span>
                    <Separator className="opacity-20 mt-2"/>
                    <span className='flex-1 text-lg font-bold md:text-xl text-center px-4 flex items-center justify-center mt-4'>{bilan.lesson!.label}</span>
                    <Separator className="opacity-20  mt-4"/>
                    <span className='uppercase font-bold text-base mt-2'>{formatDate(bilan.date, 'd/MM/y')}</span>
                    <span className='uppercase font-bold text-sm mt-2'>Par {bilan.submittedBy.firstName} {bilan.submittedBy.lastName}</span>
                </CardContent>
            </Card>
          ))
        }

    </div>
  )
}

export default BilansHistoryCard