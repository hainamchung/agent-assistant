import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { cn, formatNumber, debounce } from '../utils'

describe('cn', () => {
  it('merges class names', () => {
    expect(cn('a', 'b')).toBe('a b')
  })

  it('handles conditionals', () => {
    expect(cn('a', false && 'b', 'c')).toBe('a c')
  })
})

describe('formatNumber', () => {
  it('formats with locale separators', () => {
    const result = formatNumber(1000)
    // Locale-dependent, but should contain "1" and "000"
    expect(result).toMatch(/1.*000/)
  })
})

describe('debounce', () => {
  beforeEach(() => { vi.useFakeTimers() })
  afterEach(() => { vi.useRealTimers() })

  it('delays function execution', () => {
    const fn = vi.fn()
    const debounced = debounce(fn, 100)
    debounced()
    expect(fn).not.toHaveBeenCalled()
    vi.advanceTimersByTime(100)
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('only calls once for rapid invocations', () => {
    const fn = vi.fn()
    const debounced = debounce(fn, 100)
    debounced('a')
    debounced('b')
    debounced('c')
    vi.advanceTimersByTime(100)
    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toHaveBeenCalledWith('c')
  })
})
