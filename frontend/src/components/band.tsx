import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function Band({ children, tint, className }: { children: ReactNode; tint?: boolean; className?: string }) {
  return <section className={cn('flex w-full flex-col items-center px-6 py-24', tint && 'bg-zinc-50', className)}>{children}</section>
}