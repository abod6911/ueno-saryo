import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import type { HeroFlavor } from '../../types/matcha';
import { useLanguage } from '../../i18n/context';

interface CenterDrinkProps {
  currentFlavor: HeroFlavor;
  previousFlavor?: HeroFlavor;
  isTransitioning?: boolean;
  onPriceTagClick?: () => void;
}

export const CenterDrink: React.FC<CenterDrinkProps> = ({
  currentFlavor,
  previousFlavor,
  isTransitioning,
  onPriceTagClick,
}) => {
  const { locale, t } = useLanguage();
  const floatingRef = useRef<HTMLDivElement>(null);

  // Subtle organic micro-motion (breathing life into the product)
  useEffect(() => {
    if (!floatingRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(floatingRef.current, {
        y: -2.5,
        rotation: 0.12,
        duration: 2.8,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative z-30 flex flex-col items-center justify-center pointer-events-none select-none">
      {/* Micro-floating Wrapper */}
      <div ref={floatingRef} className="relative flex flex-col items-center justify-center">
        {/* Main Cup Image Container */}
        <div className="relative w-[195px] sm:w-[255px] md:w-[300px] lg:w-[335px] aspect-[3/4] flex items-center justify-center">
          {/* 1. Base Multi-Layer Physical Contact Shadow */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-full flex items-center justify-center pointer-events-none z-0">
            {/* Diffuse Ground Shadow */}
            <div className="absolute w-[85%] h-7 bg-[#071309]/80 rounded-full blur-[14px] transform-gpu translate-y-2" />
            {/* Ambient Occlusion Core Contact Line */}
            <div className="absolute w-[62%] h-3.5 bg-black/90 rounded-full blur-[4px] transform-gpu translate-y-1" />
            {/* Ambient Green Light Spill / Ground Reflection */}
            <div className="absolute w-[50%] h-4 bg-[#29482a]/35 rounded-full blur-[8px] transform-gpu" />
          </div>

          {/* 2. Previous Drink Crossfade */}
          {previousFlavor && isTransitioning && (
            <img
              src={previousFlavor.productImage}
              alt={previousFlavor.nameEn}
              className="absolute inset-0 w-full h-full object-contain pointer-events-none opacity-0 transition-opacity duration-500 z-10"
              draggable={false}
            />
          )}

          {/* 3. Current Active Drink */}
          <div className="relative w-full h-full flex items-center justify-center z-10">
            <img
              key={currentFlavor.id}
              src={currentFlavor.productImage}
              alt={currentFlavor.nameEn}
              className="w-full h-full object-contain pointer-events-none transition-transform duration-500 ease-out"
              draggable={false}
            />

            {/* 4. Delicate Rim-Light Highlight & Environmental Gradient Integration */}
            <div
              className="absolute inset-0 w-full h-full pointer-events-none mix-blend-overlay opacity-30 rounded-3xl"
              style={{
                background:
                  'radial-gradient(ellipse at 50% 20%, rgba(255,255,255,0.4) 0%, transparent 60%)',
              }}
            />

            {/* 5. Lower Cup Environmental Grounding (subtle dark green ambient tint at base) */}
            <div
              className="absolute inset-x-0 bottom-0 h-1/4 pointer-events-none rounded-b-3xl opacity-25"
              style={{
                background:
                  'linear-gradient(to top, #102213 0%, rgba(16,34,19,0.5) 45%, transparent 100%)',
              }}
            />
          </div>

          {/* 6. Dynamic Flavor Title & Subtitle Overlaid on Cup */}
          <div className="absolute top-[52%] sm:top-[54%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none px-2 z-20">
            <span className="inline-block text-[10.5px] sm:text-xs font-japanese text-[#f0ede1] font-medium tracking-widest uppercase mb-1 bg-black/45 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/15 shadow-sm">
              {currentFlavor.nameJa}
            </span>
            <h2
              key={currentFlavor.id}
              className="font-headline text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-wide drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)] transition-all duration-300 transform-gpu leading-tight"
            >
              {locale === 'ar' ? currentFlavor.nameAr : currentFlavor.nameEn}
            </h2>
            {currentFlavor.calories && (
              <span className="inline-block mt-1 text-[10px] sm:text-[11px] font-mono text-white/90 bg-black/45 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/15 shadow-sm">
                {currentFlavor.calories} {t.hero.calories}
              </span>
            )}
          </div>

          {/* 7. Foreground Occlusion Mist passing right in front of the lower base */}
          <div className="absolute -bottom-3 inset-x-0 h-10 pointer-events-none z-25 flex items-center justify-center">
            <div className="w-[85%] h-full bg-gradient-to-t from-[#122416]/60 via-[#1d351f]/25 to-transparent rounded-full blur-[6px] opacity-75" />
          </div>

          {/* 8. Subdued Luxury Price & Cart Pill at base */}
          <button
            type="button"
            onClick={onPriceTagClick}
            aria-label={`Order ${currentFlavor.nameEn} for ${currentFlavor.priceFormatted}`}
            className="absolute -bottom-5 sm:-bottom-6 left-1/2 -translate-x-1/2 w-11 sm:w-13 h-14 sm:h-17 bg-[#ede9de] rounded-xl sm:rounded-2xl shadow-[0_10px_25px_rgba(0,0,0,0.45)] flex flex-col items-center justify-between py-1.5 sm:py-2 px-1.5 pointer-events-auto hover:-translate-y-0.5 hover:scale-105 active:scale-95 transition-all duration-200 group border border-black/10 z-30"
          >
            <span className="font-headline font-bold text-[9.5px] sm:text-[11px] text-[#122416] tracking-tight">
              {currentFlavor.priceSAR} {locale === 'ar' ? 'ريال' : 'SAR'}
            </span>
            <div className="w-4.5 h-4.5 sm:w-5.5 sm:h-5.5 rounded-full bg-[#1b341f] text-[#ede9de] flex items-center justify-center group-hover:bg-[#29482a] group-hover:scale-110 transition-all shadow-sm">
              <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-current" viewBox="0 0 24 24">
                <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
