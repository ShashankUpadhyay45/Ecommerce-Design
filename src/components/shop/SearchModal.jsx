import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Sparkles, TrendingUp, Tag } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { PRODUCTS } from '../../data/mockProducts';

const POPULAR_SEARCHES = ['Headphones', 'Titanium', 'Carbon', 'Hoodie', 'Speaker', 'Smartwatch'];

export const SearchModal = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    openQuickView,
    setSearchQuery: setGlobalSearch,
  } = useStore();

  const [localQuery, setLocalQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setLocalQuery('');
    }
  }, [isSearchOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const searchResults = localQuery.trim()
    ? PRODUCTS.filter((p) => {
        const q = localQuery.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
        );
      })
    : [];

  const handleSelectProduct = (product) => {
    setIsSearchOpen(false);
    openQuickView(product);
  };

  const handleApplyKeyword = (kw) => {
    setGlobalSearch(kw);
    setIsSearchOpen(false);
    const catalogElement = document.getElementById('catalog');
    if (catalogElement) catalogElement.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-md transition-opacity animate-in fade-in"
        onClick={() => setIsSearchOpen(false)}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={localQuery}
            onChange={(e) => setLocalQuery(e.target.value)}
            placeholder="Search products, materials, tech specs..."
            className="w-full bg-transparent text-slate-900 dark:text-white placeholder-slate-400 text-base focus:outline-none"
          />
          {localQuery && (
            <button
              onClick={() => setLocalQuery('')}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="px-2.5 py-1 text-xs font-mono font-bold bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700"
          >
            ESC
          </button>
        </div>

        {/* Modal Body */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* If there's search query */}
          {localQuery.trim() ? (
            <div>
              <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase tracking-wider mb-3">
                <span>Matching Products ({searchResults.length})</span>
                {searchResults.length > 0 && (
                  <button
                    onClick={() => handleApplyKeyword(localQuery)}
                    className="text-indigo-500 hover:underline flex items-center gap-1"
                  >
                    View in catalog <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>

              {searchResults.length === 0 ? (
                <div className="py-8 text-center text-slate-400 text-sm">
                  No matching products for "{localQuery}". Try searching for "Headphones", "Titanium", or "Sneakers".
                </div>
              ) : (
                <div className="space-y-2">
                  {searchResults.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => handleSelectProduct(product)}
                      className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800/80 cursor-pointer transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-12 h-12 rounded-xl object-cover border border-slate-200 dark:border-slate-700"
                        />
                        <div>
                          <p className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                            {product.brand}
                          </p>
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-500 transition-colors">
                            {product.name}
                          </h4>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-sm font-extrabold font-mono text-slate-900 dark:text-white">
                          ${product.price}
                        </span>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* Popular tags & recommendations */
            <div className="space-y-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mb-3">
                  <TrendingUp className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Popular Trending Searches</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {POPULAR_SEARCHES.map((term) => (
                    <button
                      key={term}
                      onClick={() => {
                        setLocalQuery(term);
                        handleApplyKeyword(term);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-950/40 dark:hover:text-indigo-400 transition-all border border-slate-200/60 dark:border-slate-700/60"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>

              {/* Recommended Quick Picks */}
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mb-3">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Featured Staff Picks</span>
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {PRODUCTS.slice(0, 4).map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleSelectProduct(item)}
                      className="flex items-center gap-3 p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors border border-slate-200/60 dark:border-slate-700/60"
                    >
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-10 h-10 rounded-xl object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <h5 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                          {item.name}
                        </h5>
                        <p className="text-xs font-mono font-extrabold text-indigo-600 dark:text-indigo-400">
                          ${item.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

