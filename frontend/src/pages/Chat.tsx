import { useState, useRef, FormEvent } from 'react'
import { useSession } from '../store'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function Chat() {
  const { sessionId, balance } = useSession()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const displayRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    displayRef.current?.scrollTo(0, displayRef.current.scrollHeight)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!input.trim() || !sessionId || loading) return
    const newMessages: Message[] = [...messages, { role: 'user', content: input }]
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    try {
      const r = await fetch(`/api/v1/chat/?session_id=${sessionId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMessages),
      })

      if (!r.ok || !r.body) throw new Error('network')

      const reader = r.body.getReader()
      const decoder = new TextDecoder()
      let assistant = ''
      setMessages((m) => [...m, { role: 'assistant', content: '' }])

      while (true) {
        const { value, done } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value, { stream: true })
        for (const line of chunk.split('\n')) {
          if (line.startsWith('data: ')) {
            assistant += line.slice(6)
            setMessages((msgs) => {
              const copy = [...msgs]
              copy[copy.length - 1] = { role: 'assistant', content: assistant }
              return copy
            })
            scrollToBottom()
          }
        }
      }
    } catch {
      // ignore
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-sm">
      <Card
        ref={displayRef}
        className="min-h-[20rem] max-h-[60vh] overflow-y-auto space-y-xs"
        style={{ minHeight: '20rem', maxHeight: '60vh', overflowY: 'auto' }}
      >
        {messages.map((m, i) => (
          <p
            key={i}
            className={m.role === 'user' ? 'text-right' : 'text-left'}
          >
            {m.content}
          </p>
        ))}
      </Card>
      <form onSubmit={handleSubmit} className="flex space-x-xs items-end">
        <label htmlFor="chat-input" className="sr-only">
          Message
        </label>
        <input
          id="chat-input"
          className="flex-grow border border-secondary rounded px-sm py-xs focus:ring"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
        />
        <Button type="submit" disabled={loading} className="px-sm">
          Send
        </Button>
      </form>
      <p>Balance: {balance} sats</p>
    </div>
  )
}
