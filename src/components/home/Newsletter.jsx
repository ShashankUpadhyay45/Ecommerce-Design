import React, { useState } from 'react';
import { Mail, Sparkles, ArrowRight, CheckCircle2, Gift } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useStore } from '../../context/StoreContext';

export const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { applyPromoCode, showToast } = useStore();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Invalid Email', 'Please enter a valid email address', 'error');
      return;
    }

    // Confetti celebration
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.8 }
      });
    } catch {
      // safe fallback
    }

    setSubscribed(true);
    applyPromoCode('NOVA20');
    showToast('VIP Club Unlocked!', 'Use voucher code NOVA20 for 20% off!', 'success');
  };

  return (
    <section className="py-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-tr from-slate-900 via-indigo-950 to-slate-900 border border-indigo-800/40 p-8 sm:p-14 text-white shadow-2xl">
          {/* Background Glow Mesh */}
          <div className="absolute top-0 right-1/4 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-pink-500/15 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 max-w-2xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/30">
              <Gift className="w-4 h-4 text-indigo-400" />
              <span>Join NOVA Insiders Club</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-display text-white">
              Unlock 20% Off Your First Drop
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Get secret early access to limited hardware drops, exclusive editorial releases, and VIP member-only flash discounts.
            </p>

            {subscribed ? (
              <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 flex flex-col items-center gap-2 animate-in zoom-in-95">
                <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                <h4 className="text-base font-bold text-white">You're on the VIP list!</h4>
                <p className="text-xs text-slate-300">
                  Your discount code <span className="font-mono font-bold text-amber-300 bg-amber-400/20 px-2 py-0.5 rounded border border-amber-400/30">NOVA20</span> has been automatically applied to your cart!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-2">
                <div className="relative flex-1">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    required
                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/10 dark:bg-slate-900/80 border border-white/20 dark:border-slate-700 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all backdrop-blur-md"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 hover:scale-105 active:scale-95 transition-all duration-200 shrink-0"
                >
                  <span>Claim 20%</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

            <div className="flex items-center justify-center gap-6 text-xs text-slate-400 pt-2">
              <span>✓ Instant code activation</span>
              <span>✓ No spam ever</span>
              <span>✓ Unsubscribe anytime</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

