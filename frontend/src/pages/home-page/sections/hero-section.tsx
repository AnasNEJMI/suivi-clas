import { BrandButton } from "@/components/brand-button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router";

function HeroSection() {
  return (
    <section className='w-full rounded-b-[4rem] md:rounded-b-[5rem] lg:rounded-b-[8rem] overflow-hidden pt-28 py-72 lg:pt-20 flex flex-col items-center justify-start bg-lime-300/90 px-6'>
      <div className='inline-flex items-center gap-1.5 rounded-full border border-white/75 bg-white/60 px-3 py-1.5 text-sm text-zinc-900/75 mt-28'>
        <Sparkles className='h-3 w-3' aria-hidden />
        Plateforme de suivi scolaire conçue pour réussir
      </div>
      <h1 className='mt-6 mx-auto mb-4 max-w-md md:max-w-xl lg:max-w-2xl text-4xl md:text-5xl lg:text-5xl font-bold leading-tight tracking-tight text-zinc-900 text-center text-balance'>
        Chaque élève mérite un suivi qui fait{' '}
        <span className='relative text-lime-700/50'>vraiment<span className="absolute left-0 -top-0.5 text-white z-10">vraiment</span></span> la différence.
      </h1>
      <p className='mx-auto mb-8 max-w-sm md:max-w-md lg:max-w-lg text-sm lg:text-base leading-relaxed text-zinc-900/90 text-center text-balance'>
        Une platforme qui connecte animateurs investis, élèves motivés et associations engagées autour d'un objectif commun — transformer chaque séance en progrès mesurable et durable.
      </p>
      <div className='flex flex-wrap items-center justify-center gap-4'>
        <Link to='/methode'>
          <BrandButton >Comment ça marche <ArrowRight className='h-3.5 w-3.5' aria-hidden /></BrandButton>
        </Link>
        <Link to='/contact'>
          <BrandButton variant={'black'}>Nous contacter</BrandButton>
        </Link>
      </div>
    </section>
  )
}

export default HeroSection;