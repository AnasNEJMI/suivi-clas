// src/components/clip-words.tsx
import {
  Children, Fragment, isValidElement, useEffect, useState,
  type ElementType, type ReactNode,
} from 'react'
import { cn } from '@/lib/utils'
import { useInView } from '@/hooks/use-in-view'

type Props = {
  children:   ReactNode
  as?:        ElementType
  className?: string
  delay?:     number    // ms before the first word
  step?:      number    // ms between words
  immediate?: boolean   // play on mount (hero) instead of on scroll
}

export function ClipWords({ children, as: Tag = 'span', className, delay = 0, step = 60, immediate = false }: Props) {
  const [ref, seen] = useInView<HTMLElement>({ threshold: 0.4 })
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(id)
  }, [])
  const show = immediate ? mounted : seen

  let n = 0
  // The mask has extra padding (cancelled by negative margins) so accents and descenders are never cut
  const unit = (node: ReactNode, key: string) => {
    const order = n++
    return (
      <span key={key} className='inline-block overflow-hidden align-top pb-[0.4em] pt-[0.2em] -mb-[0.4em] -mt-[0.2em]'>
        <span
          style={{ transitionDelay: `${delay + order * step}ms` }}
          className={cn(
            'inline-block origin-left transition-[transform,opacity] duration-900 ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none',
            show
              ? 'translate-y-0 rotate-0 opacity-100'
              : 'translate-y-[150%] rotate-3 opacity-0 motion-reduce:translate-y-0 motion-reduce:rotate-0 motion-reduce:opacity-100',
          )}
        >
          {node}
        </span>
      </span>
    )
  }

  const parts: ReactNode[] = []
  Children.toArray(children).forEach((child, ci) => {
    if (typeof child === 'string' || typeof child === 'number') {
      String(child).split(/(\s+)/).forEach((piece, pi) => {
        if (piece === '') return
        parts.push(/^\s+$/.test(piece) ? <Fragment key={`${ci}-${pi}`}>{' '}</Fragment> : unit(piece, `${ci}-${pi}`))
      })
    } else if (isValidElement(child) && child.type === 'br') {
      parts.push(child)
    } else {
      parts.push(unit(child, String(ci)))
    }
  })

  return <Tag ref={ref} className={className}>{parts}</Tag>
}