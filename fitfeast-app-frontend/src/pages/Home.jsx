import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, CheckCircle, ShieldCheck, Heart, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { getCutoffStatus } from '../utils/scheduler';
import mealsData from '../data/meals.json';
import MealCard from '../components/MealCard';
import PageLayout from '../components/PageLayout';

export default function Home() {
  const [cutoff, setCutoff] = React.useState(getCutoffStatus());
  
  React.useEffect(() => {
    const timer = setInterval(() => setCutoff(getCutoffStatus()), 60000);
    return () => clearInterval(timer);
  }, []);

  const featuredMeals = mealsData.filter(m => m.featured);

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-8 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">Homagama • Kottawa • Godagama</span>
            <h1 className="text-5xl md:text-7xl font-black text-charcoal-900 mt-6 leading-[1.1]">
              Eat Clean. <br/> Train Hard. <br/> <span className="text-emerald-500">Delivered Fresh.</span>
            </h1>
            <p className="text-gray-500 mt-6 text-lg max-w-lg leading-relaxed">
              Premium high-protein meals for athletes and curated traditional nutrition for seniors. We handle the science, you handle the sweat.
            </p>
            
            <div className="mt-10 flex flex-wrap gap-4">
              <Link 
                to="/menu"
                className="bg-charcoal-900 text-white px-8 py-4 rounded-2xl font-black flex items-center gap-2 hover:bg-black transition-all shadow-xl shadow-gray-200"
              >
                Explore Menu <ArrowRight size={20} />
              </Link>

              <Link 
                to="/builder"
                className="bg-white text-emerald-600 border-2 border-emerald-500 px-8 py-4 rounded-2xl font-black flex items-center gap-2 hover:bg-emerald-50 transition-all shadow-xl shadow-emerald-500/5"
              >
                Build Custom <Plus size={20} />
              </Link>
              
              <div className="flex flex-col justify-center ml-2">
                 <div className="flex items-center gap-2 text-charcoal-900 font-bold">
                   <Clock size={16} className="text-emerald-500" /> 
                   Order in {cutoff.hours}h {cutoff.minutes}m
                 </div>
                 <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">for tomorrow's delivery</p>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative">
            <img 
              src="https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=800&auto=format&fit=crop" 
              className="rounded-[2.5rem] w-full h-[450px] object-cover shadow-2xl" 
              alt="Elite Meal Prep" 
              loading="lazy"
            />
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-3xl shadow-2xl border border-gray-50 hidden sm:block">
              <div className="text-3xl font-black text-emerald-500 italic">Chef Prepared</div>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Hygienic Kitchen</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
           {[
             { icon: <ShieldCheck size={32} />, title: "100% Hygienic", desc: "Sourced locally. Prepared with medical-grade hygiene standards." },
             { icon: <CheckCircle size={32} />, title: "Precision Macros", desc: "Every gram of protein is counted so you don't have to." },
             { icon: <Heart size={32} />, title: "Senior Friendly", desc: "Special diets for the elderly with reduced salt and oil." }
           ].map((item, i) => (
             <div key={i} className="flex gap-4 p-6 bg-white rounded-3xl border border-gray-100 shadow-sm">
                <div className="text-emerald-500 shrink-0">{item.icon}</div>
                <div>
                  <h4 className="font-black text-charcoal-800 uppercase tracking-tight text-lg">{item.title}</h4>
                  <p className="text-gray-400 text-sm mt-1">{item.desc}</p>
                </div>
             </div>
           ))}
        </div>
      </section>

      {/* Featured Meals */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-black text-charcoal-900 leading-tight">Fan Favorites</h2>
            <p className="text-gray-400 mt-2">The fuel that keeps our community moving.</p>
          </div>
          <Link to="/menu" className="hidden sm:flex items-center gap-2 text-emerald-600 font-bold hover:gap-3 transition-all">
            See Full Menu <ArrowRight size={18} />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredMeals.map((meal) => (
            <MealCard key={meal.id} meal={meal} />
          ))}
        </div>
      </section>
    </PageLayout>
  );
}
