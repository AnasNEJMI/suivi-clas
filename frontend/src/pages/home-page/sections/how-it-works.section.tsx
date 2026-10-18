import { Building2, CheckCircle2, ChevronDown, FileText, GraduationCap, HelpCircle, PenLine, RefreshCw, Star } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Reveal } from '@/components/reveal'
import { useInView } from '@/hooks/use-in-view'
import { SectionHeading } from '@/hooks/section-heading'

// Small illustrations of the product, built from plain divs

function SessionVisual() {
  const rows = ['Yasmine', 'Bilal', 'Inès']
  return (
    <div className='w-full max-w-60 space-y-2'>
      {rows.map(name => (
        <div key={name} className='flex items-center gap-2 rounded-xl bg-white px-2.5 py-2 shadow-sm ring-1 ring-black/5'>
          <span className='grid size-6 place-items-center rounded-full bg-lime-200 text-[10px] font-bold text-lime-800'>{name[0]}</span>
          <span className='text-xs font-semibold text-zinc-700'>{name}</span>
          <span className='ml-auto inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-700'>
            <CheckCircle2 className='size-3' /> Bilan
          </span>
        </div>
      ))}
    </div>
  )
}

function AnalysisVisual() {
  const items = [
    { icon: HelpCircle, label: 'QCM adapté',            tone: 'bg-violet-100 text-violet-700' },
    { icon: FileText,   label: 'Fiche de révision',      tone: 'bg-sky-100 text-sky-700' },
    { icon: Star,       label: 'Compétences évaluées',   tone: 'bg-amber-100 text-amber-700' },
  ]
  return (
    <div className='w-full max-w-60 space-y-2'>
      {items.map(({ icon: Icon, label, tone }) => (
        <div key={label} className='flex items-center gap-2.5 rounded-xl bg-white px-2.5 py-2 shadow-sm ring-1 ring-black/5'>
          <span className={cn('grid size-6 place-items-center rounded-lg', tone)}><Icon className='size-3.5' /></span>
          <span className='text-xs font-semibold text-zinc-700'>{label}</span>
        </div>
      ))}
    </div>
  )
}

function VisionVisual() {
  const roles = [
    { icon: GraduationCap, label: 'Élève',       tone: 'bg-emerald-100 text-emerald-700' },
    { icon: PenLine,       label: 'Animateur',   tone: 'bg-amber-100 text-amber-700' },
    { icon: Building2,     label: 'Association', tone: 'bg-indigo-100 text-indigo-700' },
  ]
  return (
    <div className='grid w-full max-w-64 grid-cols-3 gap-2'>
      {roles.map(({ icon: Icon, label, tone }) => (
        <div key={label} className='flex flex-col items-center gap-1.5 rounded-xl bg-white px-1 py-3 shadow-sm ring-1 ring-black/5'>
          <span className={cn('grid size-8 place-items-center rounded-lg', tone)}><Icon className='size-4' /></span>
          <span className='text-[10px] font-semibold text-zinc-700'>{label}</span>
        </div>
      ))}
    </div>
  )
}

const steps = [
  {
    n: 1,
    title: 'La séance',
    desc: "L'animateur accompagne les élèves et soumet ensuite leurs bilans individuels avec des compléments à l'issue de la séance.",
    visual: <SessionVisual />,
  },
  {
    n: 2,
    title: "L'analyse",
    desc: "La plateforme génère, selon les consignes de l'animateur, des QCM, des fiches et des évaluations de compétences pour chaque élève.",
    visual: <AnalysisVisual />,
  },
  {
    n: 3,
    title: 'La vision',
    desc: "Chaque acteur accède à son espace personnalisé : progrès pour l'élève, suivi pour l'animateur, pilotage pour l'association.",
    visual: <VisionVisual />,
  },
]

function HowItWorksSection() {
  const [gridRef, inView] = useInView<HTMLDivElement>({ threshold: 0.25 })

  return (
    <section className='relative isolate mx-auto mb-24 flex w-full max-w-7xl flex-col items-center overflow-hidden rounded-4xl border border-zinc-200 bg-zinc-50 px-6 py-20 md:px-12 md:py-24'>
      {/* Dotted background, fading toward the edges */}
      <div
        aria-hidden
        className='pointer-events-none absolute inset-0 -z-10'
        style={{
          backgroundImage: 'radial-gradient(#d4d4d8 1px, transparent 1px)',
          backgroundSize:  '20px 20px',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 20%, transparent 75%)',
          maskImage:       'radial-gradient(ellipse at center, black 20%, transparent 75%)',
        }}
      />

      <SectionHeading
        eyebrow='Comment ça marche'
        title='Trois étapes, un cycle complémentaire'
        description='Chaque semaine, la plateforme transforme ce qui se passe en salle en informations pertinentes et concrètes pour tous les acteurs.'
      />

      <div ref={gridRef} className='relative mt-14 grid w-full max-w-5xl gap-10 md:grid-cols-3 md:gap-6'>
        {/* Timeline: runs through the centre of the three badges, draws itself on scroll */}
        <div aria-hidden className='absolute left-[16.67%] right-[16.67%] top-5 hidden h-0.5 md:block'>
          <div
            className={cn(
              'h-full origin-left bg-linear-to-r from-lime-300 via-lime-500 to-lime-300 transition-transform duration-1000 ease-out motion-reduce:transition-none',
              inView ? 'scale-x-100' : 'scale-x-0 motion-reduce:scale-x-100',
            )}
          />
        </div>

        {steps.map((step, i) => (
          <Reveal key={step.n} delay={i * 140} className='relative flex flex-col items-center'>
            <div className='relative z-10 grid size-10 place-items-center rounded-full bg-lime-500 text-base font-bold text-white ring-8 ring-zinc-50'>
              {step.n}
            </div>

            <div className='mt-4 flex w-full flex-1 flex-col rounded-3xl border border-zinc-200 bg-white p-3 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-lime-400 hover:shadow-lg hover:shadow-lime-500/10'>
              <div className='grid h-44 place-items-center rounded-2xl bg-linear-to-br from-lime-100 to-lime-50 p-4'>
                {step.visual}
              </div>
              <div className='px-3 pb-4 pt-5 text-center'>
                <h3 className='text-xl font-bold text-zinc-900'>{step.title}</h3>
                <p className='mt-2 text-balance text-sm leading-relaxed text-zinc-500 md:text-[15px]'>{step.desc}</p>
              </div>
            </div>

            {i < steps.length - 1 && (
              <ChevronDown className='mt-6 size-5 text-lime-600 md:hidden' aria-hidden />
            )}
          </Reveal>
        ))}
      </div>

      <Reveal delay={300} className='mt-14'>
        <div className='inline-flex items-center gap-2 rounded-full border border-lime-300 bg-lime-100/70 px-4 py-2 text-xs md:text-sm font-medium text-lime-900'>
          <RefreshCw className='size-4 animate-spin-slow motion-reduce:animate-none' aria-hidden />
          Le cycle recommence à chaque nouvelle séance
        </div>
      </Reveal>
    </section>
  )
}

export default HowItWorksSection