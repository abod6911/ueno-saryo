import React, { useState, useMemo } from 'react';
import { MENU_CATEGORIES, MENU_ITEMS } from '../../data/menu';
import type { MenuItem } from '../../types/menu';
import { MenuCategoryBar } from './MenuCategoryBar';
import { MenuSearchBar } from './MenuSearchBar';
import { MenuItemCard } from './MenuItemCard';
import { ProductDetailModal } from './ProductDetailModal';
import { useLanguage } from '../../i18n/context';
import { Sparkles } from 'lucide-react';

export const MenuSection: React.FC = () => {
  const { locale, t } = useLanguage();
  const [activeCategoryId, setActiveCategoryId] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  // Filter items by category & search query
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category match
      let matchesCategory = true;
      if (activeCategoryId === 'featured') {
        matchesCategory = Boolean(item.featured);
      } else if (activeCategoryId !== 'all') {
        matchesCategory = item.categoryId === activeCategoryId;
      }

      if (!matchesCategory) return false;

      // Search match
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      const matchEn = item.name.en.toLowerCase().includes(q) || item.description.en.toLowerCase().includes(q);
      const matchAr = item.name.ar.includes(q) || item.description.ar.includes(q);
      const matchJa = item.name.ja?.includes(q) || false;

      return matchEn || matchAr || matchJa;
    });
  }, [activeCategoryId, searchQuery]);

  return (
    <section id="menu" className="w-full bg-[#f0ede1] text-[#181813] py-16 sm:py-24 relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-paper-texture opacity-60 pointer-events-none" />

      <div className="max-w-[1640px] mx-auto px-3 sm:px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[11px] font-mono text-[#29482a] font-bold tracking-wider">
              04 / {locale === 'ar' ? 'القائمة' : 'MENU'}
            </span>
            <span className="w-1 h-1 rounded-full bg-[#29482a]/50" />
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#122416]/10 text-[#122416] text-xs font-mono uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-[#29482a]" />
              <span>{t.menu.badge}</span>
            </div>
          </div>

          <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#122416] tracking-tight mb-3">
            {t.menu.heading}
          </h2>

          <p className="text-xs sm:text-base text-[#181813]/75 leading-relaxed font-sans max-w-2xl">
            {t.menu.subheading}
          </p>
        </div>

        {/* Category Filter & Search Bar */}
        <div className="flex flex-col gap-6 mb-10">
          <MenuCategoryBar
            categories={MENU_CATEGORIES}
            activeCategoryId={activeCategoryId}
            onSelectCategory={setActiveCategoryId}
          />
          <MenuSearchBar
            onSearch={setSearchQuery}
          />
        </div>

        {/* Menu Items Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
            {filteredItems.map((item) => (
              <MenuItemCard
                key={item.id}
                item={item}
                onSelect={() => setSelectedItem(item)}
              />
            ))}
          </div>
        ) : (
          <div className="w-full py-16 flex flex-col items-center justify-center text-center">
            <p className="text-sm font-semibold text-[#181813]/80">{t.menu.noResults}</p>
            <p className="text-xs text-[#181813]/50 mt-1">{t.menu.tryDifferent}</p>
          </div>
        )}
      </div>

      {/* Product Detail Modal */}
      <ProductDetailModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </section>
  );
};
