import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { FLAVORS } from '../data/flavors';
import { ExperienceNavbar } from './ExperienceNavbar';
import { MatchaCup } from './MatchaCup';
import { FlavorCarousel } from './FlavorCarousel';
import { HeadlineSection } from './HeadlineSection';

export const MatchaExperience: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isAutoplaying, setIsAutoplaying] = useState(true);

  const frameRef = useRef<HTMLDivElement>(null);
  const cupWrapperRef = useRef<HTMLDivElement>(null);
  const mountainRef = useRef<HTMLDivElement>(null);
  const navbarRef = useRef<HTMLDivElement>(null);
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

  // Intro Animation Timeline matching reference video
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
      });

      // Stage 1: Expand inner frame vertically
      tl.fromTo(
        frameRef.current,
        { clipPath: 'inset(0% 0% 88% 0% round 34px)', opacity: 0.8 },
        {
          clipPath: 'inset(0% 0% 0% 0% round 34px)',
          opacity: 1,
          duration: 0.9,
          ease: 'power3.inOut',
        }
      )
        // Stage 2: Product & mountain reveal
        .fromTo(
          cupWrapperRef.current,
          { y: 50, scale: 0.92, opacity: 0 },
          { y: 0, scale: 1, opacity: 1, duration: 0.8 },
          '-=0.4'
        )
        .fromTo(
          mountainRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.75 },
          '-=0.6'
        )
        // Stage 3: Navbar slide down
        .fromTo(
          navbarRef.current,
          { y: -25, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          '-=0.45'
        )
        // Stage 4: Cards entrance along the arc
        .fromTo(
          carouselWrapperRef.current,
          { opacity: 0, scale: 0.88 },
          { opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out' },
          '-=0.35'
        )
        // Stage 5: Headline reveal
        .fromTo(
          headlineRef.current,
          { y: 35, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          '-=0.5'
        );
    });

    return () => ctx.revert();
  }, []);

  // Autoplay flavor rotation (cycles every ~1.5s after intro completes)
  useEffect(() => {
    if (!isAutoplaying) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % FLAVORS.length);
    }, 1800);

    return () => clearInterval(timer);
  }, [isAutoplaying]);

  // Subtle Mouse Parallax
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!frameRef.current || window.innerWidth < 1024) return;
    const rect = frameRef.current.getBoundingClientRect();
    const xRel = (e.clientX - rect.left) / rect.width - 0.5;
    const yRel = (e.clientY - rect.top) / rect.height - 0.5;

    if (cupWrapperRef.current) {
      gsap.to(cupWrapperRef.current, {
        x: xRel * 12,
        y: yRel * 8,
        duration: 0.8,
        ease: 'power1.out',
      });
    }
    if (mountainRef.current) {
      gsap.to(mountainRef.current, {
        x: xRel * 6,
        duration: 0.8,
        ease: 'power1.out',
      });
    }
  };

  const handleMouseLeave = () => {
    if (cupWrapperRef.current) {
      gsap.to(cupWrapperRef.current, { x: 0, y: 0, duration: 0.6 });
    }
    if (mountainRef.current) {
      gsap.to(mountainRef.current, { x: 0, duration: 0.6 });
    }
  };

  const currentFlavor = FLAVORS[activeIndex];
  const previousFlavor = FLAVORS[prevIndex];

  return (
    <main className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-14 pb-8 pt-2 flex items-center justify-center">
      {/* Experience Frame */}
      <div
        ref={frameRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full aspect-[4/3] max-h-[82vh] min-h-[560px] sm:min-h-[640px] md:min-h-[720px] rounded-[28px] sm:rounded-[36px] overflow-hidden bg-[#162c19] shadow-matcha-frame border border-black/10 flex flex-col justify-between select-none"
      >
        {/* Background Atmosphere & Stage */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center pointer-events-none opacity-95"
          style={{ backgroundImage: `url('/assets/environment/hero_stage.png')` }}
        />

        {/* Ambient Dark Green Radial Light */}
        <div className="absolute inset-0 bg-radial-gradient from-[#244528]/40 via-transparent to-[#102213]/80 pointer-events-none" />

        {/* Top Inner Navbar */}
        <div ref={navbarRef}>
          <ExperienceNavbar />
        </div>

        {/* Central Stage: Orbiting Flavor Cards + Central Product */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Orbital Carousel Cards */}
          <div ref={carouselWrapperRef} className="absolute inset-0 z-20">
            <FlavorCarousel
              flavors={FLAVORS}
              activeIndex={activeIndex}
              onSelectFlavor={handleSelectFlavor}
              isAutoplaying={isAutoplaying}
              setIsAutoplaying={setIsAutoplaying}
            />
          </div>

          {/* Central Drink Cup */}
          <div ref={cupWrapperRef} className="relative z-30 mb-8 sm:mb-12">
            <MatchaCup
              currentFlavor={currentFlavor}
              previousFlavor={previousFlavor}
              isTransitioning={isTransitioning}
              onPriceTagClick={() => {
                alert(`Added ${currentFlavor.name} Matcha Tea (${currentFlavor.price}) to cart!`);
              }}
            />
          </div>
        </div>

        {/* Mountain Base Landscape */}
        <div
          ref={mountainRef}
          className="absolute bottom-0 left-0 right-0 w-full h-[40%] bg-contain bg-bottom bg-no-repeat pointer-events-none z-20"
          style={{ backgroundImage: `url('/assets/environment/mountain_foreground.png')` }}
        />

        {/* Bottom Editorial Headline */}
        <div ref={headlineRef}>
          <HeadlineSection />
        </div>
      </div>
    </main>
  );
};
