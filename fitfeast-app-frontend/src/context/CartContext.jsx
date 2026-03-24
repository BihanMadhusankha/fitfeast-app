import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { calculateNutrients } from '../utils/protein_calc';
import { getDeliverySchedule, getCutoffStatus } from '../utils/scheduler';
import { generateWhatsAppMessage, generateCoachSummary } from '../utils/whatsapp_checkout';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('fitfeast_user');
    return saved ? JSON.parse(saved) : {
      name: '',
      phone: '',
      area: '',
      address: '',
      notes: '',
      gender: 'male',
      weight: 70,
      height: 170,
      age: 25,
      activityLevel: 'moderate',
      goal: 'maintenance'
    };
  });

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('fitfeast_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [subPlan, setSubPlan] = useState('trial');
  const [deliverySlot, setDeliverySlot] = useState('Lunch (12-2 PM)');

  const [promoCode, setPromoCode] = useState('');
  const [isPromoApplied, setIsPromoApplied] = useState(false);
  const [gymAddress, setGymAddress] = useState('Power World Gym, 123 Main St, Homagama');

  useEffect(() => {
    localStorage.setItem('fitfeast_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('fitfeast_cart', JSON.stringify(cart));
  }, [cart]);

  const nutrientGoals = useMemo(() => calculateNutrients(user), [user]);
  
  const currentNutrients = useMemo(() => {
    return cart.reduce((acc, item) => ({
      protein: acc.protein + (item.protein * item.quantity),
      calories: acc.calories + (item.calories * item.quantity),
      carbs: (acc.carbs || 0) + ((item.carbs || 0) * item.quantity),
      fats: (acc.fats || 0) + ((item.fats || 0) * item.quantity),
    }), { protein: 0, calories: 0, carbs: 0, fats: 0 });
  }, [cart]);

  const proteinProgress = Math.min((currentNutrients.protein / (nutrientGoals.targetProtein || 1)) * 100, 100);

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const planDiscount = subPlan === 'weekly' ? 0.95 : subPlan === 'monthly' ? 0.90 : 1;
  const coachDiscount = isPromoApplied ? 0.95 : 1;
  const discountedSubtotal = subtotal * planDiscount * coachDiscount;
  const deliveryFee = discountedSubtotal >= 1000 || discountedSubtotal === 0 ? 0 : 250;
  const total = discountedSubtotal + deliveryFee;

  const applyPromo = (code) => {
    const validCodes = ['ARUNA05', 'MALITH05', 'FITFEAST05'];
    if (validCodes.includes(code.toUpperCase())) {
      setIsPromoApplied(true);
      setPromoCode(code.toUpperCase());
      setUser(prev => ({ ...prev, address: gymAddress, area: 'Homagama' }));
      return true;
    }
    return false;
  };

  const removePromo = () => {
    setIsPromoApplied(false);
    setPromoCode('');
  };

  const deliverySchedule = useMemo(() => getDeliverySchedule(subPlan), [subPlan]);

  const addToCart = (meal) => {
    setCart(prev => {
      if (meal.isCustom) {
        return [...prev, { ...meal, quantity: 1, id: `custom-${Date.now()}` }];
      }
      const existing = prev.find(item => item.id === meal.id && !item.isCustom);
      if (existing) {
        return prev.map(item => item.id === meal.id && !item.isCustom ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...meal, quantity: 1 }];
    });
  };

  const updateQuantity = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty < 1 ? null : { ...item, quantity: newQty };
      }
      return item;
    }).filter(Boolean));
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{
      user, setUser,
      cart, addToCart, updateQuantity, removeFromCart, clearCart,
      subPlan, setSubPlan,
      deliverySlot, setDeliverySlot,
      promoCode, isPromoApplied, applyPromo, removePromo, gymAddress,
      nutrientGoals, currentNutrients, proteinProgress,
      subtotal, discountedSubtotal, deliveryFee, total,
      deliverySchedule
    }}>
      {children}
    </CartContext.Provider>
  );
};
