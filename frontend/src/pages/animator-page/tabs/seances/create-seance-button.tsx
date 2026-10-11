import { Button } from '@/components/ui/button'
import { useIsMobile } from '@/hooks/use-mobile'
import { cn } from '@/lib/utils'
import { PlusIcon } from 'lucide-react'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'

const AnimCreateSeanceButton = forwardRef<HTMLButtonElement, ComponentPropsWithoutRef<typeof Button>>(
  ({ className, ...props }, ref) => {
    const isMobile = useIsMobile()

    return (
      <div
        className={cn(
          'fixed right-4 z-30 transition-all duration-300 ease-out',
          isMobile ? 'bottom-24' : 'bottom-6'
        )}
      >
        {/* Halo lumineux fondu en arrière-plan */}
        <div className="absolute -inset-1 rounded-2xl bg-zinc-500/30 blur-md opacity-75 group-hover:opacity-100 transition-opacity pointer-events-none" />

        <Button
          ref={ref}
          {...props}
          className={cn(
            'group relative flex items-center justify-center gap-2.5',
            'h-12 px-6 rounded-xl font-bold text-sm tracking-tight text-white',
            'shadow-lg shadow-zinc-500/25 hover:shadow-zinc-500/40',
            'hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer select-none',
            className
          )}
        >
          <PlusIcon className="size-5 shrink-0 transition-transform duration-200 group-hover:rotate-90" />
          <span>Nouvelle séance</span>
        </Button>
      </div>
    )
  }
)

AnimCreateSeanceButton.displayName = 'AnimCreateSeanceButton'

export default AnimCreateSeanceButton