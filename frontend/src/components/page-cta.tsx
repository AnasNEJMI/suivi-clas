// src/components/page-cta.tsx
import { ArrowRight, Mail, Plus, Sparkle } from 'lucide-react'
import { Link } from 'react-router'
import { BrandButton } from '@/components/brand-button'
import { Reveal } from '@/components/reveal'
import { Floating, Ring } from '@/hooks/decor-shapes'

type Props = { title: string; text: string; label: string; to: string }

export function PageCta({ title, text, label, to }: Props) {
  return (
    <section className='w-full max-w-6xl px-4 py-16 sm:px-6'>
      <Reveal>
        <div className='relative isolate overflow-hidden rounded-[2.5rem] bg-zinc-900 px-6 py-16 text-center md:rounded-[3rem] md:py-20'>
          <div aria-hidden className='pointer-events-none absolute -left-24 -top-24 size-96 animate-drift rounded-full bg-lime-400/20 blur-3xl motion-reduce:animate-none' />
          <Floating className='left-[8%] top-[18%] size-8 text-lime-300' animation='float-a'><Sparkle /></Floating>
          <Floating className='right-[9%] top-[22%] size-10 text-white/20' animation='float-b' offset={2}><Ring /></Floating>
          <Floating className='bottom-[16%] right-[14%] hidden size-5 text-lime-300/70 sm:block' animation='spin'><Plus /></Floating>

          <div className='relative z-10 flex flex-col items-center'>
            <h2 className='max-w-xl text-balance text-3xl font-extrabold leading-tight tracking-tight text-white md:text-4xl'>{title}</h2>
            <p className='mt-4 max-w-md text-balance text-sm leading-relaxed text-zinc-400 md:text-base'>{text}</p>
            <Link to={to} className='mt-8'>
              <BrandButton>
                <Mail className='size-4' aria-hidden /> {label} <ArrowRight className='size-3.5' aria-hidden />
              </BrandButton>
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  )
}