import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import PageLayout from '../components/PageLayout';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
    navigate('/');
  };

  return (
    <PageLayout className="min-h-screen flex items-center justify-center bg-gray-50/50 py-12 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="bg-white rounded-[2.5rem] p-10 shadow-3xl shadow-gray-200/50 border border-gray-100">
          <div className="flex flex-col items-center mb-10">
            <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center text-white mb-6 shadow-xl shadow-emerald-500/20">
              <LogIn size={32} />
            </div>
            <h2 className="text-3xl font-black text-charcoal-900 tracking-tight">Welcome Back</h2>
            <p className="text-gray-400 mt-2 font-bold uppercase text-[10px] tracking-widest">Sign in to your performance account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-emerald-500 transition-colors" size={18} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-50 border-2 border-transparent focus:border-emerald-500/20 p-4 pl-12 rounded-2xl font-bold text-sm outline-none transition-all"
                  placeholder="name@example.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-emerald-500 transition-colors" size={18} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-50 border-2 border-transparent focus:border-emerald-500/20 p-4 pl-12 rounded-2xl font-bold text-sm outline-none transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-emerald-500 text-white p-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] flex items-center justify-center gap-3 shadow-2xl shadow-emerald-500/20 hover:bg-emerald-600 transition-all group"
            >
              Sign In <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </button>
          </form>

          <div className="mt-10 pt-10 border-t border-gray-50 text-center">
            <p className="text-xs font-bold text-gray-400">
              Don't have an account? <Link to="/register" className="text-emerald-500 hover:underline">Register Now</Link>
            </p>
          </div>
        </div>
      </motion.div>
    </PageLayout>
  );
}
