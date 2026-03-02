import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { IconArrowRight, IconClock, IconCalendar } from '@tabler/icons-react'
import { useLocale } from '@/hooks/use-locale'
import type { BlogPost } from '@/data/blog-posts'

interface BlogCardProps {
  post: BlogPost
}

export function BlogCard({ post }: BlogCardProps) {
  const { t } = useTranslation('blog')
  const locale = useLocale()

  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  return (
    <Link
      to="/$locale/blog/$slug"
      params={{ locale, slug: post.slug }}
      className="group flex flex-col rounded-xl border border-border bg-card p-6 transition-all hover:border-scit-purple/30 hover:shadow-lg"
    >
      {/* Date & Read Time */}
      <div className="mb-3 flex items-center gap-3 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1">
          <IconCalendar size={14} />
          {formattedDate}
        </span>
        <span className="inline-flex items-center gap-1">
          <IconClock size={14} />
          {post.readTime}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold leading-snug group-hover:text-scit-purple transition-colors">
        {t(`posts.${post.slug}.title`, post.title)}
      </h3>

      {/* Excerpt */}
      <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
        {t(`posts.${post.slug}.excerpt`, post.excerpt)}
      </p>

      {/* Tags */}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="inline-block rounded-full bg-scit-purple/10 px-2.5 py-0.5 text-xs font-medium text-scit-purple"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Read More */}
      <div className="mt-auto pt-4 flex items-center text-sm font-medium text-scit-purple opacity-0 transition-opacity group-hover:opacity-100">
        {t('template.readArticle', 'Read Article')}
        <IconArrowRight size={16} className="ml-1" />
      </div>
    </Link>
  )
}
