'use client'

import { useEffect, useRef, useState } from 'react'
import SectionTitle from '@/components/ui/SectionTitle'
import ArtisanCard from '@/components/ui/ArtisanCard'
import { artisans } from '@/data/artisans'

export default function ArtisansSection() {
  const [visible, setVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="bg-rice-100 py-16 px-6 md:py-24 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div
          className={`transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <SectionTitle
            title="手艺人的坚守"
            subtitle="The Artisans"
            description="一把剪刀，一生守候。他们是剪纸艺术的活化石。"
            light={false}
          />
        </div>

        <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-4 scrollbar-hide">
          {artisans.map((artisan, index) => (
            <div
              key={artisan.id}
              className={`flex-shrink-0 transition-all duration-500 ${
                visible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 150 + 200}ms` }}
            >
              <ArtisanCard artisan={artisan} />
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-2 mt-6" aria-hidden="true">
          {artisans.map((_, index) => (
            <div
              key={index}
              className="w-2 h-2 rounded-full bg-paper-300"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
