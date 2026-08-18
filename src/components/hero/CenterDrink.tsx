import React, { useEffect, useRef, useState, memo } from 'react';
import gsap from 'gsap';
import type { HeroFlavor } from '../../types/matcha';
import { useLanguage } from '../../i18n/context';

interface CenterDrinkProps {
  currentFlavor: HeroFlavor;
  previousFlavor?: HeroFlavor;
  isTransitioning?: boolean;
  onPriceTagClick?: () => void;
}

export const CenterDrink: React.FC<CenterDrinkProps> = memo(({
  currentFlavor,
  onPriceTagClick,
}) => {
  const { locale, t } = useLanguage();
  const floatingRef = useRef<HTMLDivElement>(null);

  // Dual-layer crossfade state: keeps DOM nodes persistent, preventing image decode jank
  const [activeLayer, setActiveLayer] = useState<'A' | 'B'>('A');
  const [flavorA, setFlavorA] = useState<HeroFlavor>(currentFlavor);
  const [flavorB, setFlavorB] = useState<HeroFlavor>(currentFlavor);
  const isFirstMount = useRef(true);

  // Handle seamless crossfade when currentFlavor changes
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }

    if (activeLayer === 'A') {
      setFlavorB(currentFlavor);
      setActiveLayer('B');
    } else {
      setFlavorA(currentFlavor);
      setActiveLayer('A');
    }
  }, [currentFlavor]);

  // Subtle organic micro-motion (breathing life into product, 4.8s cycle)
  useEffect(() => {
    if (!floatingRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(floatingRef.current, {
        y: -2.5,
        rotation: 0.1,
        duration: 4.8,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative z-30 flex flex-col items-center justify-center pointer-events-none select-none">
      {/* Micro-motion Floating Stage */}
      <div ref={floatingRef} className="relative flex flex-col items-center justify-center will-change-transform">
        {/* Main Cup Stage Container */}
        <div className="relative w-[195px] sm:w-[245px] md:w-[285px] lg:w-[315px] aspect-[3/4] flex items-center justify-center">
          {/* 1. Floating Specimen Tag (Gracefully suspended just above the lid rim) */}
          <div className="absolute -top-7 sm:-top-8 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center z-35 pointer-events-none w-max">
            <div className="flex items-center gap-1.5 bg-[#102315]/85 backdrop-blur-md px-3 py-0.5 rounded-full border border-white/15 shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#939458]" />
              <span className="text-[10px] sm:text-[11px] font-japanese text-[#f0ede1] font-medium tracking-wider">
                {currentFlavor.nameJa}
              </span>
              <span className="text-white/30 text-[9px]">·</span>
              <span className="text-[10.5px] sm:text-[11.5px] font-headline font-bold text-white tracking-tight">
                {locale === 'ar'
                  ? currentFlavor.nameAr
                  : locale === 'zh-CN'
                  ? currentFlavor.nameZh || currentFlavor.nameEn
                  : currentFlavor.nameEn}
              </span>
              {currentFlavor.calories && (
                <>
                  <span className="text-white/30 text-[9px]">·</span>
                  <span className="text-[9.5px] sm:text-[10px] font-mono text-white/80">
                    {currentFlavor.calories} {t.hero.calories}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* 2. Realistic Grounding Contact Shadows */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-full flex items-center justify-center pointer-events-none z-0">
            {/* Broad Diffuse Ground Shadow */}
            <div className="absolute w-[88%] h-6 bg-[#051107]/90 rounded-full blur-[10px] transform-gpu translate-y-2" />
            {/* Ambient Occlusion Core Contact Line */}
            <div className="absolute w-[62%] h-3 bg-black rounded-full blur-[2.5px] transform-gpu translate-y-1" />
            {/* Soft Ambient Matcha Spill */}
            <div className="absolute w-[48%] h-3.5 bg-[#29482a]/40 rounded-full blur-[5px] transform-gpu" />
          </div>

          {/* 3. Persistent Dual-Layer Crossfade (Layer A) */}
          <div
            className={`absolute inset-0 w-full h-full flex items-center justify-center z-10 transition-[opacity,transform] duration-[400ms] ease-out transform-gpu pointer-events-none ${
              activeLayer === 'A'
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-[0.985]'
            }`}
          >
            <img
              src={flavorA.productImage}
              alt={flavorA.nameEn}
              className="w-full h-full object-contain pointer-events-none drop-shadow-[0_8px_16px_rgba(0,0,0,0.35)]"
              decoding="async"
              loading="eager"
              draggable={false}
            />
          </div>

          {/* 4. Persistent Dual-Layer Crossfade (Layer B) */}
          <div
            className={`absolute inset-0 w-full h-full flex items-center justify-center z-10 transition-[opacity,transform] duration-[400ms] ease-out transform-gpu pointer-events-none ${
              activeLayer === 'B'
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-[0.985]'
            }`}
          >
            <img
              src={flavorB.productImage}
              alt={flavorB.nameEn}
              className="w-full h-full object-contain pointer-events-none drop-shadow-[0_8px_16px_rgba(0,0,0,0.35)]"
              decoding="async"
              loading="eager"
              draggable={false}
            />
          </div>
        </div>

        {/* 5. Minimalist Price Pill Trigger (Anchored at Ground Base) */}
        <div className="relative -mt-3 z-35 pointer-events-auto">
          <button
            type="button"
            onClick={onPriceTagClick}
            className="group/btn relative px-3 py-1 rounded-full bg-[#f0ede1] hover:bg-white text-[#122416] border border-black/10 shadow-[0_8px_20px_rgba(0,0,0,0.4)] flex items-center gap-1.5 transition-all duration-300 transform-gpu active:scale-95 cursor-pointer"
            aria-label={`Order ${currentFlavor.nameEn}`}
          >
            <span className="font-headline font-bold text-xs">
              {currentFlavor.priceSAR} {locale === 'ar' ? 'ر.س' : 'SAR'}
            </span>
            <span className="w-1 h-1 rounded-full bg-[#29482a]/50" />
            <span className="text-[10.5px] font-sans font-medium text-[#29482a]">
              {locale === 'ar' ? 'طلب فوري' : locale === 'zh-CN' ? '立即点单' : 'Order'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
});

CenterDrink.displayName = 'CenterDrink';
