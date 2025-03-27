import { Outlet, Link } from 'react-router-dom'

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0">
              <Link to="/" className="text-xl font-bold text-indigo-600">
                EasyBook
              </Link>
            </div>
            <nav className="flex space-x-4">
              <Link to="/" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                Home
              </Link>
              <Link to="/bookings" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                Bookings
              </Link>
              <Link to="/settings" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                Settings
              </Link>
              <Link to="/login" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                Login
              </Link>
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
            &copy; {new Date().getFullYear()} EasyBook. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Layout 