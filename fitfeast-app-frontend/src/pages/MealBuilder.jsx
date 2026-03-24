import React, { useState, useMemo } from 'react';
import * as Lucide from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import ingredients from '../data/ingredients.json';
import PageLayout from '../components/PageLayout';

const STEPS = [
  { id: 'base', name: 'Step 1: The Base', description: 'Choose your carbohydrate source', key: 'bases' },
  { id: 'protein', name: 'Step 2: The Protein', description: 'Select your main energy source', key: 'proteins' },
  { id: 'sides', name: 'Step 3: The Sides', description: 'Add 2-3 nutritious sides', key: 'sides' }
];

export default function MealBuilder() {
  const { addToCart, nutrientGoals } = useCart();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState({
    base: null,
    protein: null,
    sides: []
  });

  const currentSelectionDetails = useMemo(() => {
    const all = [selections.base, selections.protein, ...selections.sides].filter(Boolean);
    return all.reduce((acc, item) => ({
      protein: acc.protein + item.protein,
      calories: acc.calories + item.calories,
      carbs: acc.carbs + item.carbs,
      fats: acc.fats + item.fats,
      price: acc.price + item.price
    }), { protein: 0, calories: 0, carbs: 0, fats: 0, price: 0 });
  }, [selections]);

  const liveProteinProgress = Math.min((currentSelectionDetails.protein / (nutrientGoals.targetProtein || 1)) * 100, 100);

  const toggleSide = (side) => {
    setSelections(prev => {
      const isSelected = prev.sides.find(s => s.id === side.id);
      if (isSelected) {
        return { ...prev, sides: prev.sides.filter(s => s.id !== side.id) };
      }
      if (prev.sides.length >= 3) return prev;
      return { ...prev, sides: [...prev.sides, side] };
    });
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, STEPS.length - 1));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0));

  const resetBuilder = () => {
    setSelections({ base: null, protein: null, sides: [] });
    setCurrentStep(0);
  };

  const handleAddToBucket = () => {
    if (!selections.base || !selections.protein || selections.sides.length === 0) return;

    const customMeal = {
      isCustom: true,
      name: `Custom DIY Meal`,
      items: [selections.base, selections.protein, ...selections.sides].filter(Boolean),
      ...currentSelectionDetails,
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=400&auto=format&fit=crop"
    };
    addToCart(customMeal);
    navigate('/bucket');
  };

  return (
    <PageLayout className="bg-gray-50/50 py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          
          {/* Main Builder Logic */}
          <div className="flex-1 w-full">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
               <div>
                 <h1 className="text-4xl md:text-5xl font-black text-charcoal-900 leading-tight">Build Your Own <span className="text-emerald-500 font-light">/ DIY</span></h1>
                 <p className="text-gray-400 mt-2">Design a meal that perfectly matches your macro requirements.</p>
               </div>
               <button 
                 onClick={resetBuilder}
                 className="text-[10px] font-black text-gray-400 hover:text-emerald-500 uppercase tracking-widest flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-gray-100 shadow-sm transition-all h-fit"
               >
                 <Lucide.Trash2 size={12} /> Reset Selections
               </button>
            </div>

            {/* Stepper Header */}
            <div className="flex justify-between items-center mb-10 px-2 overflow-x-auto gap-4 pb-4">
               {STEPS.map((step, i) => (
                 <div key={step.id} className="flex items-center gap-3 shrink-0">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black ${
                      i <= currentStep ? 'bg-emerald-500 text-white' : 'bg-gray-200 text-gray-400'
                    }`}>
                      {i < currentStep ? <Lucide.Check size={18} /> : i + 1}
                    </div>
                    <div className="hidden sm:block">
                      <p className={`text-[10px] font-black uppercase tracking-widest leading-none ${i === currentStep ? 'text-charcoal-900' : 'text-gray-300'}`}>{STEPS[i].id}</p>
                    </div>
                    {i < STEPS.length - 1 && <div className="w-10 h-px bg-gray-200 ml-2" />}
                 </div>
               ))}
            </div>

            {/* Step Content */}
            <div className="min-h-[400px]">
               <div className="flex justify-between items-end mb-4">
                 <div>
                   <h2 className="text-2xl font-black text-charcoal-900 leading-none">{STEPS[currentStep].name}</h2>
                   <p className="text-gray-400 text-sm mt-2">{STEPS[currentStep].description}</p>
                 </div>
                  {STEPS[currentStep].id === 'sides' && (
                    <div className="text-[11px] font-black text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100 flex items-center gap-2">
                      <Lucide.Plus size={12} /> {3 - selections.sides.length} Remaining
                    </div>
                  )}
               </div>

               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                  {(ingredients[STEPS[currentStep]?.key] || []).map(item => {
                    const isSelected = STEPS[currentStep].id === 'sides' 
                      ? selections.sides.find(s => s.id === item.id)
                      : selections[STEPS[currentStep].id]?.id === item.id;

                    return (
                      <motion.div 
                        key={item.id}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          if (STEPS[currentStep].id === 'sides') toggleSide(item);
                          else setSelections({...selections, [STEPS[currentStep].id]: item});
                        }}
                        className={`p-4 rounded-3xl border-2 cursor-pointer transition-all flex items-center gap-4 ${
                          isSelected ? 'border-emerald-500 bg-emerald-50' : 'border-white bg-white hover:border-emerald-200'
                        }`}
                      >
                        <img src={item.image} className="w-16 h-16 rounded-2xl object-cover shadow-sm" alt={item.name} />
                        <div className="flex-1">
                           <h4 className="font-bold text-charcoal-800">{item.name}</h4>
                           <div className="flex gap-3 mt-1">
                             <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">{item.protein}g P</span>
                             <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{item.calories} Cal</span>
                           </div>
                        </div>
                        <div className="text-sm font-black text-charcoal-900">LKR {item.price}</div>
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${isSelected ? 'bg-emerald-500 text-white' : 'border-2 border-gray-100 text-transparent'}`}>
                          <Lucide.Check size={14} />
                        </div>
                      </motion.div>
                    );
                  })}
               </div>
            </div>

            {/* Stepper Actions */}
            <div className="mt-12 flex justify-between items-center py-8 border-t border-gray-100">
               <button 
                 disabled={currentStep === 0}
                 onClick={prevStep}
                 className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-gray-400 hover:text-charcoal-900 disabled:opacity-0 transition-all"
               >
                 <Lucide.ArrowLeft size={18} /> Previous
               </button>

               {currentStep < STEPS.length - 1 ? (
                 <button 
                   onClick={nextStep}
                   disabled={!selections[STEPS[currentStep].id]}
                   className="bg-charcoal-900 text-white px-8 py-4 rounded-2xl font-black flex items-center gap-2 hover:bg-black transition-all shadow-xl shadow-gray-200 disabled:opacity-30"
                 >
                   Next Step <Lucide.ArrowRight size={20} />
                 </button>
               ) : (
                 <button 
                   onClick={handleAddToBucket}
                   disabled={selections.sides.length === 0}
                   className="bg-emerald-500 text-white px-8 py-4 rounded-2xl font-black flex items-center gap-2 h-14 hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-500/20 disabled:opacity-30"
                 >
                   Add Custom Meal to Bucket <Lucide.Plus size={20} />
                 </button>
               )}
            </div>
          </div>

          {/* Live Summary Sidebar */}
          <div className="w-full lg:w-96 sticky top-32">
             <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl shadow-gray-200/50 border border-emerald-100 overflow-hidden relative">
                <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none"><Lucide.Scale size={120} /></div>
                
                <h3 className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em] mb-8">Live Construction</h3>
                
                <div className="space-y-6 mb-10 relative z-10">
                   {/* Selection Summary */}
                   <div className="space-y-3">
                      <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Current Plate</h4>
                      <div className="space-y-2">
                        {selections.base && (
                          <div className="flex justify-between items-center bg-gray-50 p-3 rounded-2xl border border-gray-100">
                            <span className="text-xs font-bold text-charcoal-800">{selections.base.name}</span>
                            <span className="text-[10px] font-black text-emerald-500">BASE</span>
                          </div>
                        )}
                        {selections.protein && (
                          <div className="flex justify-between items-center bg-gray-50 p-3 rounded-2xl border border-gray-100">
                            <span className="text-xs font-bold text-charcoal-800">{selections.protein.name}</span>
                            <span className="text-[10px] font-black text-emerald-500">PROTEIN</span>
                          </div>
                        )}
                        {selections.sides.map(side => (
                          <div key={side.id} className="flex justify-between items-center bg-gray-50 p-3 rounded-2xl border border-gray-100">
                            <span className="text-xs font-bold text-charcoal-800">{side.name}</span>
                            <button onClick={() => toggleSide(side)} className="text-gray-300 hover:text-red-500 transition-colors"><Lucide.Trash2 size={12} /></button>
                          </div>
                        ))}
                        {(!selections.base && !selections.protein && selections.sides.length === 0) && (
                          <div className="text-center py-6 border-2 border-dashed border-gray-50 rounded-2xl">
                             <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Start selecting items</p>
                          </div>
                        )}
                      </div>
                   </div>

                   {/* Macro Progress */}
                   <div className="pt-4 border-t border-gray-50">
                     <div className="flex justify-between items-end mb-3">
                        <span className="text-[10px] font-black text-charcoal-900 uppercase">Protein Targets</span>
                        <span className="text-xs font-black text-emerald-500 uppercase tracking-tighter">
                          {currentSelectionDetails.protein}g / {nutrientGoals.targetProtein}g
                        </span>
                     </div>
                     <div className="w-full h-3 bg-gray-50 rounded-full overflow-hidden border border-gray-100">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${liveProteinProgress}%` }}
                          className={`h-full transition-all duration-500 ${liveProteinProgress >= 100 ? 'bg-emerald-500' : 'bg-emerald-400'}`}
                        />
                     </div>
                   </div>

                   {/* Other Macros */}
                   <div className="grid grid-cols-3 gap-2">
                      <div className="bg-gray-50 p-3 rounded-2xl border border-gray-100 text-center">
                        <div className="text-[8px] font-black text-gray-400 uppercase leading-none mb-1">Calories</div>
                        <div className="text-sm font-black text-charcoal-800 tracking-tighter">{currentSelectionDetails.calories}</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-2xl border border-gray-100 text-center">
                        <div className="text-[8px] font-black text-gray-400 uppercase leading-none mb-1">Carbs</div>
                        <div className="text-sm font-black text-charcoal-800 tracking-tighter">{currentSelectionDetails.carbs}g</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-2xl border border-gray-100 text-center">
                        <div className="text-[8px] font-black text-gray-400 uppercase leading-none mb-1">Fats</div>
                        <div className="text-sm font-black text-charcoal-800 tracking-tighter">{currentSelectionDetails.fats}g</div>
                      </div>
                   </div>
                </div>

                <div className="space-y-4 pt-8 border-t border-gray-50">
                   <div className="flex justify-between text-gray-400 text-[10px] font-black uppercase tracking-widest">
                      <span>Selection Cost</span>
                      <span>LKR {currentSelectionDetails.price}</span>
                   </div>
                   <div className="flex justify-between items-center text-3xl font-black text-charcoal-900 tracking-tighter">
                      <span>Meal Total</span>
                      <span>LKR {currentSelectionDetails.price}</span>
                   </div>
                </div>

                {/* Motivational Tip */}
                <div className="mt-10 p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-start gap-4">
                   <div className="bg-white p-2 rounded-xl text-emerald-500 shadow-sm"><Lucide.Zap size={16} /></div>
                   <p className="text-[10px] text-emerald-800 font-bold leading-relaxed italic">
                     "Each component is weighed precisely in our Homagama kitchen to ensure your macros are 100% accurate."
                   </p>
                </div>
             </div>
          </div>

        </div>
      </div>
    </PageLayout>
  );
}
