import { describe, it, expect } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App'

function renderApp(initialRoute = '/') {
  return render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[initialRoute]}>
        <App />
      </MemoryRouter>
    </HelmetProvider>
  )
}

describe('App', () => {
  it('renders without crashing', async () => {
    renderApp('/')
    await waitFor(() => {
      expect(document.querySelector('main, [role="main"], #root, .min-h-screen')).toBeTruthy()
    })
  })

  it('renders NotFound for unknown route', async () => {
    renderApp('/this-does-not-exist')
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /page not found/i })).toBeInTheDocument()
    })
  })
})
