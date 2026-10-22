// src/routes/method/sections/tracking.tsx
import { useState } from 'react'
import { Flame, Target, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Reveal } from '@/components/reveal'
import { useInView } from '@/hooks/use-in-view'
import { Band } from './band'
import { SectionHeading } from '@/hooks/section-heading'

const WITH    = [3, 3.6, 4.2, 5, 5.4, 6.3, 6.9, 7.5, 8.1, 8.8]
const WITHOUT = [3, 3.5, 2.9, 3.7, 3.2, 3.9, 3.3, 3.6, 3.4, 3.8]
const NOTES = [
  'Premier bilan : le point de départ est posé.',
  'Une compétence de méthode à travailler est identifiée.',
  "Premier QCM refait à la maison.",
  'Les efforts sont salués dans le bilan.',
  'La fiche de révision devient un réflexe.',
  "Les progrès en méthodologie se confirment.",
  "L'animateur ajuste les exercices à ce qui fonctionne.",
  'Les points forts sont consolidés.',
  "L'élève voit lui-même sa progression.",
  'Une évolution mesurable séance après séance.',
]
const WITHOUT_NOTE = "Sans trace écrite, il est difficile de savoir ce qui a fonctionné ou ce qu'il faut ajuster."

const W = 640, H = 300, L = 44, R = 20, T = 20, B = 38
const X = (i: number) => L + (i * (W - L - R)) / 9
const Y = (v: number) => T + (1 - v / 10) * (H - T - B)

function pathOf(vals: number[]) {
  return vals.reduce((d, v, i) => {
    if (i === 0) return `M${X(0)} ${Y(v)}`
    const px = X(i - 1), py = Y(vals[i - 1] ?? 0), x = X(i), y = Y(v), c = (px + x) / 2
    return `${d} C${c} ${py} ${c} ${y} ${x} ${y}`
  }, '')
}

const fmt = (n: number) => n.toFixed(1).replace('.', ',')

const benefits = [
  { Icon: Target,     title: 'Des repères clairs', text: 'À chaque séance, on sait où en est chaque élève et quoi travailler ensuite.' },
  { Icon: TrendingUp, title: 'Des ajustements rapides', text: "Un décrochage se voit tout de suite, et l'animateur peut réagir sans attendre." },
  { Icon: Flame,      title: 'Une motivation visible', text: 'Voir ses progrès, bilan après bilan, donne envie de continuer.' },
]

export function Tracking() {
  const [ref, on] = useInView<HTMLDivElement>({ threshold: 0.3 })
  const [series, setSeries] = useState<'with' | 'without'>('with')
  const [idx, setIdx] = useState(9)

  const vals = series === 'with' ? WITH : WITHOUT
  const lineStyle = (key: 'with' | 'without', delay: number) => ({
    strokeDasharray: 1,
    strokeDashoffset: on ? 0 : 1,
    opacity: series === key ? 1 : 0.18,
    transition: `stroke-dashoffset 1.8s cubic-bezier(.65,0,.35,1) ${delay}ms, opacity .4s`,
  })

  return (
    <Band>
      <SectionHeading
        eyebrow='Le suivi dans la durée'
        title='Chaque séance ajoute un point à la courbe'
        description="C'est la régularité du suivi, bilan après bilan, qui transforme de bons efforts en vrais progrès."
      />

      <Reveal className='mt-14 w-full max-w-4xl'>
        <div ref={ref} className='rounded-[2rem] border-2 border-zinc-200 bg-white p-5 shadow-sm md:p-8'>
          <div className='flex flex-wrap items-center justify-between gap-4'>
            <div className='flex rounded-full bg-zinc-100 p-1'>
              {([['with', 'Avec un suivi régulier'], ['without', 'Sans suivi']] as const).map(([key, label]) => (
                <button
                  key={key} type='button' aria-pressed={series === key}
                  onClick={() => setSeries(key)}
                  className={cn('rounded-full px-4 py-2 text-sm font-semibold transition', series === key ? 'bg-zinc-900 text-white shadow' : 'text-zinc-600 hover:text-zinc-900')}
                >
                  {label}
                </button>
              ))}
            </div>
            {/* <p className='text-sm text-zinc-500'>Autonomie, sur 10 séances</p> */}
          </div>

          <svg viewBox={`0 0 ${W} ${H}`} className='mt-6 h-auto w-full' role='img' aria-label="Évolution illustrative d'une compétence sur dix séances, avec et sans suivi régulier">
            {[0, 5, 10].map(v => (
              <g key={v}>
                <line x1={L} x2={W - R} y1={Y(v)} y2={Y(v)} stroke='#e4e4e7' strokeWidth={1} />
                <text x={L - 10} y={Y(v) + 4} textAnchor='end' fontSize={12} fill='#a1a1aa'>{v}</text>
              </g>
            ))}
            {WITH.map((_, i) => (
              <text key={i} x={X(i)} y={H - 12} textAnchor='middle' fontSize={11} fill={i === idx ? '#18181b' : '#a1a1aa'} fontWeight={i === idx ? 700 : 400}>S{i + 1}</text>
            ))}

            <line x1={X(idx)} x2={X(idx)} y1={T} y2={Y(0)} stroke='#d4d4d8' strokeDasharray='4 4' />

            <path
              d={`${pathOf(WITH)} L${X(9)} ${Y(0)} L${X(0)} ${Y(0)} Z`} fill='#bef264'
              style={{ opacity: on && series === 'with' ? 0.45 : 0, transition: 'opacity 1s ease 900ms' }}
            />
            <path d={pathOf(WITHOUT)} pathLength={1} fill='none' stroke='#a1a1aa' strokeWidth={3.5} strokeLinecap='round' style={lineStyle('without', 300)} />
            <path d={pathOf(WITH)}    pathLength={1} fill='none' stroke='#65a30d' strokeWidth={5}   strokeLinecap='round' style={lineStyle('with', 0)} />

            {vals.map((v, i) => (
              <g key={`${series}-${i}`}>
                <circle
                  cx={X(i)} cy={Y(v)} r={6} fill='white' stroke={series === 'with' ? '#65a30d' : '#a1a1aa'} strokeWidth={3}
                  style={{
                    transformBox: 'fill-box', transformOrigin: 'center',
                    transform: `scale(${on ? (i === idx ? 1.5 : 1) : 0})`,
                    transition: `transform .4s ease ${on ? 600 + i * 90 : 0}ms`,
                  }}
                />
                <circle
                  cx={X(i)} cy={Y(v)} r={16} fill='transparent' tabIndex={0}
                  aria-label={`Séance ${i + 1}, niveau ${fmt(v)} sur 10`}
                  className='cursor-pointer outline-none'
                  onMouseEnter={() => setIdx(i)} onFocus={() => setIdx(i)} onClick={() => setIdx(i)}
                />
              </g>
            ))}
          </svg>

          <div className='mt-2 flex items-start gap-4 rounded-2xl bg-zinc-50 p-4'>
            {/* <div className='shrink-0 rounded-xl bg-white px-4 py-2 text-center shadow-sm'>
              <p className='text-xs font-bold uppercase tracking-wide text-zinc-400'>Séance {idx + 1}</p>
              <p className='text-2xl font-extrabold text-zinc-900'>{fmt(vals[idx] ?? 0)}<span className='text-sm text-zinc-400'>/10</span></p>
            </div> */}
            <p className='self-center text-sm font-medium leading-relaxed text-zinc-700'>
              {series === 'with' ? NOTES[idx] : WITHOUT_NOTE}
            </p>
          </div>

          {/* <p className='mt-4 text-center text-xs text-zinc-400'>
            Avec un suivi régulier : +{fmt(gain)} points en 10 séances. Données fictives, à titre d'illustration.
          </p> */}
        </div>
      </Reveal>

      <div className='mt-10 grid w-full max-w-4xl gap-4 md:grid-cols-3'>
        {benefits.map(({ Icon, title, text }, i) => (
          <Reveal key={title} delay={i * 100} className='h-full'>
            <article className='h-full rounded-3xl border border-zinc-200 bg-zinc-50 p-5 transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg'>
              <span className='grid size-11 place-items-center rounded-2xl bg-lime-300 text-zinc-900'><Icon className='size-5' aria-hidden /></span>
              <h3 className='mt-4 text-base font-bold text-zinc-900'>{title}</h3>
              <p className='mt-1 text-sm leading-relaxed text-zinc-500'>{text}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </Band>
  )
}