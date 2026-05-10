'use client'

import { useState, useEffect } from 'react'
import ScrollIndicator from '@/components/ui/ScrollIndicator'

import Image from 'next/image'

export default function HeroSection() {
  const [paperVisible, setPaperVisible] = useState(false)
  const [titleVisible, setTitleVisible] = useState(false)
  const [subtitleVisible, setSubtitleVisible] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setPaperVisible(true), 200)
    const t2 = setTimeout(() => setTitleVisible(true), 1200)
    const t3 = setTimeout(() => setSubtitleVisible(true), 1600)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [])

  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-b from-paper-950 to-ink-950">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <svg
          className="absolute top-[10%] left-[8%] w-32 h-32 md:w-48 md:h-48 opacity-10 animate-breathe"
          viewBox="0 0 100 100"
        >
          <path
            d="M50 5 C30 5 10 25 10 50 C10 75 30 95 50 95 C70 95 90 75 90 50 C90 25 70 5 50 5 Z M50 20 C62 20 72 30 72 42 C72 54 62 68 50 68 C38 68 28 54 28 42 C28 30 38 20 50 20 Z"
            fill="currentColor"
            className="text-paper-500"
          />
        </svg>
        <svg
          className="absolute top-[20%] right-[10%] w-24 h-24 md:w-40 md:h-40 opacity-10"
          viewBox="0 0 100 100"
          style={{ animation: 'breathe 3s ease-in-out infinite 0.5s' }}
        >
          <path
            d="M50 10 C35 10 20 25 20 45 C20 55 25 60 35 65 L25 80 L40 72 C45 76 48 78 50 78 C52 78 55 76 60 72 L75 80 L65 65 C75 60 80 55 80 45 C80 25 65 10 50 10 Z"
            fill="currentColor"
            className="text-paper-400"
          />
        </svg>
        <svg
          className="absolute bottom-[20%] left-[15%] w-20 h-20 md:w-32 md:h-32 opacity-10"
          viewBox="0 0 100 100"
          style={{ animation: 'breathe 2.5s ease-in-out infinite 1s' }}
        >
          <path
            d="M50 15 L55 35 L75 35 L60 48 L65 68 L50 55 L35 68 L40 48 L25 35 L45 35 Z"
            fill="currentColor"
            className="text-paper-300"
          />
        </svg>
        <svg
          className="absolute bottom-[25%] right-[12%] w-28 h-28 md:w-36 md:h-36 opacity-10"
          viewBox="0 0 100 100"
          style={{ animation: 'breathe 3.5s ease-in-out infinite 1.5s' }}
        >
          <path
            d="M50 10 C30 10 15 30 15 50 C15 70 30 90 50 90 C70 90 85 70 85 50 C85 30 70 10 50 10 Z M35 45 C35 38 42 32 50 32 C58 32 65 38 65 45 C65 55 50 65 50 65 C50 65 35 55 35 45 Z"
            fill="currentColor"
            className="text-paper-500"
          />
        </svg>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center">
        <div
          className={cn_paper(
            'w-64 h-80 md:w-[28rem] md:h-[28rem] bg-white shadow-2xl transition-all duration-1000 relative overflow-hidden',
            paperVisible ? 'animate-paper-unfold' : 'opacity-0 scale-x-0'
          )}
          style={{ transformOrigin: 'left center' }}
        >
          <Image
            src="/images/hero/hero-center.png"
            alt="Hero Image"
            fill
            className="object-cover"
            priority
          />
        </div>

        <h1
          className={`absolute font-serif font-black text-4xl md:text-7xl text-[#1a1a1a] transition-all duration-800 drop-shadow-md ${titleVisible ? 'animate-title-reveal' : 'opacity-0'
            }`}
          style={{ textShadow: '2px 2px 8px rgba(255,255,255,0.8), -1px -1px 0 rgba(255,255,255,0.8), 1px -1px 0 rgba(255,255,255,0.8), -1px 1px 0 rgba(255,255,255,0.8)' }}
        >
          纸间万象
        </h1>

        <p
          className={`mt-6 font-sans font-light text-rice-200 text-sm md:text-base tracking-[0.2em] transition-all duration-800 ${subtitleVisible ? 'animate-fade-up' : 'opacity-0'
            }`}
          style={{
            position: 'relative',
            top: titleVisible ? '0' : '20px',
            textShadow: '0 2px 4px rgba(0,0,0,0.5)'
          }}
        >
          Between the cuts, a universe unfolds
        </p>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <ScrollIndicator />
      </div>
    </section>
  )
}

function cn_paper(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}
