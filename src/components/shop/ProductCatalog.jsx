import React, { useState, useMemo } from 'react';
import {
  LayoutGrid,
  List,
  SlidersHorizontal,
  ArrowUpDown,
  X,
  PackageSearch,
  Sparkles
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { PRODUCTS, CATEGORIES } from '../../data/mockProducts';
import { ProductCard } from './ProductCard';
import { ProductListView } from './ProductListView';
import { ProductFilterSidebar } from './ProductFilterSidebar';

export const ProductCatalog = () => {
  const {
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    selectedBrand,
    setSelectedBrand,
    priceRange,
    minRating,
    inStockOnly,
    sortBy,
    setSortBy,
    viewMode,
    setViewMode,
    resetFilters,
  } = useStore();

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category
      if (activeCategory !== 'all' && product.category !== activeCategory) {
        return false;
      }
      // Search
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchName = product.name.toLowerCase().includes(query);
        const matchDesc = product.description.toLowerCase().includes(query);
        const matchBrand = product.brand.toLowerCase().includes(query);
        if (!matchName && !matchDesc && !matchBrand) return false;
      }
      // Brand
      if (selectedBrand !== 'all' && product.brand !== selectedBrand) {
        return false;
      }
      // Price
      if (product.price > priceRange) {
        return false;
      }
      // Rating
      if (product.rating < minRating) {
        return false;
      }
      // In Stock
      if (inStockOnly && !product.inStock) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'best-seller') return b.reviewCount - a.reviewCount;
      // Default: featured first
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [activeCategory, searchQuery, selectedBrand, priceRange, minRating, inStockOnly, sortBy]);

  // Active Category Name
  const categoryMeta = CATEGORIES.find((c) => c.id === activeCategory);

  // Check if any non-default filters are active
  const hasActiveFilters =
    activeCategory !== 'all' ||
    searchQuery.trim() !== '' ||
    selectedBrand !== 'all' ||
    priceRange < 600 ||
    minRating > 0 ||
    inStockOnly;

  return (
    <section id="catalog" className="py-16 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Catalog Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-200/80 dark:border-slate-800/80">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full Inventory Catalog</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white font-display">
              {categoryMeta ? categoryMeta.name : 'All Products'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Showing <span className="font-bold text-slate-900 dark:text-white">{filteredProducts.length}</span> precision engineered items
            </p>
          </div>

          {/* Controls: Mobile Filter Button, Sort Dropdown, View Mode Toggle */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden px-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center gap-2 border border-slate-200 dark:border-slate-700"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filter ({filteredProducts.length})</span>
            </button>

            {/* Sort Select */}
            <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-3 py-2 rounded-2xl border border-slate-200 dark:border-slate-700">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-xs font-bold text-slate-800 dark:text-slate-200 focus:outline-none cursor-pointer pr-2"
              >
                <option value="featured" className="bg-white dark:bg-slate-900">Featured First</option>
                <option value="best-seller" className="bg-white dark:bg-slate-900">Most Popular</option>
                <option value="rating" className="bg-white dark:bg-slate-900">Highest Rated</option>
                <option value="price-low" className="bg-white dark:bg-slate-900">Price: Low to High</option>
                <option value="price-high" className="bg-white dark:bg-slate-900">Price: High to Low</option>
              </select>
            </div>

            {/* Grid / List View Toggle */}
            <div className="hidden sm:flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl border border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-xl transition-all ${
                  viewMode === 'grid'
                    ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                    : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                }`}
                title="Grid View"
                aria-label="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-xl transition-all ${
                  viewMode === 'list'
                    ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                    : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                }`}
                title="List View"
                aria-label="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Active Filter Chips */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 pt-4 pb-2">
            <span className="text-xs text-slate-400 font-semibold">Active:</span>

            {activeCategory !== 'all' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 text-xs font-semibold border border-indigo-200 dark:border-indigo-800">
                Category: {categoryMeta?.name}
                <button onClick={() => setActiveCategory('all')}>
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}

            {searchQuery && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold border border-slate-200 dark:border-slate-700">
                Search: "{searchQuery}"
                <button onClick={() => setSearchQuery('')}>
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}

            {selectedBrand !== 'all' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold border border-slate-200 dark:border-slate-700">
                Brand: {selectedBrand}
                <button onClick={() => setSelectedBrand('all')}>
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}

            {priceRange < 600 && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold border border-slate-200 dark:border-slate-700">
                Max Price: ${priceRange}
                <button onClick={() => useStore().setPriceRange(600)}>
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}

            {minRating > 0 && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 text-xs font-semibold border border-amber-200 dark:border-amber-800">
                Rating: {minRating}★+
                <button onClick={() => useStore().setMinRating(0)}>
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}

            {inStockOnly && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 text-xs font-semibold border border-emerald-200 dark:border-emerald-800">
                In Stock Only
                <button onClick={() => useStore().setInStockOnly(false)}>
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}

            <button
              onClick={resetFilters}
              className="text-xs font-bold text-rose-500 hover:text-rose-600 ml-1 underline"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Catalog Main Layout: Sidebar + Grid/List */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
          {/* Desktop Filter Sidebar (3 cols) */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="sticky top-24 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
              <ProductFilterSidebar />
            </div>
          </div>

          {/* Product Items Container (9 cols) */}
          <div className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              /* Empty State */
              <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-500 mx-auto flex items-center justify-center">
                  <PackageSearch className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  No matching products found
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                  Try relaxing your search keywords or adjusting your price and category filters.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md"
                >
                  Reset All Filters
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              /* Grid Layout */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              /* List Layout */
              <div className="space-y-4">
                {filteredProducts.map((product) => (
                  <ProductListView key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Slide-in Modal / Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm animate-in fade-in"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="relative ml-auto w-full max-w-xs bg-white dark:bg-slate-900 h-full shadow-2xl p-6 overflow-y-auto z-10 border-l border-slate-200 dark:border-slate-800 animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 mb-6">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                Filters & Refinements
              </h3>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <ProductFilterSidebar />
            <div className="pt-6 mt-6 border-t border-slate-200 dark:border-slate-800">
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full py-3.5 rounded-2xl bg-indigo-600 text-white font-bold text-sm shadow-md"
              >
                Apply Filters ({filteredProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

