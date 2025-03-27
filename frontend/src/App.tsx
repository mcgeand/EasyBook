import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Bookings from './pages/Bookings'
import Settings from './pages/Settings'
import Login from './pages/Login'
import NotFound from './pages/NotFound'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="bookings" element={<Bookings />} />
        <Route path="settings" element={<Settings />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App 