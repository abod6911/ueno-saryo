import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { HERO_FLAVORS } from '../../data/heroFlavors';
import { OrbitCarousel } from './OrbitCarousel';
import { CenterDrink } from './CenterDrink';
import { HeroHeadline } from './HeroHeadline';
import { useLanguage } from '../../i18n/context';
import { getAssetUrl } from '../../lib/assetUrl';

interface HeroStageProps {
  onOrderDrink: (flavorId: string) => void;
}

export const HeroStage: React.FC<HeroStageProps> = ({ onOrderDrink }) => {
  const { locale } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isAutoplaying, setIsAutoplaying] = useState(false); // starts false, enabled only after intro
  const [introFinished, setIntroFinished] = useState(false);

  const frameRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const backFogRef = useRef<HTMLDivElement>(null);
  const cupWrapperRef = useRef<HTMLDivElement>(null);
  const foregroundFogRef = useRef<HTMLDivElement>(null);
  const headlineWrapperRef = useRef<HTMLDivElement>(null);
  const carouselWrapperRef = useRef<HTMLDivElement>(null);
  const topUIRef = useRef<HTMLDivElement>(null);

  // Switch flavor handler
  const handleSelectFlavor = (index: number) => {
    if (index === activeIndex) return;
    setPrevIndex(activeIndex);
    setActiveIndex(index);
    setIsTransitioning(true);
    setTimeout(() => setIsTransitioning(false), 450);
  };

  // Staged 6-Phase Intro Animation Timeline (§44 - §51)
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        onComplete: () => {
          setIntroFinished(true);
          setIsAutoplaying(true);
        },
      });

      // Stage 1 & 2: Vertical clip reveal of dark Hero stage
      tl.fromTo(
        frameRef.current,
        { clipPath: 'inset(0% 0% 92% 0% round 28px)', opacity: 0.95 },
        {
          clipPath: 'inset(0% 0% 0% 0% round 28px)',
          opacity: 1,
          duration: 0.7,
          ease: 'power4.inOut',
        },
        '+=0.2'
      )
        // Stage 3: Central product enters
        .fromTo(
          cupWrapperRef.current,
          { y: 35, scale: 0.95, opacity: 0 },
          { y: 0, scale: 1, opacity: 1, duration: 0.55, ease: 'power3.out' },
          '-=0.2'
        )
        // Stage 4: Orbit cards enter gracefully
        .fromTo(
          carouselWrapperRef.current,
          { opacity: 0, scale: 0.92 },
          { opacity: 1, scale: 1, duration: 0.65, ease: 'power2.out' },
          '-=0.35'
        )
        // Stage 5: Minimal top metadata pills
        .fromTo(
          topUIRef.current,
          { opacity: 0, y: -8 },
          { opacity: 1, y: 0, duration: 0.45 },
          '-=0.3'
        )
        // Stage 6: Headline reveals
        .fromTo(
          headlineWrapperRef.current,
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.65, ease: 'power3.out' },
          '-=0.35'
        );

      // Atmospheric back fog continuous drift
      if (backFogRef.current) {
        gsap.to(backFogRef.current, {
          x: 16,
          duration: 7.5,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        });
      }

      // Foreground mist continuous drift
      if (foregroundFogRef.current) {
        gsap.to(foregroundFogRef.current, {
          x: -12,
          duration: 8.5,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        });
      }
    });

    return () => ctx.revert();
  }, []);

  // Autoplay rotation (cycles every ~1.8s after intro completes)
  useEffect(() => {
    if (!isAutoplaying || !introFinished) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => {
        setPrevIndex(prev);
        setIsTransitioning(true);
        setTimeout(() => setIsTransitioning(false), 450);
        return (prev + 1) % HERO_FLAVORS.length;
      });
    }, 1800);

    return () => clearInterval(timer);
  }, [isAutoplaying, introFinished]);

  // Subtle Multi-Depth Mouse Parallax (Desktop Only, §52)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!frameRef.current || window.innerWidth < 1024) return;
    const rect = frameRef.current.getBoundingClientRect();
    const xRel = (e.clientX - rect.left) / rect.width - 0.5;
    const yRel = (e.clientY - rect.top) / rect.height - 0.5;

    if (bgRef.current) {
      gsap.to(bgRef.current, {
        x: xRel * 2.5,
        y: yRel * 2.0,
        duration: 1.2,
        ease: 'power1.out',
      });
    }

    if (backFogRef.current) {
      gsap.to(backFogRef.current, {
        x: xRel * 3.5,
        y: yRel * 2.5,
        duration: 1.0,
        ease: 'power1.out',
      });
    }

    if (carouselWrapperRef.current) {
      gsap.to(carouselWrapperRef.current, {
        x: xRel * 4.5,
        y: yRel * 3.0,
        duration: 0.9,
        ease: 'power1.out',
      });
    }

    if (cupWrapperRef.current) {
      gsap.to(cupWrapperRef.current, {
        x: xRel * 2.0,
        y: yRel * 1.5,
        duration: 0.8,
        ease: 'power1.out',
      });
    }

    if (foregroundFogRef.current) {
      gsap.to(foregroundFogRef.current, {
        x: xRel * 5.0,
        y: yRel * 3.5,
        duration: 0.7,
        ease: 'power1.out',
      });
    }
  };

  const handleMouseLeave = () => {
    if (bgRef.current) gsap.to(bgRef.current, { x: 0, y: 0, duration: 0.8 });
    if (backFogRef.current) gsap.to(backFogRef.current, { x: 0, y: 0, duration: 0.8 });
    if (carouselWrapperRef.current) gsap.to(carouselWrapperRef.current, { x: 0, y: 0, duration: 0.8 });
    if (cupWrapperRef.current) gsap.to(cupWrapperRef.current, { x: 0, y: 0, duration: 0.8 });
    if (foregroundFogRef.current) gsap.to(foregroundFogRef.current, { x: 0, y: 0, duration: 0.8 });
  };

  const currentFlavor = HERO_FLAVORS[activeIndex];
  const previousFlavor = HERO_FLAVORS[prevIndex];

  return (
    <section
      id="home"
      className="w-full max-w-[1640px] mx-auto px-3 sm:px-6 lg:px-12 pt-20 sm:pt-24 md:pt-28 pb-4 flex flex-col items-center justify-center"
    >
      {/* Cinematic Experience Frame (84-88% width, 70-76% height, rounded 28px) */}
      <div
        ref={frameRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full aspect-auto sm:aspect-[4/3] h-[76svh] sm:h-auto max-h-[82vh] min-h-[560px] sm:min-h-[600px] md:min-h-[680px] rounded-[24px] sm:rounded-[28px] md:rounded-[32px] overflow-hidden bg-[#102315] shadow-[0_25px_60px_rgba(0,0,0,0.45)] border border-black/20 flex flex-col justify-between select-none"
      >
        {/* Layer 0: Background Environment Stage (Sculptural Powder Hills) */}
        <div
          ref={bgRef}
          className="absolute inset-0 w-full h-full bg-cover bg-center pointer-events-none opacity-95 scale-[1.02]"
          style={{
            backgroundImage: `url('${getAssetUrl('assets/environment/hero_stage_clean.jpg')}')`,
          }}
        />

        {/* Layer 1: Ambient Deep Matcha Radial Illumination */}
        <div className="absolute inset-0 bg-radial-gradient from-[#243A1C]/25 via-transparent to-[#0a150c]/80 pointer-events-none" />

        {/* Layer 2: Atmospheric Back Fog behind orbit cards */}
        <div
          ref={backFogRef}
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 opacity-35"
        >
          <div className="w-[550px] sm:w-[750px] h-[320px] bg-radial from-[#243A1C]/40 via-[#172E19]/20 to-transparent blur-[35px] rounded-full" />
        </div>

        {/* Layer 3: Minimal Top UI (Visible on sm+ screens) */}
        <div ref={topUIRef} className="w-full px-5 sm:px-9 pt-4 sm:pt-6 hidden sm:flex items-center justify-between z-40 relative">
          <div className="flex items-center gap-2 bg-[#102315]/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-xs text-[#f8f7f1] shadow-sm">
            <span className="font-japanese text-[11px] text-[#939458] font-bold">茶道</span>
            <span className="text-white/30">·</span>
            <span className="font-mono text-[10.5px] text-white/85">
              {locale === 'ar' ? 'فن إعداد الماتشا' : 'Matcha Craft'}
            </span>
          </div>

          <div className="flex items-center gap-1.5 bg-[#102315]/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-xs text-[#f8f7f1] shadow-sm">
            <span className="font-japanese text-[11px] text-[#939458] font-bold">茶道研究所</span>
            <span className="text-white/30">·</span>
            <span className="text-[10.5px] font-mono text-white/85">
              {locale === 'ar' ? 'مختبرات الشاي — جدة' : 'UENO SARYO · JEDDAH'}
            </span>
          </div>
        </div>

        {/* Layer 4: Central Stage (Curved Orbiting Cards + Central Drink) */}
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

          {/* Central Grounded Drink with Contact Shadow */}
          <div ref={cupWrapperRef} className="relative z-30 mb-4 sm:mb-8 md:mb-10">
            <CenterDrink
              currentFlavor={currentFlavor}
              previousFlavor={previousFlavor}
              isTransitioning={isTransitioning}
              onPriceTagClick={() => onOrderDrink(currentFlavor.id)}
            />
          </div>

          {/* Layer 5: Foreground Soft Mist across lower cup base */}
          <div
            ref={foregroundFogRef}
            className="absolute bottom-16 sm:bottom-20 inset-x-0 flex items-center justify-center pointer-events-none z-32 opacity-45"
          >
            <div className="w-[450px] sm:w-[650px] h-[80px] bg-gradient-to-t from-[#102315]/65 via-[#172E19]/20 to-transparent blur-[18px] rounded-full" />
          </div>
        </div>

        {/* Layer 6: Subtle Cinematic Film Grain Overlay (1.5% max) */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.02] mix-blend-overlay z-45"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Layer 7: Bottom Editorial Headline */}
        <HeroHeadline ref={headlineWrapperRef} />
      </div>
    </section>
  );
};
