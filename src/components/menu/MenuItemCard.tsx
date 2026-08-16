import React from 'react';
import type { MenuItem } from '../../types/menu';
import { useLanguage } from '../../i18n/context';
import { Flame, Plus } from 'lucide-react';

interface MenuItemCardProps {
  item: MenuItem;
  onSelect: () => void;
}

export const MenuItemCard: React.FC<MenuItemCardProps> = ({ item, onSelect }) => {
  const { locale, t } = useLanguage();
  const name = locale === 'ar' ? item.name.ar : item.name.en;
  const description = locale === 'ar' ? item.description.ar : item.description.en;

  return (
    <div
      onClick={onSelect}
      className="group bg-white rounded-3xl p-5 sm:p-6 border border-black/5 shadow-sm hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between cursor-pointer transform-gpu hover:-translate-y-1 relative select-none"
    >
      {/* Top Badges & Japanese Subtitle */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex flex-wrap gap-1.5">
          {item.badges?.map((badge) => (
            <span
              key={badge}
              className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full ${
                badge === 'signature'
                  ? 'bg-[#122416] text-[#f0ede1]'
                  : badge === 'bestseller'
                  ? 'bg-amber-100 text-amber-900'
                  : badge === 'limited'
                  ? 'bg-rose-100 text-rose-900'
                  : 'bg-emerald-100 text-emerald-900'
              }`}
            >
              {t.menu.badges[badge] || badge}
            </span>
          ))}
        </div>

        {item.name.ja && (
          <span className="text-[11px] font-japanese text-[#181813]/40 tracking-wider">
            {item.name.ja}
          </span>
        )}
      </div>

      {/* Center Image Container */}
      <div className="w-full aspect-[4/3] flex items-center justify-center relative my-2 overflow-hidden rounded-2xl bg-[#f8f7f1] shadow-inner">
        <img
          src={item.image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="eager"
        />
      </div>

      {/* Bottom Info: Title, Description, Price & Action */}
      <div className="flex flex-col gap-1.5 mt-3">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="font-headline text-base sm:text-lg font-bold text-[#181813] group-hover:text-[#29482a] transition-colors line-clamp-1">
            {name}
          </h3>
          <span className="font-headline font-bold text-sm sm:text-base text-[#122416] whitespace-nowrap">
            {item.priceSAR} {t.menu.sar}
          </span>
        </div>

        <p className="text-xs text-[#181813]/65 line-clamp-2 leading-relaxed h-8">
          {description}
        </p>

        {/* Footnote Stats: Calories / Temperature / Details button */}
        <div className="flex items-center justify-between pt-3 mt-2 border-t border-black/5 text-[11px] text-[#181813]/50">
          <div className="flex items-center gap-2">
            {item.calories !== undefined && (
              <span className="flex items-center gap-1 font-mono">
                <Flame className="w-3 h-3 text-[#939458]" />
                {item.calories} {t.menu.calories}
              </span>
            )}
            {item.temperature && (
              <span className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-black/5 text-[10px]">
                {item.temperature}
              </span>
            )}
          </div>

          <div className="w-7 h-7 rounded-full bg-[#122416]/5 group-hover:bg-[#122416] group-hover:text-white text-[#122416] flex items-center justify-center transition-all">
            <Plus className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </div>
  );
};
