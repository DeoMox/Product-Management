import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const { count } = useCart()
  const navigate = useNavigate()

  return (
    <header className="bg-white border-b sticky top-0 z-20">
      <nav className="container flex items-center justify-between py-3">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <span>Product Manager</span>
        </Link>

        <div className="flex items-center gap-3">
          <NavLink to="/products" className="btn btn-outline">Products</NavLink>
          <NavLink to="/cart" className="btn btn-outline">Cart ({count})</NavLink>
          {user ? (
            <button className="btn btn-primary" onClick={() => { logout(); navigate('/login') }}>
              Logout
            </button>
          ) : (
            <NavLink to="/login" className="btn btn-primary">Login</NavLink>
          )}
        </div>
      </nav>
    </header>
  )
}
