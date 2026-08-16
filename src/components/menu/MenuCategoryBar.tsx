import React from 'react';
import type { MenuCategory } from '../../types/menu';
import { useLanguage } from '../../i18n/context';

interface MenuCategoryBarProps {
  categories: MenuCategory[];
  activeCategoryId: string;
  onSelectCategory: (id: string) => void;
}

export const MenuCategoryBar: React.FC<MenuCategoryBarProps> = ({
  categories,
  activeCategoryId,
  onSelectCategory,
}) => {
  const { locale } = useLanguage();

  return (
    <div className="w-full overflow-x-auto no-scrollbar py-2 px-1 flex items-center justify-start sm:justify-center gap-2 sm:gap-3 select-none">
      {categories.map((cat, idx) => {
        const isActive = cat.id === activeCategoryId;
        const name = locale === 'ar' ? cat.name.ar : cat.name.en;
        const indexStr = `0${idx + 1}`;

        return (
          <button
            key={cat.id}
            type="button"
            onClick={() => onSelectCategory(cat.id)}
            className={`min-h-[44px] px-4 sm:px-5 py-2 rounded-[14px] text-xs font-semibold whitespace-nowrap transition-all duration-200 active:scale-95 flex items-center gap-2 shrink-0 cursor-pointer ${
              isActive
                ? 'bg-[#122416] text-[#f8f7f1] shadow-sm ring-1 ring-black/10'
                : 'bg-black/5 hover:bg-black/10 text-[#181813]/70 hover:text-[#181813]'
            }`}
          >
            <span className={`font-mono text-[10px] ${isActive ? 'text-[#939458]' : 'text-black/40'}`}>
              {indexStr}
            </span>
            <span className="font-sans font-medium">{name}</span>
            {cat.name.ja && (
              <span className={`text-[10px] font-japanese ${isActive ? 'text-[#939458]' : 'text-black/30'}`}>
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
  );
};
