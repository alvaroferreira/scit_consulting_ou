import { useMemo } from 'react'
import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import DOMPurify from 'dompurify'
import { IconArrowRight, IconArrowLeft, IconClock, IconCalendar } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import { SEO } from '@/components/shared/seo'
import { JsonLd } from '@/components/shared/json-ld'
import { Section } from '@/components/shared/section'
import { useLocale } from '@/hooks/use-locale'
import { BlogCard } from './blog-card'
import { blogPosts, type BlogPost } from '@/data/blog-posts'
import i18n from '@/lib/i18n'

interface BlogPostPageProps {
  post: BlogPost
}

function getRelatedPosts(currentPost: BlogPost): BlogPost[] {
  const currentTags = new Set(currentPost.tags)

  const scored = blogPosts
    .filter((p) => p.slug !== currentPost.slug)
    .map((p) => {
      const matchingTags = p.tags.filter((tag) => currentTags.has(tag)).length
      return { post: p, score: matchingTags }
    })
    .sort((a, b) => b.score - a.score)

  return scored.slice(0, 3).map((s) => s.post)
}

export function BlogPostPage({ post }: BlogPostPageProps) {
  const { t } = useTranslation('blog')
  const locale = useLocale()

  const formattedDate = new Date(post.date).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const relatedPosts = getRelatedPosts(post)

  const articleJsonLd = useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: {
      '@type': 'Organization',
      name: 'SCIT Consulting',
      url: 'https://scitconsulting.eu',
    },
    publisher: {
      '@type': 'Organization',
      name: 'SCIT Consulting',
      url: 'https://scitconsulting.eu',
      logo: { '@type': 'ImageObject', url: 'https://scitconsulting.eu/images/logo-black.png' },
    },
    mainEntityOfPage: `https://scitconsulting.eu/${locale}/blog/${post.slug}`,
    keywords: post.tags.join(', '),
  }), [post, locale])

  return (
    <>
      <SEO
        title={t(`posts.${post.slug}.title`, post.title)}
        description={t(`posts.${post.slug}.excerpt`, post.excerpt)}
        path={`/blog/${post.slug}`}
        ogType="article"
      />
      <JsonLd data={articleJsonLd} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-scit-deep via-[#2f1c6a] to-scit-purple py-20 md:py-28">
        <div className="container mx-auto">
          <div className="max-w-3xl">
            {/* Back link */}
            <Link
              to="/$locale/blog"
              params={{ locale }}
              className="mb-6 inline-flex items-center gap-1 text-sm text-white/60 transition-colors hover:text-white"
            >
              <IconArrowLeft size={14} />
              {t('template.backToBlog')}
            </Link>

            {/* Tags */}
            <div className="mb-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl leading-tight">
              {t(`posts.${post.slug}.title`, post.title)}
            </h1>

            {/* Meta */}
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-white/60">
              <span className="inline-flex items-center gap-1.5">
                <IconCalendar size={16} />
                {formattedDate}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <IconClock size={16} />
                {t('template.readTime', { count: parseInt(post.readTime) })}
              </span>
              <span>{t('template.by')} {post.author}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <Section>
        <div
          className="blog-content mx-auto max-w-3xl"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(
              i18n.getResourceBundle(locale, `blog-content/${post.slug}`)
                ?.content || post.content,
              {
                ALLOWED_TAGS: ['h2', 'h3', 'h4', 'p', 'ul', 'ol', 'li', 'strong', 'em', 'a', 'br', 'blockquote'],
                ALLOWED_ATTR: ['href', 'target', 'rel'],
              }
            ),
          }}
        />
      </Section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-scit-deep to-scit-purple py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-bold text-white md:text-3xl">
            {t('template.ctaTitle')}
          </h2>
          <p className="mt-3 mx-auto max-w-xl text-white/70">
            {t('template.ctaSubtitle')}
          </p>
          <div className="mt-6 flex items-center justify-center gap-4">
            <Button asChild size="lg" className="bg-white text-scit-deep hover:bg-white/90">
              <Link to="/$locale/contact" params={{ locale }}>
                {t('template.ctaPrimary')}
                <IconArrowRight size={18} className="ml-2" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
              <Link to="/$locale/case-studies" params={{ locale }}>
                {t('template.ctaSecondary')}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <Section>
          <h2 className="mb-10 text-center text-2xl font-bold md:text-3xl">
            {t('template.relatedArticles')}
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {relatedPosts.map((relatedPost) => (
              <BlogCard key={relatedPost.slug} post={relatedPost} />
            ))}
          </div>
        </Section>
      )}
    </>
  )
}
