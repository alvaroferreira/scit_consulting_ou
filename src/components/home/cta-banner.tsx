import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { IconArrowRight } from '@tabler/icons-react'

export function CtaBanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-scit-deep via-[#2f1c6a] to-scit-purple py-20">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-1/4 h-64 w-64 rounded-full bg-scit-cyan/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-scit-violet/10 blur-3xl" />
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
