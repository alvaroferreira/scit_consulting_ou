import { AnimatedCounter } from '@/components/shared/animated-counter'
import type { CaseStudyResult } from '@/data/case-studies'

interface ResultCardProps {
  result: CaseStudyResult
}

export function ResultCard({ result }: ResultCardProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-6 text-center">
      <div className="text-3xl font-bold text-scit-purple md:text-4xl">
        <AnimatedCounter target={result.value} suffix={result.suffix} />
      </div>
      <p className="mt-1 text-sm font-semibold">{result.metric}</p>
      <p className="mt-2 text-xs text-muted-foreground">{result.description}</p>
    </div>
  )
}
