// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Package, LogOut, Menu, X, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setMenuOpen(false);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="bg-black text-white border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold hover:text-gray-300 transition">
            FashionHub
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/products" className="hover:text-gray-300 transition">
              Shop
            </Link>
            
            {user && (
              <>
                {user.role === 'customer' && (
                  <Link 
                    to="/customer-dashboard" 
                    className="hover:text-gray-300 transition flex items-center gap-2"
                  >
                    <LayoutDashboard size={18} />
                    Dashboard
                  </Link>
                )}
                
                {user.role === 'vendor' && (
                  <Link 
                    to="/vendor-dashboard" 
                    className="hover:text-gray-300 transition flex items-center gap-2"
                  >
                    <Package size={18} />
                    My Store
                  </Link>
                )}
                
                {user.role === 'admin' && (
                  <Link 
                    to="/admin-dashboard" 
                    className="hover:text-gray-300 transition flex items-center gap-2"
                  >
                    <LayoutDashboard size={18} />
                    Admin Panel
                  </Link>
                )}
              </>
            )}
            
            <Link 
              to="/cart" 
              className="flex items-center gap-2 hover:text-gray-300 transition relative"
            >
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-black px-2 py-0.5 rounded-full text-xs font-semibold">
                  {cartCount}
                </span>
              )}
            </Link>
            
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-400">
                  {user.name} <span className="text-gray-600">({user.role})</span>
                </span>
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-2 hover:text-gray-300 transition"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="flex items-center gap-2 px-4 py-2 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition"
              >
                <User size={18} />
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3 border-t border-gray-800 pt-4">
            <Link 
              to="/products" 
              onClick={() => setMenuOpen(false)}
              className="block py-2 hover:text-gray-300 transition"
            >
              Shop
            </Link>
            
            {user && (
              <>
                {user.role === 'customer' && (
                  <Link 
                    to="/customer-dashboard"
                    onClick={() => setMenuOpen(false)}
                    className="block py-2 hover:text-gray-300 transition"
                  >
                    Dashboard
                  </Link>
                )}
                
                {user.role === 'vendor' && (
                  <Link 
                    to="/vendor-dashboard"
                    onClick={() => setMenuOpen(false)}
                    className="block py-2 hover:text-gray-300 transition"
                  >
                    My Store
                  </Link>
                )}
                
                {user.role === 'admin' && (
                  <Link 
                    to="/admin-dashboard"
                    onClick={() => setMenuOpen(false)}
                    className="block py-2 hover:text-gray-300 transition"
                  >
                    Admin Panel
                  </Link>
                )}
              </>
            )}
            
            <Link 
              to="/cart"
              onClick={() => setMenuOpen(false)}
              className="block py-2 hover:text-gray-300 transition"
            >
              Cart ({cartCount})
            </Link>
            
            {user ? (
              <>
                <div className="py-2 text-gray-400">
                  {user.name} ({user.role})
                </div>
                <button 
                  onClick={handleLogout}
                  className="block w-full text-left py-2 hover:text-gray-300 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link 
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="block py-2 hover:text-gray-300 transition"
              >
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;