'use client'

import { useState } from 'react'
import { cn } from '@/lib/cn'
import { colorLabColors } from '@/data/colors'
import { patterns } from '@/data/patterns'

export default function ColorLab() {
  const [activeColor, setActiveColor] = useState(0)

  const currentColor = colorLabColors[activeColor]
  const displayPattern = patterns[0]

  return (
    <div className="flex flex-col items-center gap-8">
      <h3 className="text-2xl font-serif font-bold text-ink-900 text-center">
        同一纹样，不同灵魂
      </h3>

      <div
        className="w-64 h-64 md:w-80 md:h-80 rounded-sm flex items-center justify-center shadow-xl transition-all duration-500"
        style={{ backgroundColor: currentColor.bg }}
      >
        <svg viewBox="0 0 100 100" className="w-3/4 h-3/4 transition-all duration-500">
          <path
            d={displayPattern.svgPath}
            fill={currentColor.fg}
            stroke={currentColor.fg}
            strokeWidth="0.5"
            className="transition-all duration-500"
          />
        </svg>
      </div>

      <div className="flex flex-wrap gap-4 justify-center">
        {colorLabColors.map((color, index) => (
          <button
            key={color.id}
            onClick={() => setActiveColor(index)}
            className={cn(
              'flex flex-col items-center gap-2 p-3 rounded-sm transition-all duration-200 min-w-[80px]',
              'focus-visible:ring-2 focus-visible:ring-paper-500 focus-visible:outline-none',
              activeColor === index
                ? 'ring-2 ring-paper-500 ring-offset-2 bg-white shadow-md'
                : 'bg-white hover:shadow-md'
            )}
            aria-pressed={activeColor === index}
            aria-label={color.name}
          >
            <div
              className="w-10 h-10 rounded-sm shadow-inner"
              style={{ backgroundColor: color.bg }}
            />
            <span className="text-xs font-serif text-ink-700">{color.name}</span>
          </button>
        ))}
      </div>

      <div className="max-w-lg text-center">
        <p className="text-base font-sans text-ink-700 leading-relaxed transition-all duration-300">
          {currentColor.desc}
        </p>
      </div>
    </div>
  )
}
