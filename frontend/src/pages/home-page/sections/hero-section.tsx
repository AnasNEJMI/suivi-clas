import { ArrowRight, ChevronDown, Plus, Sparkle, Sparkles, Triangle } from 'lucide-react'
import { Link } from 'react-router'
import { BrandButton } from '@/components/brand-button'
import { useMouseParallax } from '@/hooks/use-mouse-parallax'
import { Dots, Floating, HalfCircle, Ring, Squiggle } from '@/hooks/decor-shapes'
import { BackpackArt, GradCapArt, OpenBookArt, PencilArt, RulerArt } from '@/components/school-art'
import { WaveUnderline } from '@/components/wave-underline'

const rise = 'animate-rise motion-reduce:animate-none'
const after = (s: number) => ({ animationDelay: `${s}s` })

const roles = [
  { label: 'Associations', dot: 'bg-indigo-500' },
  { label: 'Animateurs',   dot: 'bg-amber-500' },
  { label: 'Élèves',       dot: 'bg-emerald-500' },
]

function HeroSection() {
  const ref = useMouseParallax()

  return (
    <section
      ref={ref}
      className='relative z-10 isolate flex min-h-[92svh] w-full flex-col items-center justify-center overflow-hidden rounded-b-[4rem] bg-lime-300/90 px-6 pb-28 pt-32 md:rounded-b-[5rem] md:pb-36 lg:rounded-b-[8rem]'
    >
      {/* Soft colour fields */}
      <div aria-hidden className='pointer-events-none absolute -left-32 -top-32 size-120 animate-drift rounded-full bg-lime-200/70 blur-3xl motion-reduce:animate-none' />
      <div aria-hidden className='pointer-events-none absolute -bottom-40 -right-24 size-136 animate-drift rounded-full bg-emerald-300/40 blur-3xl motion-reduce:animate-none' style={{ animationDelay: '-9s' }} />

      {/* Dotted texture, fading out toward the edges */}
      <div
        aria-hidden
        className='pointer-events-none absolute inset-0 opacity-40'
        style={{
          backgroundImage:  'radial-gradient(rgba(24,24,27,0.2) 1px, transparent 1px)',
          backgroundSize:   '22px 22px',
          WebkitMaskImage:  'radial-gradient(ellipse at center, black 25%, transparent 75%)',
          maskImage:        'radial-gradient(ellipse at center, black 25%, transparent 75%)',
        }}
      />

      {/* ── Floating shapes (positions are percentages: tune freely) ── */}
      <Floating className='left-[7%] top-[20%] size-10 text-white md:size-14' depth={22} animation='float-a'><Sparkle /></Floating>
      <Floating className='right-[22%] top-[13%] size-6 text-zinc-900/70' depth={34} animation='pulse' offset={1}><Sparkle /></Floating>
      <Floating className='right-[7%] top-[22%] size-14 text-white md:size-20' depth={28} animation='float-b' offset={2}><Ring /></Floating>
      <Floating className='left-[28%] top-[11%] hidden size-6 text-emerald-600 sm:block' depth={30} animation='spin'><Plus /></Floating>
      <Floating className='bottom-[30%] left-[6%] hidden size-10 text-indigo-500 sm:block md:size-14' depth={16} animation='spin'><Triangle /></Floating>
      <Floating className='left-[3%] top-[56%] h-6 w-12 text-amber-400 md:h-9 md:w-18' depth={18} animation='float-a' offset={3}><HalfCircle /></Floating>
      <Floating className='bottom-[14%] right-[5%] h-5 w-24 text-amber-500 md:h-7 md:w-36' depth={20} animation='wiggle' offset={1}><Squiggle /></Floating>
      <Floating className='bottom-[24%] right-[20%] hidden size-12 text-zinc-900/30 sm:block' depth={12} animation='float-b' offset={4}><Dots /></Floating>
      <Floating className='bottom-[9%] left-[38%] size-7 text-zinc-900/40' depth={26} animation='float-a' offset={5}><Ring /></Floating>

      <Floating className='left-[10%] top-[38%] hidden size-10 -rotate-6 lg:block' depth={36} animation='float-b' offset={2}>
        <PencilArt className='size-16 text-amber-600' />
      </Floating>
      <Floating className='bottom-[16%] left-[17%] hidden size-10 rotate-6 lg:block' depth={30} animation='float-a' offset={4}>
        <OpenBookArt className='size-20 text-emerald-600' />
      </Floating>
      <Floating className='right-[11%] top-[44%] hidden size-10 rotate-6 lg:block' depth={36} animation='float-a' offset={1}>
        <GradCapArt className='size-16 text-indigo-600' />
      </Floating>
      <Floating className='bottom-[12%] right-[17%] hidden size-16 -rotate-12 lg:block' depth={24} animation='float-b' offset={3}>
        <BackpackArt className='size-18 text-rose-500' />
      </Floating>
      <Floating className='left-[24%] top-[24%] hidden size-10 rotate-12 xl:block' depth={28} animation='float-a' offset={5}>
        <RulerArt className='size-20 text-sky-600' />
      </Floating>

      {/* ── Content ── */}
      <div className='relative z-10 flex flex-col items-center text-center'>
        <div
          className={`${rise} inline-flex items-center gap-1.5 rounded-full border border-white/75 bg-white/60 px-3.5 py-1.5 text-sm font-medium text-zinc-900/75 backdrop-blur-sm`}
          style={after(0.05)}
        >
          <Sparkles className='size-3.5' aria-hidden />
          Plateforme de suivi scolaire
        </div>

        <h1
          className={`${rise} mt-6 max-w-md text-balance text-4xl font-extrabold leading-[1.08] tracking-tight text-zinc-900 md:max-w-xl md:text-5xl lg:max-w-3xl lg:text-6xl`}
          style={after(0.15)}
        >
          Chaque élève mérite un suivi qui fait{' '}
            <span className='relative inline-block'>
              vraiment
              <WaveUnderline />
            </span>{' '}
          la différence.
        </h1>

        <p
          className={`${rise} mt-6 max-w-sm text-balance text-sm leading-relaxed text-zinc-900/85 md:max-w-md lg:max-w-lg lg:text-base`}
          style={after(0.3)}
        >
          Une plateforme qui connecte animateurs investis, élèves motivés et associations engagées autour d'un objectif commun : transformer chaque séance en progrès mesurable et durable.
        </p>

        <div className={`${rise} mt-9 flex flex-wrap items-center justify-center gap-4`} style={after(0.45)}>
          <Link to='/methode'>
            <BrandButton>Comment ça marche <ArrowRight className='size-3.5' aria-hidden /></BrandButton>
          </Link>
          <Link to='/contact'>
            <BrandButton variant='black'>Contact</BrandButton>
          </Link>
        </div>

        <div className={`${rise} mt-12 flex flex-col lg:flex-row items-center lg:items-start justify-center gap-2`} style={after(0.6)}>
          <span className='mr-1 text-xs font-semibold uppercase tracking-wider text-zinc-900/60 lg:mt-1.5'>Pensé pour</span>
          <div className='flex items-center justify-center gap-2 flex-wrap max-w-72'>
            {roles.map(r => (
              <span key={r.label} className='inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-sm font-medium text-zinc-800 ring-1 ring-white'>
                <span className={`size-2 rounded-full ${r.dot}`} />
                {r.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div aria-hidden className='absolute bottom-10 left-1/2 hidden -translate-x-1/2 animate-bounce text-zinc-900/40 motion-reduce:animate-none md:block'>
        <ChevronDown className='size-6' />
      </div>
    </section>
  )
}

export default HeroSection