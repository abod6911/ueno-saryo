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
    <div className="w-full overflow-x-auto no-scrollbar py-2 px-1 flex items-center gap-2 select-none">
      {categories.map((cat) => {
        const isActive = cat.id === activeCategoryId;
        const name = locale === 'ar' ? cat.name.ar : cat.name.en;

        return (
          <button
            key={cat.id}
            type="button"
            onClick={() => onSelectCategory(cat.id)}
            className={`min-h-[44px] px-5 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 active:scale-95 flex items-center gap-1.5 shrink-0 ${
              isActive
                ? 'bg-[#122416] text-[#f8f7f1] shadow-card ring-1 ring-black/10'
                : 'bg-black/5 hover:bg-black/10 text-[#181813]/80 hover:text-[#181813]'
            }`}
          >
            <span>{name}</span>
            {cat.name.ja && (
              <span className={`text-[10px] font-japanese ${isActive ? 'text-[#939458]' : 'text-black/30'}`}>
                {cat.name.ja}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
