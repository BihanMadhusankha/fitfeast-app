import React from 'react';
import { Flame, Sparkles } from 'lucide-react';
import mealsData from '../data/meals.json';
import MealCard from '../components/MealCard';
import PageLayout from '../components/PageLayout';

export default function Trending() {
  const trendingMeals = mealsData.filter(m => m.trending);

  return (
    <PageLayout className="bg-gray-50/50 py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="w-16 h-16 bg-orange-500 rounded-3xl flex items-center justify-center text-white mx-auto mb-6 shadow-xl shadow-orange-500/20 animate-bounce">
            <Flame size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-charcoal-900 leading-tight">Trending This Week</h1>
          <p className="text-gray-500 mt-4 text-lg max-w-xl mx-auto">
            These meals are blowing up! High-conversion, athlete-approved favorites from our community.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {trendingMeals.map((meal) => (
            <MealCard key={meal.id} meal={meal} isTrending />
          ))}
        </div>

        {/* Nutritional Tip */}
        <div className="mt-20 p-10 bg-charcoal-900 rounded-[3rem] text-white flex flex-col md:flex-row items-center gap-8 shadow-2xl">
          <div className="w-20 h-20 bg-emerald-500 rounded-2xl flex items-center justify-center shrink-0">
            <Sparkles size={40} />
          </div>
          <div>
            <h3 className="text-2xl font-black uppercase tracking-tight">Pro Tip: Goal Alignment</h3>
            <p className="text-gray-400 mt-1 leading-relaxed">
              Our trending meals are balanced for high-performance. If you're building muscle, pair the 'Mega Protein Chicken Pack' with extra hydration.
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
