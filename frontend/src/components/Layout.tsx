import { NavLink, Outlet } from 'react-router-dom'
import { useDarkMode } from '../hooks/useDarkMode'

export default function Layout() {
  const { dark, toggleDark } = useDarkMode()
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <header className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between">
        <nav className="space-x-4">
          <NavLink to="/" className={({isActive}) => isActive ? 'font-bold' : ''}>Home</NavLink>
          <NavLink to="/pay" className={({isActive}) => isActive ? 'font-bold' : ''}>Pay</NavLink>
          <NavLink to="/chat" className={({isActive}) => isActive ? 'font-bold' : ''}>Chat</NavLink>
        </nav>
        <button onClick={toggleDark} className="px-2 py-1 border rounded">
          {dark ? 'Light' : 'Dark'}
        </button>
      </header>
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  )
}
