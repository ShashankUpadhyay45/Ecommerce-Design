import React from 'react';
import {
  X,
  Sparkles,
  Headphones,
  Watch,
  Footprints,
  Shirt,
  Zap,
  Heart,
  ShoppingBag,
  ExternalLink,
  Shield,
  Tag
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { CATEGORIES } from '../../data/mockProducts';

const ICON_MAP = {
  Sparkles: Sparkles,
  Headphones: Headphones,
  Watch: Watch,
  Footprints: Footprints,
  Shirt: Shirt,
};

export const MobileNav = () => {
  const {
    isMobileNavOpen,
    setIsMobileNavOpen,
    activeCategory,
    setActiveCategory,
    wishlist,
    setIsWishlistOpen,
    totalCartCount,
    setIsCartOpen
  } = useStore();

  if (!isMobileNavOpen) return null;

  const handleSelectCategory = (id) => {
    setActiveCategory(id);
    setIsMobileNavOpen(false);
    const catalogElement = document.getElementById('catalog');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity animate-in fade-in"
        onClick={() => setIsMobileNavOpen(false)}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-xs bg-white dark:bg-slate-900 h-full shadow-2xl flex flex-col z-10 border-r border-slate-200 dark:border-slate-800 animate-in slide-in-from-left duration-300">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-pink-500 flex items-center justify-center text-white">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="font-extrabold text-lg tracking-tight text-slate-900 dark:text-white font-display">
              NOVA
            </span>
          </div>
          <button
            onClick={() => setIsMobileNavOpen(false)}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Categories List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3 px-2">
              Browse Categories
            </p>
            <div className="space-y-1">
              {CATEGORIES.map((cat) => {
                const Icon = ICON_MAP[cat.icon] || Sparkles;
                const isActive = activeCategory === cat.id;

                return (
                  <button
                    key={cat.id}
                    onClick={() => handleSelectCategory(cat.id)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4" />
                      <span>{cat.name}</span>
                    </div>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        isActive
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

          {/* Quick Actions */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3 px-2">
              Quick Access
            </p>
            <div className="space-y-1">
              <a
                href="#flash-deals"
                onClick={() => setIsMobileNavOpen(false)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-all"
              >
                <Zap className="w-4 h-4 fill-rose-500" />
                <span>Flash Deals & Drops</span>
              </a>

              <button
                onClick={() => {
                  setIsMobileNavOpen(false);
                  setIsWishlistOpen(true);
                }}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
              >
                <div className="flex items-center gap-3">
                  <Heart className="w-4 h-4 text-rose-500" />
                  <span>Saved Wishlist</span>
                </div>
                {wishlist.length > 0 && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-rose-500 text-white font-bold">
                    {wishlist.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => {
                  setIsMobileNavOpen(false);
                  setIsCartOpen(true);
                }}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
              >
                <div className="flex items-center gap-3">
                  <ShoppingBag className="w-4 h-4 text-indigo-500" />
                  <span>My Bag</span>
                </div>
                {totalCartCount > 0 && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-600 text-white font-bold">
                    {totalCartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Promo Card Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 border border-indigo-500/20">
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Tag className="w-3.5 h-3.5" />
              <span>Special Offer</span>
            </div>
            <p className="text-xs font-semibold text-slate-900 dark:text-white">
              Get 20% off your entire first order with voucher code:
            </p>
            <div className="mt-2.5 px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 font-mono text-xs font-bold text-center border border-indigo-200 dark:border-indigo-800">
              NOVA20
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-emerald-500" />
            <span>256-Bit Encrypted</span>
          </div>
          <span>USD ($) / English</span>
        </div>
      </div>
    </div>
  );
};

