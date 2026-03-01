import { AnimatedCounter } from '@/components/shared/animated-counter'
import { stats } from '@/data/stats'

export function Stats() {
  return (
    <section className="relative overflow-hidden bg-scit-deep py-16" aria-label="Company statistics">
      {/* Video Background */}
      <div className="absolute inset-0" aria-hidden="true">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="h-full w-full object-cover"
        >
          <source src="/videos/particles.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-scit-deep/80 mix-blend-multiply" />
      </div>

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
