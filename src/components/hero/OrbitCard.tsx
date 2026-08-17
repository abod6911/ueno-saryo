import React, { memo } from 'react';
import type { HeroFlavor } from '../../types/matcha';
import { useLanguage } from '../../i18n/context';

interface OrbitCardProps {
  flavor: HeroFlavor;
  onClick: () => void;
  style?: React.CSSProperties;
  isActive?: boolean;
}

export const OrbitCard: React.FC<OrbitCardProps> = memo(({
  flavor,
  onClick,
  style,
  isActive,
}) => {
  const { locale } = useLanguage();

  return (
    <div
      style={style}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`Select ${flavor.nameEn}`}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); } }}
      className={`relative w-[105px] h-[105px] sm:w-[135px] sm:h-[135px] md:w-[155px] md:h-[155px] lg:w-[168px] lg:h-[168px] rounded-[18px] sm:rounded-[22px] bg-[#f8f7f1] shadow-[0_8px_20px_rgba(0,0,0,0.35)] flex flex-col items-center justify-between p-2 sm:p-2.5 cursor-pointer transform-gpu transition-[box-shadow,ring] duration-300 group border border-black/5 ${
        isActive
          ? 'ring-2 ring-white/90 shadow-[0_16px_32px_rgba(0,0,0,0.45)]'
          : 'hover:brightness-105'
      }`}
    >
      {/* Top Small Category / Price Indicator */}
      <div className="w-full flex items-center justify-between text-[8.5px] sm:text-[10px] md:text-[10.5px] text-[#122416]/75 font-mono px-0.5">
        <span className="truncate max-w-[58px] sm:max-w-[85px] font-medium tracking-tight">
          {locale === 'ar' ? flavor.nameAr : flavor.nameEn}
        </span>
        <span className="font-bold text-[#29482a] shrink-0">
          {flavor.priceSAR} <span className="text-[7.5px] sm:text-[9px]">{locale === 'ar' ? 'ر.س' : 'SAR'}</span>
        </span>
      </div>

      {/* Centered Isolated Fruit / Botanical Asset */}
      <div className="w-full flex-1 flex items-center justify-center relative pointer-events-none my-0.5">
        <img
          src={flavor.fruitImage}
          alt={flavor.fruitAlt}
          className="max-w-[70%] max-h-[70%] object-contain drop-shadow-[0_3px_6px_rgba(0,0,0,0.12)] group-hover:scale-105 transition-transform duration-300 rounded-md"
          loading="eager"
          decoding="async"
          draggable={false}
        />
      </div>

      {/* Bottom Mini Japanese Botanical Note */}
      <div className="w-full text-center text-[8.5px] sm:text-[10px] font-japanese text-[#122416]/60 truncate font-medium">
        {flavor.nameJa || '茶道研究所'}
      </div>
    </div>
  );
});

OrbitCard.displayName = 'OrbitCard';
