// src/components/page-hero.tsx
import type { ComponentType, ReactNode } from 'react'
import { HeroBackdrop } from '@/components/hero-backdrop'
import { ClipWords } from './clip-words'

const rise  = 'animate-rise motion-reduce:animate-none'
const after = (s: number) => ({ animationDelay: `${s}s` })

type Props = {
  eyebrow: string; title: ReactNode; description: string; crumb: string
  Art: ComponentType<{ className?: string }>
}

export function PageHero({ eyebrow, title, description }: Props) {
  return (
    <section className='relative isolate flex w-full flex-col items-center overflow-hidden rounded-b-[3rem] bg-lime-300 px-6 pb-36 pt-36 text-center md:rounded-b-[4rem] md:pb-28 lg:rounded-b-[6rem]'>
      <HeroBackdrop soft />

      <div className='relative z-10 flex flex-col items-center'>

        <p className={`${rise} mt-8 text-sm font-semibold uppercase tracking-widest text-zinc-900/70`} style={after(0.12)}>{eyebrow}</p>

        <ClipWords
          as='h1' immediate delay={200} step={70}
          className='mt-3 max-w-md text-balance text-4xl font-extrabold leading-[1.1] tracking-tight text-zinc-900 md:max-w-2xl md:text-5xl lg:max-w-3xl lg:text-6xl'
        >
          {title}
        </ClipWords>

        <p className={`${rise} mt-6 max-w-sm text-balance text-sm leading-relaxed text-zinc-900/85 md:max-w-md lg:max-w-lg lg:text-base`} style={after(0.9)}>
          {description}
        </p>
      </div>
    </section>
  )
}