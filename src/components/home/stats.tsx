import { AnimatedCounter } from '@/components/shared/animated-counter'
import { stats } from '@/data/stats'

export function Stats() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-scit-deep to-scit-purple py-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(6,182,212,0.1),transparent)]" />

      <div className="container relative mx-auto">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <p className="mt-2 text-sm text-white/60">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
