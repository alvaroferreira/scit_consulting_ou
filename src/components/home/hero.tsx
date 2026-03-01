import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { IconArrowRight } from '@tabler/icons-react'

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-scit-deep">
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
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay with purple tint for readability */}
        <div className="absolute inset-0 bg-scit-deep/70 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-scit-deep/80 via-transparent to-scit-deep/90" />
      </div>

      <div className="container relative mx-auto flex min-h-[85vh] flex-col items-center justify-center px-4 py-20 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white/80 backdrop-blur-sm mb-8">
          <span className="h-2 w-2 rounded-full bg-scit-cyan animate-pulse" />
          AI-First Digital Transformation
        </div>

        <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-7xl">
          Transform Your Business with{' '}
          <span className="bg-gradient-to-r from-scit-violet to-scit-cyan bg-clip-text text-transparent">
            Artificial Intelligence
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-white/70 md:text-xl">
          We implement AI tools, automate processes and build intelligent agents
          , from strategy to execution.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="bg-white text-scit-deep hover:bg-white/90 text-base px-8"
          >
            <Link to="/contact">
              Book a Consultation
              <IconArrowRight size={18} className="ml-2" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-white/20 text-white bg-white/5 hover:bg-white/10 text-base px-8"
          >
            <Link to="/approach">Our Approach</Link>
          </Button>
        </div>

        {/* Trust indicators */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-white/40 text-sm">
          <span>35+ Projects Delivered</span>
          <span className="hidden sm:inline">&middot;</span>
          <span>6+ Industries</span>
          <span className="hidden sm:inline">&middot;</span>
          <span>3 Countries</span>
        </div>
      </div>
    </section>
  )
}
