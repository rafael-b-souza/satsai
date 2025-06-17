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
  expect(card.style.minHeight).toBe('20rem')
  expect(card.style.maxHeight).toBe('60vh')
  expect(card.style.overflowY).toBe('auto')
})
