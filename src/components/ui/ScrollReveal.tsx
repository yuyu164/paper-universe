'use client'

import { useScrollReveal } from '@/hooks/useScrollReveal'
import { cn } from '@/lib/cn'

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'left' | 'right'
}

export default function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = 'up',
}: ScrollRevealProps) {
  const ref = useScrollReveal<HTMLDivElement>()

  const hiddenClass =
    direction === 'left'
      ? 'reveal-hidden-left'
      : direction === 'right'
        ? 'reveal-hidden-right'
        : 'reveal-hidden'

  return (
    <div
      ref={ref}
      className={cn(hiddenClass, className)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}
