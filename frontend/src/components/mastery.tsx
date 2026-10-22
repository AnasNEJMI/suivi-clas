// src/routes/method/sections/mastery.tsx
import { BicepsFlexed, CircleDashed, Stars, TrendingUp, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useInView } from '@/hooks/use-in-view'
import { SectionHeading } from '@/hooks/section-heading';
import { Band } from './band';

const levels: { label: string; text: string; Icon: LucideIcon; bar: string; icon: string; height: string }[] = [
  { label: 'Pas abordé', Icon: CircleDashed, bar: 'bg-zinc-300',    icon: 'text-zinc-700',    height: 'h-16 md:h-24',
    text: "La leçon n'a pas encore été travaillée en séance." },
  { label: 'En cours',   Icon: TrendingUp,   bar: 'bg-amber-400',   icon: 'text-amber-900',   height: 'h-24 md:h-36',
    text: "Les notions se construisent : il faut encore s'entraîner." },
  { label: 'Acquis',     Icon: BicepsFlexed, bar: 'bg-indigo-500', icon: 'text-white', height: 'h-32 md:h-48',
    text: 'Les notions sont comprises et appliquées correctement.' },
  { label: 'Maîtrise',   Icon: Stars,        bar: 'bg-emerald-400',  icon: 'text-emerald-900',       height: 'h-40 md:h-60',
    text: "L'élève est à l'aise, y compris sur les exercices les plus complets." },
]

export function Mastery() {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.3 })

  return (
    <Band tint>
      <SectionHeading
        eyebrow='Niveaux de maîtrise'
        title="Savoir précisément où l'on en est"
        description="Chaque leçon est évaluée selon quatre niveaux, pour que l'élève, l'animateur et l'association parlent le même langage."
      />
      <div ref={ref} className='mt-14 grid w-full max-w-4xl grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4'>
        {levels.map((l, i) => (
          <div key={l.label} className='group flex flex-col justify-end'>
            <div className={cn('relative', l.height)}>
              <div
                style={{ transitionDelay: `${i * 150}ms` }}
                className={cn(
                  'absolute inset-0 origin-bottom rounded-t-3xl transition-[transform,filter] duration-1000 ease-out group-hover:brightness-105 motion-reduce:scale-y-100 motion-reduce:transition-none',
                  l.bar, inView ? 'scale-y-100' : 'scale-y-0',
                )}
              />
              <div
                style={{ transitionDelay: `${600 + i * 150}ms` }}
                className={cn('absolute inset-x-0 top-3 flex justify-center transition-opacity duration-700', inView ? 'opacity-100' : 'opacity-0')}
              >
                <l.Icon className={cn('size-7 transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110', l.icon)} aria-hidden />
              </div>
            </div>
            <div className='border-t-4 border-zinc-900 pt-4 text-center'>
              <h3 className='text-lg font-bold text-zinc-900'>{l.label}</h3>
              <p className='mt-1 text-sm leading-snug text-zinc-500'>{l.text}</p>
            </div>
          </div>
        ))}
      </div>
    </Band>
  )
}