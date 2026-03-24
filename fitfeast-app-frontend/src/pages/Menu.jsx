import React, { useState } from 'react';
import { Search, Filter, Sparkles } from 'lucide-react';
import mealsData from '../data/meals.json';
import MealCard from '../components/MealCard';
import PageLayout from '../components/PageLayout';

export default function Menu() {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const categories = ['All', ...new Set(mealsData.map(m => m.category))];

  const filteredMeals = mealsData.filter(meal => {
    const matchesFilter = filter === 'All' || meal.category === filter;
    const matchesSearch = meal.name.toLowerCase().includes(search.toLowerCase()) || 
                          meal.description.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <PageLayout className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 px-2">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-charcoal-900 leading-tight flex items-center gap-3">
              Elite Fuel <span className="text-emerald-500 font-light translate-y-[-2px]">/ Menu</span>
            </h1>
            <p className="text-gray-400 mt-2 max-w-md">Browse our complete collection of chef-prepared performance meals.</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="relative group flex-1 sm:w-64">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search meals..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-gray-50 border-2 border-transparent focus:border-emerald-500/20 p-3.5 pl-12 rounded-2xl font-bold text-sm outline-none transition-all" 
              />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-12 px-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${
                filter === cat ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'bg-white border border-gray-100 text-gray-400 hover:border-emerald-500 hover:text-emerald-500'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results */}
        {filteredMeals.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredMeals.map((meal) => (
              <MealCard key={meal.id} meal={meal} isTrending={meal.trending} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center opacity-30">
             <Filter size={64} className="mx-auto mb-4" />
             <p className="text-2xl font-black uppercase tracking-tight">No meals found</p>
          </div>
        )}

        {/* Promo */}
        <div className="mt-24 p-8 bg-emerald-50 rounded-[2.5rem] border border-emerald-100 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-xl font-black text-emerald-900 flex items-center gap-2">
              <Sparkles className="text-emerald-500" /> Subscription Savings
            </h3>
            <p className="text-emerald-800/70 text-sm mt-1">Get up to 10% discount when you switch to our Monthly plan.</p>
          </div>
          <button className="bg-emerald-500 text-white px-8 py-3 rounded-xl font-bold hover:scale-105 transition-transform uppercase text-xs tracking-widest">
            View Pricing
          </button>
        </div>
      </div>
    </PageLayout>
  );
}
