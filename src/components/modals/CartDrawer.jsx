import React, { useState } from 'react';
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Sparkles,
  Truck,
  Check,
  Tag,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const CartDrawer = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    discountAmount,
    shippingAmount,
    total,
    freeShippingProgress,
    amountNeededForFreeShipping,
    appliedPromo,
    applyPromoCode,
    removePromoCode,
    promoError,
    setIsCheckoutOpen
  } = useStore();

  const [inputCode, setInputCode] = useState('');
  const [showPromoInput, setShowPromoInput] = useState(false);

  if (!isCartOpen) return null;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    const success = applyPromoCode(inputCode);
    if (success) {
      setInputCode('');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity animate-in fade-in"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Slide-over Drawer Panel */}
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 h-full shadow-2xl flex flex-col z-10 border-l border-slate-200 dark:border-slate-800 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white font-display">
                Your Shopping Bag
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {cart.length} unique {cart.length === 1 ? 'item' : 'items'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="px-5 py-3.5 bg-slate-50 dark:bg-slate-950/60 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between text-xs font-bold mb-1.5">
            <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
              <Truck className="w-3.5 h-3.5 text-indigo-500" />
              {freeShippingProgress >= 100 ? (
                <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">
                  🎉 FREE Express Priority Shipping Unlocked!
                </span>
              ) : (
                <span>
                  Add <strong className="text-indigo-600 dark:text-indigo-400 font-mono">${amountNeededForFreeShipping.toFixed(0)}</strong> more for Free Shipping
                </span>
              )}
            </span>
            <span className="text-[11px] font-mono text-slate-400">
              {freeShippingProgress}%
            </span>
          </div>

          <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 rounded-full ${
                freeShippingProgress >= 100
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                  : 'bg-gradient-to-r from-indigo-500 to-purple-500'
              }`}
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-slate-900 dark:text-white text-base">
                  Your bag is currently empty
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
                  Explore our engineered hardware, spatial acoustics, and high-performance kicks.
                </p>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs shadow-md"
              >
                Start Exploring
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.cartItemId}
                className="p-3.5 rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 shadow-sm flex gap-3.5 items-start group"
              >
                {/* Item Thumbnail */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 rounded-xl object-cover border border-slate-200 dark:border-slate-700 shrink-0"
                />

                {/* Info & Adjustments */}
                <div className="flex-1 min-w-0 flex flex-col justify-between h-20">
                  <div className="flex justify-between items-start gap-1">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {item.name}
                    </h4>
                    <button
                      onClick={() => removeFromCart(item.cartItemId)}
                      className="text-slate-400 hover:text-rose-500 p-1 rounded-lg transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                    {item.selectedColor && (
                      <span className="flex items-center gap-1">
                        <span
                          className="w-2.5 h-2.5 rounded-full border border-slate-300"
                          style={{ backgroundColor: item.selectedColor.hex }}
                        />
                        {item.selectedColor.name}
                      </span>
                    )}
                    {item.selectedSize && (
                      <span>• {item.selectedSize}</span>
                    )}
                  </div>

                  {/* Quantity and Price */}
                  <div className="flex items-center justify-between pt-1">
                    {/* Stepper */}
                    <div className="flex items-center bg-slate-100 dark:bg-slate-900 rounded-lg p-0.5 border border-slate-200 dark:border-slate-800">
                      <button
                        onClick={() => updateCartQuantity(item.cartItemId, item.quantity - 1)}
                        className="p-1 rounded text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center text-xs font-bold font-mono text-slate-900 dark:text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.cartItemId, item.quantity + 1)}
                        className="p-1 rounded text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="text-sm font-extrabold font-mono text-slate-900 dark:text-white">
                      ${(item.price * item.quantity).toFixed(0)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Checkout Summary */}
        {cart.length > 0 && (
          <div className="p-5 bg-slate-50 dark:bg-slate-950/80 border-t border-slate-200 dark:border-slate-800 space-y-4">
            {/* Promo Code Box */}
            <div>
              {appliedPromo ? (
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
                  <div className="flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5" />
                    <span>Coupon "{appliedPromo.code}" Applied ({appliedPromo.discountPercent}% Off)</span>
                  </div>
                  <button
                    onClick={removePromoCode}
                    className="text-slate-400 hover:text-rose-500"
                    title="Remove coupon"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <div>
                  {!showPromoInput ? (
                    <button
                      onClick={() => setShowPromoInput(true)}
                      className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                    >
                      <Tag className="w-3.5 h-3.5" />
                      <span>Have a promo code? (Try NOVA20)</span>
                    </button>
                  ) : (
                    <form onSubmit={handleApplyPromo} className="space-y-1">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={inputCode}
                          onChange={(e) => setInputCode(e.target.value)}
                          placeholder="e.g. NOVA20"
                          className="flex-1 px-3 py-2 text-xs font-mono uppercase bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:border-indigo-500"
                        />
                        <button
                          type="submit"
                          className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-500 shadow-sm"
                        >
                          Apply
                        </button>
                      </div>
                      {promoError && (
                        <p className="text-[11px] text-rose-500 font-semibold">{promoError}</p>
                      )}
                    </form>
                  )}
                </div>
              )}
            </div>

            {/* Breakdown Calculations */}
            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-slate-500 dark:text-slate-400">
                <span>Subtotal</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">
                  ${subtotal.toFixed(2)}
                </span>
              </div>

              {appliedPromo && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-bold">
                  <span>Discount ({appliedPromo.discountPercent}%)</span>
                  <span className="font-mono">-${discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between text-slate-500 dark:text-slate-400">
                <span>Shipping</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">
                  {shippingAmount === 0 ? (
                    <span className="text-emerald-500 font-bold">FREE</span>
                  ) : (
                    `$${shippingAmount.toFixed(2)}`
                  )}
                </span>
              </div>

              <div className="flex justify-between items-baseline pt-2 border-t border-slate-200 dark:border-slate-800 text-sm">
                <span className="font-extrabold text-slate-900 dark:text-white">
                  Total (USD)
                </span>
                <span className="text-xl font-extrabold font-mono text-slate-900 dark:text-white">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              onClick={handleProceedToCheckout}
              className="w-full py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 text-center">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>256-Bit SSL Encrypted Checkout</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

