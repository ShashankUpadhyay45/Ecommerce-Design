import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  CreditCard,
  Truck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Lock,
  Sparkles,
  Zap,
  Package,
  Copy
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useStore } from '../../context/StoreContext';

export const CheckoutModal = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    subtotal,
    discountAmount,
    shippingAmount,
    total,
    appliedPromo,
    clearCart,
    showToast
  } = useStore();

  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Confirmation
  const [orderNumber, setOrderNumber] = useState('');

  // Shipping form state
  const [shippingData, setShippingData] = useState({
    firstName: 'Alex',
    lastName: 'Morgan',
    email: 'alex.morgan@apex.design',
    address: '742 Evergreen Terrace, Suite 400',
    city: 'San Francisco',
    state: 'CA',
    zip: '94107',
    country: 'United States'
  });

  // Payment form state
  const [paymentData, setPaymentData] = useState({
    cardNumber: '4242 •••• •••• 9021',
    cardHolder: 'ALEX MORGAN',
    expiry: '08/29',
    cvv: '884'
  });

  if (!isCheckoutOpen) return null;

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    // Generate order ID
    const newOrder = 'NV-' + Math.floor(100000 + Math.random() * 900000);
    setOrderNumber(newOrder);
    setStep(3);

    // Fire celebration confetti
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch {
      // safe fallback
    }

    clearCart();
    showToast('Order Confirmed!', `Your order ${newOrder} is being processed.`, 'success');
  };

  const handleFinish = () => {
    setIsCheckoutOpen(false);
    setStep(1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity animate-in fade-in"
        onClick={() => {
          if (step !== 3) setIsCheckoutOpen(false);
        }}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden z-10 animate-in zoom-in-95 duration-200 my-auto">
        {/* Header with Steps */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold shadow-md shadow-indigo-600/20">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white font-display">
                Secure Express Checkout
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Step {step} of 3 • {step === 1 ? 'Shipping Destination' : step === 2 ? 'Payment Method' : 'Order Placed'}
              </p>
            </div>
          </div>

          {step !== 3 && (
            <button
              onClick={() => setIsCheckoutOpen(false)}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Step Progress Bar */}
        <div className="w-full h-1 bg-slate-100 dark:bg-slate-800">
          <div
            className="h-full bg-indigo-600 transition-all duration-300"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
          {/* STEP 1: SHIPPING INFORMATION */}
          {step === 1 && (
            <form onSubmit={handleShippingSubmit} className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-2">
                <Truck className="w-4 h-4" />
                <span>1. Shipping & Contact Details</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 block">
                    First Name
                  </label>
                  <input
                    type="text"
                    required
                    value={shippingData.firstName}
                    onChange={(e) => setShippingData({ ...shippingData, firstName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 block">
                    Last Name
                  </label>
                  <input
                    type="text"
                    required
                    value={shippingData.lastName}
                    onChange={(e) => setShippingData({ ...shippingData, lastName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 block">
                  Email for Tracking & Updates
                </label>
                <input
                  type="email"
                  required
                  value={shippingData.email}
                  onChange={(e) => setShippingData({ ...shippingData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 block">
                  Street Address
                </label>
                <input
                  type="text"
                  required
                  value={shippingData.address}
                  onChange={(e) => setShippingData({ ...shippingData, address: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 block">
                    City
                  </label>
                  <input
                    type="text"
                    required
                    value={shippingData.city}
                    onChange={(e) => setShippingData({ ...shippingData, city: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 block">
                    State
                  </label>
                  <input
                    type="text"
                    required
                    value={shippingData.state}
                    onChange={(e) => setShippingData({ ...shippingData, state: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 block">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    required
                    value={shippingData.zip}
                    onChange={(e) => setShippingData({ ...shippingData, zip: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Order total footer */}
              <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-400">Total Due</p>
                  <p className="text-lg font-extrabold font-mono text-slate-900 dark:text-white">
                    ${total.toFixed(2)}
                  </p>
                </div>
                <button
                  type="submit"
                  className="px-6 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: PAYMENT WITH LIVE INTERACTIVE CARD PREVIEW */}
          {step === 2 && (
            <form onSubmit={handlePaymentSubmit} className="space-y-6">
              {/* Interactive Credit Card UI Preview */}
              <div className="relative w-full max-w-sm mx-auto aspect-[1.58/1] rounded-3xl p-6 bg-gradient-to-tr from-slate-950 via-indigo-950 to-slate-900 text-white shadow-2xl border border-indigo-500/30 overflow-hidden flex flex-col justify-between">
                {/* Metallic holographic sheen */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 pointer-events-none"></div>

                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-6 rounded-md bg-amber-400/90 flex items-center justify-center border border-amber-300 shadow-sm">
                      <div className="w-6 h-4 border border-amber-600/50 rounded-sm"></div>
                    </div>
                    <span className="text-[10px] font-mono tracking-widest text-slate-400">
                      NOVA BLACK
                    </span>
                  </div>
                  <span className="text-xs font-bold font-mono text-indigo-400">
                    DEBIT / VIP
                  </span>
                </div>

                <div className="relative z-10 space-y-1">
                  <p className="font-mono text-lg sm:text-xl font-extrabold tracking-widest text-slate-100 drop-shadow">
                    {paymentData.cardNumber || '•••• •••• •••• ••••'}
                  </p>
                </div>

                <div className="flex items-end justify-between relative z-10 text-xs">
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-slate-400 block">
                      Cardholder
                    </span>
                    <span className="font-bold tracking-wide font-mono uppercase text-slate-200">
                      {paymentData.cardHolder || 'CARDHOLDER NAME'}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] uppercase tracking-wider text-slate-400 block">
                      Expires
                    </span>
                    <span className="font-bold font-mono text-slate-200">
                      {paymentData.expiry || 'MM/YY'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Payment Fields */}
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 block">
                    Card Number
                  </label>
                  <div className="relative">
                    <CreditCard className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={paymentData.cardNumber}
                      onChange={(e) => setPaymentData({ ...paymentData, cardNumber: e.target.value })}
                      placeholder="4242 4242 4242 4242"
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-mono text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 block">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      required
                      value={paymentData.cardHolder}
                      onChange={(e) => setPaymentData({ ...paymentData, cardHolder: e.target.value })}
                      placeholder="Full Name"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm uppercase font-mono text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 block">
                        Expires
                      </label>
                      <input
                        type="text"
                        required
                        value={paymentData.expiry}
                        onChange={(e) => setPaymentData({ ...paymentData, expiry: e.target.value })}
                        placeholder="MM/YY"
                        className="w-full px-2.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-mono text-slate-900 dark:text-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 block">
                        CVV
                      </label>
                      <input
                        type="password"
                        required
                        maxLength={4}
                        value={paymentData.cvv}
                        onChange={(e) => setPaymentData({ ...paymentData, cvv: e.target.value })}
                        placeholder="•••"
                        className="w-full px-2.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-mono text-slate-900 dark:text-white focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center gap-1"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Shipping</span>
                </button>

                <button
                  type="submit"
                  className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-sm flex items-center gap-2 shadow-lg shadow-emerald-600/30 transition-all hover:scale-105"
                >
                  <Lock className="w-4 h-4" />
                  <span>Authorize & Pay ${total.toFixed(2)}</span>
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: ORDER CONFIRMATION CELEBRATION */}
          {step === 3 && (
            <div className="py-6 text-center space-y-6 animate-in zoom-in-95">
              <div className="w-20 h-20 rounded-3xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/10">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                  Payment Successful
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-display">
                  Thank You for Your Order!
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                  We have dispatched your receipt to <strong className="text-slate-900 dark:text-white">{shippingData.email}</strong>. Your items will ship via Priority Air Courier within 12 hours.
                </p>
              </div>

              {/* Order Info Card */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 max-w-sm mx-auto text-left space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Order Reference:</span>
                  <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                    {orderNumber}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Shipping To:</span>
                  <span className="font-medium text-slate-900 dark:text-white">
                    {shippingData.city}, {shippingData.state}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Estimated Delivery:</span>
                  <span className="font-semibold text-emerald-500">
                    2 - 3 Business Days
                  </span>
                </div>
              </div>

              <button
                onClick={handleFinish}
                className="px-8 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 transition-all hover:scale-105"
              >
                Continue Exploring NOVA
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

