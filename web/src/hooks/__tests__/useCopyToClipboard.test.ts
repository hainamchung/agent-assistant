import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useCopyToClipboard } from '../useCopyToClipboard'

describe('useCopyToClipboard', () => {
  const writeTextMock = vi.fn()

  beforeEach(() => {
    vi.useFakeTimers()
    Object.assign(navigator, {
      clipboard: { writeText: writeTextMock.mockResolvedValue(undefined) },
    })
  })

  afterEach(() => {
    vi.useRealTimers()
    writeTextMock.mockReset()
  })

  it('copies text and sets copied to true', async () => {
    const { result } = renderHook(() => useCopyToClipboard())
    await act(async () => {
      await result.current.copy('hello')
    })
    expect(writeTextMock).toHaveBeenCalledWith('hello')
    expect(result.current.copied).toBe(true)
  })

  it('resets copied after 2 seconds', async () => {
    const { result } = renderHook(() => useCopyToClipboard())
    await act(async () => {
      await result.current.copy('text')
    })
    expect(result.current.copied).toBe(true)
    act(() => { vi.advanceTimersByTime(2000) })
    expect(result.current.copied).toBe(false)
  })

  it('returns false when clipboard unavailable', async () => {
    Object.assign(navigator, { clipboard: undefined })
    const { result } = renderHook(() => useCopyToClipboard())
    let returnVal: boolean = true
    await act(async () => {
      returnVal = await result.current.copy('text')
    })
    expect(returnVal).toBe(false)
    expect(result.current.copied).toBe(false)
  })

  it('handles writeText rejection', async () => {
    writeTextMock.mockRejectedValue(new Error('fail'))
    const { result } = renderHook(() => useCopyToClipboard())
    let returnVal: boolean = true
    await act(async () => {
      returnVal = await result.current.copy('text')
    })
    expect(returnVal).toBe(false)
  })
})
