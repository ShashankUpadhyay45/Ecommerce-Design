import React, { useState, useEffect } from 'react';
import { Sparkles, Zap, ShieldCheck, ArrowRight, Copy, Check } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

const ANNOUNCEMENTS = [
  {
    icon: Zap,
    text: 'FLASH DROP: Free Worldwide Express Shipping on all orders over $200',
    code: 'FREESHIP'
  },
  {
    icon: Sparkles,
    text: 'MID-SEASON SALE: Use code NOVA20 for 20% off sitewide',
    code: 'NOVA20'
  },
  {
    icon: ShieldCheck,
    text: 'PEACE OF MIND: 30-Day Risk-Free Returns & 2-Year Hardware Warranty',
    code: null
  }
];

export const AnnouncementBar = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const { applyPromoCode } = useStore();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const current = ANNOUNCEMENTS[currentIndex];
  const IconComponent = current.icon;

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    applyPromoCode(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-950 text-slate-100 py-2.5 px-4 text-xs font-medium border-b border-slate-800/80 relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 opacity-70"></div>

      <div className="max-w-7xl mx-auto flex items-center justify-between relative z-10">
        <div className="hidden md:flex items-center gap-2 text-slate-400">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span>Live Support 24/7</span>
        </div>

        <div className="flex-1 flex items-center justify-center gap-2 transition-all duration-500 text-center">
          <IconComponent className="w-4 h-4 text-indigo-400 shrink-0 animate-pulse" />
          <span className="truncate">{current.text}</span>
          
          {current.code && (
            <button
              onClick={() => handleCopyCode(current.code)}
              className="ml-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-indigo-600/30 text-indigo-300 hover:bg-indigo-600/50 border border-indigo-500/30 transition-all text-[11px] font-bold tracking-wider"
              title="Click to copy and apply code"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span className="text-emerald-300">APPLIED</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>{current.code}</span>
                </>
              )}
            </button>
          )}
        </div>

        <div className="hidden md:flex items-center gap-4 text-slate-400">
          <a
            href="#catalog"
            className="flex items-center gap-1 hover:text-white transition-colors group"
          >
            <span>Explore Drops</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </div>
  );
};

