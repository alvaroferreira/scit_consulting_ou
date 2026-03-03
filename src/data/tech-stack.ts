interface TechCategory {
  name: string
  technologies: string[]
}

export const techStack: TechCategory[] = [
  {
    name: 'AI Models',
    technologies: ['Claude', 'GPT-4', 'Gemini', 'LangChain', 'LlamaIndex', 'Hugging Face'],
  },
  {
    name: 'Frontend',
    technologies: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Vue.js'],
  },
  {
    name: 'Backend',
    technologies: ['Node.js', 'Python', 'PostgreSQL', 'FastAPI', 'Supabase'],
  },
  {
    name: 'Infrastructure',
    technologies: ['AWS', 'Cloudflare', 'Docker', 'CI/CD', 'Vercel'],
  },
]
