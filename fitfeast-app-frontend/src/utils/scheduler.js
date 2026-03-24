/**
 * Professional Delivery Scheduling Logic for FitFeast Lanka.
 * 8 PM Cut-off, Skip Sundays.
 */

export const getDeliverySchedule = (planType = 'trial', startDate = new Date()) => {
  const schedule = [];
  let currentDate = new Date(startDate);

  // 1. Handle 8 PM Cut-off
  const hours = currentDate.getHours();
  if (hours >= 20) {
    // If it's 8 PM or later, the first possible delivery is day after tomorrow
    currentDate.setDate(currentDate.getDate() + 2);
  } else {
    // If before 8 PM, the first possible delivery is tomorrow
    currentDate.setDate(currentDate.getDate() + 1);
  }

  // 2. Determine number of delivery days based on plan
  let daysToSchedule = 1; // Trial
  if (planType === 'weekly') daysToSchedule = 6;
  if (planType === 'monthly') daysToSchedule = 24;

  // 3. Generate schedule skipping Sundays
  while (schedule.length < daysToSchedule) {
    const dayOfWeek = currentDate.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

    if (dayOfWeek !== 0) {
      schedule.push(new Date(currentDate));
    }
    
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return schedule;
};

export const formatDeliveryDate = (date) => {
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });
};

export const getCutoffStatus = () => {
  const now = new Date();
  const cutoff = new Date();
  cutoff.setHours(20, 0, 0, 0);

  const diff = cutoff - now;
  const isExpired = diff <= 0;

  if (isExpired) {
    return { status: 'expired', hours: 0, minutes: 0 };
  }

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  return { status: 'active', hours, minutes };
};
