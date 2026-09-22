import React, { useState, useEffect } from 'react';
import { Zap, Clock, ShoppingBag, Eye, Star, Flame, Check } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { PRODUCTS } from '../../data/mockProducts';

export const FlashSaleSection = () => {
  const { addToCart, openQuickView } = useStore();
  const dealProduct = PRODUCTS.find((p) => p.dealOfTheDay) || PRODUCTS[0];

  // Live ticking countdown timer
  const [timeLeft, setTimeLeft] = useState({
    hours: 6,
    minutes: 42,
    seconds: 18,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatNumber = (n) => String(n).padStart(2, '0');

  return (
    <section id="flash-deals" className="py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 border border-indigo-900/40 p-8 sm:p-12 lg:p-16 shadow-2xl text-white">
          {/* Animated Background Mesh */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Col: Deal Information */}
            <div className="lg:col-span-7 space-y-6">
              {/* Header Badges */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-rose-500 text-white shadow-lg shadow-rose-500/30 animate-pulse">
                  <Flame className="w-3.5 h-3.5 fill-white" />
                  FLASH DROP OF THE DAY
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 backdrop-blur-md text-amber-300 border border-white/10">
                  Save $81 instantly
                </span>
              </div>

              {/* Title */}
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-display">
                {dealProduct.name}
              </h2>

              <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed">
                {dealProduct.description}
              </p>

              {/* Live Countdown Timer Block */}
              <div className="space-y-2 pt-2">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-indigo-400" />
                  Drop Offer Ends In:
                </p>
                <div className="flex items-center gap-3 font-mono">
                  {/* Hours */}
                  <div className="flex flex-col items-center bg-slate-900/90 border border-slate-700/80 rounded-2xl px-4 py-3 min-w-[72px] shadow-md">
                    <span className="text-2xl sm:text-3xl font-extrabold text-white">
                      {formatNumber(timeLeft.hours)}
                    </span>
                    <span className="text-[10px] uppercase font-sans font-semibold text-slate-400">
                      Hours
                    </span>
                  </div>
                  <span className="text-2xl font-bold text-slate-600">:</span>
                  {/* Minutes */}
                  <div className="flex flex-col items-center bg-slate-900/90 border border-slate-700/80 rounded-2xl px-4 py-3 min-w-[72px] shadow-md">
                    <span className="text-2xl sm:text-3xl font-extrabold text-white">
                      {formatNumber(timeLeft.minutes)}
                    </span>
                    <span className="text-[10px] uppercase font-sans font-semibold text-slate-400">
                      Mins
                    </span>
                  </div>
                  <span className="text-2xl font-bold text-slate-600">:</span>
                  {/* Seconds */}
                  <div className="flex flex-col items-center bg-slate-900/90 border border-slate-700/80 rounded-2xl px-4 py-3 min-w-[72px] shadow-md text-rose-400">
                    <span className="text-2xl sm:text-3xl font-extrabold">
                      {formatNumber(timeLeft.seconds)}
                    </span>
                    <span className="text-[10px] uppercase font-sans font-semibold text-slate-400">
                      Secs
                    </span>
                  </div>
                </div>
              </div>

              {/* Limited Stock Urgency Bar */}
              <div className="space-y-1.5 max-w-md pt-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-amber-400 flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 fill-amber-400" /> Only {dealProduct.stockLeft} units remaining at this price!
                  </span>
                  <span className="text-slate-400">85% Claimed</span>
                </div>
                <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700/60">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-rose-500 rounded-full"
                    style={{ width: '85%' }}
                  ></div>
                </div>
              </div>

              {/* Pricing & CTA */}
              <div className="flex flex-wrap items-center gap-4 pt-3">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl sm:text-4xl font-extrabold font-mono text-white">
                    ${dealProduct.price}
                  </span>
                  <span className="text-lg line-through font-mono text-slate-500">
                    ${dealProduct.originalPrice}
                  </span>
                </div>

                <button
                  onClick={() => addToCart(dealProduct, { quantity: 1 })}
                  className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white font-extrabold text-sm flex items-center gap-2 shadow-lg shadow-rose-500/25 hover:scale-105 active:scale-95 transition-all duration-200"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Claim Flash Deal</span>
                </button>

                <button
                  onClick={() => openQuickView(dealProduct)}
                  className="px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm flex items-center gap-2 border border-white/20 transition-all duration-200"
                >
                  <Eye className="w-4 h-4" />
                  <span>View Details</span>
                </button>
              </div>
            </div>

            {/* Right Col: High-Res Showcase Image */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden bg-slate-900 border border-slate-700 shadow-2xl group">
                <img
                  src={dealProduct.images[0]}
                  alt={dealProduct.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                
                {/* Product feature badge on image */}
                <div className="absolute bottom-4 inset-x-4 p-4 rounded-2xl bg-slate-950/85 backdrop-blur-md border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Ships today with express courier</span>
                  </div>
                  <span className="font-bold text-white">Free Delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

