import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  title: string
  subtitle?: string
  centered?: boolean
  light?: boolean
  className?: string
}

export function SectionHeading({
  title,
  subtitle,
  centered = true,
  light,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn('mb-12 md:mb-16', centered && 'text-center', className)}>
      <h2
        className={cn(
          'text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl',
          light ? 'text-white' : 'text-foreground'
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            'mt-4 text-lg md:text-xl max-w-3xl',
            centered && 'mx-auto',
            light ? 'text-white/70' : 'text-muted-foreground'
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
