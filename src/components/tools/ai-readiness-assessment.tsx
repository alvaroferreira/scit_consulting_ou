import { useState, useCallback } from 'react'
import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { useLocale } from '@/hooks/use-locale'
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

interface Question {
  id: number
  icon: React.ElementType
  scores: number[]
}

type Tier = 'early' | 'developing' | 'ready' | 'advanced'

interface TierStyle {
  color: string
  bgColor: string
  ringColor: string
}

/* -------------------------------------------------------------------------- */
/*  Data                                                                      */
/* -------------------------------------------------------------------------- */

const questions: Question[] = [
  { id: 1, icon: IconDatabase, scores: [1, 2, 3, 4] },
  { id: 2, icon: IconUsers, scores: [1, 2, 3, 4] },
  { id: 3, icon: IconBrain, scores: [1, 2, 3, 4] },
  { id: 4, icon: IconTarget, scores: [4, 3, 2, 1] },
  { id: 5, icon: IconBulb, scores: [1, 2, 3, 4] },
  { id: 6, icon: IconTrendingUp, scores: [1, 2, 3, 4] },
  { id: 7, icon: IconCloud, scores: [1, 2, 3, 4] },
  { id: 8, icon: IconRocket, scores: [1, 2, 3, 4] },
  { id: 9, icon: IconShieldCheck, scores: [1, 2, 3, 4] },
  { id: 10, icon: IconCoin, scores: [1, 2, 3, 4] },
]

const tierStyles: Record<Tier, TierStyle> = {
  early: {
    color: 'text-red-500 dark:text-red-400',
    bgColor: 'bg-red-500 dark:bg-red-400',
    ringColor: 'ring-red-500/30 dark:ring-red-400/30',
  },
  developing: {
    color: 'text-orange-500 dark:text-orange-400',
    bgColor: 'bg-orange-500 dark:bg-orange-400',
    ringColor: 'ring-orange-500/30 dark:ring-orange-400/30',
  },
  ready: {
    color: 'text-green-500 dark:text-green-400',
    bgColor: 'bg-green-500 dark:bg-green-400',
    ringColor: 'ring-green-500/30 dark:ring-green-400/30',
  },
  advanced: {
    color: 'text-scit-purple',
    bgColor: 'bg-scit-purple',
    ringColor: 'ring-scit-purple/30',
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
  const { t } = useTranslation('tools')
  const locale = useLocale()
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
  const tierStyle = tierStyles[tier]

  const tierName = t(`aiReadiness.results.tiers.${tier}.name`)
  const tierDescription = t(`aiReadiness.results.tiers.${tier}.description`)
  const tierSteps = t(`aiReadiness.results.tiers.${tier}.steps`, { returnObjects: true }) as string[]

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
              ? t('aiReadiness.progress.question', { current: currentQ + 1, total: totalQuestions })
              : phase === 'email-gate'
                ? t('aiReadiness.progress.almostThere')
                : t('aiReadiness.progress.complete')}
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
                {t(`aiReadiness.questions.${question.id}.text`)}
              </h2>
            </div>

            {/* Options */}
            <div className="space-y-3">
              {(t(`aiReadiness.questions.${question.id}.options`, { returnObjects: true }) as string[]).map((optionLabel, idx) => {
                const score = question.scores[idx]
                const isSelected = selectedScore === score
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => selectOption(score)}
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
                      {optionLabel}
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
              {t('aiReadiness.navigation.back')}
            </Button>
            <Button
              onClick={goNext}
              disabled={selectedScore === null}
              className="gap-2 bg-scit-purple text-white hover:bg-scit-violet"
            >
              {currentQ === totalQuestions - 1 && allAnswered ? t('aiReadiness.navigation.seeResults') : t('aiReadiness.navigation.next')}
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
              {t('aiReadiness.emailGate.title')}
            </h2>
            <p className="mt-2 text-center text-muted-foreground">
              {t('aiReadiness.emailGate.subtitle')}
            </p>

            <form onSubmit={handleEmailSubmit} className="mt-6 space-y-4">
              <div className="space-y-2">
                <label htmlFor="assessment-email" className="text-sm font-medium">
                  {t('aiReadiness.emailGate.emailLabel')} <span className="text-red-500 dark:text-red-400">*</span>
                </label>
                <Input
                  id="assessment-email"
                  type="email"
                  required
                  placeholder={t('aiReadiness.emailGate.emailPlaceholder')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="assessment-company" className="text-sm font-medium">
                  {t('aiReadiness.emailGate.companyLabel')}{' '}
                  <span className="text-muted-foreground font-normal">{t('aiReadiness.emailGate.companyOptional')}</span>
                </label>
                <Input
                  id="assessment-company"
                  type="text"
                  placeholder={t('aiReadiness.emailGate.companyPlaceholder')}
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </div>
              <Button
                type="submit"
                className="w-full gap-2 bg-scit-purple text-white hover:bg-scit-violet"
                size="lg"
              >
                {t('aiReadiness.emailGate.submitButton')}
                <IconArrowRight size={18} />
              </Button>
            </form>

            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={skipEmail}
                className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
              >
                {t('aiReadiness.emailGate.skipLink')}
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
      <div aria-live="polite" className="mx-auto max-w-2xl">
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
                  className={tierStyle.color}
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
                <span className="text-xs text-muted-foreground">{t('aiReadiness.results.scoreOf')}</span>
              </div>
            </div>

            <div
              className={cn(
                'inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold ring-2',
                tierStyle.color,
                tierStyle.ringColor
              )}
            >
              <div className={cn('h-2.5 w-2.5 rounded-full', tierStyle.bgColor)} />
              {tierName}
            </div>
          </div>

          {/* Description */}
          <div className="mb-8 rounded-xl border border-border bg-card p-6 text-center">
            <p className="text-lg leading-relaxed text-muted-foreground">
              {tierDescription}
            </p>
          </div>

          {/* Recommended Next Steps */}
          <div className="mb-8">
            <h3 className="mb-4 text-lg font-semibold">{t('aiReadiness.results.recommendedNextSteps')}</h3>
            <div className="space-y-3">
              {tierSteps.map((step, idx) => (
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
              {t('aiReadiness.results.cta.title')}
            </h3>
            <p className="mx-auto mt-2 max-w-md text-white/70">
              {t('aiReadiness.results.cta.subtitle')}
            </p>
            <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button
                asChild
                size="lg"
                className="w-full gap-2 bg-white text-scit-deep hover:bg-white/90 sm:w-auto"
              >
                <Link to="/$locale/contact" params={{ locale }}>
                  {t('aiReadiness.results.cta.primaryButton')}
                  <IconArrowRight size={18} />
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="lg"
                onClick={restartQuiz}
                className="w-full text-white/70 hover:bg-white/10 hover:text-white sm:w-auto"
              >
                {t('aiReadiness.results.cta.secondaryButton')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
