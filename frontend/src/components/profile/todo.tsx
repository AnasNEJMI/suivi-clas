import type { TodoLinksType } from "@/lib/types/data.types"
import { cn } from "@/lib/utils"
import { Link } from "react-router"

interface TodoProps {
    className? : string,
    todoLinks : TodoLinksType
    student : string,
}


const Todo = ({className, todoLinks, student} : TodoProps) => {
  return (
    <>
        <div className={cn(className, 'flex justify-between items-start flex-col')}>
            <h2 className='text-xl md:text-2xl font-bold'>Supports utiles pour cette semaine</h2>
            <p className="text-base mt-4 opacity-50">Vous trouverez çi-dessous une fiche de révision, un qcm d'entrainement et des exercices pratiques que {student} doit travailler pour approfondir sa maîtrise.</p>
        </div>
        <h3 className="text-lg mt-6"><span className="opacity-50 font-bold">Sujet Actuel</span> : <span className="px-4 py-2 rounded-full bg-zinc-900 text-white text-base">Nombres relatifs</span></h3>
        <div className="flex items-center justify-center gap-6 mt-6">
            <Link to= {todoLinks.fiche} className = 'flex-1 aspect-square rounded-2xl bg-linear-150 from-25% from-zinc-100 to-75% to-sky-300 p-4 text-base lg:text-xl font-bold flex items-center justify-center text-center border-2 border-sky-300/50 noise-bg'><span>Fiche de révision</span></Link>
            <Link to= {todoLinks.qcm} className = 'flex-1 aspect-square rounded-2xl bg-linear-150 from-25% from-zinc-100 to-75% to-yellow-300 p-4 text-base lg:text-xl font-bold flex items-center justify-center text-center border-2 border-yellow-300/50 noise-bg'><span>QCM</span></Link>
            <Link to= {todoLinks.exercices} className = 'flex-1 aspect-square rounded-2xl bg-linear-150 from-25% from-zinc-100 to-75% to-orange-300 p-4 text-base lg:text-xl font-bold flex items-center justify-center text-center border-2 border-orange-300/50 noise-bg'><span>Exercices</span></Link>
        </div>
    </>
  )
}

export default Todo