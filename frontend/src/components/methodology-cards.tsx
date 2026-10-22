// src/routes/method/sections/skills.tsx
import { useState } from 'react'
import {
  Backpack, CalendarCheck, Clock, Compass, HeartHandshake, ListChecks, MessageSquareText, Target, type LucideIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Reveal } from '@/components/reveal'
import { Band } from './band'
import { SectionHeading } from '@/hooks/section-heading'

type Skill = { label: string; text: string; Icon: LucideIcon; tone: string; observe: [string, string] }

const skills: Skill[] = [
  { label: 'Ponctualité', Icon: Clock, tone: 'bg-sky-100 text-sky-700', text: "Arriver à l'heure et respecter le cadre de la séance.",
    observe: ["Arrivée à l'heure", 'Respect des horaires'] },
  { label: 'Préparation', Icon: Backpack, tone: 'bg-amber-100 text-amber-700', text: 'Venir avec son matériel et ses cahiers.',
    observe: ['Matériel apporté', 'Leçon relue avant la séance'] },
  { label: 'Autonomie', Icon: Compass, tone: 'bg-emerald-100 text-emerald-700', text: "Chercher par soi-même avant de demander de l'aide.",
    observe: ["Essais personnels avant d'appeler à l'aide", 'Recherche dans son cours'] },
  { label: 'Organisation', Icon: ListChecks, tone: 'bg-violet-100 text-violet-700', text: 'Tenir ses cahiers et son travail en ordre.',
    observe: ['Cahiers en ordre', 'Travail planifié'] },
  { label: 'Régularité', Icon: CalendarCheck, tone: 'bg-rose-100 text-rose-700', text: 'Venir et travailler de façon suivie, semaine après semaine.',
    observe: ['Présence chaque semaine', 'Travail entre les séances'] },
  { label: 'Discipline', Icon: Target, tone: 'bg-indigo-100 text-indigo-700', text: 'Rester concentré et suivre les consignes.',
    observe: ['Concentration pendant la séance', 'Consignes suivies'] },
  { label: 'Respect', Icon: HeartHandshake, tone: 'bg-lime-200 text-lime-800', text: "Respecter l'animateur, les autres élèves et le matériel.",
    observe: ["Écoute de l'animateur et des autres", 'Soin du matériel'] },
]

function SkillCard({ s, i }: { s: Skill; i: number }) {
  const [flipped, setFlipped] = useState(false)
  const face = 'absolute inset-0 flex flex-col rounded-3xl p-5 [backface-visibility:hidden]'

  return (
    <Reveal delay={(i % 4) * 80} className='h-full'>
      <button
        type='button' aria-pressed={flipped} onClick={() => setFlipped(f => !f)}
        className='group block h-56 w-full text-left perspective-[1000px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime-500'
      >
        <span className={cn(
          'relative block size-full transition-transform duration-700 transform-3d motion-reduce:transition-none', flipped && 'transform-[rotateY(180deg)]',
        )}>
          <span className={cn(face, 'border border-zinc-200 bg-white shadow-sm')}>
            <span className={cn('grid size-12 place-items-center rounded-2xl', s.tone)}><s.Icon className='size-6' aria-hidden /></span>
            <span className='mt-4 block text-lg font-bold text-zinc-900'>{s.label}</span>
            <span className='mt-1 block text-sm leading-relaxed text-zinc-500'>{s.text}</span>
            <span className='mt-auto block text-xs font-semibold text-zinc-400'>Retourner →</span>
          </span>

          <span className={cn(face, 'bg-zinc-900 text-white transform-[rotateY(180deg)]')}>
            <span className='block text-xs font-bold uppercase tracking-widest text-lime-300'>{s.label}</span>
            <span className='mt-2 block text-sm font-semibold text-white/90'>L'animateur observe</span>
            <span className='mt-3 block space-y-2.5'>
              {s.observe.map(o => (
                <span key={o} className='flex items-start gap-2 text-sm text-zinc-300'>
                  <span className='mt-1.5 size-1.5 shrink-0 rounded-full bg-lime-300' />{o}
                </span>
              ))}
            </span>
          </span>
        </span>
      </button>
    </Reveal>
  )
}

export function Skills() {
  return (
    <Band>
      <SectionHeading
        eyebrow='Méthodologie'
        title='Sept compétences pour apprendre à apprendre'
        description="Au-delà des leçons, l'animateur suit ce qui fait réussir sur la durée : la façon de travailler. Survolez ou touchez une carte pour la retourner."
      />
      <div className='mt-14 grid w-full max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        {skills.map((s, i) => <SkillCard key={s.label} s={s} i={i} />)}

        <Reveal delay={240} className='h-full'>
          <article className='flex h-56 flex-col rounded-3xl bg-zinc-900 p-5 text-white transition duration-300 hover:-translate-y-1 hover:shadow-xl'>
            <span className='grid size-12 place-items-center rounded-2xl bg-lime-300 text-zinc-900'><MessageSquareText className='size-6' aria-hidden /></span>
            <h3 className='mt-4 text-lg font-bold'>Notes et commentaires</h3>
            <p className='mt-1 text-sm leading-relaxed text-zinc-300'>
              Chaque compétence est notée sur 10, avec des points forts, des points à améliorer et des pistes de progrès.
            </p>
          </article>
        </Reveal>
      </div>
    </Band>
  )
}