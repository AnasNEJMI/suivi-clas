import type { BilansResponse } from "@/api/student/apiCalls"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator";
import { formatDate } from "date-fns"


const BilansHistoryCard = ({bilans} : BilansResponse) => {
    const eligibleBilans = bilans.filter(b => b.presence === true && b.lesson);
    console.log('eligibleBilans', eligibleBilans)
    if(eligibleBilans.length === 0){
      return (
        <p className='text-lg font-medium text-pretty opacity-75 mt-4'>Aucun bilan n'a encore été soumis.</p>
      )
    }
    
  return (
    <div className="flex flex-row mt-6 flex-nowrap overflow-x-auto">
        {
          eligibleBilans.map((bilan, index) => (
            <Card key={index} className={`w-48! py-8 rounded-3xl bg-linear-30 from-25% from-blue-600 to-75% to-indigo-600 text-white`}>
                <CardContent className="flex flex-col items-center justify-center h-full">
                    <span className='uppercase font-bold text-sm text-sky-200 text-center'>{bilan.lesson!.subject.label}</span>
                    <Separator className="opacity-20 mt-2"/>
                    <span className='flex-1 text-lg font-bold md:text-xl text-center px-4 flex items-center justify-center mt-4'>{bilan.lesson!.label}</span>
                    <Separator className="opacity-20  mt-4"/>
                    <span className='uppercase font-bold text-base text-sky-200 mt-2'>{formatDate(bilan.date, 'd/MM/y')}</span>
                    <span className='uppercase font-bold text-sm text-sky-200 mt-2'>Par {bilan.submittedBy.firstName} {bilan.submittedBy.lastName}</span>
                </CardContent>
            </Card>
          ))
        }

    </div>
  )
}

export default BilansHistoryCard