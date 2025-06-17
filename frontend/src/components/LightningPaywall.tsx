import { useEffect, useState } from 'react'
import Card from './ui/Card'
import Button from './ui/Button'

export type PaywallProps = {
  invoice: string
  paymentHash: string
  pollUrl: string
  amount: number
  onPaid: () => void
}

export default function LightningPaywall({ invoice, paymentHash: _paymentHash, pollUrl, amount, onPaid }: PaywallProps) {
  void _paymentHash
  const [paid, setPaid] = useState(false)
  const status = paid ? `Payment confirmed for ${amount} sats!` : ''

  useEffect(() => {
    if (paid) return
    const id = setInterval(async () => {
      try {
        const r = await fetch(pollUrl)
        if (!r.ok) return
        const data = await r.json()
        if (data.paid) {
          clearInterval(id)
          setPaid(true)
          onPaid()
        }
      } catch {
        // ignore
      }
    }, 2000)
    return () => clearInterval(id)
  }, [paid, pollUrl, onPaid])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(invoice)
    } catch {
      // ignore
    }
  }

  return (
    <div className="space-y-sm">
      <div className="flex justify-center">
        <img
          src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(invoice)}`}
          alt="invoice qr"
        />
      </div>
      <Card className="break-all text-center bg-secondary p-xs">
        {invoice}
      </Card>
      <Button onClick={copy} className="w-full">
        Copy Invoice
      </Button>
      <div aria-live="polite" className="text-success h-5" role="status">
        {status}
      </div>
    </div>
  )
}
