import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { IconArrowRight } from '@tabler/icons-react'

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-scit-deep via-[#2f1c6a] to-scit-purple">
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-scit-cyan/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-scit-violet/20 blur-3xl" />
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
          &mdash; from strategy to execution.
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
