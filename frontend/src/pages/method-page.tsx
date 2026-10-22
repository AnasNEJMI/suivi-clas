import { useEffect, useRef } from 'react'
import Header from '@/components/header'
import { SEOHead } from '@/components/seo-head'
import BaseLayout from '@/layouts/base-layout'
import { PageHero } from '@/components/page-hero'
import { WaveUnderline } from '@/components/wave-underline'
import { OpenBookArt } from '@/components/school-art'
import { Manifesto }     from '../components/manifesto'
import { Principles }    from '../components/principles'
import { Synergy }       from '../components/synergy'
import { KeywordsBand }  from '../components/keywords-band'
import { Journey }       from '../components/journey'
import { Mastery }       from '../components/mastery'
import FooterSection from './footer-section'
import { Skills } from '@/components/methodology-cards'
import { Tracking } from '@/components/tracking'

function ReadingProgress() {
  const bar = useRef<HTMLDivElement>(null)

  useEffect(() => {
    window.scroll(0,0);

    let raf = 0
    const update = () => {
      raf = 0
      const el  = document.documentElement
      const max = el.scrollHeight - el.clientHeight
      bar.current?.style.setProperty('transform', `scaleX(${max > 0 ? el.scrollTop / max : 0})`)
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div aria-hidden className='fixed inset-x-0 top-0 z-60 h-1'>
      <div ref={bar} className='h-full origin-left scale-x-0 bg-lime-500' />
    </div>
  )
}

const MethodPage = () => (
  <>
    <SEOHead
      title='Notre méthode' canonical='/methode'
      description="Bilans après chaque séance, évaluation des compétences, QCM et fiches de révision : découvrez comment fonctionne le suivi scolaire."
    />
    <BaseLayout>
      <ReadingProgress />
      <Header />
      <PageHero
        eyebrow='Notre méthode' crumb='Notre méthode' Art={OpenBookArt}
        title={<>Un suivi simple, régulier et{' '}<span className='relative inline-block'>bienveillant<WaveUnderline /></span></>}
        description="Chaque séance laisse une trace claire : ce qui a été travaillé, comment l'élève s'est impliqué et ce qu'il reste à faire pour progresser."
      />
      <Manifesto />
      <Principles />
      <Synergy />
      <KeywordsBand />
      <Journey />
      <Tracking />
      <Mastery />
      <Skills />
      <FooterSection />
    </BaseLayout>
  </>
)

export default MethodPage