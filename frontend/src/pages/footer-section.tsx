import { ArrowUp, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router'
import { Separator } from '@/components/ui/separator'
import { SchoolArt } from '@/components/school-art'
import { SITE_NAME } from '@/site.config'

const columns = [
  {
    heading: 'Plateforme',
    links: [
      { label: 'Ma méthode', to: '/methode' },
      { label: 'Se connecter',  to: '/connexion' },
    ],
  },
  {
    heading: 'Contact',
    links: [
      { label: 'Me contacter',   to: '/contact' },
      { label: 'Mentions légales', to: '/mentions-legales' },   // create this route, or change it
    ],
  },
]

function FooterSection() {
  return (
    <footer className='mb-6 mt-6 w-full max-w-7xl px-4 sm:px-6 z-0'>
      <div className='relative isolate overflow-hidden rounded-[2rem] bg-zinc-900 px-6 pb-6 pt-14 md:rounded-[3rem] md:px-12 md:pt-16'>
        <div className='relative z-10 grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr]'>
          <div>
            <div className='flex items-center gap-3'>
              <span className='grid size-11 place-items-center rounded-xl bg-lime-300 text-zinc-900'>
                <SchoolArt className='size-7' />
              </span>
              <span className='text-xl font-bold tracking-tight text-white'>{SITE_NAME}</span>
            </div>
            <p className='mt-4 max-w-sm text-sm leading-relaxed text-white/65 md:text-base'>
              La plateforme qui réunit animateurs, élèves et associations autour d'un accompagnement scolaire de qualité.
            </p>
            <button
              type='button'
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className='group mt-6 inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white/80 transition hover:border-lime-300 hover:text-lime-300'
            >
              Retour en haut
              <ArrowUp className='size-4 transition-transform group-hover:-translate-y-0.5' aria-hidden />
            </button>
          </div>

          {columns.map(col => (
            <nav key={col.heading} aria-label={col.heading}>
              <h4 className='text-sm font-semibold uppercase tracking-widest text-lime-300'>{col.heading}</h4>
              <ul className='mt-4 space-y-3'>
                {col.links.map(l => (
                  <li key={l.to}>
                    <Link to={l.to} className='group inline-flex items-center gap-1 text-sm font-medium text-white/70 transition-colors hover:text-white md:text-base'>
                      {l.label}
                      <ArrowUpRight className='size-3.5 -translate-x-1 translate-y-1 opacity-0 transition group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100' aria-hidden />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <p
          aria-hidden
          className='relative z-10 mt-14 select-none whitespace-nowrap bg-linear-to-b from-white to-white/50 bg-clip-text text-center text-[clamp(1.5rem,7.6vw,6.5rem)] font-extrabold leading-none tracking-tighter text-transparent'
        >
          {SITE_NAME}
        </p>

        <Separator className='relative z-10 my-8 bg-white/15' />

        <div className='relative z-10 flex flex-col gap-2 text-sm font-semibold text-white/70 sm:flex-row sm:justify-between'>
          <span>Droits réservés © {new Date().getFullYear()}</span>
          <span>Conçu par Anas NEJMI</span>
        </div>
      </div>
    </footer>
  )
}

export default FooterSection