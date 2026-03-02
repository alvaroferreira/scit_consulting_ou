import { createFileRoute } from '@tanstack/react-router'
import { BlogPostPage } from '@/components/blog/blog-post-page'
import { blogPosts } from '@/data/blog-posts'

export const Route = createFileRoute('/blog/$slug')({
  component: BlogPostRoute,
})

function BlogPostRoute() {
  const { slug } = Route.useParams()
  const post = blogPosts.find((p) => p.slug === slug)

  if (!post) {
    return (
      <div className="container mx-auto py-20 text-center">
        <h1 className="text-2xl font-bold">Article Not Found</h1>
        <p className="mt-2 text-muted-foreground">
          The blog post you&apos;re looking for doesn&apos;t exist.
        </p>
      </div>
    )
  }

  return <BlogPostPage post={post} />
}
