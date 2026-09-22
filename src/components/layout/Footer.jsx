import React from 'react';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  Headphones,
  Globe,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';


export const Footer = () => {
  const { setActiveCategory } = useStore();

  const handleCategoryClick = (catId) => {
    setActiveCategory(catId);
    const catalogElement = document.getElementById('catalog');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800/80 pt-16 pb-28 lg:pb-16 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-slate-800/80">
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-white font-display">
                NOVA
              </span>
            </div>

            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Pioneering hyper-minimalist design, acoustic engineering, and high-performance lifestyle apparel for the next generation of creators.
            </p>

            <div className="flex items-center gap-3 text-slate-400">
              <a
                href="#"
                className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-indigo-600 hover:text-white flex items-center justify-center transition-all border border-slate-800 hover:border-transparent"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-none stroke-currentColor stroke-2" viewBox="0 0 24 24">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-indigo-600 hover:text-white flex items-center justify-center transition-all border border-slate-800 hover:border-transparent"
                aria-label="Twitter"
              >
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-indigo-600 hover:text-white flex items-center justify-center transition-all border border-slate-800 hover:border-transparent"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4 fill-none stroke-currentColor stroke-2" viewBox="0 0 24 24">
                  <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/>
                  <polygon points="10 15 15 12 10 9 10 15" fill="currentColor"/>
                </svg>
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-indigo-600 hover:text-white flex items-center justify-center transition-all border border-slate-800 hover:border-transparent"
                aria-label="GitHub"
              >
                <svg className="w-4 h-4 fill-none stroke-currentColor stroke-2" viewBox="0 0 24 24">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
                  <path d="M9 18c-4.51 2-5-2-7-2"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Categories */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-200">
              Collections
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => handleCategoryClick('audio')}
                  className="hover:text-white transition-colors"
                >
                  Spatial Audio & Sound
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('smart-tech')}
                  className="hover:text-white transition-colors"
                >
                  Smart Tech & Wearables
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('sneakers')}
                  className="hover:text-white transition-colors"
                >
                  Carbon-Plated Sneakers
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('apparel')}
                  className="hover:text-white transition-colors"
                >
                  Weatherproof Apparel
                </button>
              </li>
              <li>
                <a href="#flash-deals" className="text-rose-400 hover:text-rose-300 transition-colors">
                  Limited Flash Drops
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Care */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-200">
              Assistance
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Track Your Order
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Worldwide Shipping Guide
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  30-Day Hassle-Free Returns
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Authenticity Guarantee
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  2-Year Hardware Warranty
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Corporate & Compliance */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-200">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  About NOVA Studio
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Sustainability Blueprint
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Careers <span className="text-[10px] bg-indigo-500/20 text-indigo-400 px-1.5 py-0.5 rounded font-bold ml-1">WE'RE HIRING</span>
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy & GDPR
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar with payment badges and legal */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-slate-400" />
            <span>United States / USD ($)</span>
          </div>

          <p>© {new Date().getFullYear()} NOVA Labs Inc. All rights reserved. Crafted for excellence.</p>

          <div className="flex items-center gap-2 font-mono text-[11px] text-slate-400">
            <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800">VISA</span>
            <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800">MASTERCARD</span>
            <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800">APPLE PAY</span>
            <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800">G-PAY</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

