import { useSession } from '../store'

export default function Chat() {
  const { balance } = useSession()
  return <div>Chat UI coming soon. Balance: {balance} sats</div>
}
