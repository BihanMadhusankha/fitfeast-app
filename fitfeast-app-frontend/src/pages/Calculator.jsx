import React from 'react';
import { Calculator as CalcIcon, Zap, Target, Activity } from 'lucide-react';
import { useCart } from '../context/CartContext';
import PageLayout from '../components/PageLayout';

export default function Calculator() {
  const { user, setUser, nutrientGoals } = useCart();

  return (
    <PageLayout className="py-12 md:py-20 bg-gray-50/30">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="w-20 h-20 bg-emerald-500 rounded-[2rem] flex items-center justify-center text-white mx-auto mb-8 shadow-2xl shadow-emerald-500/20">
            <CalcIcon size={40} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-charcoal-900 tracking-tight">Personal Goal Tracker</h1>
          <p className="text-gray-500 mt-4 text-lg">Scientifically calculate your daily protein and caloric needs.</p>
        </div>

        <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl shadow-gray-200/50 border border-gray-100">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Left Column */}
              <div className="space-y-6">
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block ml-1">Gender Identity</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['male', 'female'].map(g => (
                      <button 
                        key={g}
                        onClick={() => setUser({...user, gender: g})}
                        className={`p-4 rounded-2xl font-black text-sm uppercase transition-all border-2 ${
                          user.gender === g ? 'bg-emerald-50 border-emerald-500 text-emerald-800' : 'bg-gray-50 border-transparent text-gray-400'
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block ml-1">Current Weight (kg)</label>
                  <input 
                    type="range" min="40" max="150" value={user.weight}
                    onChange={(e) => setUser({...user, weight: Number(e.target.value)})}
                    className="w-full accent-emerald-500"
                  />
                  <div className="flex justify-between items-center mt-2 px-1">
                    <span className="text-2xl font-black text-charcoal-900">{user.weight}<small className="text-xs ml-1 text-gray-400 uppercase">kg</small></span>
                    <span className="text-[10px] font-bold text-gray-300">40 - 150 RANGE</span>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block ml-1">Daily Activity Level</label>
                  <select 
                    value={user.activityLevel} 
                    onChange={e => setUser({...user, activityLevel: e.target.value})}
                    className="w-full bg-gray-50 p-4 rounded-2xl font-bold border-2 border-transparent focus:border-emerald-500 outline-none transition-all appearance-none text-charcoal-800"
                  >
                    <option value="sedentary">Sedentary (Office Work)</option>
                    <option value="moderate">Moderate (3-5 sessions/week)</option>
                    <option value="active">Active (Daily Training)</option>
                    <option value="very_active">Pro Athlete (Intense)</option>
                  </select>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                 <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block ml-1">Your Focus</label>
                  <div className="grid grid-cols-1 gap-3">
                    {[
                      { id: 'loss', label: 'Fat Loss (Cutting)', icon: <Zap size={14} /> },
                      { id: 'maintenance', label: 'Maintenance (Lean)', icon: <Activity size={14} /> },
                      { id: 'gain', label: 'Muscle Gain (Bulking)', icon: <Target size={14} /> }
                    ].map(goal => (
                      <button 
                        key={goal.id}
                        onClick={() => setUser({...user, goal: goal.id})}
                        className={`p-4 rounded-2xl font-black text-sm uppercase transition-all border-2 flex items-center gap-3 ${
                          user.goal === goal.id ? 'bg-charcoal-900 border-charcoal-900 text-white' : 'bg-gray-50 border-transparent text-gray-400'
                        }`}
                      >
                        {goal.icon} {goal.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block ml-1">Age</label>
                    <input type="number" value={user.age} onChange={e => setUser({...user, age: Number(e.target.value)})} className="w-full bg-gray-50 p-4 rounded-2xl font-black outline-none border-2 border-transparent focus:border-emerald-500 transition-all" />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block ml-1">Height (cm)</label>
                    <input type="number" value={user.height} onChange={e => setUser({...user, height: Number(e.target.value)})} className="w-full bg-gray-50 p-4 rounded-2xl font-black outline-none border-2 border-transparent focus:border-emerald-500 transition-all" />
                  </div>
                </div>
              </div>
           </div>

           {/* Results Card */}
           <div className="mt-12 bg-emerald-500 rounded-[2.5rem] p-8 md:p-12 text-white flex flex-col md:flex-row justify-between items-center gap-10 shadow-3xl shadow-emerald-500/30">
             <div className="text-center md:text-left">
               <div className="text-6xl md:text-7xl font-black tracking-tighter">{nutrientGoals.targetProtein}g</div>
               <div className="text-[11px] font-black uppercase tracking-[0.2em] opacity-80 mt-2">Daily Protein Requirement</div>
             </div>
             <div className="hidden md:block w-px h-24 bg-white/20" />
             <div className="text-center md:text-right">
               <div className="text-6xl md:text-7xl font-black tracking-tighter">{nutrientGoals.targetCalories}</div>
               <div className="text-[11px] font-black uppercase tracking-[0.2em] opacity-80 mt-2">Target Calories (TDEE)</div>
             </div>
           </div>
        </div>

        <div className="mt-12 text-center text-gray-400 px-8 text-sm italic leading-relaxed">
           Note: This calculation uses the Mifflin-St Jeor equation, the current gold standard in nutritional science for estimating basal metabolic rate.
        </div>
      </div>
    </PageLayout>
  );
}
