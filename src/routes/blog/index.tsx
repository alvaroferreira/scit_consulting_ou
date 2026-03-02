import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { SEO } from '@/components/shared/seo'
import { Section } from '@/components/shared/section'
import { BlogCard } from '@/components/blog/blog-card'
import { blogPosts, allTags } from '@/data/blog-posts'

export const Route = createFileRoute('/blog/')({
  component: BlogIndex,
})

function BlogIndex() {
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
        title="Blog & Insights"
        description="Expert insights on AI automation, digital transformation, and business strategy. Practical guides and thought leadership from SCIT Consulting."
        path="/blog"
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-scit-deep via-[#2f1c6a] to-scit-purple py-20 md:py-28">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            Blog &amp; Insights
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/70">
            Practical insights on AI implementation, automation strategy, and digital transformation for business leaders.
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
              {tag}
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>

        {/* Empty State */}
        {filtered.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">
              No articles found for this tag. Try selecting a different filter.
            </p>
          </div>
        )}
      </Section>
    </>
  )
}
