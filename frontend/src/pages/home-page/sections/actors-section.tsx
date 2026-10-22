import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Reveal } from '@/components/reveal'
import {
  ChalkboardArt, ClipboardArt, GradCapArt, LightbulbArt, NotebookArt,
  OpenBookArt, RulerArt, SchoolArt, TrophyArt,
} from '@/components/school-art'
import studentIllustration from '@/./assets/images/student-illus.png'
import teacherIllustration from '@/./assets/images/teacher-illus.png'
import associationIllustration from '@/./assets/images/assoc-illus.png'
import { Floating } from '@/hooks/decor-shapes'
import { SectionHeading } from '@/hooks/section-heading'

type Anim = 'float-a' | 'float-b' | 'wiggle'

const actors = [
  {
    title: "L'Élève",
    description: "Suit sa progression, consulte ses bilans séance par séance, accède à ses fiches de révision et s'évalue grâce à des QCM adaptés à son niveau.",
    tag: 'Guidé et motivé',
    points: ['Ses bilans après chaque séance', 'QCM et fiches de révision', 'Sa progression leçon par leçon'],
    illustration: studentIllustration,
    Badge: GradCapArt,
    minis: [
      { Art: NotebookArt,  pos: 'left-5 top-6 size-11',   anim: 'float-a' as Anim, offset: 0 },
      { Art: LightbulbArt, pos: 'right-6 top-8 size-10',  anim: 'float-b' as Anim, offset: 2 },
    ],
    tone: {
      panel: 'bg-emerald-100', blob: 'bg-emerald-200', art: 'text-emerald-600',
      chip: 'bg-emerald-100 text-emerald-800', check: 'bg-emerald-100 text-emerald-700',
      hover: 'hover:border-emerald-400 hover:shadow-emerald-500/20',
    },
  },
  {
    title: "L'Animateur",
    description: "Soumet des bilans détaillés, évalue compétences et méthodologie, et identifie précisément les axes de progression de chaque élève qu'il accompagne.",
    tag: 'Outillé et éclairé',
    points: ['Des bilans en quelques clics', 'Compétences et méthode évaluées', 'Une vue claire de chaque élève'],
    illustration: teacherIllustration,
    Badge: ChalkboardArt,
    minis: [
      { Art: ClipboardArt, pos: 'left-6 top-8 size-10',  anim: 'float-b' as Anim, offset: 1 },
      { Art: RulerArt,     pos: 'right-5 top-5 size-11', anim: 'wiggle' as Anim,  offset: 0 },
    ],
    tone: {
      panel: 'bg-amber-100', blob: 'bg-amber-200', art: 'text-amber-600',
      chip: 'bg-amber-100 text-amber-800', check: 'bg-amber-100 text-amber-700',
      hover: 'hover:border-amber-400 hover:shadow-amber-500/20',
    },
  },
  {
    title: "L'Association",
    description: "Pilote son programme depuis un tableau de bord complet, suit l'engagement des élèves et visualise l'impact réel de chaque séance sur la progression globale.",
    tag: 'Informée et sereine',
    points: ['Un tableau de bord multi-classes', 'Présence et engagement des élèves', "L'impact de chaque séance"],
    illustration: associationIllustration,
    Badge: SchoolArt,
    minis: [
      { Art: TrophyArt,   pos: 'left-5 top-5 size-11',   anim: 'float-a' as Anim, offset: 3 },
      { Art: OpenBookArt, pos: 'right-6 top-10 size-10', anim: 'float-b' as Anim, offset: 1 },
    ],
    tone: {
      panel: 'bg-indigo-100', blob: 'bg-indigo-200', art: 'text-indigo-600',
      chip: 'bg-indigo-100 text-indigo-800', check: 'bg-indigo-100 text-indigo-700',
      hover: 'hover:border-indigo-400 hover:shadow-indigo-500/20',
    },
  },
]

function ThreeActorsSection() {
  return (
    <section className='mb-12 mt-24 flex w-full max-w-7xl flex-col items-center px-6 relative z-10'>
      <SectionHeading
        eyebrow='Une synergie à trois'
        title='Trois acteurs. Un seul objectif.'
        description="La réussite scolaire n'est jamais l'œuvre d'un seul effort. Elle naît de la convergence de trois acteurs complémentaires, réunis sur une plateforme conçue pour débloquer leurs potentiels."
      />

      <div className='mt-14 grid w-full max-w-md gap-6 lg:max-w-none lg:grid-cols-3'>
        {actors.map((a, i) => (
          <Reveal key={a.title} delay={i * 130} className='h-full'>
            <article className={cn(
              'group relative flex h-full flex-col overflow-hidden rounded-3xl border-2 border-zinc-200 bg-white transition duration-300 hover:-translate-y-1.5 hover:shadow-2xl',
              a.tone.hover,
            )}>
              <div className={cn('relative isolate h-56 overflow-hidden', a.tone.panel)}>
                <div aria-hidden className={cn('absolute -left-10 -top-10 size-44 rounded-full opacity-70', a.tone.blob)} />
                <div aria-hidden className={cn('absolute -bottom-16 -right-8 size-52 rounded-full opacity-60', a.tone.blob)} />
                <div
                  aria-hidden
                  className='absolute inset-0 opacity-30'
                  style={{ backgroundImage: 'radial-gradient(rgba(24,24,27,.25) 1px, transparent 1px)', backgroundSize: '18px 18px' }}
                />
                {a.minis.map(m => (
                  <Floating key={m.pos} className={cn(m.pos, a.tone.art)} animation={m.anim} offset={m.offset}>
                    <m.Art />
                  </Floating>
                ))}
                <img
                  src={a.illustration} alt=''
                  className='relative z-10 mx-auto h-full object-contain px-4 pt-6 transition-transform duration-500 group-hover:scale-105'
                />
              </div>

              <div className='flex flex-1 flex-col px-6 pb-7'>
                <div className='relative z-20 -mt-9 grid size-18 place-items-center rounded-2xl bg-white shadow-lg ring-1 ring-black/5'>
                  <a.Badge className={cn('size-11', a.tone.art)} />
                </div>

                <h3 className='mt-4 text-xl font-extrabold uppercase tracking-tight text-zinc-900 lg:text-2xl'>{a.title}</h3>
                <p className='mt-2 text-sm leading-relaxed text-zinc-500 lg:text-base'>{a.description}</p>

                <ul className='mt-5 flex-1 space-y-2'>
                  {a.points.map(p => (
                    <li key={p} className='flex items-center gap-2.5 text-sm font-medium text-zinc-700'>
                      <span className={cn('grid size-5 shrink-0 place-items-center rounded-full', a.tone.check)}>
                        <Check className='size-3' strokeWidth={3} aria-hidden />
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>

                <span className={cn('mr-auto mt-6 inline-block rounded-full px-3 py-1 text-xs font-semibold', a.tone.chip)}>
                  {a.tag}
                </span>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      {/* Connector: marching dashes between the two outer cards, platform pill in the middle */}
      <Reveal delay={250} className='mt-8 hidden w-full lg:block'>
        <div className='relative grid grid-cols-3 items-center'>
          <div
            aria-hidden
            className='absolute inset-x-[16.67%] top-1/2 h-0.5 -translate-y-1/2 animate-dash motion-reduce:animate-none'
            style={{ backgroundImage: 'linear-gradient(90deg, #d4d4d8 55%, transparent 0)', backgroundSize: '14px 2px' }}
          />
          <div className='relative flex justify-center'>
            <span className='size-3.5 rounded-full bg-emerald-500 ring-4 ring-white' />
          </div>
          <div className='relative flex justify-center'>
            <span className='inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-600 shadow-sm'>
              <span className='size-2 animate-pulse-soft rounded-full bg-lime-500 motion-reduce:animate-none' />
              Une seule plateforme
            </span>
          </div>
          <div className='relative flex justify-center'>
            <span className='size-3.5 rounded-full bg-indigo-500 ring-4 ring-white' />
          </div>
        </div>
      </Reveal>
    </section>
  )
}

export default ThreeActorsSection