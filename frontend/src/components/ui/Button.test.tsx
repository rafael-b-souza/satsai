import { render, screen } from '@testing-library/react'
import Button from './Button'

test('renders button children', () => {
  render(<Button>Click me</Button>)
  expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
})
