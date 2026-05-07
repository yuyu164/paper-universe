'use client'

import { useState } from 'react'
import { cn } from '@/lib/cn'
import { patterns } from '@/data/patterns'
import { colorSchemes } from '@/data/colors'

type ShapeType = 'circle' | 'square' | 'heart'
type ColorKey = 'red' | 'blue' | 'mono' | 'colorful'

const shapeOptions: { id: ShapeType; name: string }[] = [
  { id: 'circle', name: '圆形' },
  { id: 'square', name: '方形' },
  { id: 'heart', name: '心形' },
]

const colorKeys: { id: ColorKey; name: string }[] = [
  { id: 'red', name: '传统红' },
  { id: 'blue', name: '蓝印花' },
  { id: 'mono', name: '黑白' },
  { id: 'colorful', name: '彩色' },
]

const availablePatterns = patterns.slice(0, 6)

function getShapePath(shape: ShapeType): string {
  switch (shape) {
    case 'circle':
      return 'M50 5 C25 5 5 25 5 50 C5 75 25 95 50 95 C75 95 95 75 95 50 C95 25 75 5 50 5 Z'
    case 'square':
      return 'M10 10 L90 10 L90 90 L10 90 Z'
    case 'heart':
      return 'M50 85 C25 65 5 50 5 30 C5 15 15 5 30 5 C40 5 48 12 50 18 C52 12 60 5 70 5 C85 5 95 15 95 30 C95 50 75 65 50 85 Z'
  }
}

export default function PatternComposer() {
  const [shape, setShape] = useState<ShapeType>('circle')
  const [selectedPatterns, setSelectedPatterns] = useState<string[]>([])
  const [colorScheme, setColorScheme] = useState<ColorKey>('red')

  const scheme = colorSchemes[colorScheme]

  const togglePattern = (id: string) => {
    setSelectedPatterns((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    )
  }

  const activePatterns = availablePatterns.filter((p) =>
    selectedPatterns.includes(p.id)
  )

  return (
    <div className="flex flex-col md:flex-row gap-6 md:gap-8">
      <div className="w-full md:w-3/5 flex flex-col items-center gap-4">
        <div
          className="w-full aspect-square max-w-md rounded-sm flex items-center justify-center transition-all duration-500 shadow-xl"
          style={{
            background: scheme.bg.startsWith('linear') ? scheme.bg : scheme.bg,
          }}
        >
          <svg viewBox="0 0 100 100" className="w-4/5 h-4/5">
            <defs>
              <clipPath id="shape-clip">
                <path d={getShapePath(shape)} />
              </clipPath>
            </defs>
            <g clipPath="url(#shape-clip)">
              <path
                d={getShapePath(shape)}
                fill="none"
                stroke={scheme.fg}
                strokeWidth="1"
                opacity="0.3"
              />
              {activePatterns.map((pattern, index) => {
                const offset = index * 8 - (activePatterns.length - 1) * 4
                return (
                  <g
                    key={pattern.id}
                    transform={`translate(${offset}, ${offset})`}
                  >
                    <path
                      d={pattern.svgPath}
                      fill={scheme.fg}
                      stroke={scheme.fg}
                      strokeWidth="0.3"
                      opacity="0.8"
                    />
                  </g>
                )
              })}
            </g>
            <path
              d={getShapePath(shape)}
              fill="none"
              stroke={scheme.fg}
              strokeWidth="1.5"
            />
          </svg>
        </div>

        <div className="flex flex-wrap gap-3 justify-center">
          <span className="text-sm font-sans text-ink-600 self-center">轮廓：</span>
          {shapeOptions.map((s) => (
            <button
              key={s.id}
              onClick={() => setShape(s.id)}
              className={cn(
                'px-4 py-1.5 text-sm font-serif rounded-sm transition-all duration-200',
                'focus-visible:ring-2 focus-visible:ring-paper-500 focus-visible:outline-none',
                shape === s.id
                  ? 'bg-paper-500 text-white'
                  : 'bg-white text-ink-700 border border-ink-200 hover:border-paper-300'
              )}
              aria-pressed={shape === s.id}
            >
              {s.name}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 justify-center">
          <span className="text-sm font-sans text-ink-600 self-center">配色：</span>
          {colorKeys.map((c) => (
            <button
              key={c.id}
              onClick={() => setColorScheme(c.id)}
              className={cn(
                'px-4 py-1.5 text-sm font-serif rounded-sm transition-all duration-200',
                'focus-visible:ring-2 focus-visible:ring-paper-500 focus-visible:outline-none',
                colorScheme === c.id
                  ? 'bg-paper-500 text-white'
                  : 'bg-white text-ink-700 border border-ink-200 hover:border-paper-300'
              )}
              aria-pressed={colorScheme === c.id}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      <div className="w-full md:w-2/5">
        <h3 className="text-lg font-serif font-bold text-ink-900 mb-4">
          选择纹样元素
        </h3>
        <p className="text-sm text-ink-600 mb-4">
          点击纹样添加或移除，可多选组合
        </p>
        <div className="grid grid-cols-2 gap-3">
          {availablePatterns.map((pattern) => (
            <button
              key={pattern.id}
              onClick={() => togglePattern(pattern.id)}
              className={cn(
                'flex flex-col items-center p-3 border-2 rounded-sm transition-all duration-200',
                'focus-visible:ring-2 focus-visible:ring-paper-500 focus-visible:outline-none',
                selectedPatterns.includes(pattern.id)
                  ? 'border-paper-500 bg-paper-50'
                  : 'border-ink-200 hover:border-paper-300 bg-white'
              )}
              aria-pressed={selectedPatterns.includes(pattern.id)}
            >
              <svg viewBox="0 0 100 100" className="w-12 h-12 mb-1" aria-hidden="true">
                <path
                  d={pattern.svgPath}
                  fill={selectedPatterns.includes(pattern.id) ? '#DC2626' : '#6b7280'}
                  stroke={selectedPatterns.includes(pattern.id) ? '#DC2626' : '#6b7280'}
                  strokeWidth="0.5"
                />
              </svg>
              <span className={cn(
                'text-xs font-serif',
                selectedPatterns.includes(pattern.id) ? 'text-paper-600 font-bold' : 'text-ink-600'
              )}>
                {pattern.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
