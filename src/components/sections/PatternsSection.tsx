'use client'

import ScrollReveal from '@/components/ui/ScrollReveal'
import SectionTitle from '@/components/ui/SectionTitle'
import PatternCard from '@/components/ui/PatternCard'
import { patterns } from '@/data/patterns'

export default function PatternsSection() {
  return (
    <section className="bg-paper-500 py-16 px-6 md:py-24 md:px-8">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <SectionTitle
            title="纹样里的密码"
            subtitle="Symbolic Patterns"
            description="每一个纹样都承载着千年的寓意，剪纸是民间最朴素的语言。"
            light={true}
          />
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {patterns.map((pattern, index) => (
            <ScrollReveal key={pattern.id} delay={index * 80}>
              <PatternCard pattern={pattern} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
