import { describe, it, expect } from 'vitest'
import { render, screen } from '../test/test-utils'
import NotFound from './NotFound'

describe('NotFound', () => {
  it('renders with a heading', () => {
    render(<NotFound />)
    expect(screen.getByRole('heading', { name: /page not found/i })).toBeInTheDocument()
  })
})
