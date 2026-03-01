import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { IconSend, IconCheck } from '@tabler/icons-react'

const serviceOptions = [
  'AI Automation',
  'AI Agents',
  'Chatbots & Conversational AI',
  'AI Tools Implementation',
  'AI Strategy & Consulting',
  'Digital Transformation',
  'Other',
]

const budgetOptions = [
  'Under €5,000',
  '€5,000 - €15,000',
  '€15,000 - €50,000',
  '€50,000+',
  'Not sure yet',
]

const timelineOptions = [
  'ASAP',
  '1-2 months',
  '3-6 months',
  '6+ months',
  'Just exploring',
]

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    // Simulate form submission
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1000)
  }

  if (submitted) {
    return (
      <div className="rounded-xl border border-border bg-card p-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
          <IconCheck size={32} className="text-green-600" />
        </div>
        <h3 className="text-xl font-bold">Message Sent!</h3>
        <p className="mt-2 text-muted-foreground">
          Thank you for your interest. We&apos;ll get back to you within 24 hours.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-border bg-card p-6 md:p-8">
      <div className="grid gap-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="company">Company Name (optional)</Label>
            <Input id="company" name="company" placeholder="Your company" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Contact Name *</Label>
            <Input id="name" name="name" required placeholder="Your name" />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address *</Label>
            <Input id="email" name="email" type="email" required placeholder="you@company.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone (optional)</Label>
            <Input id="phone" name="phone" type="tel" placeholder="+1 (555) 000-0000" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="service">Service Interest *</Label>
          <Select name="service" required>
            <SelectTrigger>
              <SelectValue placeholder="Select a service" />
            </SelectTrigger>
            <SelectContent>
              {serviceOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="budget">Budget Range (optional)</Label>
            <Select name="budget">
              <SelectTrigger>
                <SelectValue placeholder="Select budget range" />
              </SelectTrigger>
              <SelectContent>
                {budgetOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="timeline">Timeline (optional)</Label>
            <Select name="timeline">
              <SelectTrigger>
                <SelectValue placeholder="Select timeline" />
              </SelectTrigger>
              <SelectContent>
                {timelineOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Project Description *</Label>
          <Textarea
            id="description"
            name="description"
            required
            placeholder="Tell us about your project, goals, and challenges..."
            rows={5}
            maxLength={2000}
          />
          <p className="text-xs text-muted-foreground">Max 2000 characters</p>
        </div>

        <Button
          type="submit"
          size="lg"
          className="w-full bg-scit-purple hover:bg-scit-violet text-white"
          disabled={loading}
        >
          {loading ? (
            'Sending...'
          ) : (
            <>
              Send Request
              <IconSend size={18} className="ml-2" />
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
