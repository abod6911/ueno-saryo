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
      className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[115px] h-[115px] sm:w-[145px] sm:h-[145px] md:w-[165px] md:h-[165px] lg:w-[178px] lg:h-[178px] rounded-[20px] sm:rounded-[24px] bg-[#EFEDE3] shadow-[0_10px_25px_rgba(0,0,0,0.3)] flex flex-col items-center justify-between p-2.5 sm:p-3 cursor-pointer transform-gpu transition-[box-shadow,ring] duration-300 group border border-black/5 ${
        isActive
          ? 'ring-2 ring-white/80 shadow-[0_18px_35px_rgba(0,0,0,0.4)]'
          : 'hover:brightness-105'
      }`}
    >
      {/* Top Small Category / Price Indicator */}
      <div className="w-full flex items-center justify-between text-[9.5px] sm:text-[11px] text-[#122416]/75 font-mono">
        <span className="truncate max-w-[70px] sm:max-w-[95px] font-medium tracking-tight">
          {locale === 'ar' ? flavor.nameAr : flavor.nameEn}
        </span>
        <span className="font-bold text-[#29482a]">
          {flavor.priceSAR} {locale === 'ar' ? 'ر.س' : 'SAR'}
        </span>
      </div>

      {/* Centered Isolated Fruit / Botanical Asset */}
      <div className="w-full flex-1 flex items-center justify-center relative pointer-events-none my-1">
        <img
          src={flavor.fruitImage}
          alt={flavor.fruitAlt}
          className="max-w-[74%] max-h-[74%] object-contain drop-shadow-[0_4px_8px_rgba(0,0,0,0.1)] group-hover:scale-105 transition-transform duration-300 rounded-lg"
          loading="eager"
          decoding="async"
          draggable={false}
        />
      </div>

      {/* Bottom Mini Japanese Botanical Note */}
      <div className="w-full text-center text-[9.5px] sm:text-[11px] font-japanese text-[#122416]/60 truncate font-medium">
        {flavor.nameJa || '茶道研究所'}
      </div>
    </div>
  );
});

OrbitCard.displayName = 'OrbitCard';
