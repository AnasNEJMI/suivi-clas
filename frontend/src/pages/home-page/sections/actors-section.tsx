import { cn } from "@/lib/utils"
import { Building2, GraduationCap, PenLine, RefreshCw } from "lucide-react"
import studentIllustration from '@/./assets/images/student-illus.png';
import teacherIllustration from '@/./assets/images/teacher-illus.png';
import associationIllustration from '@/./assets/images/assoc-illus.png';

const forces = [
  {
    icon: GraduationCap,
    title: "L'Élève",
    description:
      "Suit sa progression, consulte ses bilans séance par séance, accède à ses fiches de révision et s'évalue grâce à des QCM adaptés à son niveau.",
    tag: 'Guidé et motivé',
    bar: 'bg-violet-600',
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-800',
    tagBg: 'bg-emerald-100',
    tagColor: 'text-emerald-800',
    illustration : studentIllustration,
    borderColor : 'border-emerald-500'
  },
  {
    icon: PenLine,
    title: "L'Animateur",
    description:
      "Soumet des bilans détaillés, évalue compétences et méthodologie, et identifie précisément les axes de progression de chaque élève qu'il accompagne.",
    tag: 'Outillé et éclairé',
    bar: 'bg-teal-700',
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-800',
    tagBg: 'bg-amber-100',
    tagColor: 'text-amber-800',
    illustration : teacherIllustration,
    borderColor : 'border-amber-500'
  },
  {
    icon: Building2,
    title: "L'Association",
    description:
    "Pilote son programme depuis un tableau de bord complet, suit l'engagement des élèves et visualise l'impact réel de chaque séance sur la progression globale.",
    tag: 'Informée et sereine',
    bar: 'bg-amber-600',
    iconBg: 'bg-indigo-100',
    iconColor: 'text-indigo-800',
    tagBg: 'bg-indigo-100',
    tagColor: 'text-indigo-800',
    illustration : associationIllustration,
    borderColor : 'border-indigo-500'
  },
]

function ThreeActorsSection() {
  return (
    <section className='mt-24 mb-12 px-6 flex flex-col items-center max-w-7xl'>
      <p className='text-center text-sm font-medium uppercase tracking-wide text-lime-600'>
        Une synergie à trois
      </p>
      <h2 className='mt-2 text-center font-bold text-3xl md:text-4xl text-zinc-900'>
        Trois acteurs. Un seul Objectif.
      </h2>
      <p className='mt-2 mx-auto max-w-sm md:max-w-md lg:max-w-lg text-sm lg:text-base text-center text-balance leading-relaxed text-zinc-500'>
        La réussite scolaire n'est jamais l'œuvre d'un seul effort. Elle naît de la convergence
        de trois acteurs complémentaires, réunies sur une plateforme conçue pour débloquer leurs potentiels.
      </p>
      <div className='grid gird-cols-1 md:grid-cols-3 gap-6 mt-12'>
        {forces.map((f) => {
          const Icon = f.icon
          return (
            <div
              key={f.title}
              className={cn('relative max-w-md bg-white overflow-hidden rounded-xl flex flex-col justify-stretch transition-transform duration-200 hover:-translate-y-1 shadow-card border-3', f.borderColor)}
            >
              <div className="w-full aspect-3/2 max-h-48 mt-6 shrink-0">
                <img src={f.illustration} className="mx-auto h-full">
                </img>
              </div>
              <div className=" pl-4 pt-4">
                <div className={cn('mb-3 flex h-10 w-10 items-center justify-center rounded-sm', f.iconBg)}>
                  <Icon className={cn('h-4 w-4', f.iconColor)} aria-hidden />
                </div>
              </div>
              <div className="px-4 pb-4 h-full flex flex-col">
                <p className='mt-4 text-lg lg:text-xl font-bold text-zinc-900 uppercase tracking-tight'>
                  {f.title}
                </p>
                <p className='flex-1 mt-2 text-sm lg:text-base leading-[1.55] text-zinc-500'>
                  {f.description}
                </p>
                <span className={cn('mt-2.5 inline-block rounded-full px-2 py-0.5 text-xs font-medium mr-auto', f.tagBg, f.tagColor)}>
                  {f.tag}
                </span>
              </div>
            </div>
          )
        })}
      </div>
      <div className='hidden lg:flex mt-6 items-center justify-center gap-2 w-full max-w-xl'>
        <div className='h-2 w-2 rounded-full bg-violet-600' />
        <div className='h-px flex-1 bg-zinc-200 dark:bg-zinc-700' />
        <div className='flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-[11px] text-zinc-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400'>
          <RefreshCw className='h-3 w-3' aria-hidden /> Plateforme unifiée
        </div>
        <div className='h-px flex-1 bg-zinc-200 dark:bg-zinc-700' />
        <div className='h-2 w-2 rounded-full bg-amber-600' />
      </div>
    </section>
  )
}

export default ThreeActorsSection;