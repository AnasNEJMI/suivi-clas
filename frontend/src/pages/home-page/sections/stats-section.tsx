import { useEffect, useState } from 'react'
import { CalendarCheck, ClipboardList, GraduationCap, Plus, Sparkle, type LucideIcon } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { useInView } from '@/hooks/use-in-view'
import { Floating, Ring, Squiggle } from '@/hooks/decor-shapes'
import { SectionHeading } from '@/hooks/section-heading'

const stats: { icon: LucideIcon; target: number; suffix: string; label: string }[] = [
  { icon: CalendarCheck, target: 100, suffix: '+', label: 'Séances enregistrées' },
  { icon: GraduationCap, target: 50,  suffix: '+', label: 'Élèves accompagnés' },
  { icon: ClipboardList, target: 500, suffix: '+', label: 'Bilans soumis' },
]

function useCountUp(target: number, active: boolean, duration = 1800) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!active) return
    
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const raf = requestAnimationFrame(() => setValue(target))
      return () => cancelAnimationFrame(raf)
    }

    let raf = 0
    const start = performance.now()
    
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      setValue(Math.round(target * (1 - Math.pow(1 - t, 3)))) // ease-out cubic
      if (t < 1) {
        raf = requestAnimationFrame(tick)
      }
    }
    
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [active, target, duration])

  return value
}

function Stat({ icon: Icon, target, suffix, label, active }: (typeof stats)[number] & { active: boolean }) {
  const value = useCountUp(target, active)
  return (
    <div className='group rounded-3xl bg-white/70 p-8 text-center ring-1 ring-white backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:bg-white'>
      <div className='mx-auto grid size-12 place-items-center rounded-2xl bg-zinc-900 text-lime-300 transition-transform duration-300 group-hover:rotate-6'>
        <Icon className='size-5' aria-hidden />
      </div>
      <p className='mt-5 text-5xl font-extrabold tabular-nums tracking-tight text-zinc-900 md:text-6xl'>
        {value}{suffix}
      </p>
      <p className='mt-2 text-sm font-medium text-zinc-600'>{label}</p>
    </div>
  )
}

function StatsSection() {
  const [gridRef, inView] = useInView<HTMLDivElement>({ threshold: 0.3 })

  return (
    <section className='relative z-10 isolate flex w-full flex-col items-center overflow-hidden bg-lime-300/90 px-6 py-24'>
      <Floating className='left-[6%] top-[14%] size-10 text-white' animation='float-a'><Sparkle /></Floating>
      <Floating className='right-[8%] top-[18%] size-14 text-white/80' animation='float-b' offset={2}><Ring /></Floating>
      <Floating className='bottom-[12%] left-[10%] h-6 w-28 text-amber-500' animation='wiggle' offset={1}><Squiggle /></Floating>
      <Floating className='bottom-[16%] right-[12%] size-6 text-emerald-600' animation='spin'><Plus /></Floating>

      <SectionHeading
        tone='lime'
        eyebrow='Un impact réel'
        title='Séance après séance, les résultats parlent'
        description='Après chaque séance, la plateforme synthétise et transforme les retours des animateurs en repères utiles pour les séances qui suivent.'
      />

      <div ref={gridRef} className='relative mt-14 grid w-full max-w-4xl gap-4 md:grid-cols-3'>
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 120}>
            <Stat {...s} active={inView} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}

export default StatsSection