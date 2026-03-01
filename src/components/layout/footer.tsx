import { Link } from '@tanstack/react-router'
import { footerNavItems } from '@/data/navigation'

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center">
              <img
                src="/images/logo-black.png"
                alt="SCIT Consulting"
                className="h-8 dark:hidden"
              />
              <img
                src="/images/logo-white.png"
                alt="SCIT Consulting"
                className="hidden h-8 dark:block"
              />
            </Link>
            <p className="mt-4 text-sm text-muted-foreground max-w-xs">
              AI-first digital transformation consultancy. We implement AI tools,
              automate processes, and build intelligent agents.
            </p>
            <p className="mt-4 text-xs text-muted-foreground">
              SCIT Consulting
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">Services</h3>
            <ul className="space-y-2">
              {footerNavItems.services.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-scit-purple"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">Company</h3>
            <ul className="space-y-2">
              {footerNavItems.company.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-scit-purple"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">Legal</h3>
            <ul className="space-y-2">
              {footerNavItems.legal.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-scit-purple"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} SCIT Consulting. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built with AI, for businesses embracing AI.
          </p>
        </div>
      </div>
    </footer>
  )
}
