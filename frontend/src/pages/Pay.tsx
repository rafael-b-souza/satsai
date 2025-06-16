import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LightningPaywall from '../components/LightningPaywall'
import { useSession } from '../store'

export default function Pay() {
  const amount = 100
  const [invoice, setInvoice] = useState('')
  const [hash, setHash] = useState('')
  const { setBalance, setSessionId, sessionId } = useSession()
  const navigate = useNavigate()

  useEffect(() => {
    const load = async () => {
      try {
        let id = sessionId
        if (!id) {
          const s = await fetch('/api/v1/sessions', { method: 'POST' })
          if (!s.ok) return
          const session = await s.json()
          id = session.id
          setSessionId(id)
        }
        const r = await fetch(
          `/api/v1/payments/invoice?amount=${amount}&memo=credits&session_id=${id}`,
        )
        if (!r.ok) return
        const data = await r.json()
        setInvoice(data.payment_request)
        setHash(data.payment_hash)
      } catch {
        // ignore
      }
    }
    load()
  }, [])

  if (!invoice) return <p>Loading invoice...</p>

  return (
    <LightningPaywall
      invoice={invoice}
      paymentHash={hash}
      pollUrl={`/api/v1/payments/invoice/${hash}`}
      amount={amount}
      onPaid={() => {
        setBalance(amount)
        navigate('/chat')
      }}
    />
  )
}
