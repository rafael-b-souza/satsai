import { render } from '@testing-library/react'
import Card from './Card'

test('applies custom class', () => {
  const { container } = render(<Card className="custom">Content</Card>)
  expect(container.firstChild).toHaveClass('custom')
})
