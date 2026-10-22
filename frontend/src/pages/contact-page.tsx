import { useEffect, useState } from 'react'
import { ArrowUpRight, Check, Copy, ListChecks, Mail } from 'lucide-react'
import { toast } from 'sonner'
import Header from '@/components/header'
import { SEOHead } from '@/components/seo-head'
import BaseLayout from '@/layouts/base-layout'
import { PageHero } from '@/components/page-hero'
import { Reveal } from '@/components/reveal'
import { WaveUnderline } from '@/components/wave-underline'
import { BrandButton } from '@/components/brand-button'
import { ChalkboardArt, SchoolArt, SpeechArt } from '@/components/school-art'
import { CONTACT_EMAIL, DEVELOPER_NAME, SITE_NAME } from '@/site.config'
import { SectionHeading } from '@/hooks/section-heading'
import FooterSection from './footer-section'
import { Button } from '@/components/ui/button'

const MAILTO = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Question — ${SITE_NAME}`)}`

function EnvelopeArt({ className }: { className?: string }) {
  return (
    <svg viewBox='0 0 64 56' fill='none' className={className} aria-hidden>
      <rect x='4' y='14' width='56' height='38' rx='5' fill='#a3e635' />
      <g className='transition-transform duration-500 group-hover:-translate-y-1.75'>
        <rect x='12' y='6' width='40' height='34' rx='3' fill='white' />
        <path d='M18 16h28M18 23h28M18 30h16' stroke='#d4d4d8' strokeWidth='2.5' strokeLinecap='round' />
      </g>
      <path d='M4 20 32 40 60 20V47a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5Z' fill='#bef264' stroke='#4d7c0f' strokeWidth='2.5' strokeLinejoin='round' />
      <path d='M4 20 32 40 60 20' stroke='#4d7c0f' strokeWidth='2.5' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  )
}

function EmailCard() {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast.error("Impossible de copier l'adresse")
    }
  }

  return (
    <div className='group relative isolate h-full overflow-hidden rounded-[2.5rem] bg-zinc-900 p-8 text-white md:p-12'>
      <div aria-hidden className='pointer-events-none absolute -bottom-32 -right-16 size-104 animate-drift rounded-full bg-emerald-400/15 blur-3xl motion-reduce:animate-none' style={{ animationDelay: '-9s' }} />
      <div className='relative z-10 flex h-full flex-col'>
        <EnvelopeArt className='size-24 md:size-28' />

        <p className='mt-6 text-sm font-semibold uppercase tracking-widest text-lime-300'>Écrivez-moi directement</p>

        <a
          href={MAILTO}
          className='mt-3 break-all text-lg font-extrabold leading-tight tracking-tight transition-colors hover:text-lime-300 sm:text-3xl md:text-4xl'
        >
          {CONTACT_EMAIL}
        </a>

        <div className='mt-8 flex flex-wrap items-center gap-3'>
          <a href={MAILTO}>
            <BrandButton><Mail className='size-4' aria-hidden /> Écrire un e-mail <ArrowUpRight className='size-4' aria-hidden /></BrandButton>
          </a>
          <Button
            type='button' onClick={copy}
            className='inline-flex h-14 px-10 items-center gap-2 rounded-full border border-white/20 text-sm font-medium text-white/85 transition hover:border-lime-300 hover:text-lime-300'
          >
            {copied ? <Check className='size-4' aria-hidden /> : <Copy className='size-4' aria-hidden />}
            {copied ? 'Adresse copiée' : "Copier l'adresse"}
          </Button>
        </div>

        <div className='mt-10 rounded-2xl bg-white/5 p-5 ring-1 ring-white/10'>
          <p className='flex items-center gap-2 text-sm font-bold text-white'>
            <ListChecks className='size-4 text-lime-300' aria-hidden /> Pour un échange plus efficace
          </p>
          <ul className='mt-3 space-y-1.5 text-sm text-zinc-300'>
            <li>• Le nom de votre association</li>
            <li>• Le nombre approximatif de classes et d'élèves</li>
            <li>• Votre question, ou ce que vous aimeriez suivre</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

function DeveloperCard() {
  
  return (
    <div className='relative h-full overflow-hidden rounded-[2.5rem] border-2 border-zinc-200 bg-white p-8 md:p-10'>
      <div className='flex items-center gap-4'>
        <span className='grid size-16 shrink-0 place-items-center rounded-2xl bg-lime-300 text-xl font-extrabold text-zinc-900 ring-4 ring-lime-100'>AN</span>
        <div>
          <p className='text-xs font-semibold uppercase tracking-widest text-zinc-400'>Développé par</p>
          <p className='text-xl font-extrabold text-zinc-900'>{DEVELOPER_NAME}</p>
        </div>
      </div>
      <p className='mt-6 text-sm leading-relaxed text-zinc-600 md:text-base'>
        {SITE_NAME} est une plateforme que j'ai conçue et développée moi-même, de la première ligne de code à la dernière.
      </p>
      <p className='mt-3 text-sm leading-relaxed text-zinc-600 md:text-base'>
        Pour toute question ou pour en savoir plus, vous pouvez me contacter directement par e-mail.
      </p>
      <a href={MAILTO} className='group mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-900'>
        Me contacter
        <ArrowUpRight className='size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5' aria-hidden />
      </a>
    </div>
  )
}

const topics = [
  { title: 'Découvrir la plateforme', Art: SpeechArt,     tone: 'bg-amber-100 text-amber-600',
    text: "Une présentation de ce que voient les élèves, les animateurs et l'association." },
  { title: 'Mettre en place votre association', Art: SchoolArt, tone: 'bg-indigo-100 text-indigo-600',
    text: "Classes, animateurs, comptes : je m'occupe de la configuration." },
  { title: 'Poser une question', Art: ChalkboardArt, tone: 'bg-emerald-100 text-emerald-600',
    text: 'Fonctionnement, bilans, QCM, fiches de révision : toutes les questions sont les bienvenues.' },
]

const ContactPage = () => {
    useEffect(() => {
      window.scroll(0,0);
    },[])
    return (
      <>
        <SEOHead
          title='Contact' canonical='/contact'
          description={`Une question sur ${SITE_NAME} ? Écrivez directement à son développeur, ${DEVELOPER_NAME}.`}
        />
        <BaseLayout>
          <Header />
          <PageHero
            eyebrow='Contact' crumb='Contact' Art={SpeechArt}
            title={<>Parlons de votre{' '}<span className='relative inline-block'>association<WaveUnderline /></span></>}
            description='Une question, l’envie d’en savoir plus ? Écrivez-moi directement, c’est la façon la plus simple de me joindre.'
          />

          <section className='relative z-10 -mt-10 grid w-full max-w-6xl gap-6 px-6 lg:grid-cols-[1.4fr_1fr]'>
            <Reveal className='h-full'><EmailCard /></Reveal>
            <Reveal delay={150} className='h-full'><DeveloperCard /></Reveal>
          </section>

          <section className='flex w-full flex-col items-center px-6 py-24'>
            <SectionHeading eyebrow='Pourquoi écrire ?' title='Vous pouvez m’écrire pour…' />
            <div className='mt-14 grid w-full max-w-5xl gap-5 md:grid-cols-3'>
              {topics.map((t, i) => (
                <Reveal key={t.title} delay={i * 120} className='h-full'>
                  <article className='group h-full rounded-3xl border-2 border-zinc-200 bg-white p-6 transition duration-300 hover:-translate-y-1.5 hover:border-lime-400 hover:shadow-xl hover:shadow-lime-500/10'>
                    <span className={`grid size-16 place-items-center rounded-2xl ${t.tone}`}>
                      <t.Art className='size-10 motion-reduce:animate-none' />
                    </span>
                    <h3 className='mt-5 text-lg font-bold text-zinc-900'>{t.title}</h3>
                    <p className='mt-1 text-sm leading-relaxed text-zinc-500'>{t.text}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </section>

          <FooterSection />
        </BaseLayout>
      </>
    )
}

export default ContactPage