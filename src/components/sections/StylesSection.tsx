'use client'

import ScrollReveal from '@/components/ui/ScrollReveal'
import SectionTitle from '@/components/ui/SectionTitle'
import StyleCard from '@/components/ui/StyleCard'
import { paperStyles } from '@/data/styles'

export default function StylesSection() {
  return (
    <section className="bg-ink-900 py-16 px-6 md:py-24 md:px-8">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <SectionTitle
            title="剪刀下的中国"
            subtitle="Regional Styles"
            description="一方水土一方纸，不同地域的剪纸风格迥异，各有千秋。"
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {paperStyles.map((style, index) => (
            <ScrollReveal key={style.id} delay={index * 100}>
              <StyleCard style={style} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
