import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { loadNamespace } from '@/lib/i18n'
import { SEO } from '@/components/shared/seo'
import { Section } from '@/components/shared/section'
import { BlogCard } from '@/components/blog/blog-card'
import { blogPosts, allTags } from '@/data/blog-posts'

export const Route = createFileRoute('/$locale/blog/')({
  beforeLoad: async ({ params }) => {
    await loadNamespace(params.locale, 'blog')
  },
  component: BlogIndex,
})

function BlogIndex() {
  const { t } = useTranslation('blog')
  const [activeTag, setActiveTag] = useState<string>('All')

  const sortedPosts = [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  const filtered =
    activeTag === 'All'
      ? sortedPosts
      : sortedPosts.filter((post) => post.tags.includes(activeTag))

  return (
    <>
      <SEO
        title={t('page.title')}
        description={t('page.subtitle')}
        path="/blog"
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-scit-deep via-[#2f1c6a] to-scit-purple py-20 md:py-28">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            {t('page.title')}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/70">
            {t('page.subtitle')}
          </p>
        </div>
      </section>

      <Section>
        {/* Tag Filter */}
        <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
          {['All', ...allTags].map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                activeTag === tag
                  ? 'bg-scit-purple text-white'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {tag === 'All' ? t('page.filterAll') : tag}
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <div aria-live="polite" className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}

          {/* Empty State */}
          {filtered.length === 0 && (
            <div className="col-span-full py-12 text-center">
              <p className="text-muted-foreground">
                {t('page.emptyState')}
              </p>
            </div>
          )}
        </div>
      </Section>
    </>
  )
}
