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
                {locale === 'ar' ? currentFlavor.nameAr : currentFlavor.nameEn}
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
            <div className="absolute w-[90%] h-7 bg-[#051107]/90 rounded-full blur-[12px] transform-gpu translate-y-2" />
            {/* Ambient Occlusion Core Contact Line */}
            <div className="absolute w-[65%] h-3.5 bg-black rounded-full blur-[3px] transform-gpu translate-y-1" />
            {/* Soft Ambient Matcha Spill */}
            <div className="absolute w-[50%] h-4 bg-[#29482a]/40 rounded-full blur-[6px] transform-gpu" />
          </div>

          {/* 3. Persistent Dual-Layer Crossfade (Layer A) */}
          <div
            className={`absolute inset-0 w-full h-full flex items-center justify-center z-10 transition-all duration-450 ease-out transform-gpu ${
              activeLayer === 'A'
                ? 'opacity-100 scale-100 pointer-events-auto'
                : 'opacity-0 scale-[0.985] pointer-events-none'
            }`}
          >
            <img
              src={flavorA.productImage}
              alt={flavorA.nameEn}
              className="w-full h-full object-contain pointer-events-none drop-shadow-[0_12px_30px_rgba(0,0,0,0.55)]"
              decoding="async"
              loading="eager"
              draggable={false}
            />
          </div>

          {/* 4. Persistent Dual-Layer Crossfade (Layer B) */}
          <div
            className={`absolute inset-0 w-full h-full flex items-center justify-center z-10 transition-all duration-450 ease-out transform-gpu ${
              activeLayer === 'B'
                ? 'opacity-100 scale-100 pointer-events-auto'
                : 'opacity-0 scale-[0.985] pointer-events-none'
            }`}
          >
            <img
              src={flavorB.productImage}
              alt={flavorB.nameEn}
              className="w-full h-full object-contain pointer-events-none drop-shadow-[0_12px_30px_rgba(0,0,0,0.55)]"
              decoding="async"
              loading="eager"
              draggable={false}
            />
          </div>

          {/* 5. Subtle Studio Rim & Specular Light Overlay */}
          <div
            className="absolute inset-0 w-full h-full pointer-events-none mix-blend-overlay opacity-20 rounded-3xl z-15"
            style={{
              background:
                'radial-gradient(ellipse at 50% 20%, rgba(255,255,255,0.4) 0%, transparent 60%)',
            }}
          />

          {/* 6. Delicate Tactile Price & Cart Pill at base */}
          <button
            type="button"
            onClick={onPriceTagClick}
            aria-label={`Order ${currentFlavor.nameEn} for ${currentFlavor.priceFormatted}`}
            className="absolute -bottom-5 sm:-bottom-6 left-1/2 -translate-x-1/2 w-11 sm:w-13 h-14 sm:h-16 bg-[#ede9de] rounded-xl sm:rounded-2xl shadow-[0_10px_25px_rgba(0,0,0,0.45)] flex flex-col items-center justify-between py-1.5 sm:py-2 px-1.5 pointer-events-auto hover:-translate-y-0.5 hover:scale-105 active:scale-95 transition-all duration-200 group border border-black/10 z-30 cursor-pointer"
          >
            <span className="font-headline font-bold text-[9.5px] sm:text-[11px] text-[#122416] tracking-tight">
              {currentFlavor.priceSAR} {locale === 'ar' ? 'ريال' : 'SAR'}
            </span>
            <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#1b341f] text-[#ede9de] flex items-center justify-center group-hover:bg-[#29482a] group-hover:scale-110 transition-all shadow-sm">
              <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-current" viewBox="0 0 24 24">
                <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
});

CenterDrink.displayName = 'CenterDrink';
