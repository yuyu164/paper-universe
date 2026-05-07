import Image from 'next/image'
import type { ModernApp } from '@/types'

interface ModernCardProps {
  app: ModernApp
}

export default function ModernCard({ app }: ModernCardProps) {
  return (
    <article className="bg-ink-900 border border-ink-800 rounded-sm overflow-hidden transition-all duration-300 hover:border-paper-700 hover:-translate-y-1">
      <div className="h-48 relative">
        <Image
          src={app.image}
          alt={app.title}
          fill
          className="object-contain"
        />
      </div>
      <div className="p-4">
        <h3 className="text-base font-serif text-rice-100">{app.title}</h3>
        <p className="text-sm text-rice-400 mt-1 leading-relaxed">
          {app.description}
        </p>
      </div>
    </article>
  )
}
