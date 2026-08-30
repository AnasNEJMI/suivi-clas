import { Brain, TrendingUp, Users } from "lucide-react"

const pillars = [
  {
    icon: TrendingUp,
    title: 'Suivi précis',
    desc: 'Des bilans structurés séance par séance et des évaluations de compétences claires pour chaque acteur du programme.',
  },
  {
    icon: Brain,
    title: 'Intelligence augmentée',
    desc: "Fiches de révision générées par IA, QCM adaptatifs et analyse automatique des points de progrès individuels.",
  },
  {
    icon: Users,
    title: 'Collaboration naturelle',
    desc: "Animateurs, élèves et associations travaillent en synergie sur une plateforme conçue pour fluidifier chaque échange.",
  },
]

function MissionSection() {
  return (
    <section className='px-7 py-14'>
      <p className='mb-2 text-center text-[11px] font-medium uppercase tracking-[.9px] text-indigo-700 dark:text-indigo-400'>
        Notre conviction
      </p>
      <h2 className='mb-2 text-center text-xl font-medium text-zinc-900 dark:text-zinc-100'>
        La réussite se construit à plusieurs
      </h2>
      <p className='mx-auto mb-9 max-w-[440px] text-center text-[13px] leading-relaxed text-zinc-500'>
        Avec les bons outils, chaque animateur devient un guide précieux et chaque association peut offrir le suivi à la hauteur de ses ambitions.
      </p>
      <div className='grid grid-cols-3 gap-3'>
        {pillars.map((p) => {
          const Icon = p.icon
          return (
            <div key={p.title} className='rounded-xl border border-zinc-200 bg-white p-[18px] dark:border-zinc-700 dark:bg-zinc-800'>
              <div className='mb-3 flex h-[34px] w-[34px] items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-900/40'>
                <Icon className='h-4 w-4 text-indigo-700 dark:text-indigo-400' aria-hidden />
              </div>
              <h3 className='mb-1.5 text-[13px] font-medium text-zinc-900 dark:text-zinc-100'>
                {p.title}
              </h3>
              <p className='text-[11.5px] leading-[1.5] text-zinc-500 dark:text-zinc-400'>
                {p.desc}
              </p>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default MissionSection