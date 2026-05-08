import Image from 'next/image'
import type { Artisan } from '@/types'

interface ArtisanCardProps {
  artisan: Artisan
}

export default function ArtisanCard({ artisan }: ArtisanCardProps) {
  return (
    <article className="w-[85vw] sm:w-[320px] md:w-[360px] bg-white rounded-sm overflow-hidden flex-shrink-0 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      <div className="w-full h-64 relative">
        <Image
          src={artisan.image}
          alt={artisan.name}
          fill
          className="object-contain"
        />
      </div>
      <div className="p-5">
        <h3 className="text-xl font-serif font-bold text-ink-900">
          {artisan.name}
        </h3>
        <p className="text-sm text-ink-700 mt-1">
          {artisan.style} · 从业 {artisan.years} 年
        </p>
        <blockquote className="mt-3 pl-3 border-l-2 border-paper-500">
          <p className="text-base font-serif italic text-paper-600">
            &ldquo;{artisan.quote}&rdquo;
          </p>
        </blockquote>
        <p className="text-sm text-ink-700 mt-3 leading-relaxed">
          {artisan.bio}
        </p>
      </div>
    </article>
  )
}
