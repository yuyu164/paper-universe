import Image from 'next/image'
import type { ModernApp } from '@/types'

interface ModernCardProps {
  app: ModernApp
}

export default function ModernCard({ app }: ModernCardProps) {
  return (
    <article className="bg-white border border-paper-200 rounded-sm overflow-hidden transition-all duration-300 hover:border-paper-500 hover:shadow-lg hover:-translate-y-1">
      <div className="h-48 relative bg-paper-50/50">
        <Image
          src={app.image}
          alt={app.title}
          fill
          className="object-contain"
        />
      </div>
      <div className="p-4">
        <h3 className="text-base font-serif text-gray-900">{app.title}</h3>
        <p className="text-sm text-gray-600 mt-1 leading-relaxed">
          {app.description}
        </p>
      </div>
    </article>
  )
}
