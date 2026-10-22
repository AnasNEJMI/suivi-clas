import { forwardRef, useEffect, useState, type ComponentPropsWithoutRef, type ReactNode } from 'react'
import { ArrowRightIcon, type LucideIcon } from 'lucide-react'
import {
  Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi,
} from '@/components/ui/carousel'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const TONES = {
  sky:     'from-sky-500 to-indigo-600',
  emerald: 'from-emerald-500 to-teal-600',
  violet:  'from-violet-500 to-indigo-600',
  amber:   'from-amber-400 to-orange-500',
  rose:    'from-rose-500 to-pink-600',
} as const

export function CarouselBadge({ children }: { children: ReactNode }) {
  return (
    <span className='inline-flex items-center whitespace-nowrap rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-bold text-slate-700'>
      {children}
    </span>
  )
}

// Default look for the optional "see all" button. Wrap it in your drawer:
//   <MyListDrawer><CarouselExpandButton>Voir toutes les séances</CarouselExpandButton></MyListDrawer>
export const CarouselExpandButton = forwardRef<HTMLButtonElement, ComponentPropsWithoutRef<typeof Button>>(
  ({ children, className, ...props }, ref) => (
    <Button
      ref={ref} variant='outline' size='sm'
      className={cn('group h-9 gap-2 rounded-full border-slate-200 bg-white px-4 text-xs font-bold text-slate-700 hover:bg-slate-50', className)}
      {...props}
    >
      {children}
      <ArrowRightIcon className='size-3.5 transition-transform group-hover:translate-x-0.5' aria-hidden />
    </Button>
  ),
)
CarouselExpandButton.displayName = 'CarouselExpandButton'

type SectionCarouselProps<T> = {
  title:          string
  subtitle?:      string
  icon:           LucideIcon
  tone?:          keyof typeof TONES
  badge?:         ReactNode                    // a string gets the standard badge style
  items:          T[]
  getKey:         (item: T) => string | number
  renderItem:     (item: T) => ReactNode
  empty?:         ReactNode                    // shown instead of the carousel when items is empty
  expand?:        ReactNode                    // optional element at the right of the footer
  itemClassName?: string
  className?:     string
}

export function SectionCarousel<T>({
  title, subtitle, icon: Icon, tone = 'sky', badge, items, getKey, renderItem, empty, expand,
  itemClassName = 'basis-64 sm:basis-72', className,
}: SectionCarouselProps<T>) {
  const [api, setApi] = useState<CarouselApi>()
  const [more, setMore] = useState(false)

  useEffect(() => {
    if (!api) return
    const sync = () => setMore(api.canScrollNext())
    sync()
    api.on('select', sync).on('reInit', sync)
    return () => { api.off('select', sync); api.off('reInit', sync) }
  }, [api])

  return (
    <section className={cn('rounded-3xl border border-slate-200/80 bg-slate-50 p-5 font-outfit lg:p-6', className)}>
      <div className='mb-5 flex items-start justify-between gap-3'>
        <div className='flex min-w-0 items-center gap-3'>
          <span className={cn('grid size-11 shrink-0 place-items-center rounded-2xl bg-linear-to-br text-white shadow-sm', TONES[tone])}>
            <Icon className='size-5' aria-hidden />
          </span>
          <div className='min-w-0'>
            <h3 className='text-base font-bold leading-tight tracking-tight text-slate-900 lg:text-lg'>{title}</h3>
            {subtitle && <p className='mt-0.5 text-sm leading-snug text-slate-500'>{subtitle}</p>}
          </div>
        </div>
        {badge && (
          <div className='shrink-0 pt-0.5'>
            {typeof badge === 'string' ? <CarouselBadge>{badge}</CarouselBadge> : badge}
          </div>
        )}
      </div>

      {items.length === 0 ? (
        empty
      ) : (
        <Carousel opts={{ align: 'start' }} setApi={setApi} className='w-full'>
          <div className='relative'>
            <CarouselContent className='-ml-3 px-1 py-2'>
              {items.map(item => (
                <CarouselItem key={getKey(item)} className={cn('pl-3', itemClassName)}>
                  {renderItem(item)}
                </CarouselItem>
              ))}
            </CarouselContent>
            <div
              aria-hidden
              className={cn(
                'pointer-events-none absolute inset-y-0 right-0 w-10 bg-linear-to-l from-slate-50 to-transparent transition-opacity duration-300',
                more ? 'opacity-100' : 'opacity-0',
              )}
            />
          </div>

          <div className='mt-3 flex items-center justify-between gap-3 border-t border-slate-200/80 pt-4'>
            <div className='flex items-center gap-2'>
              <CarouselPrevious variant='outline' className='static size-9 translate-y-0 border-slate-200 bg-white hover:bg-slate-50' />
              <CarouselNext     variant='outline' className='static size-9 translate-y-0 border-slate-200 bg-white hover:bg-slate-50' />
            </div>
            {expand}
          </div>
        </Carousel>
      )}
    </section>
  )
}