import { render } from '@testing-library/react'
import { SessionProvider } from '../store'
import Chat from './Chat'

test('chat history container uses responsive heights', () => {
  const { container } = render(
    <SessionProvider>
      <Chat />
    </SessionProvider>
  )
  const card = container.querySelector('.ui-card') as HTMLElement
  expect(card.className).toContain('h-[60vh]')
  expect(card.className).toContain('md:h-[calc(100vh-13rem)]')
  expect(card.className).toContain('overflow-y-auto')
})
