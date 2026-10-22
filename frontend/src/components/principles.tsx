// src/routes/method/sections/principles.tsx
import { Fragment, type ComponentType } from 'react'
import { Building2, Check, GraduationCap, PenLine } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ClipboardArt, LightbulbArt, RulerArt, SpeechArt } from '@/components/school-art'
import { useInView } from '@/hooks/use-in-view'
import { SectionHeading } from '@/hooks/section-heading'

function ObserveVisual({ on }: { on: boolean }) {
  const rows: [string, string][] = [['Présence', 'Présent ✓'], ['Leçon', 'Théorème de Pythagore'], ['Implication', '●●●○']]
  return (
    <div className='space-y-2.5'>
      {rows.map(([k, v], i) => (
        <div
          key={k} style={{ transitionDelay: `${300 + i * 180}ms` }}
          className={cn('flex items-center justify-between gap-3 rounded-xl bg-zinc-50 px-4 py-3 transition-all duration-500', on ? 'translate-x-0 opacity-100' : 'translate-x-6 opacity-0')}
        >
          <span className='text-xs font-bold uppercase tracking-wide text-zinc-400'>{k}</span>
          <span className='text-sm font-bold text-zinc-800'>{v}</span>
        </div>
      ))}
    </div>
  )
}

function EvaluateVisual({ on }: { on: boolean }) {
  const bars: [string, number][] = [['Autonomie', 80], ['Régularité', 65], ['Respect', 90]]
  return (
    <div className='space-y-4'>
      {bars.map(([k, pct], i) => (
        <div key={k}>
          <div className='mb-1.5 flex justify-between text-xs font-bold text-zinc-600'><span>{k}</span><span>{pct / 10}/10</span></div>
          <div className='h-3 overflow-hidden rounded-full bg-zinc-100'>
            <div
              className='h-full rounded-full bg-amber-400 transition-[width] duration-1000 ease-out'
              style={{ width: `${on ? pct : 0}%`, transitionDelay: `${300 + i * 200}ms` }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

function PracticeVisual({ on }: { on: boolean }) {
  const options = ['La plus courte', 'Le côté opposé à l’angle droit', 'La médiane', 'La hauteur']
  return (
    <div>
      <p className='text-sm font-bold text-zinc-800'>Dans un triangle rectangle, l'hypoténuse est…</p>
      <div className='mt-3 space-y-2'>
        {options.map((o, i) => {
          const correct = i === 1
          return (
            <div key={o} className={cn(
              'flex items-center gap-2.5 rounded-xl border-2 px-3 py-2 text-sm font-medium transition-colors duration-500 delay-[1100ms]',
              correct && on ? 'border-emerald-400 bg-emerald-50 text-emerald-800' : 'border-zinc-200 text-zinc-600',
            )}>
              <span className='grid size-5 shrink-0 place-items-center rounded-full bg-zinc-100 text-[10px] font-bold'>{'ABCD'[i]}</span>
              {o}
              {correct && <Check className={cn('ml-auto size-4 text-emerald-600 transition-opacity duration-500 delay-[1100ms]', on ? 'opacity-100' : 'opacity-0')} aria-hidden />}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function ShareVisual({ on }: { on: boolean }) {
  const nodes = [
    { Icon: GraduationCap, label: 'Élève',       tone: 'bg-emerald-100 text-emerald-700' },
    { Icon: PenLine,       label: 'Animateur',   tone: 'bg-amber-100 text-amber-700' },
    { Icon: Building2,     label: 'Association', tone: 'bg-indigo-100 text-indigo-700' },
  ]
  return (
    <div className='flex items-center justify-between gap-1 py-8'>
      {nodes.map(({ Icon, label, tone }, i) => (
        <Fragment key={label}>
          <div
            style={{ transitionDelay: `${300 + i * 200}ms` }}
            className={cn('flex flex-col items-center gap-2 transition-all duration-500', on ? 'scale-100 opacity-100' : 'scale-75 opacity-0')}
          >
            <span className={cn('grid size-14 place-items-center rounded-2xl', tone)}><Icon className='size-7' aria-hidden /></span>
            <span className='text-xs font-bold text-zinc-600'>{label}</span>
          </div>
          {i < nodes.length - 1 && (
            <div className='flex-1 h-10 flex flex-col justify-evenly mb-4'>
              <span
                aria-hidden className=' h-0.5 animate-dash motion-reduce:animate-none'
                style={{ backgroundImage: 'linear-gradient(90deg,#a1a1aa 55%,transparent 0)', backgroundSize: '14px 2px' }}
              />
              <span
                aria-hidden className='h-0.5 animate-dash-inverse motion-reduce:animate-none'
                style={{ backgroundImage: 'linear-gradient(90deg,#a1a1aa 55%,transparent 0)', backgroundSize: '14px 2px' }}
              />
            </div>
          )}
        </Fragment>
      ))}
    </div>
  )
}

type Principle = {
  n: string; title: string; text: string; chips: string[]
  Art: ComponentType<{ className?: string }>
  panel: string; stroke: string
  Visual: ComponentType<{ on: boolean }>
}

const principles: Principle[] = [
  { n: '01', title: 'Accompagner', Art: ClipboardArt, panel: 'bg-emerald-200', stroke: '#047857', Visual: ObserveVisual,
    text: "L'animateur accompagne et guide les élèves durant chaque séance. Après, un bilan individuel personnalisé pour chaque élève: présence, leçon travaillée, évolution de la méthode du travail et implication de l'élève. Rien ne se perd.",
    chips: ['Bilan individuel', 'Trace écrite'] },
  { n: '02', title: 'Évaluer', Art: RulerArt, panel: 'bg-amber-200', stroke: '#b45309', Visual: EvaluateVisual,
    text: "l'évolution des compétences méthodologiques du travail et du niveau de maîtrise pour chaque leçon abordée, avec des repères clairs.",
    chips: ['7 compétences méthodologique', '3 niveaux de maîtrise du programme scolaire'] },
  { n: '03', title: "S'entraîner", Art: LightbulbArt, panel: 'bg-violet-200', stroke: '#6d28d9', Visual: PracticeVisual,
    text: "Des QCM et des supports complémentaires envoyés pour consolider ce qui a été vu pendant la séance, et pour préparer la séance qui suit.",
    chips: ['QCM', 'Fiches de révision (prochainement)'] },
  { n: '04', title: 'Partager', Art: SpeechArt, panel: 'bg-sky-200', stroke: '#0369a1', Visual: ShareVisual,
    text: "L'élève, l'animateur et l'association suivent la même progression, chacun depuis son espace. Une seule vérité à partir de laquelle des actions productives peuvent être tirées.",
    chips: ['3 espaces', 'Une seule vérité'] },
]

function PrincipleCard({ p, index }: { p: Principle; index: number }) {
  const [ref, on] = useInView<HTMLElement>({ threshold: 0.35 })
  return (
    <div className='sticky mb-6 md:mb-10' style={{ top: `calc(5.5rem + ${index * 1.1}rem)` }}>
      <article
        ref={ref}
        className={cn('group grid gap-8 rounded-[2rem] p-7 shadow-xl shadow-zinc-900/5 ring-1 ring-black/5 md:grid-cols-2 md:items-center md:rounded-[2.5rem] md:p-12', p.panel)}
      >
        <div>
          <div className='flex items-center justify-between'>
            <span className='text-7xl font-black leading-none md:text-8xl text-white/75'>{p.n}</span>
            <span className='grid size-20 place-items-center rounded-3xl bg-white/80 shadow-sm'>
              <p.Art className='size-12 text-zinc-800 group-hover:animate-wiggle motion-reduce:animate-none' />
            </span>
          </div>
          <h3 className='mt-6 text-3xl font-extrabold tracking-tight text-zinc-900 md:text-4xl'>{p.title}</h3>
          <p className='mt-3 max-w-md text-sm leading-relaxed text-zinc-800/80 md:text-base'>{p.text}</p>
          <div className='mt-5 flex flex-wrap gap-2'>
            {p.chips.map(c => <span key={c} className='rounded-full bg-white/70 px-3 py-1 text-xs font-bold text-zinc-800'>{c}</span>)}
          </div>
        </div>
        <div className='rounded-3xl bg-white p-5 shadow-lg shadow-zinc-900/5 md:p-6'><p.Visual on={on} /></div>
      </article>
    </div>
  )
}

export function Principles() {
  return (
    <section className='flex w-full flex-col items-center px-6 pb-24 pt-8'>
      <SectionHeading
        eyebrow='Un cycle gagnant'
        title='Quatre idées qui guident tout'
        description="Une méthode volontairement simple : accompagner, évaluer, s'entraîner et partager."
      />
      <div className='mt-14 w-full max-w-6xl'>
        {principles.map((p, i) => <PrincipleCard key={p.n} p={p} index={i} />)}
      </div>
    </section>
  )
}