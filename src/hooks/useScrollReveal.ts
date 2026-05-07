'use client'

import { useEffect, useRef } from 'react'

export function useScrollReveal<T extends HTMLElement>(options?: {
  threshold?: number
  rootMargin?: string
}) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('reveal-visible')
          el.classList.remove('reveal-hidden', 'reveal-hidden-left', 'reveal-hidden-right')
          observer.unobserve(el)
        }
      },
      { threshold: options?.threshold ?? 0.15, rootMargin: options?.rootMargin }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [options?.threshold, options?.rootMargin])

  return ref
}
