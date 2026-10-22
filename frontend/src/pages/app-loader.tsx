import { cn } from '@/lib/utils'
import { SITE_NAME } from '@/site.config'

export default function AppLoader({ fullscreen = true, className }: { fullscreen?: boolean; className?: string }) {
  const words = SITE_NAME.split(' ')
  let letter = 0

  return (
    <div
      role='status' aria-live='polite'
      className={cn(
        'relative isolate flex flex-col items-center justify-center overflow-hidden bg-lime-300 px-6',
        fullscreen ? 'fixed inset-0 z-100 min-h-dvh' : 'min-h-80 w-full rounded-3xl',
        className,
      )}
    >
      <div className='relative z-10 flex flex-col items-center'>
        <div className='relative'>
          <span aria-hidden className='absolute inset-0 animate-ping-slow rounded-[1.75rem] bg-white/70 motion-reduce:animate-none' />
          <img
            src='/logo.svg' alt=''
            className='relative size-24 animate-float-a rounded-[1.75rem] shadow-2xl shadow-lime-900/20 ring-4 ring-white motion-reduce:animate-none'
          />
        </div>

        <p aria-hidden className='mt-8 flex flex-wrap justify-center gap-x-[0.35em] text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl'>
          {words.map((word, wi) => (
            <span key={wi} className='flex'>
              {[...word].map((ch, ci) => {
                const i = letter++
                return (
                  <span key={ci} className='-my-[0.12em] inline-block overflow-hidden py-[0.12em]'>
                    <span
                      className='inline-block animate-letter fill-mode-[backwards] motion-reduce:animate-none'
                      style={{ animationDelay: `${i * 70}ms` }}
                    >
                      {ch}
                    </span>
                  </span>
                )
              })}
            </span>
          ))}
        </p>

        <div aria-hidden className='mt-8 h-1.5 w-44 overflow-hidden rounded-full bg-zinc-900/10'>
          <div className='h-full w-2/5 animate-bar rounded-full bg-zinc-900 motion-reduce:animate-none' />
        </div>
      </div>
    </div>
  )
}