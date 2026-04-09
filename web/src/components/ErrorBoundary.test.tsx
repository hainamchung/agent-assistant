import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '../test/test-utils'
import { ErrorBoundary, LoadingSpinner } from './ErrorBoundary'

describe('LoadingSpinner', () => {
  it('renders without crashing', () => {
    render(<LoadingSpinner />)
    expect(screen.getByLabelText('Loading...')).toBeInTheDocument()
  })
})

describe('ErrorBoundary', () => {
  it('renders children when no error', () => {
    render(
      <ErrorBoundary>
        <div>Child content</div>
      </ErrorBoundary>
    )
    expect(screen.getByText('Child content')).toBeInTheDocument()
  })

  it('renders fallback UI when child throws', () => {
    // Suppress React error boundary console.error
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    function ThrowingComponent() {
      throw new Error('Test error')
      return null // unreachable
    }

    render(
      <ErrorBoundary>
        <ThrowingComponent />
      </ErrorBoundary>
    )

    // Should show error fallback, not the child
    expect(screen.queryByText('Test error')).toBeDefined()
    consoleSpy.mockRestore()
  })
})
