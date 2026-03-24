import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Trending from './pages/Trending';
import Menu from './pages/Menu';
import Calculator from './pages/Calculator';
import Bucket from './pages/Bucket';
import MealBuilder from './pages/MealBuilder';
import Login from './pages/Login';
import Register from './pages/Register';
import CoachDashboard from './pages/CoachDashboard';
import AdminDashboard from './pages/AdminDashboard';
import PaymentSuccess from './pages/PaymentSuccess';

function AppRoutes() {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/builder" element={<MealBuilder />} />
        <Route path="/bucket" element={<Bucket />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/coach" element={<CoachDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>

        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">
            <AppRoutes />
          </main>
          
          {/* Global Footer (Common to all pages) */}
          <footer className="bg-charcoal-900 pt-20 pb-10 text-white overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-4 relative z-10">
              <div className="grid md:grid-cols-4 gap-12 border-b border-white/5 pb-10">
                <div className="col-span-2">
                   <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white font-bold text-lg">FF</div>
                    <h2 className="text-2xl font-black tracking-tight">FitFeast Lanka</h2>
                  </div>
                  <p className="text-gray-400 text-sm max-w-sm leading-relaxed mb-8">Building the next generation of performance nutrition in Sri Lanka. Delivered fresh from our Homagama kitchen to your door.</p>
                </div>
                <div>
                  <h4 className="font-black mb-6 text-emerald-500 uppercase tracking-widest text-xs">Primary Zones</h4>
                  <ul className="text-gray-400 text-sm space-y-3 font-bold">
                    <li className="hover:text-white transition-colors cursor-pointer">Homagama</li>
                    <li className="hover:text-white transition-colors cursor-pointer">Kottawa</li>
                    <li className="hover:text-white transition-colors cursor-pointer">Godagama</li>
                    <li className="hover:text-white transition-colors cursor-pointer">Athurugiriya</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-black mb-6 text-emerald-500 uppercase tracking-widest text-xs">Direct Support</h4>
                  <div className="text-emerald-400 font-black text-xl">+94 77 123 4567</div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-2 font-bold italic">Always Prepared in Homagama</p>
                </div>
              </div>
              <div className="mt-10 flex flex-wrap gap-6 items-center justify-between opacity-30 text-[10px] font-bold uppercase tracking-widest">
                <div>© 2026 FitFeast Lanka</div>
                <div>Eat Clean. Train Hard.</div>
              </div>
            </div>
          </footer>
        </div>
      </Router>
      </CartProvider>
    </AuthProvider>
  );
}
