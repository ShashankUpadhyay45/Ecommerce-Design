import React from 'react';
import {
  Search,
  Filter,
  RotateCcw,
  Sparkles,
  Check,
  Star,
  DollarSign
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { CATEGORIES, BRANDS } from '../../data/mockProducts';

export const ProductFilterSidebar = ({ className = '' }) => {
  const {
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    selectedBrand,
    setSelectedBrand,
    priceRange,
    setPriceRange,
    minRating,
    setMinRating,
    inStockOnly,
    setInStockOnly,
    resetFilters,
  } = useStore();

  return (
    <aside className={`space-y-6 ${className}`}>
      {/* Header & Reset */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <h3 className="font-extrabold text-sm tracking-tight text-slate-900 dark:text-white uppercase font-display">
            Filters
          </h3>
        </div>
        <button
          onClick={resetFilters}
          className="text-xs font-semibold text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* Live Search Filter */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
          Keyword Search
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search headphones, shoes..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 text-xs border border-transparent focus:border-indigo-500 focus:outline-none transition-all"
          />
        </div>
      </div>

      {/* Category Filter */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
          Categories
        </label>
        <div className="space-y-1">
          {CATEGORIES.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-sm font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span>{cat.name}</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full ${
                    isSelected
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Brand Filter */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
          Brands
        </label>
        <div className="space-y-1">
          <button
            onClick={() => setSelectedBrand('all')}
            className={`w-full text-left px-3 py-1.5 rounded-xl text-xs transition-all ${
              selectedBrand === 'all'
                ? 'bg-slate-200 dark:bg-slate-800 font-bold text-indigo-600 dark:text-indigo-400'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
            }`}
          >
            All Brands
          </button>
          {BRANDS.map((brand) => {
            const isSelected = selectedBrand === brand;
            return (
              <button
                key={brand}
                onClick={() => setSelectedBrand(isSelected ? 'all' : brand)}
                className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs transition-all ${
                  isSelected
                    ? 'bg-slate-200 dark:bg-slate-800 font-bold text-indigo-600 dark:text-indigo-400'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                <span>{brand}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-indigo-500" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Range Slider */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
          <span>Max Price</span>
          <span className="font-mono text-indigo-600 dark:text-indigo-400 font-extrabold text-sm">
            ${priceRange}
          </span>
        </div>
        <input
          type="range"
          min="100"
          max="600"
          step="25"
          value={priceRange}
          onChange={(e) => setPriceRange(Number(e.target.value))}
          className="w-full accent-indigo-600 h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-[11px] font-mono text-slate-400">
          <span>$100</span>
          <span>$350</span>
          <span>$600</span>
        </div>
      </div>

      {/* Minimum Rating */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
          Minimum Rating
        </label>
        <div className="space-y-1">
          {[
            { label: 'Any Rating', value: 0 },
            { label: '4.8 ★ & Above', value: 4.8 },
            { label: '4.5 ★ & Above', value: 4.5 },
          ].map((item) => (
            <button
              key={item.value}
              onClick={() => setMinRating(item.value)}
              className={`w-full text-left px-3 py-1.5 rounded-xl text-xs transition-all flex items-center justify-between ${
                minRating === item.value
                  ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold border border-amber-500/30'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <span>{item.label}</span>
              {minRating === item.value && <Check className="w-3.5 h-3.5 text-amber-500" />}
            </button>
          ))}
        </div>
      </div>

      {/* In Stock Only Switch */}
      <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
        <label className="flex items-center justify-between cursor-pointer py-1">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
            In Stock Only
          </span>
          <button
            type="button"
            onClick={() => setInStockOnly(!inStockOnly)}
            className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-200 ${
              inStockOnly ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-700'
            }`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
                inStockOnly ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </label>
      </div>
    </aside>
  );
};

