/**
 * WhatsApp Message Generator for FitFeast Lanka.
 */

export const generateWhatsAppMessage = ({
  user,
  cart,
  subPlan,
  deliverySchedule,
  totalPrice,
  deliveryFee,
  deliverySlot
}) => {
  const mealSummary = cart.map(item => {
    if (item.isCustom && item.items) {
      const components = item.items.map(i => i.name).join(' + ');
      return `- Custom Meal (${components}) x${item.quantity}`;
    }
    return `- ${item.name} (x${item.quantity})`;
  }).join('\n');
  const scheduleDates = deliverySchedule.map(date => date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit' })).join(', ');
  
  const planName = {
    trial: 'Trial (1 Day)',
    weekly: 'Weekly (6 Days - Skip Sundays)',
    monthly: 'Monthly (24 Days - Skip Sundays)'
  }[subPlan];

  const message = `
* FitFeast Lanka - Order Summary *
---------------------------------
*Customer Details:*
- Name: ${user.name}
- Phone: ${user.phone}
- Area: ${user.area}
- Address: ${user.address}

*Order Contents:*
${mealSummary}

*Plan:* ${planName}
*Delivery Slot:* ${deliverySlot}
*Delivery Dates:* ${scheduleDates}

*Price Breakdown:*
- Subtotal: LKR ${totalPrice - deliveryFee}
- Delivery Fee: LKR ${deliveryFee}
- *Total: LKR ${totalPrice}*

*Notes:* ${user.notes || 'None'}
---------------------------------
Eat Clean. Train Hard. Delivered Fresh.
  `.trim();

  return encodeURIComponent(message);
};

export const generateCoachSummary = (cart) => {
  const totalProtein = cart.reduce((acc, item) => acc + (item.protein * item.quantity), 0);
  const totalCalories = cart.reduce((acc, item) => acc + (item.calories * item.quantity), 0);

  const summary = `
* FitFeast Nutrition Summary *
---------------------------------
Meals Selected:
${cart.map(item => `- ${item.name}: ${item.protein}g Protein | ${item.calories} Cal`).join('\n')}

*Total Nutrition:*
- Protein: ${totalProtein}g
- Calories: ${totalCalories}kcal
---------------------------------
Generated via FitFeast Lanka
  `.trim();

  return summary;
};
