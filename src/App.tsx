import React, { useState, useEffect } from 'react';
import { LanguageProvider } from './i18n/context';
import { HeaderNav } from './components/layout/HeaderNav';
import { MobileMenuSheet } from './components/layout/MobileMenuSheet';
import { MobileActionDock } from './components/layout/MobileActionDock';
import { Footer } from './components/layout/Footer';
import { HeroStage } from './components/hero/HeroStage';
import { QuickInfoBanner } from './components/business/QuickInfoBanner';
import { MenuSection } from './components/menu/MenuSection';
import { FeaturedMatcha } from './components/experience/FeaturedMatcha';
import { TeaLabProcess } from './components/experience/TeaLabProcess';
import { TeaCollection } from './components/experience/TeaCollection';
import { DessertShowcase } from './components/desserts/DessertShowcase';
import { GalleryGrid } from './components/gallery/GalleryGrid';
import { ReviewsSection } from './components/reviews/ReviewsSection';
import { VisitSection } from './components/visit/VisitSection';
import { DrinkExperienceModal } from './components/experience/DrinkExperienceModal';
import { MENU_ITEMS } from './data/menu';
import type { MenuItem } from './types/menu';

const MainExperience: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<MenuItem | null>(null);

  // Always start at top of website on initial load and reload
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  const handleOpenMenuSection = () => {
    const el = document.getElementById('menu');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOrderHeroDrink = (flavorId: string) => {
    // Find matching menu item or open menu section
    const match = MENU_ITEMS.find((m) => m.id === flavorId || m.slug.includes(flavorId));
    if (match) {
      setSelectedProduct(match);
    } else {
      handleOpenMenuSection();
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#9b9b57] text-[#f8f7f1] flex flex-col justify-between relative overflow-x-hidden selection:bg-[#29482a] selection:text-[#f0ede1]">
      {/* Analog Tactile Grain Overlay */}
      <div className="grain-overlay" />

      {/* Top Editorial Navbar */}
      <HeaderNav
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        onOpenMenuSection={handleOpenMenuSection}
      />

      {/* Full-Screen Mobile Drawer */}
      <MobileMenuSheet
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onNavigateToMenu={handleOpenMenuSection}
      />

      {/* Main Content Sections */}
      <main className="w-full flex flex-col">
        {/* 1. Cinematic Hero Stage */}
        <HeroStage onOrderDrink={handleOrderHeroDrink} />

        {/* 2. Restaurant Snapshot Info Banner */}
        <QuickInfoBanner onOpenMenu={handleOpenMenuSection} />

        {/* 3. Featured Matcha Editorial ("MATCHA, STUDIED.") */}
        <FeaturedMatcha />

        {/* 4. The Tea Experience & 5-Step Craft Ceremony */}
        <TeaLabProcess />

        {/* 5. Japanese Loose Leaf Tea Collection */}
        <TeaCollection />

        {/* 6. Complete Interactive Menu Browsing & Search */}
        <MenuSection />

        {/* 7. Japanese Desserts & Pastries Showcase */}
        <DessertShowcase onSelectItem={(item) => setSelectedProduct(item)} />

        {/* 8. Photography & Atmosphere Gallery */}
        <GalleryGrid />

        {/* 9. Verified Google Reviews & Rating Snapshot */}
        <ReviewsSection />

        {/* 10. Visit, Location, Interactive Map & Opening Hours */}
        <VisitSection />
      </main>

      {/* Footer */}
      <Footer onOpenMenu={handleOpenMenuSection} />

      {/* Sticky Mobile Action Dock */}
      <MobileActionDock onOpenMenu={handleOpenMenuSection} />

      {/* Global Interactive Drink Reveal Experience */}
      <DrinkExperienceModal
        item={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
};

export function App() {
  return (
    <LanguageProvider>
      <MainExperience />
    </LanguageProvider>
  );
}

export default App;
