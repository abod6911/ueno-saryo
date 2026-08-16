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

  // Subtle organic micro-motion (breathing life into product, 5.2s cycle)
  useEffect(() => {
    if (!floatingRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(floatingRef.current, {
        y: -2.2,
        rotation: 0.1,
        duration: 5.2,
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
        {/* Main Cup Stage Container (~24-27% Hero height) */}
        <div className="relative w-[185px] sm:w-[235px] md:w-[275px] lg:w-[305px] aspect-[3/4] flex items-center justify-center">
          {/* 1. Base Physically Grounded 3-Tier Contact Shadow */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-full flex items-center justify-center pointer-events-none z-0">
            {/* Diffuse Ground Shadow */}
            <div className="absolute w-[80%] h-6 bg-[#071309]/85 rounded-full blur-[10px] transform-gpu translate-y-2" />
            {/* Ambient Occlusion Core Contact Line */}
            <div className="absolute w-[60%] h-3 bg-black/95 rounded-full blur-[3px] transform-gpu translate-y-1" />
            {/* Ambient Matcha Light Spill */}
            <div className="absolute w-[48%] h-3.5 bg-[#29482a]/40 rounded-full blur-[6px] transform-gpu" />
          </div>

          {/* 2. Persistent Dual-Layer Crossfade (Layer A) */}
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
              className="w-full h-full object-contain pointer-events-none"
              decoding="async"
              loading="eager"
              draggable={false}
            />
          </div>

          {/* 3. Persistent Dual-Layer Crossfade (Layer B) */}
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
              className="w-full h-full object-contain pointer-events-none"
              decoding="async"
              loading="eager"
              draggable={false}
            />
          </div>

          {/* 4. Subtle Environmental Rim-Light & Center Highlight */}
          <div
            className="absolute inset-0 w-full h-full pointer-events-none mix-blend-overlay opacity-25 rounded-3xl z-15"
            style={{
              background:
                'radial-gradient(ellipse at 50% 25%, rgba(255,255,255,0.4) 0%, transparent 65%)',
            }}
          />

          {/* 5. Lower Base Dark Green Grounding Tint */}
          <div
            className="absolute inset-x-0 bottom-0 h-1/4 pointer-events-none rounded-b-3xl opacity-20 z-15"
            style={{
              background:
                'linear-gradient(to top, #102213 0%, rgba(16,34,19,0.4) 40%, transparent 100%)',
            }}
          />

          {/* 6. Product Overlaid Flavor Title & Metadata */}
          <div className="absolute top-[52%] sm:top-[53%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none px-2 z-20">
            <span className="inline-block text-[10px] sm:text-[11px] font-japanese text-[#f0ede1] font-medium tracking-widest uppercase mb-1 bg-black/50 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/15 shadow-sm">
              {currentFlavor.nameJa}
            </span>
            <h2 className="font-headline text-lg sm:text-2xl md:text-[26px] font-bold text-white tracking-wide drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)] transition-all duration-300 transform-gpu leading-tight">
              {locale === 'ar' ? currentFlavor.nameAr : currentFlavor.nameEn}
            </h2>
            {currentFlavor.calories && (
              <span className="inline-block mt-1 text-[9.5px] sm:text-[10.5px] font-mono text-white/90 bg-black/50 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/15 shadow-sm">
                {currentFlavor.calories} {t.hero.calories}
              </span>
            )}
          </div>

          {/* 7. Foreground Occlusion Mist across lower cup base */}
          <div className="absolute -bottom-2 inset-x-0 h-8 pointer-events-none z-25 flex items-center justify-center">
            <div className="w-[82%] h-full bg-gradient-to-t from-[#122416]/65 via-[#1d351f]/20 to-transparent rounded-full blur-[4px] opacity-70" />
          </div>

          {/* 8. Delicate Vertical Price & Cart Pill at base */}
          <button
            type="button"
            onClick={onPriceTagClick}
            aria-label={`Order ${currentFlavor.nameEn} for ${currentFlavor.priceFormatted}`}
            className="absolute -bottom-5 sm:-bottom-6 left-1/2 -translate-x-1/2 w-10 sm:w-12 h-14 sm:h-16 bg-[#ede9de] rounded-xl sm:rounded-2xl shadow-[0_10px_25px_rgba(0,0,0,0.45)] flex flex-col items-center justify-between py-1.5 sm:py-2 px-1.5 pointer-events-auto hover:-translate-y-0.5 hover:scale-105 active:scale-95 transition-all duration-200 group border border-black/10 z-30"
          >
            <span className="font-headline font-bold text-[9px] sm:text-[10.5px] text-[#122416] tracking-tight">
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
