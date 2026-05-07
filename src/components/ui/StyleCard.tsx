'use client'

import Image from 'next/image'
import { useState } from 'react'
import type { PaperStyle } from '@/types'
import { cn } from '@/lib/cn'

interface StyleCardProps {
  style: PaperStyle
}

export default function StyleCard({ style }: StyleCardProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <article
      className={cn(
        'bg-ink-800 border border-transparent rounded-sm overflow-hidden',
        'transition-all duration-300 cursor-pointer',
        'hover:border-paper-500 hover:-translate-y-1'
      )}
      onClick={() => setExpanded(!expanded)}
      role="button"
      aria-expanded={expanded}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          setExpanded(!expanded)
        }
      }}
    >
      <div className="h-48 md:h-56 relative overflow-hidden">
        <Image
          src={style.image}
          alt={style.name}
          fill
          className="object-contain"
        />
      </div>
      <div className="p-4 md:p-5">
        <h3 className="text-xl font-serif font-bold text-rice-100">
          {style.name}
        </h3>
        <p className="text-xs font-light text-paper-400 mt-1">{style.region}</p>
        <p className="text-sm text-rice-300 mt-2">{style.description}</p>
        <div className="flex flex-wrap gap-2 mt-3">
          {style.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 border border-paper-700 text-paper-400"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div
        className={cn(
          'overflow-hidden transition-all duration-500',
          expanded ? 'max-h-96' : 'max-h-0'
        )}
      >
        <div className="px-4 pb-4 md:px-5 md:pb-5 border-t border-ink-700 pt-4">
          <p className="text-sm text-rice-300 leading-relaxed">{style.detail}</p>
          <h4 className="text-sm font-serif font-bold text-rice-200 mt-3 mb-2">
            风格特征
          </h4>
          <ul className="space-y-1">
            {style.features.map((feature) => (
              <li
                key={feature}
                className="text-xs text-rice-400 flex items-center gap-2"
              >
                <span className="w-1 h-1 bg-paper-500 rounded-full" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  )
}
