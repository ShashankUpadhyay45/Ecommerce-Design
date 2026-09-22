import React from 'react';
import { Sparkles, Headphones, Watch, Footprints, Shirt, ArrowUpRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { CATEGORIES } from '../../data/mockProducts';

const CATEGORY_DATA = [
  {
    id: 'audio',
    name: 'Spatial Audio',
    subtitle: 'Beryllium Drivers & Lossless Hi-Fi',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
    count: '3 Flagship Models',
    accent: 'from-indigo-600/80 to-purple-600/80'
  },
  {
    id: 'smart-tech',
    name: 'Smart Tech & HUD',
    subtitle: 'Titanium Watches & AR Optics',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80',
    count: '3 Innovations',
    accent: 'from-cyan-600/80 to-blue-600/80'
  },
  {
    id: 'sneakers',
    name: 'Carbon Kicks',
    subtitle: 'Nitrogen Supercritical Foam',
    image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&auto=format&fit=crop&q=80',
    count: '3 Drops',
    accent: 'from-rose-600/80 to-orange-600/80'
  },
  {
    id: 'apparel',
    name: 'Apex Apparel',
    subtitle: 'GORE-TECH & Modular Tactical',
    image: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?w=800&auto=format&fit=crop&q=80',
    count: '3 Fits',
    accent: 'from-emerald-600/80 to-teal-600/80'
  }
];

export const CategoryPills = () => {
  const { setActiveCategory } = useStore();

  const handleSelectCategory = (id) => {
    setActiveCategory(id);
    const catalogElement = document.getElementById('catalog');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-widest mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Curated Categories</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white font-display">
              Engineered for the Modern Standard
            </h2>
          </div>
          <button
            onClick={() => handleSelectCategory('all')}
            className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center gap-1 group self-start sm:self-auto"
          >
            <span>View All Gear (12)</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* 4 Col Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORY_DATA.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleSelectCategory(cat.id)}
              className="group relative h-72 rounded-3xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-200 dark:border-slate-800"
            >
              {/* Background Image */}
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />

              {/* Gradient Mask */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
              <div className={`absolute inset-0 bg-gradient-to-t ${cat.accent} opacity-0 group-hover:opacity-30 transition-opacity duration-500`}></div>

              {/* Content Overlay */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between text-white z-10">
                <div className="flex justify-between items-start">
                  <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-white/20 backdrop-blur-md border border-white/20">
                    {cat.count}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-white group-hover:text-slate-950 transition-all">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl font-extrabold font-display leading-snug">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-300 font-medium line-clamp-1">
                    {cat.subtitle}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

