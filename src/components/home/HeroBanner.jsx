import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  Sparkles,
  ShoppingBag,
  Eye,
  ChevronLeft,
  ChevronRight,
  Zap,
  ShieldCheck,
  Star
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { PRODUCTS } from '../../data/mockProducts';

const HERO_SLIDES = [
  {
    id: 'slide-1',
    productId: 'prod-1',
    tagline: 'NEXT-GEN ACOUSTICS',
    title: 'Pure Beryllium. Spatial Precision.',
    subtitle: 'Apex Pro spatial noise-canceling headphones with military-grade hybrid ANC and 45-hour ultra endurance battery.',
    price: 299,
    originalPrice: 380,
    badge: 'FLAGSHIP LAUNCH',
    badgeGradient: 'from-amber-500 to-orange-600',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&auto=format&fit=crop&q=80',
    accentColor: 'indigo'
  },
  {
    id: 'slide-2',
    productId: 'prod-3',
    tagline: 'AEROSPACE GRADE-5 TITANIUM',
    title: 'Titanium Architecture. Zero Limits.',
    subtitle: 'Chronos Ultra 4th Gen smartwatch with Sapphire AMOLED display, dual-band GPS and 14-day continuous battery.',
    price: 449,
    originalPrice: 550,
    badge: 'NEW DROP',
    badgeGradient: 'from-indigo-500 to-purple-600',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200&auto=format&fit=crop&q=80',
    accentColor: 'purple'
  },
  {
    id: 'slide-3',
    productId: 'prod-2',
    tagline: 'AERODYNAMIC SUPERCRITICAL FOAM',
    title: 'Defy Gravity with AeroStride Cyberknit.',
    subtitle: 'Propulsive 3D-matrix knit upper with energy return nitrogen midsole built for futuristic high-speed mobility.',
    price: 185,
    originalPrice: 240,
    badge: 'BESTSELLER',
    badgeGradient: 'from-rose-500 to-pink-600',
    image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=1200&auto=format&fit=crop&q=80',
    accentColor: 'rose'
  }
];

export const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const { addToCart, openQuickView, setActiveCategory } = useStore();

  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const slide = HERO_SLIDES[currentSlide];
  const linkedProduct = PRODUCTS.find((p) => p.id === slide.productId) || PRODUCTS[0];

  const handleNext = () => {
    setIsAutoPlay(false);
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const handlePrev = () => {
    setIsAutoPlay(false);
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  return (
    <section className="relative overflow-hidden pt-6 pb-12 lg:py-12">
      {/* Background ambient gradient blurs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/15 dark:bg-indigo-600/20 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-purple-500/15 dark:bg-purple-600/20 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl text-white">
          {/* Slide Background Image with subtle zoom */}
          <div className="absolute inset-0 z-0">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover object-center opacity-35 dark:opacity-30 scale-105 transition-transform duration-1000 ease-out"
            />
            {/* Gradient Overlays for perfect legibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40"></div>
          </div>

          {/* Slide Content Grid */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 sm:p-12 lg:p-16 min-h-[560px]">
            {/* Left Column: Headlines & Call to Actions */}
            <div className="lg:col-span-7 space-y-6">
              {/* Badge & Rating */}
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider text-white bg-gradient-to-r ${slide.badgeGradient} shadow-md`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  {slide.badge}
                </span>

                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold text-slate-200 border border-white/10">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>4.9 / 5.0 Global Rating</span>
                </div>
              </div>

              {/* Tagline */}
              <p className="text-xs sm:text-sm font-bold tracking-[0.2em] text-indigo-400 uppercase font-mono">
                {slide.tagline}
              </p>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.15] text-white">
                {slide.title}
              </h1>

              {/* Description */}
              <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed">
                {slide.subtitle}
              </p>

              {/* Price Tag & Stock Status */}
              <div className="flex items-baseline gap-4 pt-2">
                <span className="text-3xl sm:text-4xl font-extrabold text-white font-mono">
                  ${slide.price}
                </span>
                <span className="text-lg text-slate-400 line-through font-mono">
                  ${slide.originalPrice}
                </span>
                <span className="px-2 py-0.5 rounded text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Save ${slide.originalPrice - slide.price}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <button
                  onClick={() => addToCart(linkedProduct, { quantity: 1 })}
                  className="px-6 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm flex items-center gap-2.5 shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag</span>
                </button>

                <button
                  onClick={() => openQuickView(linkedProduct)}
                  className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-bold text-sm flex items-center gap-2.5 border border-white/20 hover:border-white/40 transition-all duration-200"
                >
                  <Eye className="w-4 h-4" />
                  <span>Quick Specs</span>
                </button>

                <a
                  href="#catalog"
                  onClick={() => setActiveCategory(linkedProduct.category)}
                  className="px-4 py-3.5 text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors group"
                >
                  <span>Explore Collection</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            {/* Right Column: Floating High-Impact Showcase Card */}
            <div className="hidden lg:flex lg:col-span-5 justify-center">
              <div className="relative group/card w-full max-w-sm">
                {/* Glow ring */}
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-indigo-500 to-purple-600 opacity-30 group-hover/card:opacity-70 blur-xl transition-opacity duration-500"></div>

                <div className="relative rounded-2xl overflow-hidden bg-slate-900/90 border border-slate-700/60 p-4 backdrop-blur-xl shadow-2xl">
                  <div className="relative aspect-square rounded-xl overflow-hidden bg-slate-950">
                    <img
                      src={linkedProduct.images[0]}
                      alt={linkedProduct.name}
                      className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-[11px] font-bold text-emerald-400 border border-emerald-500/30">
                      In Stock
                    </div>
                  </div>

                  <div className="pt-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                        {linkedProduct.brand}
                      </span>
                      <span className="text-xs font-mono text-slate-400">
                        {linkedProduct.stockLeft} Units Left
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white truncate">
                      {linkedProduct.name}
                    </h3>
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-lg font-bold font-mono text-white">
                        ${linkedProduct.price}
                      </span>
                      <button
                        onClick={() => openQuickView(linkedProduct)}
                        className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                      >
                        Details <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Carousel Navigation Controls & Dots */}
          <div className="absolute bottom-6 right-6 z-20 flex items-center gap-3">
            {/* Dots */}
            <div className="flex items-center gap-1.5 mr-2">
              {HERO_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setIsAutoPlay(false);
                    setCurrentSlide(idx);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentSlide === idx
                      ? 'w-8 bg-indigo-500'
                      : 'w-2 bg-white/30 hover:bg-white/60'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Prev / Next Arrows */}
            <button
              onClick={handlePrev}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/10 transition-colors"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/10 transition-colors"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

