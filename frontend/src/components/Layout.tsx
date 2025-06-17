import { NavLink, Outlet } from 'react-router-dom'
import { useDarkMode } from '../hooks/useDarkMode'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import Button from './ui/Button'

export default function Layout() {
  const { dark, toggleDark } = useDarkMode()
  const [open, setOpen] = useState(false)
  const [desktop, setDesktop] = useState(
    typeof window !== 'undefined'
      ? window.matchMedia('(min-width: 768px)').matches
      : false
  )

  useEffect(() => {
    const m = window.matchMedia('(min-width: 768px)')
    const handler = () => setDesktop(m.matches)
    handler()
    m.addEventListener('change', handler)
    return () => m.removeEventListener('change', handler)
  }, [])

  const showNav = desktop || open

  return (
    <div className="min-h-screen bg-primary text-secondary">
      <header className="p-sm border-b border-secondary flex flex-wrap md:flex-nowrap items-center">
        <button
          className="md:hidden mr-auto"
          aria-label="Toggle menu"
          onClick={() => setOpen((o) => !o)}
        >
          &#9776;
        </button>
        <nav
          className={clsx(
            'w-full md:w-auto',
            'md:space-x-4',
            !desktop && 'space-y-2'
          )}
          style={{
            display: showNav ? 'flex' : 'none',
            flexDirection: desktop ? 'row' : 'column',
          }}
        >
          <NavLink
            to="/"
            className={({ isActive }) =>
              clsx(isActive && 'font-bold', 'focus:ring outline-none')
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/pay"
            className={({ isActive }) =>
              clsx(isActive && 'font-bold', 'focus:ring outline-none')
            }
          >
            Pay
          </NavLink>
          <NavLink
            to="/chat"
            className={({ isActive }) =>
              clsx(isActive && 'font-bold', 'focus:ring outline-none')
            }
          >
            Chat
          </NavLink>
        </nav>
        <Button onClick={toggleDark} className="px-xs py-xs ml-auto">
          {dark ? 'Light' : 'Dark'}
        </Button>
      </header>
      <main className="p-sm">
        <Outlet />
      </main>
    </div>
  )
}
