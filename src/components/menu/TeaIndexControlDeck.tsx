import React from 'react';
import type { MenuCategory } from '../../types/menu';
import { useLanguage } from '../../i18n/context';
import { Search, X } from 'lucide-react';
import { JapaneseSeal } from '../ui/JapaneseSeal';

interface TeaIndexControlDeckProps {
  categories: MenuCategory[];
  activeCategoryId: string;
  onSelectCategory: (id: string) => void;
  searchQuery: string;
  onSearch: (query: string) => void;
  totalCount: number;
}

export const TeaIndexControlDeck: React.FC<TeaIndexControlDeckProps> = ({
  categories,
  activeCategoryId,
  onSelectCategory,
  searchQuery,
  onSearch,
  totalCount,
}) => {
  const { locale, t } = useLanguage();

  return (
    <div className="w-full max-w-6xl mx-auto bg-[#f8f7f1] rounded-[22px] sm:rounded-[28px] p-3 sm:p-5 border border-black/10 shadow-[0_12px_32px_rgba(0,0,0,0.06)] transition-all relative z-20">
      {/* Top Precision Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 pb-3 sm:pb-4 border-b border-black/[0.07]">
        {/* Specimen Index & Result Counter */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <JapaneseSeal char="茶" size={24} variant="square" />
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-xs sm:text-[13px] font-bold text-[#122416] tracking-wider">
              INDEX / 04
            </span>
            <span className="text-black/30 text-xs">·</span>
            <span className="font-japanese text-xs text-[#29482a] font-medium hidden sm:inline">
              茶譜目録
            </span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/5 text-[#122416] text-[11px] sm:text-xs font-mono font-medium ms-auto sm:ms-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#29482a]" />
            <span>
              {totalCount} {locale === 'ar' ? 'صنفاً مختاراً' : 'selections'}
            </span>
          </div>
        </div>

        {/* Inset Catalogue Lookup Search Field */}
        <div className="relative w-full sm:w-72 md:w-80">
          <Search className="w-4 h-4 absolute start-3.5 top-1/2 -translate-y-1/2 text-[#181813]/40 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
            placeholder={t.menu.searchPlaceholder}
            className="w-full h-10 sm:h-11 ps-10 pe-9 bg-white/90 rounded-full text-xs sm:text-[13px] text-[#181813] placeholder:text-[#181813]/40 border border-black/10 focus:outline-none focus:ring-2 focus:ring-[#29482a]/50 focus:border-[#29482a] focus:bg-white transition-all shadow-inner"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearch('')}
              aria-label="Clear search"
              className="w-6 h-6 absolute end-2.5 top-1/2 -translate-y-1/2 flex items-center justify-center rounded-full bg-black/5 hover:bg-black/10 text-[#181813]/60 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Second Row: Japanese Specimen Index Tabs */}
      <div className="w-full overflow-x-auto no-scrollbar pt-3 sm:pt-4 -mx-1 px-1 select-none">
        <div className="flex items-center gap-1.5 sm:gap-2 w-max min-w-full">
          {categories.map((cat, idx) => {
            const isActive = cat.id === activeCategoryId;
            const name = locale === 'ar' ? cat.name.ar : cat.name.en;
            const indexStr = `0${idx + 1}`;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelectCategory(cat.id)}
                className={`min-h-[42px] sm:min-h-[46px] px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-[14px] sm:rounded-[16px] text-xs sm:text-[13px] font-medium whitespace-nowrap transition-all duration-200 active:scale-95 flex items-center gap-2 shrink-0 cursor-pointer border ${
                  isActive
                    ? 'bg-[#122416] text-[#f8f7f1] border-black/10 shadow-sm'
                    : 'bg-white/70 hover:bg-white text-[#181813]/75 hover:text-[#181813] border-black/5'
                }`}
              >
                <span className={`font-mono text-[10px] sm:text-[11px] ${isActive ? 'text-[#939458]' : 'text-black/40'}`}>
                  {indexStr}
                </span>
                <span className="font-sans font-medium">{name}</span>
                {cat.name.ja && (
                  <span className={`text-[10px] sm:text-[11px] font-japanese ${isActive ? 'text-[#939458]' : 'text-black/35'}`}>
                    {cat.name.ja}
                  </span>
                )}
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#939458] shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
