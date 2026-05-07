import type { Pattern } from '@/types'

interface PatternCardProps {
  pattern: Pattern
}

export default function PatternCard({ pattern }: PatternCardProps) {
  return (
    <div className="group cursor-pointer">
      <div className="w-full aspect-square bg-white/10 rounded-none flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:rotate-3 group-hover:scale-105">
        <svg
          viewBox="0 0 100 100"
          className="w-3/4 h-3/4"
          aria-hidden="true"
        >
          <path
            d={pattern.svgPath}
            fill="white"
            stroke="white"
            strokeWidth="0.5"
          />
        </svg>
      </div>
      <div className="mt-3">
        <h3 className="text-lg font-serif text-white">{pattern.name}</h3>
        <p className="text-sm text-rice-200 mt-1">
          {pattern.meaning}
        </p>
      </div>
    </div>
  )
}
