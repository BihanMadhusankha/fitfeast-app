import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Flame, Info } from 'lucide-react';
import { useCart } from '../context/CartContext';
import MealModal from './MealModal';

export default function MealCard({ meal, isTrending = false }) {
  const { addToCart } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <motion.div 
        whileHover={{ y: -5 }}
        className="bg-white rounded-[2rem] border border-gray-100 p-4 shadow-sm hover:shadow-2xl hover:shadow-gray-200/50 transition-all group h-full flex flex-col cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="relative h-56 mb-5 overflow-hidden rounded-[1.5rem] shadow-inner">
          <img src={meal.image} alt={meal.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
          <div className="absolute top-3 left-3 flex flex-wrap gap-2">
            <span className="bg-emerald-500 text-white text-[10px] font-black px-2.5 py-1 rounded-lg uppercase shadow-lg shadow-emerald-500/20">{meal.category}</span>
            {isTrending && <span className="bg-orange-500 text-white text-[10px] font-black px-2.5 py-1 rounded-lg uppercase shadow-lg shadow-orange-500/20 animate-pulse flex items-center gap-1">
              <Flame size={10} /> Trending
            </span>}
          </div>
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
             <div className="bg-white/20 backdrop-blur-md p-2 rounded-xl text-white border border-white/30">
                <Info size={16} />
             </div>
          </div>
        </div>
        
        <div className="px-1 flex-1 flex flex-col">
          <h3 className="font-extrabold text-charcoal-900 text-xl leading-tight mb-2">{meal.name}</h3>
          <div className="flex gap-4 mb-4">
            <div className="text-[11px] font-black text-gray-400 uppercase flex items-center gap-1.5 leading-none">
               <div className="w-2 h-2 bg-emerald-500 rounded-full" /> {meal.protein}g Protein
            </div>
            <div className="text-[11px] font-black text-gray-400 uppercase flex items-center gap-1.5 leading-none">
               <div className="w-2 h-2 bg-charcoal-200 rounded-full" /> {meal.calories} kcal
            </div>
          </div>
          
          <p className="text-xs text-gray-400 mb-6 line-clamp-2 min-h-[2.5rem] leading-relaxed">{meal.description}</p>
          
          <div className="flex items-center justify-between pt-4 border-t border-gray-50 mt-auto">
            <div className="text-xl font-black text-charcoal-900 tracking-tighter uppercase whitespace-nowrap">LKR {meal.price}</div>
            <button 
              onClick={(e) => { e.stopPropagation(); addToCart(meal); }}
              className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all transform active:scale-95 shadow-lg shadow-emerald-500/5 group/btn"
            >
              <Plus className="group-hover/btn:rotate-90 transition-transform" size={24} />
            </button>
          </div>
        </div>
      </motion.div>

      <MealModal 
        meal={meal} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
}
