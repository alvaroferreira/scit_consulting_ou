import { createFileRoute } from '@tanstack/react-router'
import { ServicePage } from '@/components/services/service-page'

export const Route = createFileRoute('/services/chatbots')({
  component: () => <ServicePage serviceId="chatbots" />,
})
