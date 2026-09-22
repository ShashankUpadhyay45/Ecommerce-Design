import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { StoreProvider } from './context/StoreContext';

// Layout Components
import { AnnouncementBar } from './components/layout/AnnouncementBar';
import { Navbar } from './components/layout/Navbar';
import { MobileNav } from './components/layout/MobileNav';
import { BottomNav } from './components/layout/BottomNav';
import { Footer } from './components/layout/Footer';

// Home & Showcase Sections
import { HeroBanner } from './components/home/HeroBanner';
import { CategoryPills } from './components/home/CategoryPills';
import { FlashSaleSection } from './components/home/FlashSaleSection';
import { ValueProps } from './components/home/ValueProps';
import { Testimonials } from './components/home/Testimonials';
import { Newsletter } from './components/home/Newsletter';

// Shop Components
import { ProductCatalog } from './components/shop/ProductCatalog';
import { SearchModal } from './components/shop/SearchModal';

// Modals & Drawers
import { QuickViewModal } from './components/modals/QuickViewModal';
import { CartDrawer } from './components/modals/CartDrawer';
import { WishlistDrawer } from './components/modals/WishlistDrawer';
import { CheckoutModal } from './components/modals/CheckoutModal';
import { ToastContainer } from './components/ui/Toast';

function AppContent() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0b0f19] text-slate-900 dark:text-slate-100 transition-colors duration-300 selection:bg-indigo-500 selection:text-white">
      {/* Top Announcement Promo Bar */}
      <AnnouncementBar />

      {/* Main Glass Header */}
      <Navbar />

      {/* Mobile Navigation Drawer */}
      <MobileNav />

      {/* Main Content Flow */}
      <main className="flex-1">
        {/* Hero Banner Carousel */}
        <HeroBanner />

        {/* Featured Categories Pills */}
        <CategoryPills />

        {/* Flash Sale Countdown Deal */}
        <FlashSaleSection />

        {/* Interactive Product Catalog & Filters */}
        <ProductCatalog />

        {/* Value Proposition Trust Badges */}
        <ValueProps />

        {/* Customer Social Proof Wall */}
        <Testimonials />

        {/* VIP Newsletter Box */}
        <Newsletter />
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Bottom Thumb Bar */}
      <BottomNav />

      {/* Global Modals, Slide-overs & Notifications */}
      <QuickViewModal />
      <CartDrawer />
      <WishlistDrawer />
      <CheckoutModal />
      <SearchModal />
      <ToastContainer />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <StoreProvider>
        <AppContent />
      </StoreProvider>
    </ThemeProvider>
  );
}

export default App;

