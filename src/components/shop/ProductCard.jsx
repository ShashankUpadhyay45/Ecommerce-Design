import React, { useState } from 'react';
import { ShoppingBag, Heart, Eye, Star, Zap, Check } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { RatingStars } from '../ui/RatingStars';

export const ProductCard = ({ product }) => {
  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
    openQuickView
  } = useStore();

  const [selectedColor, setSelectedColor] = useState(
    product.colors && product.colors.length > 0 ? product.colors[0] : null
  );
  const [selectedSize, setSelectedSize] = useState(
    product.sizes && product.sizes.length > 0 ? product.sizes[0] : null
  );
  const [isHovered, setIsHovered] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const isFavorited = isInWishlist(product.id);

  // Compute active image based on color selection or hover
  const activeImage = selectedColor?.image || (
    isHovered && product.images[1] ? product.images[1] : product.images[0]
  );

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    if (!product.inStock) return;
    addToCart(product, {
      quantity: 1,
      color: selectedColor,
      size: selectedSize
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleCardClick = () => {
    openQuickView(product);
  };

  return (
    <div
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-white dark:bg-slate-900 rounded-3xl p-3.5 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 flex flex-col justify-between cursor-pointer"
    >
      {/* Product Image Container */}
      <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-950 mb-3.5">
        <img
          src={activeImage}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.badge && (
            <span
              className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider text-white shadow-sm ${
                product.badgeColor || 'bg-indigo-600'
              }`}
            >
              {product.badge}
            </span>
          )}
          {!product.inStock && (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-900/90 text-slate-300 backdrop-blur-md">
              Sold Out
            </span>
          )}
          {product.inStock && product.stockLeft <= 5 && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/90 text-white backdrop-blur-md flex items-center gap-1">
              <Zap className="w-2.5 h-2.5 fill-white" /> Only {product.stockLeft} left
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          className={`absolute top-3 right-3 p-2.5 rounded-xl backdrop-blur-md transition-all duration-200 z-10 ${
            isFavorited
              ? 'bg-rose-500 text-white shadow-md shadow-rose-500/30 scale-105'
              : 'bg-white/80 dark:bg-slate-900/80 text-slate-600 dark:text-slate-300 hover:text-rose-500 hover:bg-white dark:hover:bg-slate-800'
          }`}
          aria-label="Save to Wishlist"
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-white' : ''}`} />
        </button>

        {/* Hover Action Overlay */}
        <div className="absolute inset-x-3 bottom-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-200 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              openQuickView(product);
            }}
            className="flex-1 py-2.5 px-3 rounded-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md text-slate-900 dark:text-white text-xs font-bold shadow-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="space-y-2.5 flex-1 flex flex-col justify-between">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider text-[11px]">
              {product.brand}
            </span>
            <RatingStars rating={product.rating} count={product.reviewCount} size="w-3.5 h-3.5" />
          </div>

          <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {product.name}
          </h3>
        </div>

        {/* Color Swatches */}
        {product.colors && product.colors.length > 1 && (
          <div className="flex items-center gap-1.5 pt-1" onClick={(e) => e.stopPropagation()}>
            {product.colors.map((color, index) => {
              const isSelected = selectedColor?.name === color.name;
              return (
                <button
                  key={index}
                  onClick={() => setSelectedColor(color)}
                  className={`w-4 h-4 rounded-full border transition-transform ${
                    isSelected
                      ? 'ring-2 ring-indigo-500 ring-offset-2 dark:ring-offset-slate-900 scale-110 border-transparent'
                      : 'border-slate-300 dark:border-slate-700 hover:scale-110'
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              );
            })}
            <span className="text-[10px] text-slate-400 font-medium ml-1">
              {selectedColor?.name}
            </span>
          </div>
        )}

        {/* Price & Add to Cart Button */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-extrabold font-mono text-slate-900 dark:text-white">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-xs line-through text-slate-400 font-mono">
                ${product.originalPrice}
              </span>
            )}
          </div>

          <button
            onClick={handleQuickAdd}
            disabled={!product.inStock}
            className={`p-2.5 rounded-xl transition-all duration-200 flex items-center justify-center ${
              !product.inStock
                ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                : isAdded
                ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
                : 'bg-slate-900 text-white hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-500 shadow-sm hover:scale-105 active:scale-95'
            }`}
            title={product.inStock ? 'Add to Bag' : 'Out of Stock'}
          >
            {isAdded ? (
              <Check className="w-4 h-4" />
            ) : (
              <ShoppingBag className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

