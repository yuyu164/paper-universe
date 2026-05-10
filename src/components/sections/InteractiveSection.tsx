'use client'

import { useState } from 'react'
import PuzzleGame from '@/components/puzzle/PuzzleGame'
import SectionTitle from '@/components/ui/SectionTitle'

export default function InteractiveSection() {
  const [showGame, setShowGame] = useState(false)

  if (showGame) {
    return (
      <div className="fixed inset-0 z-50 bg-ink-950 overflow-y-auto">
        <PuzzleGame onBack={() => setShowGame(false)} />
      </div>
    )
  }

  // 游戏入口卡片
  return (
    <section className="bg-rice-200 py-16 md:py-24 px-6">
      <SectionTitle
        title="互动体验"
        subtitle="INTERACTIVE"
        description="还原破碎的剪纸之美"
        light={false}
      />

      <div className="max-w-4xl mx-auto mt-12">
        <div
          onClick={() => setShowGame(true)}
          className="bg-paper-500 text-white p-12 md:p-20 rounded-sm cursor-pointer
                     hover:bg-paper-600 transition-all hover:shadow-2xl hover:-translate-y-2
                     text-center group overflow-hidden relative"
        >
          {/* 背景装饰纹样 */}
          <svg viewBox="0 0 100 100" className="absolute top-[-20%] right-[-10%] w-[60%] h-[140%] text-paper-600 opacity-30 group-hover:rotate-12 transition-transform duration-1000">
             <path d="M50 0 L100 50 L50 100 L0 50 Z" fill="currentColor" />
             <circle cx="50" cy="50" r="20" fill="transparent" stroke="currentColor" strokeWidth="5" />
          </svg>

          <div className="relative z-10">
            <h3 className="text-4xl md:text-6xl font-serif font-bold mb-6 tracking-widest drop-shadow-md">纹样拼图</h3>
            <p className="text-rice-100 text-lg md:text-xl mb-10 tracking-widest">动动指尖，将破碎的非遗纹样拼凑完整</p>
            <div className="inline-flex items-center gap-3 px-8 py-4 bg-white text-paper-600 font-bold rounded-sm shadow-lg
                           group-hover:scale-105 transition-transform text-lg">
              <span>开始挑战</span>
              <span>→</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
