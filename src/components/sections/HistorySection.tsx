'use client'

import Image from 'next/image'
import ScrollReveal from '@/components/ui/ScrollReveal'
import SectionTitle from '@/components/ui/SectionTitle'
import { historyEvents } from '@/data/history'

export default function HistorySection() {
  return (
    <section className="bg-rice-200 py-16 px-6 md:py-24 md:px-8">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <SectionTitle
            title="一张纸的起源"
            subtitle="Origin of Paper-cutting"
            description="从蔡伦造纸到非遗名录，剪纸走过了两千年的漫长旅途。"
            light={false}
          />
        </ScrollReveal>

        <div className="relative">
          <div
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-paper-300 md:-translate-x-1/2"
            aria-hidden="true"
          />

          <div className="space-y-12 md:space-y-16">
            {historyEvents.map((event, index) => (
              <ScrollReveal key={event.year} delay={index * 150}>
                <div className="relative flex items-start md:items-center">
                  <div
                    className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-paper-500 -translate-x-1/2 z-10 mt-1 md:mt-0"
                    aria-hidden="true"
                  />

                  <div
                    className={`ml-10 md:ml-0 md:w-1/2 ${
                      index % 2 === 0
                        ? 'md:pr-12 md:text-right'
                        : 'md:pl-12 md:ml-auto md:text-left'
                    }`}
                  >
                    <time className="text-sm font-sans font-light text-paper-600 tracking-wider">
                      {event.year}
                    </time>
                    <h3 className="text-xl md:text-2xl font-serif font-bold text-ink-900 mt-1">
                      {event.title}
                    </h3>
                    <p className="text-base font-sans text-ink-700 mt-2 leading-relaxed">
                      {event.description}
                    </p>
                    <div className="mt-3 h-72 md:h-80 relative rounded-sm overflow-hidden bg-rice-200">
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-contain"
                        priority={index === 0}
                      />
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
