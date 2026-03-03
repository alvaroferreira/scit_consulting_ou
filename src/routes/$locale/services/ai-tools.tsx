import { createFileRoute } from '@tanstack/react-router'
import { loadNamespace } from '@/lib/i18n'
import { ServicePage } from '@/components/services/service-page'

export const Route = createFileRoute('/$locale/services/ai-tools')({
  beforeLoad: async ({ params }) => {
    await Promise.all([
      loadNamespace(params.locale, 'services'),
      loadNamespace(params.locale, 'case-studies'),
    ])
  },
  component: () => <ServicePage serviceId="ai-tools" />,
})
