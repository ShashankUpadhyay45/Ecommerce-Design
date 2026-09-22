import React from 'react';
import { Home, ShoppingBag, Heart, Search, Grid } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const BottomNav = () => {
  const {
    totalCartCount,
    wishlist,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsSearchOpen,
    setActiveCategory,
  } = useStore();

  const scrollToCatalog = () => {
    const el = document.getElementById('catalog');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 lg:hidden bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-t border-slate-200/80 dark:border-slate-800/80 px-4 py-2 pb-safe">
      <div className="flex items-center justify-around">
        <button
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex flex-col items-center gap-1 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 p-1.5"
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-semibold">Home</span>
        </button>

        <button
          onClick={scrollToCatalog}
          className="flex flex-col items-center gap-1 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 p-1.5"
        >
          <Grid className="w-5 h-5" />
          <span className="text-[10px] font-semibold">Catalog</span>
        </button>

        <button
          onClick={() => setIsSearchOpen(true)}
          className="flex flex-col items-center gap-1 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 p-1.5"
        >
          <Search className="w-5 h-5" />
          <span className="text-[10px] font-semibold">Search</span>
        </button>

        <button
          onClick={() => setIsWishlistOpen(true)}
          className="flex flex-col items-center gap-1 text-slate-600 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 p-1.5 relative"
        >
          <Heart className="w-5 h-5" />
          {wishlist.length > 0 && (
            <span className="absolute top-0 right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
              {wishlist.length}
            </span>
          )}
          <span className="text-[10px] font-semibold">Saved</span>
        </button>

        <button
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center gap-1 text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 p-1.5 relative"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5" />
            {totalCartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 w-4 h-4 rounded-full bg-indigo-600 text-white text-[10px] font-extrabold flex items-center justify-center shadow-sm">
                {totalCartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-semibold">Bag</span>
        </button>
      </div>
    </div>
  );
};

