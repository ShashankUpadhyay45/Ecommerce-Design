import React, { useState, useEffect } from 'react';
import {
  X,
  ShoppingBag,
  Heart,
  Star,
  Check,
  Zap,
  Truck,
  ShieldCheck,
  ChevronRight,
  Plus,
  Minus
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { RatingStars } from '../ui/RatingStars';

export const QuickViewModal = () => {
  const {
    quickViewProduct,
    closeQuickView,
    addToCart,
    toggleWishlist,
    isInWishlist,
  } = useStore();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'specs' | 'reviews'
  const [isAdded, setIsAdded] = useState(false);

  // Sync state when product opens
  useEffect(() => {
    if (quickViewProduct) {
      setActiveImageIndex(0);
      setSelectedColor(quickViewProduct.colors?.[0] || null);
      setSelectedSize(quickViewProduct.sizes?.[0] || null);
      setQuantity(1);
      setActiveTab('overview');
      setIsAdded(false);
    }
  }, [quickViewProduct]);

  // Handle escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape' && quickViewProduct) {
        closeQuickView();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [quickViewProduct, closeQuickView]);

  if (!quickViewProduct) return null;

  const isFavorited = isInWishlist(quickViewProduct.id);
  const images = quickViewProduct.images || [];
  const currentImage = selectedColor?.image || images[activeImageIndex] || images[0];

  const handleAddToCart = () => {
    if (!quickViewProduct.inStock) return;
    addToCart(quickViewProduct, {
      quantity,
      color: selectedColor,
      size: selectedSize
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/75 backdrop-blur-md transition-opacity animate-in fade-in"
        onClick={closeQuickView}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden z-10 animate-in zoom-in-95 duration-200 my-auto">
        {/* Close Button */}
        <button
          onClick={closeQuickView}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-700 text-slate-500 dark:text-slate-300 shadow-md backdrop-blur-md transition-all"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto">
          {/* Left Column: Image Gallery (5 cols) */}
          <div className="md:col-span-6 p-6 sm:p-8 bg-slate-50 dark:bg-slate-950/60 flex flex-col justify-between gap-4 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800">
            {/* Main Stage Image */}
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-inner group">
              <img
                src={currentImage}
                alt={quickViewProduct.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {quickViewProduct.badge && (
                <span
                  className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-extrabold uppercase text-white ${
                    quickViewProduct.badgeColor || 'bg-indigo-600'
                  }`}
                >
                  {quickViewProduct.badge}
                </span>
              )}
            </div>

            {/* Thumbnail Carousel */}
            {images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-1">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setActiveImageIndex(idx);
                      if (selectedColor && selectedColor.image !== img) {
                        // switch view
                      }
                    }}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                      activeImageIndex === idx
                        ? 'border-indigo-600 ring-2 ring-indigo-500/30'
                        : 'border-slate-200 dark:border-slate-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Product Config & Details (7 cols) */}
          <div className="md:col-span-6 p-6 sm:p-8 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              {/* Brand & Rating */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
                  {quickViewProduct.brand}
                </span>
                <RatingStars
                  rating={quickViewProduct.rating}
                  count={quickViewProduct.reviewCount}
                  showScore
                />
              </div>

              {/* Title & Price */}
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white font-display leading-tight">
                {quickViewProduct.name}
              </h2>

              <div className="flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-extrabold font-mono text-slate-900 dark:text-white">
                  ${quickViewProduct.price}
                </span>
                {quickViewProduct.originalPrice && (
                  <span className="text-base line-through text-slate-400 font-mono">
                    ${quickViewProduct.originalPrice}
                  </span>
                )}
                <span className="text-xs font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                  Save ${(quickViewProduct.originalPrice - quickViewProduct.price) || 0}
                </span>
              </div>

              {/* Navigation Tabs */}
              <div className="flex items-center gap-4 border-b border-slate-200 dark:border-slate-800 pt-2 text-xs font-bold">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`pb-2 transition-colors relative ${
                    activeTab === 'overview'
                      ? 'text-indigo-600 dark:text-indigo-400'
                      : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                  }`}
                >
                  Overview
                  {activeTab === 'overview' && (
                    <span className="absolute bottom-0 inset-x-0 h-0.5 bg-indigo-600 dark:bg-indigo-400"></span>
                  )}
                </button>

                <button
                  onClick={() => setActiveTab('specs')}
                  className={`pb-2 transition-colors relative ${
                    activeTab === 'specs'
                      ? 'text-indigo-600 dark:text-indigo-400'
                      : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                  }`}
                >
                  Technical Specs
                  {activeTab === 'specs' && (
                    <span className="absolute bottom-0 inset-x-0 h-0.5 bg-indigo-600 dark:bg-indigo-400"></span>
                  )}
                </button>

                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`pb-2 transition-colors relative ${
                    activeTab === 'reviews'
                      ? 'text-indigo-600 dark:text-indigo-400'
                      : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                  }`}
                >
                  Reviews ({quickViewProduct.reviews?.length || 0})
                  {activeTab === 'reviews' && (
                    <span className="absolute bottom-0 inset-x-0 h-0.5 bg-indigo-600 dark:bg-indigo-400"></span>
                  )}
                </button>
              </div>

              {/* Tab Content */}
              <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 min-h-[80px]">
                {activeTab === 'overview' && (
                  <p className="leading-relaxed">{quickViewProduct.description}</p>
                )}

                {activeTab === 'specs' && (
                  <div className="space-y-1.5">
                    {quickViewProduct.specs ? (
                      quickViewProduct.specs.map((spec, i) => (
                        <div key={i} className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                          <span className="text-slate-400">{spec.label}</span>
                          <span className="font-semibold text-slate-900 dark:text-white">{spec.value}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-slate-400">Standard aerospace specifications apply.</p>
                    )}
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="space-y-3">
                    {quickViewProduct.reviews && quickViewProduct.reviews.length > 0 ? (
                      quickViewProduct.reviews.map((rev, idx) => (
                        <div key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-900 dark:text-white">{rev.user}</span>
                            <RatingStars rating={rev.rating} size="w-3 h-3" />
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{rev.comment}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-slate-400">Verified reviews available on detailed product registry.</p>
                    )}
                  </div>
                )}
              </div>

              {/* Color Selection */}
              {quickViewProduct.colors && quickViewProduct.colors.length > 0 && (
                <div className="space-y-2 pt-2">
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-slate-700 dark:text-slate-300">
                      Color Finish: <strong className="text-indigo-600 dark:text-indigo-400">{selectedColor?.name}</strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {quickViewProduct.colors.map((color, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedColor(color)}
                        className={`w-7 h-7 rounded-full border-2 transition-all flex items-center justify-center ${
                          selectedColor?.name === color.name
                            ? 'ring-2 ring-indigo-500 ring-offset-2 dark:ring-offset-slate-900 scale-110 border-white'
                            : 'border-slate-300 dark:border-slate-700 hover:scale-105'
                        }`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      >
                        {selectedColor?.name === color.name && (
                          <Check className="w-3.5 h-3.5 text-white filter drop-shadow" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size / Variant Selection */}
              {quickViewProduct.sizes && quickViewProduct.sizes.length > 0 && (
                <div className="space-y-2 pt-1">
                  <span className="font-bold text-xs text-slate-700 dark:text-slate-300">
                    Configuration / Size
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {quickViewProduct.sizes.map((size, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedSize(size)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                          selectedSize === size
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                            : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Stock Status Indicator */}
              {quickViewProduct.inStock ? (
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-500">
                  <Zap className="w-3.5 h-3.5 fill-emerald-500" />
                  <span>In Stock — Ready for same-day dispatch ({quickViewProduct.stockLeft} left)</span>
                </div>
              ) : (
                <div className="text-xs font-bold text-rose-500">
                  Sold out in current manufacturing drop
                </div>
              )}
            </div>

            {/* Quantity Stepper & Add to Bag */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center gap-3">
              {/* Stepper */}
              <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-2xl p-1 border border-slate-200 dark:border-slate-700">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-8 text-center font-bold text-xs font-mono text-slate-900 dark:text-white">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={!quickViewProduct.inStock}
                className={`flex-1 py-3.5 px-6 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all ${
                  !quickViewProduct.inStock
                    ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                    : isAdded
                    ? 'bg-emerald-500 text-white shadow-emerald-500/20'
                    : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30 hover:scale-[1.02] active:scale-[0.98]'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Bag!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag • ${(quickViewProduct.price * quantity).toFixed(0)}</span>
                  </>
                )}
              </button>

              {/* Wishlist toggle */}
              <button
                onClick={() => toggleWishlist(quickViewProduct.id)}
                className={`p-3.5 rounded-2xl border transition-all ${
                  isFavorited
                    ? 'bg-rose-500 text-white border-rose-500'
                    : 'border-slate-200 dark:border-slate-700 text-slate-500 hover:text-rose-500 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
                aria-label="Save to Wishlist"
              >
                <Heart className={`w-5 h-5 ${isFavorited ? 'fill-white' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

