import { useState, useCallback } from 'react'
import { Link } from '@tanstack/react-router'
import {
  IconArrowRight,
  IconArrowLeft,
  IconMail,
  IconCheck,
  IconRocket,
  IconBulb,
  IconTarget,
  IconTrendingUp,
  IconDatabase,
  IconShieldCheck,
  IconUsers,
  IconCloud,
  IconBrain,
  IconCoin,
} from '@tabler/icons-react'
import { Section } from '@/components/shared/section'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */

interface QuestionOption {
  label: string
  score: number
}

interface Question {
  id: number
  text: string
  icon: React.ElementType
  options: QuestionOption[]
}

type Tier = 'early' | 'developing' | 'ready' | 'advanced'

interface TierInfo {
  name: string
  description: string
  color: string
  bgColor: string
  ringColor: string
  steps: string[]
}

/* -------------------------------------------------------------------------- */
/*  Data                                                                      */
/* -------------------------------------------------------------------------- */

const questions: Question[] = [
  {
    id: 1,
    text: "How would you describe your organization's current data infrastructure?",
    icon: IconDatabase,
    options: [
      { label: 'We have minimal digital data', score: 1 },
      { label: 'We have some digital systems but data is siloed', score: 2 },
      { label: 'We have centralized data with some integration', score: 3 },
      { label: 'We have a modern data platform with strong integration', score: 4 },
    ],
  },
  {
    id: 2,
    text: 'How does your leadership view AI adoption?',
    icon: IconUsers,
    options: [
      { label: 'AI is not on the radar', score: 1 },
      { label: "There's curiosity but no commitment", score: 2 },
      { label: 'Leadership is supportive and has allocated exploratory budget', score: 3 },
      { label: 'AI is a strategic priority with dedicated investment', score: 4 },
    ],
  },
  {
    id: 3,
    text: "What is your team's current technical capability with AI?",
    icon: IconBrain,
    options: [
      { label: 'No AI or data science expertise', score: 1 },
      { label: 'Basic awareness, some self-taught exploration', score: 2 },
      { label: 'Some team members with AI/ML experience', score: 3 },
      { label: 'Dedicated AI/data science team or strong partnerships', score: 4 },
    ],
  },
  {
    id: 4,
    text: 'How much of your workflow involves repetitive, manual processes?',
    icon: IconTarget,
    options: [
      { label: 'Almost everything is manual', score: 4 },
      { label: 'Many processes are manual with some automation', score: 3 },
      { label: 'Most routine tasks are automated', score: 2 },
      { label: 'Fully automated with minimal manual intervention', score: 1 },
    ],
  },
  {
    id: 5,
    text: 'How do you currently handle customer interactions?',
    icon: IconBulb,
    options: [
      { label: 'Entirely manual (phone, email)', score: 1 },
      { label: 'Some self-service tools (FAQ, basic forms)', score: 2 },
      { label: 'Multi-channel with some automated responses', score: 3 },
      { label: 'AI-assisted with intelligent routing and automation', score: 4 },
    ],
  },
  {
    id: 6,
    text: 'What is your approach to data-driven decision making?',
    icon: IconTrendingUp,
    options: [
      { label: 'Decisions are mostly intuition-based', score: 1 },
      { label: 'We use basic reporting and spreadsheets', score: 2 },
      { label: 'We have dashboards and regular analytics', score: 3 },
      { label: 'We use predictive analytics and data models', score: 4 },
    ],
  },
  {
    id: 7,
    text: 'How would you describe your IT infrastructure?',
    icon: IconCloud,
    options: [
      { label: 'Legacy systems, mostly on-premises', score: 1 },
      { label: 'Mix of legacy and some cloud services', score: 2 },
      { label: 'Primarily cloud-based with modern APIs', score: 3 },
      { label: 'Cloud-native with microservices architecture', score: 4 },
    ],
  },
  {
    id: 8,
    text: "What is your organization's attitude toward change?",
    icon: IconRocket,
    options: [
      { label: 'Resistant to change', score: 1 },
      { label: 'Open but slow to adopt', score: 2 },
      { label: 'Actively pursuing innovation', score: 3 },
      { label: 'Change is part of our culture', score: 4 },
    ],
  },
  {
    id: 9,
    text: 'How do you handle sensitive data and compliance?',
    icon: IconShieldCheck,
    options: [
      { label: 'No formal data governance', score: 1 },
      { label: "Basic policies exist but aren't consistently followed", score: 2 },
      { label: 'Formal data governance with regular audits', score: 3 },
      { label: 'Comprehensive compliance program (GDPR, etc.) with automated controls', score: 4 },
    ],
  },
  {
    id: 10,
    text: 'What is your budget outlook for technology investments?',
    icon: IconCoin,
    options: [
      { label: 'Very limited, no room for new tools', score: 1 },
      { label: 'Small budget for pilots and experiments', score: 2 },
      { label: 'Moderate budget for strategic initiatives', score: 3 },
      { label: 'Significant budget with clear ROI expectations', score: 4 },
    ],
  },
]

const tiers: Record<Tier, TierInfo> = {
  early: {
    name: 'Early Stage',
    description:
      'Your organization is at the beginning of the AI journey. Focus on data infrastructure and building awareness.',
    color: 'text-red-500 dark:text-red-400',
    bgColor: 'bg-red-500 dark:bg-red-400',
    ringColor: 'ring-red-500/30 dark:ring-red-400/30',
    steps: [
      'Audit your current data systems and identify gaps',
      'Start collecting and organizing key business data',
      'Schedule an AI awareness workshop for your leadership team',
    ],
  },
  developing: {
    name: 'Developing',
    description:
      'You have some foundations in place. Quick wins in automation could build momentum for broader AI adoption.',
    color: 'text-orange-500 dark:text-orange-400',
    bgColor: 'bg-orange-500 dark:bg-orange-400',
    ringColor: 'ring-orange-500/30 dark:ring-orange-400/30',
    steps: [
      'Identify 2-3 repetitive processes ripe for automation',
      'Pilot an AI tool in a low-risk area to build confidence',
      'Develop a basic data strategy to unify siloed information',
    ],
  },
  ready: {
    name: 'Ready',
    description:
      'Your organization is well-positioned for AI implementation. A strategic roadmap will help you prioritize high-impact use cases.',
    color: 'text-green-500 dark:text-green-400',
    bgColor: 'bg-green-500 dark:bg-green-400',
    ringColor: 'ring-green-500/30 dark:ring-green-400/30',
    steps: [
      'Build an AI roadmap aligned with business objectives',
      'Evaluate and deploy AI solutions for your top 3 use cases',
      'Invest in upskilling your team on AI tools and workflows',
    ],
  },
  advanced: {
    name: 'Advanced',
    description:
      'You are ready for sophisticated AI solutions. Focus on advanced use cases, AI agents, and scaling existing capabilities.',
    color: 'text-scit-purple',
    bgColor: 'bg-scit-purple',
    ringColor: 'ring-scit-purple/30',
    steps: [
      'Deploy autonomous AI agents for complex workflows',
      'Scale successful AI initiatives across all departments',
      'Explore custom AI models tailored to your industry data',
    ],
  },
}

function getTier(score: number): Tier {
  if (score <= 17) return 'early'
  if (score <= 25) return 'developing'
  if (score <= 33) return 'ready'
  return 'advanced'
}

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */

type Phase = 'quiz' | 'email-gate' | 'results'

export function AiReadinessAssessment() {
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [phase, setPhase] = useState<Phase>('quiz')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward')

  const totalQuestions = questions.length
  const question = questions[currentQ]
  const selectedScore = answers[question.id] ?? null
  const allAnswered = Object.keys(answers).length === totalQuestions

  const totalScore = Object.values(answers).reduce((sum, s) => sum + s, 0)
  const tier = getTier(totalScore)
  const tierInfo = tiers[tier]

  const selectOption = useCallback(
    (score: number) => {
      setAnswers((prev) => ({ ...prev, [question.id]: score }))
    },
    [question.id]
  )

  function goNext() {
    if (selectedScore === null) return
    setDirection('forward')
    if (currentQ < totalQuestions - 1) {
      setCurrentQ((q) => q + 1)
    } else {
      setPhase('email-gate')
    }
  }

  function goBack() {
    if (currentQ > 0) {
      setDirection('backward')
      setCurrentQ((q) => q - 1)
    }
  }

  function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (email) {
      try {
        const stored = JSON.parse(localStorage.getItem('scit_leads') || '[]')
        stored.push({ email, company, score: totalScore, tier, date: new Date().toISOString() })
        localStorage.setItem('scit_leads', JSON.stringify(stored))
      } catch {
        // Silently fail — localStorage might be unavailable
      }
    }
    setPhase('results')
  }

  function skipEmail() {
    setPhase('results')
  }

  function restartQuiz() {
    setAnswers({})
    setCurrentQ(0)
    setPhase('quiz')
    setEmail('')
    setCompany('')
    setDirection('forward')
  }

  /* ---------------------------------------------------------------------- */
  /*  Progress Bar                                                          */
  /* ---------------------------------------------------------------------- */

  function ProgressBar() {
    const answered = Object.keys(answers).length
    const progress = phase === 'results' || phase === 'email-gate' ? 100 : (answered / totalQuestions) * 100

    return (
      <div className="mb-8">
        <div className="mb-2 flex items-center justify-between text-sm text-muted-foreground">
          <span>
            {phase === 'quiz'
              ? `Question ${currentQ + 1} of ${totalQuestions}`
              : phase === 'email-gate'
                ? 'Almost there!'
                : 'Complete'}
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-gradient-to-r from-scit-purple to-scit-cyan transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    )
  }

  /* ---------------------------------------------------------------------- */
  /*  Quiz Phase                                                            */
  /* ---------------------------------------------------------------------- */

  if (phase === 'quiz') {
    const Icon = question.icon

    return (
      <Section>
        <div className="mx-auto max-w-2xl">
          <ProgressBar />

          <div
            key={question.id}
            className={cn(
              'animate-[fadeSlide_0.35s_ease-out]',
              direction === 'backward' && 'animate-[fadeSlideBack_0.35s_ease-out]'
            )}
          >
            {/* Question */}
            <div className="mb-8 flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-scit-purple/10">
                <Icon size={24} className="text-scit-purple" />
              </div>
              <h2 className="text-xl font-semibold leading-snug md:text-2xl">
                {question.text}
              </h2>
            </div>

            {/* Options */}
            <div className="space-y-3">
              {question.options.map((option, idx) => {
                const isSelected = selectedScore === option.score
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => selectOption(option.score)}
                    className={cn(
                      'group flex w-full items-center gap-4 rounded-xl border p-4 text-left transition-all duration-200',
                      isSelected
                        ? 'border-scit-purple bg-scit-purple/5 ring-2 ring-scit-purple/20'
                        : 'border-border bg-card hover:border-scit-purple/40 hover:bg-scit-purple/[0.02]'
                    )}
                  >
                    <div
                      className={cn(
                        'flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-200',
                        isSelected
                          ? 'border-scit-purple bg-scit-purple'
                          : 'border-muted-foreground/30 group-hover:border-scit-purple/50'
                      )}
                    >
                      {isSelected && <IconCheck size={14} className="text-white" />}
                    </div>
                    <span
                      className={cn(
                        'text-sm md:text-base',
                        isSelected ? 'font-medium text-foreground' : 'text-muted-foreground'
                      )}
                    >
                      {option.label}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={goBack}
              disabled={currentQ === 0}
              className="gap-2"
            >
              <IconArrowLeft size={18} />
              Back
            </Button>
            <Button
              onClick={goNext}
              disabled={selectedScore === null}
              className="gap-2 bg-scit-purple text-white hover:bg-scit-violet"
            >
              {currentQ === totalQuestions - 1 && allAnswered ? 'See Results' : 'Next'}
              <IconArrowRight size={18} />
            </Button>
          </div>
        </div>
      </Section>
    )
  }

  /* ---------------------------------------------------------------------- */
  /*  Email Gate Phase                                                      */
  /* ---------------------------------------------------------------------- */

  if (phase === 'email-gate') {
    return (
      <Section>
        <div className="mx-auto max-w-lg">
          <ProgressBar />

          <div className="animate-[fadeSlide_0.35s_ease-out] rounded-xl border border-border bg-card p-6 md:p-8">
            <div className="mb-6 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-scit-purple/10">
                <IconMail size={32} className="text-scit-purple" />
              </div>
            </div>
            <h2 className="text-center text-xl font-bold md:text-2xl">
              Your results are ready!
            </h2>
            <p className="mt-2 text-center text-muted-foreground">
              Enter your email to receive a detailed AI readiness report with personalized
              recommendations.
            </p>

            <form onSubmit={handleEmailSubmit} className="mt-6 space-y-4">
              <div className="space-y-2">
                <label htmlFor="assessment-email" className="text-sm font-medium">
                  Email <span className="text-red-500 dark:text-red-400">*</span>
                </label>
                <Input
                  id="assessment-email"
                  type="email"
                  required
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="assessment-company" className="text-sm font-medium">
                  Company name{' '}
                  <span className="text-muted-foreground font-normal">(optional)</span>
                </label>
                <Input
                  id="assessment-company"
                  type="text"
                  placeholder="Your company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </div>
              <Button
                type="submit"
                className="w-full gap-2 bg-scit-purple text-white hover:bg-scit-violet"
                size="lg"
              >
                Get My Results
                <IconArrowRight size={18} />
              </Button>
            </form>

            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={skipEmail}
                className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
              >
                Skip, show results now
              </button>
            </div>
          </div>
        </div>
      </Section>
    )
  }

  /* ---------------------------------------------------------------------- */
  /*  Results Phase                                                         */
  /* ---------------------------------------------------------------------- */

  const scorePercentage = ((totalScore - 10) / 30) * 100
  const circumference = 2 * Math.PI * 54 // radius = 54
  const strokeDashoffset = circumference - (scorePercentage / 100) * circumference

  return (
    <Section>
      <div className="mx-auto max-w-2xl">
        <div className="animate-[fadeSlide_0.35s_ease-out]">
          {/* Score Circle */}
          <div className="mb-8 flex flex-col items-center">
            <div className="relative mb-4">
              <svg width="140" height="140" viewBox="0 0 140 140" className="-rotate-90">
                <circle
                  cx="70"
                  cy="70"
                  r="54"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="10"
                  className="text-muted/50"
                />
                <circle
                  cx="70"
                  cy="70"
                  r="54"
                  fill="none"
                  strokeWidth="10"
                  strokeLinecap="round"
                  className={tierInfo.color}
                  stroke="currentColor"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  style={{
                    transition: 'stroke-dashoffset 1s ease-out',
                  }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold">{totalScore}</span>
                <span className="text-xs text-muted-foreground">/ 40</span>
              </div>
            </div>

            <div
              className={cn(
                'inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold ring-2',
                tierInfo.color,
                tierInfo.ringColor
              )}
            >
              <div className={cn('h-2.5 w-2.5 rounded-full', tierInfo.bgColor)} />
              {tierInfo.name}
            </div>
          </div>

          {/* Description */}
          <div className="mb-8 rounded-xl border border-border bg-card p-6 text-center">
            <p className="text-lg leading-relaxed text-muted-foreground">
              {tierInfo.description}
            </p>
          </div>

          {/* Recommended Next Steps */}
          <div className="mb-8">
            <h3 className="mb-4 text-lg font-semibold">Recommended Next Steps</h3>
            <div className="space-y-3">
              {tierInfo.steps.map((step, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 rounded-xl border border-border bg-card p-4"
                >
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-scit-purple/10 text-sm font-semibold text-scit-purple">
                    {idx + 1}
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="rounded-xl bg-gradient-to-br from-scit-deep via-[#2f1c6a] to-scit-purple p-6 text-center md:p-8">
            <h3 className="text-xl font-bold text-white md:text-2xl">
              Get a Personalized AI Strategy
            </h3>
            <p className="mx-auto mt-2 max-w-md text-white/70">
              Let our team analyze your specific situation and build a tailored roadmap for AI
              adoption.
            </p>
            <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button
                asChild
                size="lg"
                className="w-full gap-2 bg-white text-scit-deep hover:bg-white/90 sm:w-auto"
              >
                <Link to="/contact">
                  Book a Free Consultation
                  <IconArrowRight size={18} />
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="lg"
                onClick={restartQuiz}
                className="w-full text-white/70 hover:bg-white/10 hover:text-white sm:w-auto"
              >
                Retake Assessment
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
