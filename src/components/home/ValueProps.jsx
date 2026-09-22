import React from 'react';
import { Truck, RotateCcw, ShieldCheck, Headphones } from 'lucide-react';

const VALUES = [
  {
    icon: Truck,
    title: 'Free Priority Global Shipping',
    description: 'Complimentary expedited door-to-door delivery on all orders over $200.',
    color: 'text-indigo-500',
    bg: 'bg-indigo-500/10'
  },
  {
    icon: RotateCcw,
    title: '30-Day Risk-Free Return',
    description: 'No questions asked 100% money-back guarantee with free return labels.',
    color: 'text-purple-500',
    bg: 'bg-purple-500/10'
  },
  {
    icon: ShieldCheck,
    title: '2-Year Full Hardware Warranty',
    description: 'Every product is certified and covered against defects and craftsmanship.',
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10'
  },
  {
    icon: Headphones,
    title: '24/7 Expert Concierge',
    description: 'Live chat and audio engineering specialists ready to assist your setup.',
    color: 'text-cyan-500',
    bg: 'bg-cyan-500/10'
  }
];

export const ValueProps = () => {
  return (
    <section className="py-12 border-y border-slate-200/80 dark:border-slate-800/80 bg-slate-100/50 dark:bg-slate-900/40 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {VALUES.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex items-start gap-4 p-4 rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 shadow-sm hover:shadow-md transition-all group"
              >
                <div
                  className={`w-12 h-12 rounded-2xl ${item.bg} ${item.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

