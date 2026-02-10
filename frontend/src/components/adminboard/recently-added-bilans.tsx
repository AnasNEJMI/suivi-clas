import type { Bilan } from "@/api/admin"
import { cn } from "@/lib/utils";
import { formatDate } from "date-fns";

interface RecentlyAddedBilansProps {
  className ?: string,
  bilans : Bilan[];
}

const RecentlyAddedBilans = ({className, bilans} : RecentlyAddedBilansProps) => {
  return (
    <>
        <h2>Récemment soumis</h2>
        <div className={cn('w-full overflow-x-auto mt-6 flex py-4', className)}>
            <div className='inline-flex gap-6'> 
                {
                bilans.map((bilan, index) => (
                <div key={index} data-present={bilan.presence} className='w-36 data-[present=true]:bg-lime-400 data-[present=true]:border-green-500/50 data-[present=false]:bg-orange-600 data-[present=false]:text-white data-[present=false]:border-red-600 border  rounded-xl p-4 flex flex-col items-center gap-1 justify-center'>
                    <span className='font-bold text-base text-center'>{bilan.user.firstName} {bilan.user.lastName}</span>
                    <span className='font-light uppercase text-sm text-center mt-2'>{bilan.subject}</span>
                    <span className='font-bold text-sm opacity-75 mt-4'>{formatDate(bilan.date, 'd/MM/y')}</span>
                </div>
                ))
                }
            </div>
        </div>
    </>
  )
}

export default RecentlyAddedBilans