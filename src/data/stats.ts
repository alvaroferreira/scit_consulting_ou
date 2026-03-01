export interface Stat {
  value: number
  suffix: string
  label: string
}

export const stats: Stat[] = [
  { value: 35, suffix: '+', label: 'Projects Delivered' },
  { value: 6, suffix: '+', label: 'Industries Served' },
  { value: 3, suffix: '', label: 'Countries' },
  { value: 95, suffix: '%', label: 'Client Satisfaction' },
]
