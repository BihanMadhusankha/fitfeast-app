import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Users, Zap, Search, Plus, Trash2, Edit3, Save, Package } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import mealsData from '../data/meals.json';

export default function AdminDashboard() {
  const [coaches, setCoaches] = useState([
    { id: 1, name: 'Coach Aruna', code: 'ARUNA05', referrals: 24, commission: 'LKR 4,800' },
    { id: 2, name: 'Coach Malith', code: 'MALITH05', referrals: 18, commission: 'LKR 3,600' },
  ]);

  const [meals, setMeals] = useState(mealsData);
  const [newCoach, setNewCoach] = useState({ name: '', code: '' });

  const addCoach = () => {
    if (!newCoach.name || !newCoach.code) return;
    setCoaches([...coaches, { ...newCoach, id: Date.now(), referrals: 0, commission: 'LKR 0' }]);
    setNewCoach({ name: '', code: '' });
  };

  const removeCoach = (id) => {
    setCoaches(coaches.filter(c => c.id !== id));
  };

  const toggleStock = (id) => {
    setMeals(meals.map(m => m.id === id ? { ...m, inStock: !m.inStock } : m));
  };

  return (
    <PageLayout className="py-12 bg-gray-50/30">
      <div className="max-w-7xl mx-auto px-4">
        <header className="mb-12">
          <h1 className="text-4xl font-black text-charcoal-900 tracking-tight">Super Admin</h1>
          <p className="text-gray-400 mt-2 font-bold uppercase text-[10px] tracking-widest">Master Control Panel</p>
        </header>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left: Coach Management */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-xl shadow-gray-200/50">
              <div className="flex flex-col gap-2 mb-10">
                <h2 className="text-xl font-black text-charcoal-900 tracking-tight">Verify & Add Gym Coaches</h2>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Only Admin can register verified partners</p>
              </div>
              
              <div className="flex flex-wrap gap-4 mb-10 pb-10 border-b border-gray-50">
                <input 
                  placeholder="Verified Coach Name" 
                  className="bg-gray-50 p-3 rounded-xl text-xs font-bold outline-none flex-1 min-w-[200px]"
                  value={newCoach.name} onChange={e => setNewCoach({...newCoach, name: e.target.value})}
                />
                <input 
                  placeholder="Official Promo Code" 
                  className="bg-gray-50 p-3 rounded-xl text-xs font-bold outline-none flex-1 min-w-[200px]"
                  value={newCoach.code} onChange={e => setNewCoach({...newCoach, code: e.target.value})}
                />
                <button onClick={addCoach} className="bg-emerald-500 text-white px-6 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20">
                  Verify & Create Account
                </button>
              </div>

              
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50">
                      <th className="pb-4">Coach</th>
                      <th className="pb-4">Code</th>
                      <th className="pb-4">Referrals</th>
                      <th className="pb-4">Commission</th>
                      <th className="pb-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm font-bold">
                    {coaches.map((coach) => (
                      <tr key={coach.id} className="border-b border-gray-50 last:border-0">
                        <td className="py-6 text-charcoal-900">{coach.name}</td>
                        <td className="py-6"><span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-lg text-xs">{coach.code}</span></td>
                        <td className="py-6 text-gray-400">{coach.referrals}</td>
                        <td className="py-6 text-charcoal-900">{coach.commission}</td>
                        <td className="py-6 text-right">
                          <button onClick={() => removeCoach(coach.id)} className="text-gray-300 hover:text-red-500 transition-colors">
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Meal Stock Management */}
            <div className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-xl shadow-gray-200/50">
               <div className="flex items-center justify-between mb-10">
                <h2 className="text-xl font-black text-charcoal-900 tracking-tight">Meal Stock Control</h2>
                <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <Package size={14} /> {meals.length} Items Total
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {meals.map((meal) => (
                  <div key={meal.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <img src={meal.image} className="w-16 h-16 rounded-xl object-cover grayscale opacity-50" />
                    <div className="flex-1">
                      <h4 className="font-extrabold text-sm text-charcoal-900">{meal.name}</h4>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">LKR {meal.price}</p>
                    </div>
                    <button 
                      onClick={() => toggleStock(meal.id)}
                      className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                        meal.inStock !== false ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'bg-gray-200 text-gray-400'
                      }`}
                    >
                      {meal.inStock !== false ? 'In Stock' : 'Out'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Summary Stats */}
          <div className="space-y-8">
            <div className="bg-charcoal-900 rounded-[2.5rem] p-8 text-white shadow-3xl shadow-gray-200/50">
               <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-8">System Summary</h3>
               <div className="space-y-6">
                 <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center"><ShoppingBag size={18} className="text-emerald-500" /></div>
                      <div>
                        <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Weekly Orders</div>
                        <div className="text-xl font-black">156</div>
                      </div>
                    </div>
                    <span className="text-emerald-400 text-xs font-black">+8%</span>
                 </div>
                 <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center"><Users size={18} className="text-blue-500" /></div>
                      <div>
                        <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Active Coaches</div>
                        <div className="text-xl font-black">{coaches.length}</div>
                      </div>
                    </div>
                 </div>
                 <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center"><Zap size={18} className="text-amber-500" /></div>
                      <div>
                        <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Total Sales</div>
                        <div className="text-xl font-black">LKR 458K</div>
                      </div>
                    </div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
