'use client'

import { useState } from 'react'
import { cn } from '@/lib/cn'
import type { FoldType, CutPattern } from '@/types'

const foldOptions: { id: FoldType; name: string; desc: string; icon: string }[] = [
  { id: 'half', name: '对折', desc: '一次对折', icon: 'M20 10 L50 10 L50 90 L20 90 Z M50 10 L80 10 L80 90 L50 90' },
  { id: 'quarter', name: '四折', desc: '两次对折', icon: 'M20 10 L35 10 L35 90 L20 90 Z M35 10 L50 10 L50 90 L35 90 Z M50 10 L65 10 L65 90 L50 90 Z M65 10 L80 10 L80 90 L65 90' },
  { id: 'eighth', name: '八折', desc: '三次对折', icon: 'M20 10 L27.5 10 L27.5 90 L20 90 Z M27.5 10 L35 10 L35 90 L27.5 90 Z M35 10 L42.5 10 L42.5 90 L35 90 Z M42.5 10 L50 10 L50 90 L42.5 90 Z M50 10 L57.5 10 L57.5 90 L50 90 Z M57.5 10 L65 10 L65 90 L57.5 90 Z M65 10 L72.5 10 L72.5 90 L65 90 Z M72.5 10 L80 10 L80 90 L72.5 90' },
]

const cutPatterns: CutPattern[] = [
  { id: 'window-flower', name: '窗花', image: '', resultImage: '', compatibleFolds: ['half', 'quarter', 'eighth'] },
  { id: 'double-happiness', name: '喜字', image: '', resultImage: '', compatibleFolds: ['half', 'quarter'] },
  { id: 'butterfly', name: '蝴蝶', image: '', resultImage: '', compatibleFolds: ['half', 'quarter'] },
  { id: 'flower', name: '花朵', image: '', resultImage: '', compatibleFolds: ['quarter', 'eighth'] },
]

const resultSVGs: Record<string, string> = {
  'half-window-flower': 'M50 10 C30 10 15 30 15 50 C15 70 30 90 50 90 C70 90 85 70 85 50 C85 30 70 10 50 10 Z M50 30 C58 30 65 37 65 45 C65 55 50 70 50 70 C50 70 35 55 35 45 C35 37 42 30 50 30 Z',
  'quarter-window-flower': 'M50 5 C25 5 5 25 5 50 C5 75 25 95 50 95 C75 95 95 75 95 50 C95 25 75 5 50 5 Z M50 20 C65 20 78 33 78 48 C78 63 65 80 50 80 C35 80 22 63 22 48 C22 33 35 20 50 20 Z M50 35 C56 35 62 40 62 47 C62 55 50 65 50 65 C50 65 38 55 38 47 C38 40 44 35 50 35 Z',
  'eighth-window-flower': 'M50 5 C25 5 5 25 5 50 C5 75 25 95 50 95 C75 95 95 75 95 50 C95 25 75 5 50 5 Z M50 15 C68 15 82 30 82 48 C82 66 68 85 50 85 C32 85 18 66 18 48 C18 30 32 15 50 15 Z M50 28 C60 28 68 36 68 46 C68 58 50 72 50 72 C50 72 32 58 32 46 C32 36 40 28 50 28 Z M50 38 C54 38 58 42 58 46 C58 52 50 58 50 58 C50 58 42 52 42 46 C42 42 46 38 50 38 Z',
  'half-double-happiness': 'M25 15 L25 85 M75 15 L75 85 M15 25 L35 25 M15 40 L35 40 M15 55 L35 55 M15 70 L35 70 M65 25 L85 25 M65 40 L85 40 M65 55 L85 55 M65 70 L85 70 M20 25 L30 40 M80 25 L70 40 M20 55 L30 70 M80 55 L70 70',
  'quarter-double-happiness': 'M50 10 L50 90 M10 50 L90 50 M25 20 L35 20 L35 35 L25 35 Z M65 20 L75 20 L75 35 L65 35 Z M25 65 L35 65 L35 80 L25 80 Z M65 65 L75 65 L75 80 L65 80 Z',
  'half-butterfly': 'M50 20 C35 15 15 25 15 45 C15 55 25 65 40 65 L50 60 L60 65 C75 65 85 55 85 45 C85 25 65 15 50 20 Z M50 60 L50 80 M45 80 L55 80 M40 65 L35 80 M60 65 L65 80',
  'quarter-butterfly': 'M50 15 C30 10 10 25 10 50 C10 70 30 85 50 80 L50 15 Z M50 15 C70 10 90 25 90 50 C90 70 70 85 50 80 L50 15 Z M50 80 L50 92 M44 92 L56 92',
  'quarter-flower': 'M50 10 C42 10 35 18 35 28 C35 38 42 45 50 45 C58 45 65 38 65 28 C65 18 58 10 50 10 Z M50 55 C42 55 35 62 35 72 C35 82 42 90 50 90 C58 90 65 82 65 72 C65 62 58 55 50 55 Z M15 35 C15 42 22 50 32 50 C42 50 50 42 50 35 C50 28 42 20 32 20 C22 20 15 28 15 35 Z M85 35 C85 42 78 50 68 50 C58 50 50 42 50 35 C50 28 58 20 68 20 C78 20 85 28 85 35 Z',
  'eighth-flower': 'M50 5 C40 5 30 15 30 28 C30 40 40 50 50 50 C60 50 70 40 70 28 C70 15 60 5 50 5 Z M50 50 C40 50 30 60 30 72 C30 85 40 95 50 95 C60 95 70 85 70 72 C70 60 60 50 50 50 Z M5 50 C5 60 15 70 28 70 C40 70 50 60 50 50 C50 40 40 30 28 30 C15 30 5 40 5 50 Z M50 50 C50 60 60 70 72 70 C85 70 95 60 95 50 C95 40 85 30 72 30 C60 30 50 40 50 50 Z',
}

export default function FoldCutExperience() {
  const [foldType, setFoldType] = useState<FoldType>('half')
  const [patternId, setPatternId] = useState<string | null>(null)
  const [isUnfolded, setIsUnfolded] = useState(false)

  const selectedPattern = cutPatterns.find((p) => p.id === patternId)
  const canUnfold = foldType && patternId

  const resultKey = selectedPattern ? `${foldType}-${selectedPattern.id}` : ''
  const resultPath = resultSVGs[resultKey] || resultSVGs['half-window-flower']

  const handleUnfold = () => {
    if (!canUnfold) return
    setIsUnfolded(true)
  }

  const handleReset = () => {
    setIsUnfolded(false)
    setPatternId(null)
  }

  return (
    <div className="space-y-8">
      {!isUnfolded ? (
        <>
          <div>
            <h3 className="text-lg font-serif font-bold text-ink-900 mb-4">
              步骤 1：选择折叠方式
            </h3>
            <div className="flex flex-wrap gap-4">
              {foldOptions.map((fold) => (
                <button
                  key={fold.id}
                  onClick={() => { setFoldType(fold.id); setIsUnfolded(false) }}
                  className={cn(
                    'flex flex-col items-center p-4 border-2 rounded-sm transition-all duration-200 min-w-[100px]',
                    'focus-visible:ring-2 focus-visible:ring-paper-500 focus-visible:outline-none',
                    foldType === fold.id
                      ? 'border-paper-500 bg-paper-50'
                      : 'border-ink-200 hover:border-paper-300'
                  )}
                  aria-pressed={foldType === fold.id}
                >
                  <svg viewBox="0 0 100 100" className="w-12 h-12 mb-2" aria-hidden="true">
                    <path d={fold.icon} fill="none" stroke="currentColor" strokeWidth="2" className={foldType === fold.id ? 'text-paper-600' : 'text-ink-400'} />
                  </svg>
                  <span className={cn('text-sm font-serif', foldType === fold.id ? 'text-paper-700 font-bold' : 'text-ink-600')}>
                    {fold.name}
                  </span>
                  <span className="text-xs text-ink-400 mt-1">{fold.desc}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-serif font-bold text-ink-900 mb-4">
              步骤 2：选择剪裁图案
            </h3>
            <div className="flex flex-wrap gap-4">
              {cutPatterns
                .filter((p) => p.compatibleFolds.includes(foldType))
                .map((pattern) => (
                  <button
                    key={pattern.id}
                    onClick={() => setPatternId(pattern.id)}
                    className={cn(
                      'flex flex-col items-center p-4 border-2 rounded-sm transition-all duration-200 min-w-[100px]',
                      'focus-visible:ring-2 focus-visible:ring-paper-500 focus-visible:outline-none',
                      patternId === pattern.id
                        ? 'border-paper-500 bg-paper-50'
                        : 'border-ink-200 hover:border-paper-300'
                    )}
                    aria-pressed={patternId === pattern.id}
                  >
                    <div className={cn(
                      'w-16 h-16 flex items-center justify-center',
                      patternId === pattern.id ? 'text-paper-600' : 'text-ink-400'
                    )}>
                      <svg viewBox="0 0 100 100" className="w-14 h-14" aria-hidden="true">
                        <path
                          d={resultSVGs[`${foldType}-${pattern.id}`] || resultSVGs['half-window-flower']}
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                      </svg>
                    </div>
                    <span className={cn('text-sm font-serif', patternId === pattern.id ? 'text-paper-700 font-bold' : 'text-ink-600')}>
                      {pattern.name}
                    </span>
                  </button>
                ))}
            </div>
          </div>

          <button
            onClick={handleUnfold}
            disabled={!canUnfold}
            className={cn(
              'px-8 py-3 font-serif font-bold text-base rounded-sm transition-all duration-200',
              'focus-visible:ring-2 focus-visible:ring-paper-500 focus-visible:outline-none',
              canUnfold
                ? 'bg-paper-500 text-white hover:bg-paper-600 active:bg-paper-700'
                : 'bg-ink-200 text-ink-400 cursor-not-allowed'
            )}
            aria-label="展开剪纸"
          >
            展开剪纸
          </button>
        </>
      ) : (
        <div className="flex flex-col items-center gap-6">
          <div className="animate-paper-flip">
            <div className="w-64 h-64 md:w-80 md:h-80 bg-paper-500 flex items-center justify-center rounded-sm shadow-2xl">
              <svg viewBox="0 0 100 100" className="w-4/5 h-4/5" aria-hidden="true">
                <path
                  d={resultPath}
                  fill="white"
                  stroke="white"
                  strokeWidth="0.5"
                />
              </svg>
            </div>
          </div>
          <p className="text-lg font-serif text-ink-900 text-center">
            恭喜！你创作了一幅
            <span className="text-paper-600 font-bold">
              {selectedPattern?.name || '窗花'}
            </span>
            风格的剪纸作品
          </p>
          <button
            onClick={handleReset}
            className="px-6 py-2 border-2 border-paper-500 text-paper-600 font-serif rounded-sm hover:bg-paper-50 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-paper-500 focus-visible:outline-none"
          >
            再来一次
          </button>
        </div>
      )}
    </div>
  )
}
