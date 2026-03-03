import { describe, it, expect } from 'vitest'
import { cn } from '@/lib/utils'

describe('cn (class name merge)', () => {
  it('merges simple class names', () => {
    expect(cn('px-2', 'py-1')).toBe('px-2 py-1')
  })

  it('handles conditional classes', () => {
    expect(cn('text-sm', false && 'hidden', 'font-bold')).toBe('text-sm font-bold')
  })

  it('resolves tailwind conflicts (last wins)', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4')
  })

  it('returns empty string for no arguments', () => {
    expect(cn()).toBe('')
  })

  it('ignores undefined and null', () => {
    expect(cn('flex', undefined, null, 'gap-2')).toBe('flex gap-2')
  })
})
