import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Zap, Heart, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function MealModal({ meal, isOpen, onClose }) {
  const { addToCart } = useCart();

  if (!meal) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-charcoal-900/60 backdrop-blur-md"
            onClick={onClose}
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-[110] flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-[3rem] overflow-hidden shadow-3xl pointer-events-auto flex flex-col md:flex-row">
              {/* Left: Image & Quick Stats */}
              <div className="md:w-1/2 relative h-64 md:h-auto">
                <img src={meal.image} alt={meal.name} className="w-full h-full object-cover" />
                <button 
                  onClick={onClose}
                  className="absolute top-6 left-6 p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-charcoal-900 transition-all border border-white/30"
                >
                  <X size={24} />
                </button>
                <div className="absolute bottom-6 left-6 right-6 flex justify-between gap-4">
                  <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-3 rounded-2xl flex-1 text-center">
                    <div className="text-[10px] font-black text-white/60 uppercase tracking-widest leading-none mb-1">Carbs</div>
                    <div className="text-xl font-black text-white tracking-tighter">{meal.carbs || 0}g</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-3 rounded-2xl flex-1 text-center">
                    <div className="text-[10px] font-black text-white/60 uppercase tracking-widest leading-none mb-1">Fats</div>
                    <div className="text-xl font-black text-white tracking-tighter">{meal.fats || 0}g</div>
                  </div>
                </div>
              </div>

              {/* Right: Content */}
              <div className="md:w-1/2 p-8 md:p-12 overflow-y-auto custom-scrollbar flex flex-col">
                <div className="mb-8">
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">{meal.category}</span>
                  <h2 className="text-3xl md:text-4xl font-black text-charcoal-900 mt-4 leading-tight">{meal.name}</h2>
                  <p className="text-gray-400 mt-4 leading-relaxed">{meal.description}</p>
                </div>

                <div className="space-y-8 mb-10">
                   {/* Ingredients List */}
                   <div>
                     <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 border-b border-gray-50 pb-2">What's Inside</h3>
                     <div className="grid grid-cols-1 gap-3">
                       {meal.ingredients?.map((ing, i) => (
                         <div key={i} className="flex justify-between items-center p-3.5 bg-gray-50 rounded-2xl border border-gray-100/50">
                           <span className="font-bold text-charcoal-700">{ing.item}</span>
                           <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 px-2 py-0.5 rounded-lg">{ing.portion}</span>
                         </div>
                       ))}
                     </div>
                   </div>

                   {/* Nutritional Highlights */}
                   <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-emerald-500 rounded-[1.5rem] text-white shadow-xl shadow-emerald-500/20">
                        <div className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">Protein</div>
                        <div className="text-3xl font-black tracking-tighter">{meal.protein}g</div>
                      </div>
                      <div className="p-4 bg-charcoal-900 rounded-[1.5rem] text-white">
                        <div className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">Total Calories</div>
                        <div className="text-3xl font-black tracking-tighter">{meal.calories}</div>
                      </div>
                   </div>
                </div>

                <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between gap-6">
                  <div>
                    <div className="text-[10px] font-black text-gray-300 uppercase tracking-widest leading-none mb-1 text-center md:text-left">Price</div>
                    <div className="text-3xl font-black text-charcoal-900 tracking-tighter">LKR {meal.price}</div>
                  </div>
                  <button 
                    onClick={() => { addToCart(meal); onClose(); }}
                    className="flex-1 bg-emerald-500 text-white p-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] flex items-center justify-center gap-3 shadow-2xl shadow-emerald-500/20 hover:bg-emerald-600 transition-all group"
                  >
                    Add to Bucket <Plus size={20} className="group-hover:rotate-90 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
