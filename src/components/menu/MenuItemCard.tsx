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
      className="group bg-white rounded-[20px] sm:rounded-[22px] p-4 sm:p-5 border border-black/[0.06] shadow-sm hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between cursor-pointer transform-gpu hover:-translate-y-1 relative select-none"
    >
      {/* Top Badges & Japanese Subtitle */}
      <div className="flex items-start justify-between gap-2 mb-2.5">
        <div className="flex flex-wrap gap-1">
          {item.badges?.map((badge) => (
            <span
              key={badge}
              className={`text-[9px] font-mono font-semibold uppercase px-2 py-0.5 rounded-[6px] ${
                badge === 'signature'
                  ? 'bg-[#122416] text-[#939458]'
                  : badge === 'bestseller'
                  ? 'bg-[#29482a]/10 text-[#29482a]'
                  : badge === 'limited'
                  ? 'bg-[#a33527]/10 text-[#a33527]'
                  : 'bg-black/5 text-[#181813]/70'
              }`}
            >
              {t.menu.badges[badge] || badge}
            </span>
          ))}
        </div>

        {item.name.ja && (
          <span className="text-[10.5px] font-japanese text-[#181813]/40 tracking-wider">
            {item.name.ja}
          </span>
        )}
      </div>

      {/* Center Image Container */}
      <div className="w-full aspect-[4/3] flex items-center justify-center relative my-1.5 overflow-hidden rounded-[16px] bg-[#f8f7f1] shadow-inner">
        <img
          src={item.image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="eager"
          decoding="async"
        />
      </div>

      {/* Bottom Info: Title, Description, Price & Action */}
      <div className="flex flex-col gap-1 mt-2.5">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="font-headline text-base sm:text-lg font-bold text-[#181813] group-hover:text-[#29482a] transition-colors line-clamp-1">
            {name}
          </h3>
          <div className="flex items-baseline gap-1 shrink-0">
            <span className="font-mono font-extrabold text-base text-[#122416]">
              {item.priceSAR}
            </span>
            <span className="text-[10px] font-mono text-[#181813]/60">
              {t.menu.sar}
            </span>
          </div>
        </div>

        <p className="text-xs text-[#181813]/65 line-clamp-2 leading-relaxed h-8 font-sans">
          {description}
        </p>

        {/* Footnote Stats: Calories / Temperature / Details button */}
        <div className="flex items-center justify-between pt-2.5 mt-2 border-t border-black/[0.05] text-[11px] text-[#181813]/50">
          <div className="flex items-center gap-2">
            {item.calories !== undefined && (
              <span className="flex items-center gap-1 font-mono text-[10.5px]">
                <Flame className="w-3 h-3 text-[#939458]" />
                {item.calories} {t.menu.calories}
              </span>
            )}
            {item.temperature && (
              <span className="hidden sm:inline-block px-1.5 py-0.5 rounded-[4px] bg-black/5 text-[9.5px] font-mono">
                {item.temperature}
              </span>
            )}
          </div>

          <div className="w-7 h-7 rounded-full bg-[#122416]/5 group-hover:bg-[#122416] group-hover:text-white text-[#122416] flex items-center justify-center transition-all shadow-sm">
            <Plus className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </div>
  );
};
