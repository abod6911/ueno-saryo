import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { HERO_FLAVORS } from '../../data/heroFlavors';
import { OrbitCarousel } from './OrbitCarousel';
import { CenterDrink } from './CenterDrink';
import { HeroHeadline } from './HeroHeadline';
import { useLanguage } from '../../i18n/context';
import { Sparkles } from 'lucide-react';
import { getAssetUrl } from '../../lib/assetUrl';

interface HeroStageProps {
  onOrderDrink: (flavorId: string) => void;
}

export const HeroStage: React.FC<HeroStageProps> = ({ onOrderDrink }) => {
  const { locale } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isAutoplaying, setIsAutoplaying] = useState(true);

  const frameRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const backFogRef = useRef<HTMLDivElement>(null);
  const cupWrapperRef = useRef<HTMLDivElement>(null);
  const foregroundFogRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const carouselWrapperRef = useRef<HTMLDivElement>(null);

  // Switch flavor handler
  const handleSelectFlavor = (index: number) => {
    if (index === activeIndex) return;
    setPrevIndex(activeIndex);
    setActiveIndex(index);
    setIsTransitioning(true);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  // Intro Animation Timeline
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
      });

      // Stage 1: Expand inner dark frame
      tl.fromTo(
        frameRef.current,
        { clipPath: 'inset(0% 0% 50% 0% round 34px)', opacity: 0.9 },
        {
          clipPath: 'inset(0% 0% 0% 0% round 34px)',
          opacity: 1,
          duration: 0.8,
          ease: 'power3.inOut',
        }
      )
        // Stage 2: Product reveal with contact grounding
        .fromTo(
          cupWrapperRef.current,
          { y: 25, scale: 0.96, opacity: 0 },
          { y: 0, scale: 1, opacity: 1, duration: 0.65 },
          '-=0.3'
        )
        // Stage 3: Orbit cards entrance
        .fromTo(
          carouselWrapperRef.current,
          { opacity: 0, scale: 0.93 },
          { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' },
          '-=0.3'
        )
        // Stage 4: Headline reveal
        .fromTo(
          headlineRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5 },
          '-=0.3'
        );

      // Atmospheric back fog subtle drift
      if (backFogRef.current) {
        gsap.to(backFogRef.current, {
          x: 20,
          duration: 7,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        });
      }

      // Foreground mist subtle drift
      if (foregroundFogRef.current) {
        gsap.to(foregroundFogRef.current, {
          x: -15,
          duration: 8,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        });
      }
    });

    return () => ctx.revert();
  }, []);

  // Autoplay rotation (rotates every ~3.2s)
  useEffect(() => {
    if (!isAutoplaying) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HERO_FLAVORS.length);
    }, 3200);

    return () => clearInterval(timer);
  }, [isAutoplaying]);

  // Multi-Depth Mouse Parallax (Desktop Only)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!frameRef.current || window.innerWidth < 1024) return;
    const rect = frameRef.current.getBoundingClientRect();
    const xRel = (e.clientX - rect.left) / rect.width - 0.5;
    const yRel = (e.clientY - rect.top) / rect.height - 0.5;

    if (bgRef.current) {
      gsap.to(bgRef.current, {
        x: xRel * 5,
        y: yRel * 3,
        duration: 1.2,
        ease: 'power1.out',
      });
    }

    if (backFogRef.current) {
      gsap.to(backFogRef.current, {
        x: xRel * 8,
        y: yRel * 5,
        duration: 1.0,
        ease: 'power1.out',
      });
    }

    if (cupWrapperRef.current) {
      gsap.to(cupWrapperRef.current, {
        x: xRel * 12,
        y: yRel * 7,
        duration: 0.8,
        ease: 'power1.out',
      });
    }

    if (foregroundFogRef.current) {
      gsap.to(foregroundFogRef.current, {
        x: xRel * 18,
        y: yRel * 10,
        duration: 0.7,
        ease: 'power1.out',
      });
    }
  };

  const handleMouseLeave = () => {
    if (bgRef.current) gsap.to(bgRef.current, { x: 0, y: 0, duration: 0.8 });
    if (backFogRef.current) gsap.to(backFogRef.current, { x: 0, y: 0, duration: 0.8 });
    if (cupWrapperRef.current) gsap.to(cupWrapperRef.current, { x: 0, y: 0, duration: 0.8 });
    if (foregroundFogRef.current) gsap.to(foregroundFogRef.current, { x: 0, y: 0, duration: 0.8 });
  };

  const currentFlavor = HERO_FLAVORS[activeIndex];
  const previousFlavor = HERO_FLAVORS[prevIndex];

  return (
    <section
      id="home"
      className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-14 pt-20 sm:pt-24 pb-4 flex flex-col items-center justify-center"
    >
      {/* Experience Frame */}
      <div
        ref={frameRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full aspect-[4/3] max-h-[84vh] min-h-[560px] sm:min-h-[640px] md:min-h-[720px] rounded-[28px] sm:rounded-[36px] overflow-hidden bg-[#102213] shadow-matcha-frame border border-black/20 flex flex-col justify-between select-none"
      >
        {/* Layer 0: Background Environment Stage */}
        <div
          ref={bgRef}
          className="absolute inset-0 w-full h-full bg-cover bg-center pointer-events-none opacity-95 scale-[1.03]"
          style={{
            backgroundImage: `url('${getAssetUrl('assets/environment/hero_stage_clean.jpg')}')`,
          }}
        />

        {/* Ambient Dark Green Radial Light */}
        <div className="absolute inset-0 bg-radial-gradient from-[#29482a]/25 via-transparent to-[#0a150c]/85 pointer-events-none" />

        {/* Layer 1: Atmospheric Back Fog / Mid Haze behind cards */}
        <div
          ref={backFogRef}
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 opacity-40"
        >
          <div className="w-[600px] sm:w-[800px] h-[350px] bg-radial from-[#29482a]/45 via-[#1a331c]/20 to-transparent blur-[40px] rounded-full" />
        </div>

        {/* Top Floating Badge Lockup */}
        <div className="w-full px-6 sm:px-10 pt-6 sm:pt-8 flex items-center justify-between z-40 relative">
          <div className="flex items-center gap-2 bg-[#122416]/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 text-xs text-[#f8f7f1] shadow-sm">
            <span className="font-japanese text-xs text-[#939458] font-bold">茶道研究所</span>
            <span className="text-white/40">·</span>
            <span className="font-mono text-[11px] text-white/90">
              {locale === 'ar' ? 'مختبرات الشاي — جدة' : 'UENO SARYO · JEDDAH'}
            </span>
          </div>

          <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 text-xs text-[#f8f7f1] shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#939458]" />
            <span className="text-[11px] font-mono tracking-wider text-[#f0ede1]">
              {locale === 'ar' ? 'إصدارات الماتشا الحصرية' : 'Ceremonial Matcha'}
            </span>
          </div>
        </div>

        {/* Central Stage: Orbiting Flavor Cards + Central Product */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Orbital Carousel Cards */}
          <div ref={carouselWrapperRef} className="absolute inset-0 z-20">
            <OrbitCarousel
              flavors={HERO_FLAVORS}
              activeIndex={activeIndex}
              onSelectFlavor={handleSelectFlavor}
              isAutoplaying={isAutoplaying}
              setIsAutoplaying={setIsAutoplaying}
            />
          </div>

          {/* Central Grounded Drink Cup with Contact Shadows */}
          <div ref={cupWrapperRef} className="relative z-30 mb-7 sm:mb-10">
            <CenterDrink
              currentFlavor={currentFlavor}
              previousFlavor={previousFlavor}
              isTransitioning={isTransitioning}
              onPriceTagClick={() => onOrderDrink(currentFlavor.id)}
            />
          </div>

          {/* Layer 6: Foreground Soft Mist & Floating Matcha Dust */}
          <div
            ref={foregroundFogRef}
            className="absolute bottom-16 sm:bottom-20 inset-x-0 flex items-center justify-center pointer-events-none z-32 opacity-50"
          >
            <div className="w-[500px] sm:w-[700px] h-[90px] bg-gradient-to-t from-[#152917]/70 via-[#234225]/25 to-transparent blur-[20px] rounded-full" />
          </div>
        </div>

        {/* Layer 8: Subtle Cinematic Film Grain Overlay (binds photographic layers) */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.035] mix-blend-overlay z-45"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Bottom Editorial Headline */}
        <div ref={headlineRef}>
          <HeroHeadline />
        </div>
      </div>
    </section>
  );
};
