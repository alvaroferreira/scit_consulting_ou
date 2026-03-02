import { useMemo } from 'react'
import { Link } from '@tanstack/react-router'
import { IconArrowRight, IconArrowLeft, IconClock, IconCalendar } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import { SEO } from '@/components/shared/seo'
import { JsonLd } from '@/components/shared/json-ld'
import { Section } from '@/components/shared/section'
import { BlogCard } from './blog-card'
import { blogPosts, type BlogPost } from '@/data/blog-posts'

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
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
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
    mainEntityOfPage: `https://scitconsulting.eu/blog/${post.slug}`,
    keywords: post.tags.join(', '),
  }), [post])

  return (
    <>
      <SEO
        title={post.title}
        description={post.excerpt}
        path={`/blog/${post.slug}`}
      />
      <JsonLd data={articleJsonLd} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-scit-deep via-[#2f1c6a] to-scit-purple py-20 md:py-28">
        <div className="container mx-auto">
          <div className="max-w-3xl">
            {/* Back link */}
            <Link
              to="/blog"
              className="mb-6 inline-flex items-center gap-1 text-sm text-white/60 transition-colors hover:text-white"
            >
              <IconArrowLeft size={14} />
              Back to Blog
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
              {post.title}
            </h1>

            {/* Meta */}
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-white/60">
              <span className="inline-flex items-center gap-1.5">
                <IconCalendar size={16} />
                {formattedDate}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <IconClock size={16} />
                {post.readTime}
              </span>
              <span>By {post.author}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <Section>
        <div
          className="blog-content mx-auto max-w-3xl"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </Section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-scit-deep to-scit-purple py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-bold text-white md:text-3xl">
            Need Help Implementing AI?
          </h2>
          <p className="mt-3 mx-auto max-w-xl text-white/70">
            Our team can help you turn these insights into action. Let&apos;s discuss how AI can transform your business operations.
          </p>
          <div className="mt-6 flex items-center justify-center gap-4">
            <Button asChild size="lg" className="bg-white text-scit-deep hover:bg-white/90">
              <Link to="/contact">
                Get in Touch
                <IconArrowRight size={18} className="ml-2" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
              <Link to="/case-studies">
                View Case Studies
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <Section>
          <h2 className="mb-10 text-center text-2xl font-bold md:text-3xl">
            Related Articles
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
