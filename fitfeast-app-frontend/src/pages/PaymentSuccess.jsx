import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../components/PageLayout';

export default function PaymentSuccess() {
  const navigate = useNavigate();

  return (
    <PageLayout className="min-h-[80vh] flex items-center justify-center py-20 px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full text-center"
      >
        <div className="bg-white rounded-[3rem] p-12 shadow-3xl shadow-gray-200/50 border border-gray-100 flex flex-col items-center">
          <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 mb-8">
            <CheckCircle size={64} />
          </div>
          
          <h2 className="text-4xl font-black text-charcoal-900 tracking-tight mb-4">Payment Success!</h2>
          <p className="text-gray-400 font-bold text-sm leading-relaxed mb-10">
            Your high-performance fuel is being prepared. You'll receive a WhatsApp confirmation shortly with delivery tracking.
          </p>

          <div className="w-full space-y-4">
            <button 
              onClick={() => navigate('/')}
              className="w-full bg-emerald-500 text-white p-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] flex items-center justify-center gap-3 shadow-2xl shadow-emerald-500/20 hover:bg-emerald-600 transition-all group"
            >
              Order More <ShoppingBag size={20} />
            </button>
            <button 
              onClick={() => navigate('/trending')}
              className="w-full bg-gray-50 text-charcoal-900 p-5 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-gray-100 transition-all"
            >
              View Trending Meals <ArrowRight size={16} />
            </button>
          </div>
        </div>
        <p className="mt-10 text-[10px] font-black text-gray-300 uppercase tracking-[0.3em]">Transaction ID: #FF-{Math.floor(Math.random() * 1000000)}</p>
      </motion.div>
    </PageLayout>
  );
}
