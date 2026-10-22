// src/routes/method/sections/synergy.tsx
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { Reveal } from '@/components/reveal'
import { ChalkboardArt, GradCapArt, SchoolArt } from '@/components/school-art'
import { useInView } from '@/hooks/use-in-view'
import { usePrefersReducedMotion } from './use-prefers-reduced-motion'
import { SectionHeading } from '@/hooks/section-heading'

type ActorId = 'student' | 'animator' | 'assoc'
type Pt = { x: number; y: number }

const POS: Record<ActorId, Pt> = { animator: { x: 50, y: 15 }, student: { x: 15, y: 80 }, assoc: { x: 85, y: 80 } }
const HUB: Pt = { x: 50, y: 56 }
const ORDER: ActorId[] = ['student', 'animator', 'assoc']
const EDGES: [ActorId, ActorId][] = [['animator', 'student'], ['student', 'assoc'], ['assoc', 'animator']]

const ACTORS = {
  student:  { label: 'Élève',       Art: GradCapArt,    tone: 'text-emerald-600',
    gives: 'Son implication, son sérieux et son travail, en séance comme à la maison.',
    gets:  'Des bilans clairs, des QCM, des fiches et des repères pour progresser.' },
  animator: { label: 'Animateur',   Art: ChalkboardArt, tone: 'text-amber-600',
    gives: 'Son regard de terrain et sa maîtrise du programme scolaire : bilans, QCM, évaluations de compétences méthodologiques, du niveau de maîtrise et conseils.',
    gets:  "Une vue claire de chaque élève et de son évolution, séance après séance." },
  assoc:    { label: 'Association', Art: SchoolArt,     tone: 'text-indigo-600',
    gives: 'Le cadre et lien qui réunit tout : classes, animateurs et organisation des séances.',
    gets:  "Un pilotage fluide du dispositif mis en place, les données sur la présence, l'engagement et l'impact réel de chaque séance." },
} satisfies Record<ActorId, { label: string; Art: typeof GradCapArt; tone: string; gives: string; gets: string }>

const seg = (a: Pt, b: Pt) => `M${a.x} ${a.y} L${b.x} ${b.y}`

export function Synergy() {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.3 })
  const reduce = usePrefersReducedMotion()
  const [active, setActive] = useState<ActorId>('student')
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused || reduce) return
    const id = setInterval(() => setActive(a => ORDER[(ORDER.indexOf(a) + 1) % ORDER.length] ?? 'student'), 5000)
    return () => clearInterval(id)
  }, [paused, reduce])

  const touching = EDGES.filter(([a, b]) => a === active || b === active)

  return (
    <section className='flex w-full justify-center px-4 py-12 sm:px-6'>
      <div className='relative isolate w-full max-w-7xl overflow-hidden rounded-[2.5rem] bg-zinc-900 px-6 py-20 md:rounded-[4rem] md:px-12 md:py-24'>
        <div aria-hidden className='pointer-events-none absolute -left-24 -top-24 size-96 animate-drift rounded-full bg-lime-400/20 blur-3xl motion-reduce:animate-none' />
        <div aria-hidden className='pointer-events-none absolute -bottom-32 -right-16 size-104 animate-drift rounded-full bg-emerald-400/15 blur-3xl motion-reduce:animate-none' style={{ animationDelay: '-9s' }} />

        <div className='relative z-10 flex flex-col items-center'>
          <SectionHeading
            tone='dark'
            eyebrow='La synergie'
            title="Quand un maillon progresse, les autres en profitent"
            description="Élèves, animateurs et association nourrissent le même cercle. Survolez chaque acteur pour voir ce qu'il apporte et ce qu'il reçoit."
          />

          <div
            className='mt-16 grid w-full max-w-5xl items-center gap-12 lg:grid-cols-2'
            onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}
          >
            <div ref={ref} className='relative mx-auto aspect-square w-full max-w-md'>
              <svg viewBox='0 0 100 100' className='absolute inset-0 size-full' aria-hidden>
                {[...EDGES.map(([a, b]) => seg(POS[a], POS[b])), ...ORDER.map(id => seg(POS[id], HUB))].map((d, i) => (
                  <path
                    key={d} d={d} pathLength={1} fill='none' stroke='rgba(255,255,255,.18)' strokeWidth={0.6} strokeLinecap='round'
                    style={{ strokeDasharray: 1, strokeDashoffset: inView ? 0 : 1, transition: `stroke-dashoffset 1.2s ease-out ${i * 140}ms` }}
                  />
                ))}

                {inView && [...touching.map(([a, b]) => seg(POS[a], POS[b])), seg(POS[active], HUB)].map(d => (
                  <path
                    key={`${active}-${d}`} d={d} fill='none' stroke='#bef264' strokeWidth={0.9} strokeLinecap='round' strokeDasharray='2 3'
                    className='animate-dash-flow motion-reduce:animate-none'
                  />
                ))}

                {inView && !reduce && EDGES.flatMap(([a, b], i) => [
                  { d: seg(POS[a], POS[b]), begin: i * 0.7 },
                  { d: seg(POS[b], POS[a]), begin: i * 0.7 + 1.6 },
                ]).map(({ d, begin }, i) => (
                  <circle key={i} r={1.3} fill='#bef264'>
                    <animateMotion dur='3.2s' begin={`${begin}s`} repeatCount='indefinite' path={d} />
                  </circle>
                ))}
              </svg>

              {/* Hub */}
              <div className='absolute -translate-x-1/2 -translate-y-1/2' style={{ left: `${HUB.x}%`, top: `${HUB.y}%` }}>
                <span aria-hidden className='absolute inset-0 animate-ping-slow rounded-full bg-lime-300/50 motion-reduce:animate-none' />
                <span className='relative grid size-16 place-items-center rounded-full bg-lime-300 font-extrabold uppercase tracking-wide text-zinc-900 text-[10px]'>Progrès</span>
              </div>

              {ORDER.map(id => {
                const a = ACTORS[id]
                const on = id === active
                return (
                  <button
                    key={id} type='button' aria-pressed={on} aria-label={a.label}
                    onMouseEnter={() => setActive(id)} onFocus={() => setActive(id)} onClick={() => setActive(id)}
                    className='absolute -translate-x-1/2 -translate-y-1/2 outline-none'
                    style={{ left: `${POS[id].x}%`, top: `${POS[id].y}%` }}
                  >
                    {on && <span aria-hidden className='absolute inset-0 animate-ping-slow rounded-3xl bg-lime-300/60 motion-reduce:animate-none' />}
                    <span className={cn(
                      'relative z-10 grid size-16 place-items-center rounded-3xl bg-white transition duration-300 sm:size-20',
                      on ? 'scale-110 shadow-[0_0_0_6px_rgba(190,242,100,.35)]' : 'opacity-90',
                    )}>
                      <a.Art className={cn('size-10 sm:size-12', a.tone)} />
                    </span>
                    <span className='absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap text-xs font-bold text-white'>{a.label}</span>
                  </button>
                )
              })}
            </div>

            <div className='space-y-3'>
              {ORDER.map(id => {
                const a = ACTORS[id]
                const on = id === active
                return (
                  <button
                    key={id} type='button' onClick={() => setActive(id)} aria-expanded={on}
                    className={cn('block w-full rounded-3xl border-2 p-5 text-left transition-colors duration-300', on ? 'border-lime-300 bg-white/10' : 'border-white/10 hover:border-white/25')}
                  >
                    <span className='flex items-center gap-3'>
                      <span className='grid size-11 place-items-center rounded-2xl bg-white'><a.Art className={cn('size-7', a.tone)} /></span>
                      <span className='text-lg font-bold text-white'>{a.label}</span>
                    </span>
                    <span className={cn('grid transition-[grid-template-rows] duration-500 ease-out', on ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]')}>
                      <span className='overflow-hidden'>
                        <span className='mt-4 block space-y-3 text-sm leading-relaxed'>
                          <span className='block'><strong className='block text-xs uppercase tracking-widest text-lime-300'>Apporte</strong><span className='text-zinc-300'>{a.gives}</span></span>
                          <span className='block'><strong className='block text-xs uppercase tracking-widest text-lime-300'>Reçoit</strong><span className='text-zinc-300'>{a.gets}</span></span>
                        </span>
                      </span>
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          <Reveal delay={200} className='mt-14'>
            <p className='max-w-xl text-balance text-center text-lg font-semibold text-white/90'>
              Plus l'information circule, plus chaque séance devient utile : à l'élève, à l'animateur et à toute l'association.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}