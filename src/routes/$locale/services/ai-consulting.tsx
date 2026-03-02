import { createFileRoute } from '@tanstack/react-router'
import { ServicePage } from '@/components/services/service-page'

export const Route = createFileRoute('/$locale/services/ai-consulting')({
  component: () => <ServicePage serviceId="ai-consulting" />,
})
