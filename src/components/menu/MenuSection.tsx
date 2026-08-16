import React, { useState, useMemo } from 'react';
import { MENU_CATEGORIES, MENU_ITEMS } from '../../data/menu';
import type { MenuItem } from '../../types/menu';
import { MenuCategoryBar } from './MenuCategoryBar';
import { MenuSearchBar } from './MenuSearchBar';
import { MenuItemCard } from './MenuItemCard';
import { ProductDetailModal } from './ProductDetailModal';
import { useLanguage } from '../../i18n/context';
import { Sparkles, Utensils } from 'lucide-react';

export const MenuSection: React.FC = () => {
  const { t } = useLanguage();
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
    <section id="menu" className="w-full bg-[#f0ede1] text-[#181813] py-20 sm:py-28 relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-paper-texture opacity-60 pointer-events-none" />

      <div className="max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-14 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#122416]/10 text-[#122416] text-xs font-mono uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#939458]" />
            <span>{t.menu.badge}</span>
          </div>

          <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#122416] tracking-tight mb-4">
            {t.menu.heading}
          </h2>

          <p className="text-xs sm:text-base text-[#181813]/70 leading-relaxed font-sans">
            {t.menu.subheading}
          </p>
        </div>

        {/* Controls: Search & Category Navigation */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-black/10">
          <div className="w-full md:w-auto flex-1 overflow-hidden">
            <MenuCategoryBar
              categories={MENU_CATEGORIES}
              activeCategoryId={activeCategoryId}
              onSelectCategory={setActiveCategoryId}
            />
          </div>

          <div className="w-full md:w-auto shrink-0">
            <MenuSearchBar onSearch={setSearchQuery} />
          </div>
        </div>

        {/* Menu Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {filteredItems.map((item) => (
              <MenuItemCard
                key={item.id}
                item={item}
                onSelect={() => setSelectedItem(item)}
              />
            ))}
          </div>
        ) : (
          <div className="w-full py-16 flex flex-col items-center justify-center text-center bg-white/50 rounded-3xl border border-dashed border-black/15 p-8">
            <Utensils className="w-10 h-10 text-black/30 mb-3" />
            <h3 className="font-headline text-lg font-bold text-[#181813] mb-1">
              {t.menu.noResults}
            </h3>
            <p className="text-xs text-[#181813]/60 max-w-sm">
              {t.menu.tryDifferent}
            </p>
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
