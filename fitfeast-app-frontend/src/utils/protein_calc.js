/**
 * Calculate Daily Caloric Needs (TDEE) and Protein Requirements.
 * Uses Mifflin-St Jeor Equation for BMR.
 * 
 * @param {string} gender - 'male' | 'female'
 * @param {number} weight - Weight in kg
 * @param {number} height - Height in cm
 * @param {number} age - Age in years
 * @param {string} activityLevel - 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active'
 * @param {string} goal - 'loss' | 'gain' | 'maintenance'
 */
export const calculateNutrients = ({ gender, weight, height, age, activityLevel, goal }) => {
  // BMR Calculation
  let bmr;
  if (gender === 'male') {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  // Activity Multipliers
  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    very_active: 1.9
  };

  const tdee = bmr * (activityMultipliers[activityLevel] || 1.2);

  // Goal Adjustments
  let targetCalories = tdee;
  if (goal === 'loss') targetCalories -= 500;
  if (goal === 'gain') targetCalories += 500;

  // Protein Requirements (g per kg of bodyweight)
  // Loss/Cutting: 2.2g/kg to preserve muscle
  // Gain/Bulking: 1.8g/kg
  // Maintenance: 1.6g/kg
  let proteinRatio = 1.6;
  if (goal === 'loss') proteinRatio = 2.2;
  if (goal === 'gain') proteinRatio = 1.8;

  const targetProtein = weight * proteinRatio;

  return {
    bmr: Math.round(bmr),
    tdee: Math.round(tdee),
    targetCalories: Math.round(targetCalories),
    targetProtein: Math.round(targetProtein)
  };
};
