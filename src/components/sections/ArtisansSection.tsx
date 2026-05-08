'use client'

import { useEffect, useRef, useState } from 'react'
import SectionTitle from '@/components/ui/SectionTitle'
import ArtisanCard from '@/components/ui/ArtisanCard'
import { artisans } from '@/data/artisans'

export default function ArtisansSection() {
  const [visible, setVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 1)
    }
  }

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

  useEffect(() => {
    // 初始检查以及窗口大小改变时检查
    checkScroll()
    window.addEventListener('resize', checkScroll)
    return () => window.removeEventListener('resize', checkScroll)
  }, [])

  const scrollByAmount = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      // 动态获取第一张卡片的实际宽度，加上 gap-6 (24px) 作为每次滚动的精确步长
      const firstCard = scrollContainerRef.current.children[0] as HTMLElement
      const scrollStep = firstCard ? firstCard.offsetWidth + 24 : 350
      const amount = direction === 'left' ? -scrollStep : scrollStep
      scrollContainerRef.current.scrollBy({ left: amount, behavior: 'smooth' })
    }
  }

  return (
    <section ref={sectionRef} className="bg-rice-100 py-16 px-6 md:py-24 md:px-8">
      <div className="max-w-6xl mx-auto relative">
        <div
          className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
        >
          <SectionTitle
            title="手艺人的坚守"
            subtitle="The Artisans"
            description="一把剪刀，一生守候。他们是剪纸艺术的活化石。"
            light={false}
          />
        </div>

        <div className="relative mt-8 group">
          {/* 左切换按钮 */}
          <button
            onClick={() => scrollByAmount('left')}
            className={`absolute -left-4 md:-left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-ink-700 hover:text-paper-500 hover:scale-110 transition-all border border-rice-200 ${canScrollLeft ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
              }`}
            aria-label="上一张"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* 滚动容器 */}
          <div
            ref={scrollContainerRef}
            onScroll={checkScroll}
            className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-6 scrollbar-hide px-2"
          >
            {artisans.map((artisan, index) => (
              <div
                key={artisan.id}
                className={`snap-start flex-shrink-0 transition-all duration-500 ${visible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                  }`}
                style={{ transitionDelay: `${index * 150 + 200}ms` }}
              >
                <ArtisanCard artisan={artisan} />
              </div>
            ))}
          </div>

          {/* 右切换按钮 */}
          <button
            onClick={() => scrollByAmount('right')}
            className={`absolute -right-4 md:-right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-ink-700 hover:text-paper-500 hover:scale-110 transition-all border border-rice-200 ${canScrollRight ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
              }`}
            aria-label="下一张"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-2" aria-hidden="true">
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
