import React from 'react';
import { Star, CheckCircle2, Quote, Sparkles } from 'lucide-react';
import { TESTIMONIALS } from '../../data/mockProducts';
import { RatingStars } from '../ui/RatingStars';

export const Testimonials = () => {
  return (
    <section className="py-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Verified Customer Reviews</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white font-display">
            Loved by 45,000+ Creators Worldwide
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Hear what industry designers, athletes, and audiophiles have to say about NOVA gear.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((review) => (
            <div
              key={review.id}
              className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-900/5 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between relative group"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-indigo-500/10 dark:text-indigo-500/15 group-hover:scale-110 transition-transform" />

              <div className="space-y-4">
                <RatingStars rating={review.rating} />

                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                  "{review.content}"
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-10 h-10 rounded-full object-cover border border-indigo-500/30"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1">
                      {review.name}
                      {review.verified && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      )}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      {review.role}
                    </p>
                  </div>
                </div>

                <span className="text-[10px] font-semibold px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-mono">
                  {review.product}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

