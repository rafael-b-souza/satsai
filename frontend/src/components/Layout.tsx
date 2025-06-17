import { NavLink, Outlet } from 'react-router-dom'
import { useDarkMode } from '../hooks/useDarkMode'
import Button from './ui/Button'

export default function Layout() {
  const { dark, toggleDark } = useDarkMode()
  return (
    <div className="min-h-screen bg-primary text-secondary">
      <header className="p-sm border-b border-secondary flex justify-between">
        <nav className="space-x-4">
          <NavLink to="/" className={({isActive}) => isActive ? 'font-bold' : ''}>Home</NavLink>
          <NavLink to="/pay" className={({isActive}) => isActive ? 'font-bold' : ''}>Pay</NavLink>
          <NavLink to="/chat" className={({isActive}) => isActive ? 'font-bold' : ''}>Chat</NavLink>
        </nav>
        <Button onClick={toggleDark} className="px-xs py-xs">
          {dark ? 'Light' : 'Dark'}
        </Button>
      </header>
      <main className="p-sm">
        <Outlet />
      </main>
    </div>
  )
}
