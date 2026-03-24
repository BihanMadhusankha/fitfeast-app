import React from 'react';
import { motion } from 'framer-motion';
import { Users, DollarSign, ShoppingBag, TrendingUp, ArrowUpRight } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import { useAuth } from '../context/AuthContext';

export default function CoachDashboard() {
  const { currentUser } = useAuth();

  // Mock data for the dashboard
  const stats = [
    { label: 'Total Referrals', value: '42', icon: Users, color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'Total Sales', value: 'LKR 84,500', icon: ShoppingBag, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { label: 'Commission (10%)', value: 'LKR 8,450', icon: DollarSign, color: 'text-amber-500', bg: 'bg-amber-50' },
    { label: 'Growth', value: '+12%', icon: TrendingUp, color: 'text-purple-500', bg: 'bg-purple-50' },
  ];

  const recentOrders = [
    { id: '#ORD-7721', student: 'Kasun Perera', items: 'High Protein Chicken Rice x 2', total: 'LKR 2,400', date: '2 hours ago' },
    { id: '#ORD-7718', student: 'Nimmi Silva', items: 'Beef Teriyaki Bowl x 1', total: 'LKR 1,450', date: '5 hours ago' },
    { id: '#ORD-7715', student: 'Dilshan Silva', items: 'Lean Fish Fillet x 3', total: 'LKR 3,900', date: 'Yesterday' },
  ];

  return (
    <PageLayout className="py-12 bg-gray-50/30">
      <div className="max-w-7xl mx-auto px-4">
        <header className="mb-12">
          <h1 className="text-4xl font-black text-charcoal-900 tracking-tight">Coach Dashboard</h1>
          <p className="text-gray-400 mt-2 font-bold uppercase text-[10px] tracking-widest">Performance Tracking for Coach {currentUser?.name || 'User'}</p>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              key={stat.label} 
              className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/50"
            >
              <div className={`${stat.bg} ${stat.color} w-12 h-12 rounded-xl flex items-center justify-center mb-6`}>
                <stat.icon size={24} />
              </div>
              <h3 className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-1">{stat.label}</h3>
              <p className="text-2xl font-black text-charcoal-900">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-xl shadow-gray-200/50">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-xl font-black text-charcoal-900 tracking-tight">Recent Student Orders</h2>
            <button className="text-[10px] font-black text-emerald-500 uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all">
              View All <ArrowUpRight size={14} />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50">
                  <th className="pb-4">Order ID</th>
                  <th className="pb-4">Student Name</th>
                  <th className="pb-4">Items</th>
                  <th className="pb-4">Sale Total</th>
                  <th className="pb-4">Time</th>
                </tr>
              </thead>
              <tbody className="text-sm font-bold">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-50 last:border-0">
                    <td className="py-6 text-emerald-600">{order.id}</td>
                    <td className="py-6 text-charcoal-900">{order.student}</td>
                    <td className="py-6 text-gray-400">{order.items}</td>
                    <td className="py-6 text-charcoal-900">{order.total}</td>
                    <td className="py-6 text-gray-300">{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
