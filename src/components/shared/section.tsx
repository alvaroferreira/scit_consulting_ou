import { cn } from '@/lib/utils'

interface SectionProps {
  children: React.ReactNode
  className?: string
  dark?: boolean
  id?: string
}

export function Section({ children, className, dark, id }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'py-20 md:py-28',
        dark && 'bg-scit-dark text-white',
        className
      )}
    >
      <div className="container mx-auto">{children}</div>
    </section>
  )
}
