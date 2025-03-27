import * as React from 'react'
import { Outlet, Link } from 'react-router-dom'

interface NavLinkProps {
  to: string;
  label: string;
}

const NavLink: React.FC<NavLinkProps> = ({ to, label }: NavLinkProps) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLAnchorElement>): void => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      window.location.href = to
    }
  }

  return (
    <Link 
      to={to} 
      className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
      tabIndex={0}
      aria-label={label}
      onKeyDown={handleKeyDown}
    >
      {label}
    </Link>
  )
}

const Layout: React.FC = () => {
  const currentYear = new Date().getFullYear()
  
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0">
              <Link 
                to="/" 
                className="text-xl font-bold text-indigo-600"
                tabIndex={0}
                aria-label="EasyBook Home"
                onKeyDown={(e: React.KeyboardEvent<HTMLAnchorElement>) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    window.location.href = '/'
                  }
                }}
              >
                EasyBook
              </Link>
            </div>
            <nav className="flex space-x-4" aria-label="Main Navigation">
              <NavLink to="/" label="Home" />
              <NavLink to="/bookings" label="Bookings" />
              <NavLink to="/settings" label="Settings" />
              <NavLink to="/login" label="Login" />
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
      <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            &copy; {currentYear} EasyBook. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Layout 