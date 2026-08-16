import React from 'react';
import type { HeroFlavor } from '../../types/matcha';
import { useLanguage } from '../../i18n/context';

interface OrbitCardProps {
  flavor: HeroFlavor;
  onClick: () => void;
  style?: React.CSSProperties;
  isActive?: boolean;
}

export const OrbitCard: React.FC<OrbitCardProps> = ({
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
      className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120px] h-[120px] sm:w-[155px] sm:h-[155px] md:w-[180px] md:h-[180px] rounded-[22px] sm:rounded-[28px] bg-[#f5f2e9]/95 backdrop-blur-[2px] shadow-matcha-card flex flex-col items-center justify-between p-2.5 sm:p-3.5 cursor-pointer transform-gpu transition-shadow duration-300 hover:shadow-card-hover group border border-black/5 ${
        isActive
          ? 'ring-2 ring-white/90 shadow-[0_20px_35px_rgba(0,0,0,0.35)]'
          : 'hover:brightness-105'
      }`}
    >
      {/* Top Small Category / Price Indicator */}
      <div className="w-full flex items-center justify-between text-[10px] sm:text-[11px] text-[#122416]/75 font-mono">
        <span className="truncate max-w-[75px] sm:max-w-[100px] font-medium tracking-tight">
          {locale === 'ar' ? flavor.nameAr : flavor.nameEn}
        </span>
        <span className="font-bold text-[#29482a]">
          {flavor.priceSAR} {locale === 'ar' ? 'ر.س' : 'SAR'}
        </span>
      </div>

      {/* Centered Isolated Fruit Asset */}
      <div className="w-full flex-1 flex items-center justify-center relative pointer-events-none my-1">
        <img
          src={flavor.fruitImage}
          alt={flavor.fruitAlt}
          className="max-w-[76%] max-h-[76%] object-contain drop-shadow-[0_4px_8px_rgba(0,0,0,0.15)] group-hover:scale-105 transition-transform duration-300 rounded-lg"
          loading="eager"
          draggable={false}
        />
      </div>

      {/* Bottom Mini Japanese Flavor Note */}
      <div className="w-full text-center text-[10px] sm:text-xs font-japanese text-[#122416]/60 truncate font-medium">
        {flavor.nameJa || '茶道研究所'}
      </div>
    </div>
  );
};
