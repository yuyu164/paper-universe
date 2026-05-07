import { cn } from '@/lib/cn'

interface SectionTitleProps {
  title: string
  subtitle?: string
  description?: string
  align?: 'left' | 'center'
  light?: boolean
}

export default function SectionTitle({
  title,
  subtitle,
  description,
  align = 'center',
  light = true,
}: SectionTitleProps) {
  return (
    <div
      className={cn(
        'mb-12 md:mb-16',
        align === 'center' ? 'text-center' : 'text-left'
      )}
    >
      {subtitle && (
        <p
          className={cn(
            'text-sm md:text-base font-sans font-light tracking-widest uppercase',
            light ? 'text-paper-400' : 'text-paper-600'
          )}
        >
          {subtitle}
        </p>
      )}
      <h2
        className={cn(
          'text-3xl md:text-5xl font-serif font-black mt-2',
          light ? 'text-rice-100' : 'text-ink-900'
        )}
      >
        {title}
      </h2>
      <div
        className={cn(
          'w-16 h-0.5 bg-paper-500 mt-4',
          align === 'center' ? 'mx-auto' : ''
        )}
      />
      {description && (
        <p
          className={cn(
            'text-base md:text-lg font-sans mt-4 max-w-2xl',
            align === 'center' ? 'mx-auto' : '',
            light ? 'text-rice-300' : 'text-ink-700'
          )}
        >
          {description}
        </p>
      )}
    </div>
  )
}
