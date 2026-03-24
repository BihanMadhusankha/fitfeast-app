import React, { useState } from 'react';
import { ShoppingBasket, Trash2, X, Clock, ArrowRight, Share2, Smartphone, MapPin, AlertCircle, Plus, Minus, Tag, CreditCard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { formatDeliveryDate } from '../utils/scheduler';
import { generateWhatsAppMessage, generateCoachSummary } from '../utils/whatsapp_checkout';
import PageLayout from '../components/PageLayout';

export default function Bucket() {
  const { 
    cart, updateQuantity, removeFromCart, clearCart,
    user, setUser,
    subPlan, setSubPlan,
    deliverySlot, setDeliverySlot,
    discountedSubtotal, deliveryFee, total,
    deliverySchedule,
    isPromoApplied, applyPromo, removePromo, promoCode, gymAddress
  } = useCart();

  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');

  const handlePromoSubmit = (e) => {
    e.preventDefault();
    if (applyPromo(promoInput)) {
      setPromoInput('');
      setPromoError('');
    } else {
      setPromoError('Invalid coach code');
    }
  };

  const handleCheckout = () => {
    if (!user.name || !user.phone || !user.address || !user.area) {
      alert('Please complete your profile details!');
      return;
    }
    const message = generateWhatsAppMessage({
      user, cart, subPlan, deliverySchedule, 
      totalPrice: Math.round(total), deliveryFee, deliverySlot
    });
    window.open(`https://wa.me/94771234567?text=${message}`, '_blank');
  };

  const handlePayment = () => {
    if (!user.name || !user.phone || !user.address || !user.area) {
      alert('Please complete your profile details!');
      return;
    }
    // Mock payment gateway redirect
    console.log('Redirecting to PayHere...');
    navigate('/payment-success');
  };

  const shareWithCoach = () => {
    const summary = generateCoachSummary(cart);
    navigator.clipboard.writeText(summary);
    alert('Nutritional summary copied! Paste it in your WhatsApp chat with your coach.');
  };

  if (cart.length === 0) {
    return (
      <PageLayout className="flex flex-col items-center justify-center py-20 text-center px-4">
        <div className="w-24 h-24 bg-gray-50 rounded-[2rem] flex items-center justify-center text-gray-200 mb-8">
           <ShoppingBasket size={48} />
        </div>
        <h2 className="text-3xl font-black text-charcoal-900 tracking-tight">Your Bucket is Empty</h2>
        <p className="text-gray-400 mt-2 max-w-sm">Fuel your journey by adding some high-protein meals from our menu.</p>
        <motion.button 
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          className="mt-10 bg-emerald-500 text-white px-10 py-4 rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-xl shadow-emerald-500/20"
          onClick={() => navigate('/menu')}
        >
          Browse Menu
        </motion.button>
      </PageLayout>
    );
  }

  return (
    <PageLayout className="py-12 md:py-20 bg-gray-50/30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-12 px-2">
          <h1 className="text-4xl md:text-5xl font-black text-charcoal-900 leading-tight">Checkout <span className="text-emerald-500 font-light">/ Bucket</span></h1>
          <button onClick={clearCart} className="text-xs font-black text-gray-400 hover:text-red-500 uppercase tracking-widest flex items-center gap-2 transition-colors">
            <Trash2 size={14} /> Clear All
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 items-start">
          {/* Left: Cart Items & Details */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl shadow-gray-200/50 border border-gray-100">
               <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-8 border-b border-gray-50 pb-4">Selected Meals</h3>
               <div className="space-y-6">
                 <AnimatePresence>
                   {cart.map(item => (
                     <motion.div 
                       layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, x: -20 }}
                       key={item.id} 
                       className="flex flex-col sm:flex-row sm:items-center gap-6 group relative"
                     >
                       <img src={item.image} className="w-24 h-24 rounded-2xl object-cover shadow-lg group-hover:scale-105 transition-transform" />
                       <div className="flex-1">
                         <div className="flex justify-between items-start">
                           <div>
                             <h4 className="font-extrabold text-lg text-charcoal-900">{item.name}</h4>
                             {item.isCustom && item.items && (
                               <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight mt-1">
                                 {item.items.map(i => i.name).join(' + ')}
                               </p>
                             )}
                             <div className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mt-1">LKR {item.price}</div>
                           </div>
                           <button onClick={() => removeFromCart(item.id)} className="p-2 text-gray-300 hover:text-red-500 transition-colors">
                              <X size={20} />
                           </button>
                         </div>
                         <div className="flex items-center gap-4 mt-4">
                            <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-xl border border-gray-100 shadow-inner">
                              <button onClick={() => updateQuantity(item.id, -1)} className="w-8 h-8 flex items-center justify-center bg-white text-charcoal-900 rounded-lg shadow-sm hover:text-red-500 transition-colors">
                                {item.quantity === 1 ? <Trash2 size={14} /> : <Minus size={14} />}
                              </button>
                              <span className="font-black text-sm w-6 text-center">{item.quantity}</span>
                              <button onClick={() => updateQuantity(item.id, 1)} className="w-8 h-8 flex items-center justify-center bg-white text-charcoal-900 rounded-lg shadow-sm hover:text-emerald-500 transition-colors">
                                <Plus size={14} />
                              </button>
                            </div>
                            <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total: LKR {item.price * item.quantity}</div>
                         </div>
                       </div>
                     </motion.div>
                   ))}
                 </AnimatePresence>
               </div>
            </div>

            {/* Delivery Info Form */}
            <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl shadow-gray-200/50 border border-gray-100 relative overflow-hidden">
               {isPromoApplied && (
                 <div className="absolute top-0 left-0 w-full h-full bg-emerald-500/5 pointer-events-none z-0" />
               )}
               <div className="flex items-center justify-between mb-8 border-b border-gray-50 pb-4">
                 <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Delivery & Profile</h3>
                 {isPromoApplied && (
                   <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest flex items-center gap-2">
                     <Tag size={12} /> Coach Discount Applied! Delivery restricted to Gym.
                   </span>
                 )}
               </div>
               
               <div className="grid md:grid-cols-2 gap-6 relative z-10">
                 <div className="space-y-4">
                   <div className="relative group">
                     <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-emerald-500 transition-colors" size={18} />
                     <select 
                       value={user.area} 
                       disabled={isPromoApplied}
                       onChange={e => setUser({...user, area: e.target.value})}
                       className={`w-full bg-gray-50 border-2 border-transparent focus:border-emerald-500/20 p-4 pl-12 rounded-2xl font-bold text-sm outline-none transition-all appearance-none ${isPromoApplied ? 'opacity-50 cursor-not-allowed' : ''}`}
                     >
                       <option value="">Select Delivery Area</option>
                       {['Homagama', 'Kottawa', 'Godagama', 'Athurugiriya'].map(area => <option key={area} value={area}>{area}</option>)}
                     </select>
                   </div>
                   <input placeholder="Full Name" className="w-full bg-gray-50 p-4 rounded-2xl font-bold text-sm outline-none" value={user.name} onChange={e => setUser({...user, name: e.target.value})} />
                   <input placeholder="WhatsApp Phone" className="w-full bg-gray-50 p-4 rounded-2xl font-bold text-sm outline-none" value={user.phone} onChange={e => setUser({...user, phone: e.target.value})} />
                 </div>
                 <div className="space-y-4">
                   <div className="relative">
                    <textarea 
                      placeholder="Exact Delivery Address" 
                      disabled={isPromoApplied}
                      className={`w-full bg-gray-50 p-4 rounded-2xl font-bold text-sm outline-none h-[116px] resize-none transition-all ${isPromoApplied ? 'border-2 border-emerald-500/30 text-emerald-700 font-black' : ''}`} 
                      value={user.address} 
                      onChange={e => setUser({...user, address: e.target.value})} 
                    />
                    {isPromoApplied && (
                      <div className="absolute right-4 bottom-4 p-2 bg-emerald-500 text-white rounded-lg shadow-lg">
                        <Tag size={12} />
                      </div>
                    )}
                   </div>
                   <input placeholder="Special Instructions / Allergies" className="w-full bg-gray-50 p-4 rounded-2xl font-bold text-sm outline-none" value={user.notes} onChange={e => setUser({...user, notes: e.target.value})} />
                 </div>
               </div>
            </div>
          </div>

          {/* Right: Order Summary & Checkout */}
          <div className="space-y-8 sticky top-32">
             <div className="bg-charcoal-900 rounded-[2.5rem] p-8 text-white shadow-3xl shadow-gray-200/50 overflow-hidden relative">
                <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none rotate-12"><ShoppingBasket size={120} /></div>
                
                <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-8">Order Logistics</h3>
                
                {/* Promo Code Input */}
                <div className="mb-8">
                  <label className="text-[10px] font-black text-emerald-500 uppercase tracking-widest block mb-4">Coach Promo Code</label>
                  {!isPromoApplied ? (
                    <form onSubmit={handlePromoSubmit} className="flex gap-2">
                      <input 
                        placeholder="Enter Code" 
                        value={promoInput}
                        onChange={e => setPromoInput(e.target.value)}
                        className="bg-white/5 border border-white/10 p-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest flex-1 outline-none focus:border-emerald-500"
                      />
                      <button type="submit" className="bg-emerald-500 text-white px-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-emerald-600 transition-all">Apply</button>
                    </form>
                  ) : (
                    <div className="bg-emerald-500/10 border border-emerald-500/30 p-3.5 rounded-2xl flex justify-between items-center">
                      <span className="text-emerald-400 font-black text-[10px] uppercase tracking-widest flex items-center gap-2">
                        <Tag size={12} /> {promoCode} (5% OFF)
                      </span>
                      <button onClick={removePromo} className="text-white/40 hover:text-white transition-colors">
                        <X size={14} />
                      </button>
                    </div>
                  )}
                  {promoError && <p className="text-[9px] font-black text-red-400 uppercase tracking-widest mt-2 ml-1">{promoError}</p>}
                </div>

                {/* Plan Selection */}
                <div className="space-y-4 mb-8">
                   <label className="text-[10px] font-black text-emerald-500 uppercase tracking-widest block">Choose Subscription</label>
                   <div className="grid grid-cols-1 gap-2">
                     {['trial', 'weekly', 'monthly'].map(p => (
                       <button 
                         key={p} onClick={() => setSubPlan(p)}
                         className={`p-3.5 rounded-2xl font-black text-[10px] uppercase tracking-widest border-2 transition-all flex justify-between items-center ${
                           subPlan === p ? 'border-emerald-500 bg-emerald-500/10 text-white' : 'border-white/5 bg-white/5 text-gray-500 hover:text-white hover:border-white/10'
                         }`}
                       >
                         {p}
                         {p !== 'trial' && <span className="bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-lg text-[8px]">{p === 'weekly' ? '-5%' : '-10%'}</span>}
                       </button>
                     ))}
                   </div>
                </div>

                {/* Slot Selection */}
                <div className="space-y-4 mb-8">
                   <label className="text-[10px] font-black text-emerald-500 uppercase tracking-widest block">Delivery Slot</label>
                   <select 
                     value={deliverySlot} onChange={e => setDeliverySlot(e.target.value)}
                     className="w-full bg-white/5 border-2 border-transparent focus:border-emerald-500/30 p-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest outline-none transition-all"
                   >
                     <option value="Breakfast (7-9 AM)">Breakfast (7-9 AM)</option>
                     <option value="Lunch (12-2 PM)">Lunch (12-2 PM)</option>
                     <option value="Dinner (7-9 PM)">Dinner (7-9 PM)</option>
                   </select>
                </div>

                {/* Pricing Breakdown */}
                <div className="space-y-3 pt-6 border-t border-white/10">
                   <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-gray-400">
                     <span>Subtotal</span>
                     <span>LKR {Math.round(discountedSubtotal)}</span>
                   </div>
                   <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-gray-400">
                     <span>Delivery</span>
                     <span className={deliveryFee === 0 ? 'text-emerald-500' : ''}>{deliveryFee === 0 ? 'FREE' : `LKR ${deliveryFee}`}</span>
                   </div>
                   <div className="flex justify-between items-center text-3xl font-black pt-4">
                     <span>Total</span>
                     <span className="text-emerald-400 tracking-tighter">LKR {Math.round(total)}</span>
                   </div>
                </div>

                {/* Urgency Alert */}
                <div className="mt-8 flex items-center gap-3 p-4 bg-emerald-500 text-white rounded-2xl shadow-xl shadow-emerald-500/20">
                   <AlertCircle size={20} className="shrink-0" />
                   <p className="text-[10px] font-black tracking-tight leading-tight uppercase">Confirm quickly for tomorrow's delivery!</p>
                </div>
             </div>

             <div className="space-y-3">
                <div className="grid grid-cols-5 gap-3">
                    <button 
                      onClick={shareWithCoach}
                      className="col-span-1 bg-white border border-gray-100 p-5 rounded-2xl flex items-center justify-center text-gray-400 hover:text-emerald-500 transition-all hover:shadow-xl shadow-gray-200"
                    >
                      <Share2 size={24} />
                    </button>
                    <button 
                      onClick={handleCheckout}
                      className="col-span-4 bg-emerald-500 text-white p-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] flex items-center justify-center gap-3 shadow-2xl shadow-emerald-500/20 hover:bg-emerald-600 transition-all group"
                    >
                      Order via WhatsApp <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                    </button>
                </div>
                
                <button 
                  onClick={handlePayment}
                  className="w-full bg-charcoal-900 text-white p-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] flex items-center justify-center gap-3 shadow-2xl shadow-gray-200/50 hover:bg-charcoal-800 transition-all group"
                >
                  <CreditCard size={20} /> Proceed to Payment
                </button>
             </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
