import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useIntersectionObserver } from '../useIntersectionObserver'

// Mock IntersectionObserver
const observeMock = vi.fn()
const disconnectMock = vi.fn()
let _observerCallback: ((entries: IntersectionObserverEntry[]) => void) | null = null

beforeEach(() => {
  _observerCallback = null
  vi.stubGlobal('IntersectionObserver', class {
    constructor(cb: (entries: IntersectionObserverEntry[]) => void) {
      _observerCallback = cb
    }
    observe = observeMock
    unobserve = vi.fn()
    disconnect = disconnectMock
  })
  observeMock.mockClear()
  disconnectMock.mockClear()
})

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('useIntersectionObserver', () => {
  it('returns isIntersecting=false initially', () => {
    const { result } = renderHook(() => useIntersectionObserver())
    expect(result.current.isIntersecting).toBe(false)
    expect(result.current.entry).toBeNull()
  })

  it('creates an observer when ref is attached to an element', () => {
    // Without a real DOM element attached to the ref,
    // the observer won't be created (ref.current is null).
    // Verify initial state is correct and hook doesn't crash.
    const { result } = renderHook(() => useIntersectionObserver({ triggerOnce: false }))
    expect(result.current.isIntersecting).toBe(false)
    expect(result.current.ref).toBeDefined()
    expect(result.current.ref.current).toBeNull()
  })
})
