import { describe, it, expect, vi, afterEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useMediaQuery } from '../useMediaQuery'

describe('useMediaQuery', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('returns true when query matches', () => {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: true,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }))
    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'))
    expect(result.current).toBe(true)
  })

  it('returns false when query does not match', () => {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }))
    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'))
    expect(result.current).toBe(false)
  })

  it('responds to change events', () => {
    let changeCallback: ((ev: unknown) => void) | null = null
    let currentMatches = false

    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      get matches() { return currentMatches },
      media: query,
      addEventListener: vi.fn((_: string, cb: (ev: unknown) => void) => { changeCallback = cb }),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }))

    const { result, rerender } = renderHook(() => useMediaQuery('(min-width: 768px)'))
    expect(result.current).toBe(false)

    currentMatches = true
    if (changeCallback) (changeCallback as (ev: unknown) => void)()
    rerender()
    expect(result.current).toBe(true)
  })
})
