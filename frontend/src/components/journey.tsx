import { cn } from '@/lib/utils'
import { ChalkboardArt, ClipboardArt, NotebookArt, OpenBookArt } from '@/components/school-art'
import { useScrollProgress } from './use-scroll-progress'
import { Band } from './band'
import { SectionHeading } from '@/hooks/section-heading'


const steps = [
  { title: 'Préparer', Art: ChalkboardArt, tone: 'bg-amber-100 text-amber-600',
    text: "L'animateur retrouve ses classes, ses élèves et les leçons de chaque matière, classées par niveau.",
    chips: ['Classes et élèves', 'Leçons par niveau'] },
  { title: 'Accompagner', Art: OpenBookArt, tone: 'bg-emerald-100 text-emerald-600',
    text: "Selon le besoin : relecture du cours, exercices, ou les deux. L'animateur observe l'attention et la participation de chacun.",
    chips: ['Cours', 'Exercices'] },
  { title: 'Faire le bilan', Art: ClipboardArt, tone: 'bg-indigo-100 text-indigo-600',
    text: "Pour chaque élève : présence, leçon travaillée et un compte rendu écrit avec des mots simples et bienveillants.",
    chips: ['Bilan individuel', 'QCM sur demande'] },
  { title: 'Prolonger à la maison', Art: NotebookArt, tone: 'bg-violet-100 text-violet-600',
    text: "Entre deux séances, l'élève refait un QCM, relit sa fiche de révision et suit sa progression. L'association voit l'ensemble.",
    chips: ['QCM', 'Fiches PDF (prochainement)', 'Statistiques'] },
]

export function Journey() {
  const [ref, p] = useScrollProgress<HTMLOListElement>(0.8, 0.45)

  return (
    <Band tint>
      <SectionHeading
        eyebrow="Le parcours d'une séance"
        title='De la salle de classe à la maison'
        description='Chaque séance suit le même fil, pour que rien ne se perde entre deux rendez-vous.'
      />

      <ol ref={ref} className='relative mt-16 w-full max-w-4xl'>
        <div aria-hidden className='absolute inset-y-0 left-5 w-0.5 -translate-x-1/2 bg-zinc-200 md:left-1/2'>
          <div className='relative w-full bg-lime-500' style={{ height: `${p * 100}%` }}>
            <span className='absolute -bottom-1.5 left-1/2 size-3.5 -translate-x-1/2 rounded-full bg-lime-500 ring-4 ring-lime-200' />
          </div>
        </div>

        {steps.map((s, i) => {
          const left   = i % 2 === 0
          const active = p > (i + 0.15) / steps.length
          return (
            <li key={s.title} className={cn('relative pb-12 pl-16 last:pb-0 md:w-1/2 md:pl-0', left ? 'md:pr-14' : 'md:ml-auto md:pl-14')}>
              <span className={cn(
                'absolute left-0 top-0 z-10 grid size-10 place-items-center rounded-full font-bold ring-8 ring-zinc-50 transition-all duration-500',
                active ? 'scale-110 bg-lime-500 text-white' : 'border-2 border-zinc-300 bg-white text-zinc-400',
                left ? 'md:left-auto md:-right-5' : 'md:-left-5',
              )}>
                {i + 1}
              </span>

              <div className={cn(
                'rounded-3xl border bg-white p-6 transition-all duration-700 ease-out',
                active
                  ? 'translate-x-0 border-lime-300 opacity-100 shadow-lg shadow-lime-500/10'
                  : cn('border-zinc-200 opacity-40 shadow-sm', left ? 'md:-translate-x-6' : 'md:translate-x-6', 'translate-y-3'),
              )}>
                <div className='flex items-center gap-4'>
                  <span className={cn('grid size-14 shrink-0 place-items-center rounded-2xl', s.tone)}><s.Art className='size-9' /></span>
                  <h3 className='text-xl font-bold text-zinc-900'>{s.title}</h3>
                </div>
                <p className='mt-4 text-sm leading-relaxed text-zinc-500 md:text-[15px]'>{s.text}</p>
                <div className='mt-4 flex flex-wrap gap-2'>
                  {s.chips.map(c => <span key={c} className='rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-700'>{c}</span>)}
                </div>
              </div>
            </li>
          )
        })}
      </ol>
    </Band>
  )
}