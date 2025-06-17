import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { jest } from '@jest/globals'
import Layout from './Layout'

function setScreenWidth(width: number) {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width,
  })
  window.matchMedia = jest.fn().mockImplementation((query) => ({
    matches: width >= 768,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  })) as any
  window.dispatchEvent(new Event('resize'))
}

test('nav hidden on mobile until hamburger clicked', () => {
  setScreenWidth(500)
  render(
    <MemoryRouter>
      <Layout />
    </MemoryRouter>
  )
  const nav = screen.getByRole('navigation', { hidden: true })
  expect(nav).toHaveStyle({ display: 'none' })
  fireEvent.click(screen.getByLabelText(/toggle menu/i))
  expect(nav).toHaveStyle({ display: 'flex' })
})

test('nav visible on desktop', () => {
  setScreenWidth(1024)
  render(
    <MemoryRouter>
      <Layout />
    </MemoryRouter>
  )
  const nav = screen.getByRole('navigation', { hidden: true })
  expect(nav).toHaveStyle({ display: 'flex' })
})
