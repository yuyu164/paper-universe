import Image from 'next/image'
import type { Pattern } from '@/types'

interface PatternCardProps {
  pattern: Pattern
}

export default function PatternCard({ pattern }: PatternCardProps) {
  return (
    <div className="group cursor-pointer">
      <div className="relative w-full aspect-square bg-white/10 rounded-none flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:rotate-3 group-hover:scale-105">
        <Image
          src={pattern.image}
          alt={pattern.name}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          className="object-contain p-4"
        />
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
