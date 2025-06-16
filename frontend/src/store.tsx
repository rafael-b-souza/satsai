import { createContext, useContext, useState, ReactNode } from 'react'

type SessionContextValue = {
  sessionId: number | null
  balance: number
  setSessionId: (id: number) => void
  setBalance: (amt: number) => void
}

const SessionContext = createContext<SessionContextValue | undefined>(undefined)

export function SessionProvider({ children }: { children: ReactNode }) {
  const [sessionId, setSessionId] = useState<number | null>(null)
  const [balance, setBalance] = useState(0)

  return (
    <SessionContext.Provider value={{ sessionId, balance, setSessionId, setBalance }}>
      {children}
    </SessionContext.Provider>
  )
}

export function useSession() {
  const ctx = useContext(SessionContext)
  if (!ctx) throw new Error('useSession must be inside SessionProvider')
  return ctx
}
