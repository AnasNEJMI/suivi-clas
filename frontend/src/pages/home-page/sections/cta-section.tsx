import { BrandButton } from '@/components/brand-button'
import {Mail } from 'lucide-react'
import { Link } from 'react-router'

function CTASection() {
  return (
    <section className='bg-zinc-50 px-6 py-24 text-center w-full'>
      <p className='text-center text-sm font-medium uppercase tracking-wide text-lime-600'>
        Prêt à nous rejoindre ?
      </p>
      <h2 className='mt-2 text-center font-bold text-3xl md:text-4xl text-zinc-900'>
        Transformons ensemble<br />l'accompagnement scolaire
      </h2>
      <p className='mt-2 mx-auto max-w-sm md:max-w-md lg:max-w-lg text-sm lg:text-base text-center text-balance leading-relaxed text-zinc-500'>
        Rejoignez les associations qui font le choix d'un suivi scolaire structuré, humain et
        efficace. Donnons à chaque élève les clés de sa réussite.
      </p>
      <div className='flex flex-wrap items-center justify-center gap-2.5 mt-12'>
        <Link to={'/contact'}>
          <BrandButton>
            <Mail className='h-4 w-4' aria-hidden /> Nous écrire
          </BrandButton>
        </Link>
      </div>
    </section>
  )
}

export default CTASection