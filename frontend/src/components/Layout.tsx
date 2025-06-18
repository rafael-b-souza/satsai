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
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-10 border-b border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100">
        <div className="flex items-center p-sm max-w-screen-md mx-auto">
          <button
            className="md:hidden mr-2"
            aria-label="Toggle menu"
            onClick={() => setOpen((o) => !o)}
          >
            &#9776;
          </button>
          <span className="font-bold flex-1">SatsAi</span>
          <nav
            className={clsx(
              'md:flex md:space-x-4',
              !desktop && 'flex-col space-y-2',
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
          <Button onClick={toggleDark} className="ml-2 px-xs py-xs">
            {dark ? 'Light' : 'Dark'}
          </Button>
        </div>
      </header>
      <main className="flex-1 p-sm max-w-screen-md mx-auto w-full">
        <Outlet />
      </main>
    </div>
  )
}
