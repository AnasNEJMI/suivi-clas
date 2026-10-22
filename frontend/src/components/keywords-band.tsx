// src/routes/method/sections/keywords-band.tsx
import { cn } from '@/lib/utils'

const WORDS = ['Régularité', 'Clarté', 'Bienveillance', 'Progrès', 'Confiance', 'Méthode']

export function KeywordsBand() {
  return (
    <div aria-hidden className='w-full overflow-hidden py-10'>
      <div className='-rotate-1 scale-105 bg-lime-300 py-5 shadow-lg shadow-lime-900/10'>
        <div className='flex w-max animate-marquee motion-reduce:animate-none'>
          {[0, 1].map(copy => (
            <div key={copy} className='flex shrink-0 items-center'>
              {WORDS.map((w, i) => (
                <div key={w} className='flex items-center'>
                  <span className={cn(
                    'px-6 text-5xl font-extrabold uppercase tracking-tight md:text-7xl',
                    i % 2 ? 'text-white/85' : 'text-zinc-900',
                  )}>
                    {w}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}