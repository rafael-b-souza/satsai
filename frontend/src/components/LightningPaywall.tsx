import { useEffect, useState } from 'react'

export type PaywallProps = {
  invoice: string
  paymentHash: string
  pollUrl: string
  amount: number
  onPaid: () => void
}

export default function LightningPaywall({ invoice, paymentHash, pollUrl, amount, onPaid }: PaywallProps) {
  const [paid, setPaid] = useState(false)

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
    <div className="space-y-4">
      <div className="flex justify-center">
        <img
          src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(invoice)}`}
          alt="invoice qr"
        />
      </div>
      <div className="break-all text-center border p-2 rounded bg-gray-100 dark:bg-gray-800">
        {invoice}
      </div>
      <button onClick={copy} className="px-4 py-2 border rounded w-full">
        Copy Invoice
      </button>
      {paid && <p className="text-green-600">Payment confirmed for {amount} sats!</p>}
    </div>
  )
}
