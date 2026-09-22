import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { PRODUCTS, PROMO_CODES } from '../data/mockProducts';

const StoreContext = createContext();

const FREE_SHIPPING_THRESHOLD = 200;
const STANDARD_SHIPPING_FEE = 15;

export const StoreProvider = ({ children }) => {
  // Cart state persisted in localStorage
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('nova_cart');
      return saved ? JSON.parse(saved) : [
        // Pre-populate with 1 stylish item to make demo immediately interactive!
        {
          cartItemId: 'prod-1-Midnight Onyx-Standard Over-Ear',
          productId: 'prod-1',
          name: 'Apex Pro Spatial Noise-Canceling Headphones',
          price: 299,
          originalPrice: 380,
          image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
          selectedColor: { name: 'Midnight Onyx', hex: '#0f172a' },
          selectedSize: 'Standard Over-Ear',
          quantity: 1,
        }
      ];
    } catch {
      return [];
    }
  });

  // Wishlist state persisted in localStorage
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('nova_wishlist');
      return saved ? JSON.parse(saved) : ['prod-1', 'prod-3'];
    } catch {
      return [];
    }
  });

  // UI Drawers & Modals
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Filters & Sorting state
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [priceRange, setPriceRange] = useState(600);
  const [minRating, setMinRating] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  // Promo Code
  const [appliedPromo, setAppliedPromo] = useState({
    code: 'NOVA20',
    discountPercent: 20,
    description: '20% Off Storewide'
  });
  const [promoError, setPromoError] = useState('');

  // Toast Notifications
  const [toasts, setToasts] = useState([]);

  // Persist cart & wishlist
  useEffect(() => {
    localStorage.setItem('nova_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('nova_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Toast dispatch
  const showToast = (title, message = '', type = 'success', image = null) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 6);
    setToasts(prev => [...prev, { id, title, message, type, image }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3800);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Cart operations
  const addToCart = (product, { quantity = 1, color = null, size = null } = {}) => {
    const selectedColor = color || (product.colors && product.colors[0]) || { name: 'Standard', hex: '#333' };
    const selectedSize = size || (product.sizes && product.sizes[0]) || 'Standard';
    const cartItemId = `${product.id}-${selectedColor.name}-${selectedSize}`;
    const itemImage = selectedColor.image || product.images[0];

    setCart(prev => {
      const existing = prev.find(item => item.cartItemId === cartItemId);
      if (existing) {
        return prev.map(item =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          cartItemId,
          productId: product.id,
          name: product.name,
          price: product.price,
          originalPrice: product.originalPrice,
          image: itemImage,
          selectedColor,
          selectedSize,
          quantity,
        }
      ];
    });

    showToast(
      'Added to Bag',
      `${quantity}x ${product.name} (${selectedColor.name})`,
      'success',
      itemImage
    );
  };

  const updateCartQuantity = (cartItemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.cartItemId === cartItemId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (cartItemId) => {
    const item = cart.find(i => i.cartItemId === cartItemId);
    setCart(prev => prev.filter(i => i.cartItemId !== cartItemId));
    if (item) {
      showToast('Item Removed', `${item.name} was removed from your bag`, 'info');
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist operations
  const toggleWishlist = (productId) => {
    const product = PRODUCTS.find(p => p.id === productId);
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from Wishlist', product?.name || '', 'info');
        return prev.filter(id => id !== productId);
      } else {
        showToast('Saved to Wishlist', product?.name || '', 'success', product?.images[0]);
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId) => wishlist.includes(productId);

  const moveAllWishlistToCart = () => {
    let count = 0;
    wishlist.forEach(id => {
      const product = PRODUCTS.find(p => p.id === id);
      if (product && product.inStock) {
        addToCart(product, { quantity: 1 });
        count++;
      }
    });
    if (count > 0) {
      setIsWishlistOpen(false);
      setIsCartOpen(true);
    }
  };

  // Promo Code Operations
  const applyPromoCode = (code) => {
    const cleanCode = code.trim().toUpperCase();
    if (PROMO_CODES[cleanCode]) {
      setAppliedPromo({
        code: cleanCode,
        ...PROMO_CODES[cleanCode]
      });
      setPromoError('');
      showToast('Promo Code Applied!', `${PROMO_CODES[cleanCode].discountPercent}% discount activated`, 'success');
      return true;
    } else {
      setPromoError('Invalid coupon code. Try NOVA20, SAVE15, or APEX10');
      return false;
    }
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    setPromoError('');
    showToast('Promo code removed', '', 'info');
  };

  // Quick View operations
  const openQuickView = (product) => {
    setQuickViewProduct(product);
  };

  const closeQuickView = () => {
    setQuickViewProduct(null);
  };

  // Financial Calculations
  const subtotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cart]);

  const discountAmount = useMemo(() => {
    if (!appliedPromo || subtotal === 0) return 0;
    return Math.round((subtotal * (appliedPromo.discountPercent / 100)) * 100) / 100;
  }, [subtotal, appliedPromo]);

  const shippingAmount = useMemo(() => {
    if (subtotal === 0) return 0;
    return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_FEE;
  }, [subtotal]);

  const total = useMemo(() => {
    if (subtotal === 0) return 0;
    const final = subtotal - discountAmount + shippingAmount;
    return Math.max(0, Math.round(final * 100) / 100);
  }, [subtotal, discountAmount, shippingAmount]);

  const freeShippingProgress = useMemo(() => {
    return Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));
  }, [subtotal]);

  const amountNeededForFreeShipping = useMemo(() => {
    return Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  }, [subtotal]);

  const totalCartCount = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  }, [cart]);

  // Reset all filters
  const resetFilters = () => {
    setActiveCategory('all');
    setSearchQuery('');
    setSelectedBrand('all');
    setPriceRange(600);
    setMinRating(0);
    setInStockOnly(false);
    setSortBy('featured');
  };

  return (
    <StoreContext.Provider
      value={{
        // Products & Cart
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        totalCartCount,
        // Wishlist
        wishlist,
        toggleWishlist,
        isInWishlist,
        moveAllWishlistToCart,
        // Calculations
        subtotal,
        discountAmount,
        shippingAmount,
        total,
        freeShippingProgress,
        amountNeededForFreeShipping,
        FREE_SHIPPING_THRESHOLD,
        // Promo
        appliedPromo,
        applyPromoCode,
        removePromoCode,
        promoError,
        // Modals & Drawers
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isSearchOpen,
        setIsSearchOpen,
        isMobileNavOpen,
        setIsMobileNavOpen,
        quickViewProduct,
        openQuickView,
        closeQuickView,
        // Filters & Searching
        activeCategory,
        setActiveCategory,
        searchQuery,
        setSearchQuery,
        selectedBrand,
        setSelectedBrand,
        priceRange,
        setPriceRange,
        minRating,
        setMinRating,
        inStockOnly,
        setInStockOnly,
        sortBy,
        setSortBy,
        viewMode,
        setViewMode,
        resetFilters,
        // Toasts
        toasts,
        showToast,
        removeToast,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);

