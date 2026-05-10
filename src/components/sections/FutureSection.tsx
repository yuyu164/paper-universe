'use client'

import { useState } from 'react'
import { cn } from '@/lib/cn'
import ScrollReveal from '@/components/ui/ScrollReveal'
import SectionTitle from '@/components/ui/SectionTitle'
import ModernCard from '@/components/ui/ModernCard'
import { modernApps } from '@/data/modernApps'

const categories = ['全部', '品牌设计', '包装', '服装', '空间装饰', '数字艺术'] as const

export default function FutureSection() {
  const [activeCategory, setActiveCategory] = useState<string>('全部')

  const filteredApps =
    activeCategory === '全部'
      ? modernApps
      : modernApps.filter((app) => app.category === activeCategory)

  return (
    <section className="bg-paper-50 py-16 px-6 md:py-24 md:px-8">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <SectionTitle
            title="纸上的未来"
            subtitle="Future of Paper-cutting"
            description="传统剪纸正在以全新的面貌走进当代生活。"
            light={false}
          />
        </ScrollReveal>

        <ScrollReveal>
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  'px-4 py-1.5 text-sm font-sans rounded-sm transition-all duration-200',
                  'focus-visible:ring-2 focus-visible:ring-paper-500 focus-visible:outline-none',
                  activeCategory === category
                    ? 'bg-paper-500 text-white'
                    : 'border border-gray-300 text-gray-600 hover:border-paper-500 hover:text-paper-500'
                )}
                aria-pressed={activeCategory === category}
              >
                {category}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredApps.map((app, index) => (
            <ScrollReveal key={app.id} delay={index * 80}>
              <ModernCard app={app} />
            </ScrollReveal>
          ))}
        </div>

        {filteredApps.length === 0 && (
          <p className="text-center text-ink-500 font-sans py-12">
            该分类暂无案例
          </p>
        )}
      </div>
    </section>
  )
}
