'use client'

import { useState } from 'react'
import { cn } from '@/lib/cn'
import ScrollReveal from '@/components/ui/ScrollReveal'
import SectionTitle from '@/components/ui/SectionTitle'
import FoldCutExperience from '@/components/interactive/FoldCutExperience'
import PatternComposer from '@/components/interactive/PatternComposer'
import ColorLab from '@/components/interactive/ColorLab'

const tabs = [
  { id: 'fold-cut', name: '折叠剪裁' },
  { id: 'pattern', name: '纹样搭配' },
  { id: 'color', name: '色彩实验室' },
] as const

type TabId = (typeof tabs)[number]['id']

export default function InteractiveSection() {
  const [activeTab, setActiveTab] = useState<TabId>('fold-cut')

  return (
    <section className="bg-rice-50 py-16 px-6 md:py-24 md:px-8">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <SectionTitle
            title="虚拟剪纸体验"
            subtitle="Interactive Experience"
            description="动手试试，感受剪纸的乐趣。"
            light={false}
          />
        </ScrollReveal>

        <div className="flex justify-center gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'px-5 py-2.5 text-sm font-serif rounded-sm transition-all duration-200',
                'focus-visible:ring-2 focus-visible:ring-paper-500 focus-visible:outline-none',
                activeTab === tab.id
                  ? 'bg-paper-500 text-white font-bold'
                  : 'bg-white text-ink-800 hover:bg-rice-200'
              )}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.name}
            </button>
          ))}
        </div>

        <div role="tabpanel" className="bg-white p-6 md:p-8 rounded-sm shadow-sm">
          {activeTab === 'fold-cut' && <FoldCutExperience />}
          {activeTab === 'pattern' && <PatternComposer />}
          {activeTab === 'color' && <ColorLab />}
        </div>
      </div>
    </section>
  )
}
