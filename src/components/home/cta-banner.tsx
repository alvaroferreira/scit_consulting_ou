import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { IconArrowRight } from '@tabler/icons-react'

export function CtaBanner() {
  return (
    <section className="relative overflow-hidden bg-scit-deep py-20">
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
          <source src="/videos/neural.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-scit-deep/75 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-r from-scit-deep/60 to-scit-purple/40" />
      </div>

      <div className="container relative mx-auto text-center">
        <h2 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
          Ready to Start Your AI Transformation?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-white/70">
          Let&apos;s discuss how AI can transform your business processes, reduce costs,
          and unlock new opportunities for growth.
        </p>
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button
            asChild
            size="lg"
            className="bg-white text-scit-deep hover:bg-white/90 text-base px-8"
          >
            <Link to="/contact">
              Book a Free Consultation
              <IconArrowRight size={18} className="ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
