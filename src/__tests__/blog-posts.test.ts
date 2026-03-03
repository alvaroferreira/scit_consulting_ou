import { describe, it, expect } from 'vitest'
import { blogPosts, allTags } from '@/data/blog-posts'

describe('blog-posts data', () => {
  it('has at least one blog post', () => {
    expect(blogPosts.length).toBeGreaterThan(0)
  })

  it('every post has required fields', () => {
    for (const post of blogPosts) {
      expect(post.slug).toBeTruthy()
      expect(post.title).toBeTruthy()
      expect(post.date).toMatch(/^\d{4}-\d{2}-\d{2}$/)
      expect(post.readTime).toBeTruthy()
      expect(post.tags.length).toBeGreaterThan(0)
      expect(post.excerpt).toBeTruthy()
      expect(post.author).toBeTruthy()
      expect(post.content).toBeTruthy()
    }
  })

  it('has unique slugs', () => {
    const slugs = blogPosts.map((p) => p.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it('allTags is derived from blog posts', () => {
    const tagsFromPosts = new Set(blogPosts.flatMap((p) => p.tags))
    for (const tag of allTags) {
      expect(tagsFromPosts.has(tag)).toBe(true)
    }
  })
})
