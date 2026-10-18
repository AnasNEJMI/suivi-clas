import { ArrowRight, CheckCircle2, Mail, Plus, Sparkle, Triangle } from 'lucide-react'
import { Link } from 'react-router'
import { BrandButton } from '@/components/brand-button'
import { Reveal } from '@/components/reveal'
import { Floating, Ring, Squiggle } from '@/hooks/decor-shapes'
import { SectionHeading } from '@/hooks/section-heading'

const perks = [
  'Bilans après chaque séance',
  'QCM et fiches de révision',
  "Une vision claire pour l'association",
]

function CTASection() {
  return (
    <section className='w-full bg-zinc-50 px-4 py-24 sm:px-6'>
      <Reveal>
        <div className='relative isolate mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-zinc-900 px-6 py-20 text-center md:rounded-[3.5rem] md:py-28'>
          {/* Glows */}
          <div aria-hidden className='pointer-events-none absolute -left-24 -top-24 size-96 animate-drift rounded-full bg-lime-400/20 blur-3xl motion-reduce:animate-none' />
          <div aria-hidden className='pointer-events-none absolute -bottom-32 -right-16 size-104 animate-drift rounded-full bg-emerald-400/15 blur-3xl motion-reduce:animate-none' style={{ animationDelay: '-9s' }} />

          {/* Shapes */}
          <Floating className='left-[7%] top-[16%] size-9 text-lime-300' animation='float-a'><Sparkle /></Floating>
          <Floating className='right-[9%] top-[20%] size-12 text-white/20' animation='float-b' offset={2}><Ring /></Floating>
          <Floating className='bottom-[18%] left-[9%] hidden size-9 text-indigo-400 sm:block' animation='spin'><Triangle /></Floating>
          <Floating className='bottom-[14%] right-[10%] h-6 w-28 text-amber-400' animation='wiggle' offset={1}><Squiggle /></Floating>
          <Floating className='right-[24%] top-[10%] hidden size-5 text-lime-300/70 sm:block' animation='spin'><Plus /></Floating>

          <div className='relative z-10 flex flex-col items-center'>
            <SectionHeading
              tone='dark'
              eyebrow='Prêt à nous rejoindre ?'
              title={<>Transformons ensemble<br />l'accompagnement scolaire</>}
              description="Rejoignez les associations qui font le choix d'un suivi scolaire structuré, humain et efficace. Donnons à chaque élève les clés de sa réussite."
            />

            <div className='mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4'>
              <Link to='/contact'>
                <BrandButton>
                  <Mail className='size-4' aria-hidden /> Nous écrire
                </BrandButton>
              </Link>
              <Link to='/methode' className='group inline-flex items-center gap-1.5 text-sm font-medium text-zinc-300 transition-colors hover:text-white'>
                Découvrir la méthode
                <ArrowRight className='size-4 transition-transform group-hover:translate-x-1' aria-hidden />
              </Link>
            </div>

            <ul className='mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-zinc-400'>
              {perks.map(p => (
                <li key={p} className='inline-flex items-center gap-1.5'>
                  <CheckCircle2 className='size-4 text-lime-400' aria-hidden /> {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

export default CTASection