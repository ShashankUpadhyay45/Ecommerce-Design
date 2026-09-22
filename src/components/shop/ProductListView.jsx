import React, { useState } from 'react';
import { ShoppingBag, Heart, Eye, Check, Zap } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { RatingStars } from '../ui/RatingStars';

export const ProductListView = ({ product }) => {
  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
    openQuickView
  } = useStore();

  const [selectedColor, setSelectedColor] = useState(
    product.colors && product.colors.length > 0 ? product.colors[0] : null
  );
  const [isAdded, setIsAdded] = useState(false);
  const isFavorited = isInWishlist(product.id);

  const activeImage = selectedColor?.image || product.images[0];

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    if (!product.inStock) return;
    addToCart(product, {
      quantity: 1,
      color: selectedColor,
      size: product.sizes ? product.sizes[0] : null
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <div
      onClick={() => openQuickView(product)}
      className="group bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 flex flex-col md:flex-row gap-6 items-start md:items-center cursor-pointer"
    >
      {/* Product Image */}
      <div className="relative w-full md:w-56 aspect-square rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-950 shrink-0">
        <img
          src={activeImage}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {product.badge && (
          <span
            className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider text-white shadow-sm ${
              product.badgeColor || 'bg-indigo-600'
            }`}
          >
            {product.badge}
          </span>
        )}
      </div>

      {/* Details Middle */}
      <div className="flex-1 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
            {product.brand}
          </span>
          <RatingStars rating={product.rating} count={product.reviewCount} showScore size="w-3.5 h-3.5" />
        </div>

        <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {product.name}
        </h3>

        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        {/* Specs Pills */}
        {product.specs && (
          <div className="flex flex-wrap gap-2 pt-1">
            {product.specs.slice(0, 2).map((spec, i) => (
              <span
                key={i}
                className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
              >
                <strong className="font-semibold text-slate-900 dark:text-white">{spec.label}:</strong> {spec.value}
              </span>
            ))}
          </div>
        )}

        {/* Color swatches */}
        {product.colors && product.colors.length > 1 && (
          <div className="flex items-center gap-2 pt-1" onClick={(e) => e.stopPropagation()}>
            <span className="text-xs text-slate-400 font-medium">Color:</span>
            <div className="flex items-center gap-1.5">
              {product.colors.map((c, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedColor(c)}
                  className={`w-4 h-4 rounded-full border ${
                    selectedColor?.name === c.name
                      ? 'ring-2 ring-indigo-500 ring-offset-2 dark:ring-offset-slate-900 scale-110'
                      : 'border-slate-300 dark:border-slate-700'
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Pricing and Action Buttons */}
      <div className="w-full md:w-48 shrink-0 flex flex-col justify-between items-start md:items-end gap-4 border-t md:border-t-0 md:border-l border-slate-100 dark:border-slate-800/80 pt-4 md:pt-0 md:pl-6">
        <div className="flex flex-col md:items-end">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold font-mono text-slate-900 dark:text-white">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm line-through text-slate-400 font-mono">
                ${product.originalPrice}
              </span>
            )}
          </div>
          <span className="text-[11px] font-bold text-emerald-500">
            {product.inStock ? 'Free Express Shipping' : 'Out of Stock'}
          </span>
        </div>

        <div className="flex items-center gap-2 w-full">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className={`p-3 rounded-xl border transition-all ${
              isFavorited
                ? 'bg-rose-500 text-white border-rose-500'
                : 'border-slate-200 dark:border-slate-700 text-slate-500 hover:text-rose-500 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Heart className={`w-4 h-4 ${isFavorited ? 'fill-white' : ''}`} />
          </button>

          <button
            onClick={handleQuickAdd}
            disabled={!product.inStock}
            className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm ${
              !product.inStock
                ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                : isAdded
                ? 'bg-emerald-500 text-white'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/20'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-4 h-4" />
                <span>Added!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Bag</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

