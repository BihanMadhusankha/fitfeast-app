import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBasket, Menu, X, Smartphone, Calculator as CalcIcon } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const { cart, proteinProgress } = useCart();
  const { currentUser, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Trending', path: '/trending' },
    { name: 'Menu', path: '/menu' },
    { name: 'Build Your Own', path: '/builder' },
    { name: 'Calculator', path: '/calculator' },
  ];

  const showProgress = ['/menu', '/calculator', '/builder'].includes(location.pathname);

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform">FF</div>
            <span className="text-xl font-extrabold tracking-tight text-charcoal-900">FitFeast <span className="text-emerald-500">Lanka</span></span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                className={`text-sm font-semibold transition-colors ${
                  location.pathname === link.path ? 'text-emerald-600' : 'text-gray-500 hover:text-emerald-600'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="hidden lg:flex items-center gap-4">
              {currentUser ? (
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Hello,</span>
                    <span className="text-sm font-black text-charcoal-900 leading-tight capitalize">{currentUser.name}</span>
                  </div>
                  <div className="flex gap-2">
                    {currentUser.role === 'coach' && (
                      <Link to="/coach" className="bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-lg font-bold text-[10px] uppercase tracking-widest border border-emerald-100 hover:bg-emerald-100 transition-colors">Coach</Link>
                    )}
                    {currentUser.role === 'admin' && (
                      <Link to="/admin" className="bg-charcoal-900 text-white px-3 py-1.5 rounded-lg font-bold text-[10px] uppercase tracking-widest shadow-lg hover:bg-black transition-colors">Admin</Link>
                    )}
                    <button onClick={logout} className="text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-red-500 transition-colors">Logout</button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <Link to="/login" className="text-sm font-black text-gray-400 hover:text-charcoal-900 transition-colors">Sign In</Link>
                  <Link to="/register" className="bg-emerald-500 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-xl shadow-emerald-500/20 hover:bg-emerald-600 transition-all">Join Now</Link>
                </div>
              )}
            </div>

             <a 
              href="https://wa.me/94771234567" 
              target="_blank" 
              rel="noreferrer"
              className="hidden xl:flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2.5 rounded-xl font-bold text-sm hover:bg-emerald-100 transition-all border border-emerald-100"
            >
              <Smartphone size={16} /> WhatsApp
            </a>

            <Link 
              to="/bucket"
              className="relative p-3 bg-charcoal-900 text-white rounded-xl shadow-xl hover:scale-105 active:scale-95 transition-all"
            >
              <ShoppingBasket size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-[10px] min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center font-bold border-2 border-white animate-bounce">
                  {totalItems}
                </span>
              )}
            </Link>

            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 text-gray-500 hover:text-emerald-500 transition-colors"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      
      {/* Dynamic Progress Bar */}
      <AnimatePresence>
        {showProgress && (
          <motion.div 
            initial={{ height: 0 }}
            animate={{ height: 6 }}
            exit={{ height: 0 }}
            className="w-full bg-gray-100 overflow-hidden"
          >
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${proteinProgress}%` }}
              className={`h-full transition-all duration-500 ${proteinProgress >= 100 ? 'bg-emerald-500' : 'bg-emerald-400'}`}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-charcoal-900/40 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.aside 
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              className="fixed top-0 left-0 z-[110] h-full w-72 bg-white p-6 shadow-2xl flex flex-col"
            >
              <div className="flex justify-between items-center mb-10">
                <span className="text-xl font-extrabold text-charcoal-900 uppercase tracking-widest">FitFeast</span>
                <button onClick={() => setIsMobileMenuOpen(false)} className="bg-gray-100 p-2 rounded-lg text-gray-500"><X size={20} /></button>
              </div>
              <div className="space-y-6">
                {navLinks.map((link) => (
                  <Link 
                    key={link.name} 
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-4 text-lg font-bold w-full text-left transition-colors ${
                      location.pathname === link.path ? 'text-emerald-600' : 'text-charcoal-800 hover:text-emerald-500'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
              <div className="mt-auto pt-10 border-t border-gray-100">
                 <div className="bg-emerald-50 p-4 rounded-2xl">
                    <p className="text-[10px] font-black text-emerald-800 uppercase tracking-widest mb-1">Stay Fit</p>
                    <p className="text-sm font-bold text-emerald-900 leading-tight">Your daily protein goal is waiting!</p>
                 </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
