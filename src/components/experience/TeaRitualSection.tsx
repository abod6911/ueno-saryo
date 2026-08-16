import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { useLanguage } from '../../i18n/context';
import { getAssetUrl } from '../../lib/assetUrl';
import { ArrowUpRight, Sparkles, Compass } from 'lucide-react';

interface TeaRitualSectionProps {
  onOpenMenu: () => void;
}

export const TeaRitualSection: React.FC<TeaRitualSectionProps> = ({ onOpenMenu }) => {
  const { t, locale } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  // Smooth Viewport Entrance using GSAP
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Entrance reveal when section enters viewport
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              gsap.fromTo(
                el,
                { opacity: 0, y: 30, clipPath: 'inset(4% 0% 4% 0% round 28px)' },
                {
                  opacity: 1,
                  y: 0,
                  clipPath: 'inset(0% 0% 0% 0% round 28px)',
                  duration: 0.9,
                  ease: 'power3.out',
                }
              );

              if (contentRef.current) {
                gsap.fromTo(
                  contentRef.current.children,
                  { opacity: 0, y: 20 },
                  {
                    opacity: 1,
                    y: 0,
                    stagger: 0.12,
                    duration: 0.7,
                    ease: 'power2.out',
                    delay: 0.2,
                  }
                );
              }

              // Play video when visible
              if (videoRef.current) {
                videoRef.current.play().catch(() => {});
              }
              observer.disconnect();
            }
          });
        },
        { threshold: 0.15 }
      );

      observer.observe(el);

      return () => observer.disconnect();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleVisitClick = () => {
    const el = document.getElementById('visit');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="ritual"
      className="w-full max-w-[1640px] mx-auto px-3 sm:px-6 lg:px-12 py-6 sm:py-10 flex flex-col items-center justify-center relative"
      aria-label={locale === 'ar' ? 'طقوس الشاي' : 'The Tea Ritual'}
    >
      {/* Cinematic Video Stage Container */}
      <div
        ref={containerRef}
        className="relative w-full aspect-auto min-h-[520px] sm:min-h-[580px] md:min-h-[640px] lg:min-h-[680px] rounded-[24px] sm:rounded-[28px] md:rounded-[32px] overflow-hidden bg-[#102315] shadow-[0_25px_60px_rgba(0,0,0,0.45)] border border-black/20 flex flex-col justify-between"
      >
        {/* 1. Background Optimized Video Layer */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster={getAssetUrl('assets/experience/step4_whisk.jpg')}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none transform-gpu scale-[1.01]"
        >
          <source src={getAssetUrl('reference.mp4')} type="video/mp4" />
        </video>

        {/* 2. Cinematic Deep Matcha Gradient & Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#09150b]/95 via-[#102315]/45 to-[#08120a]/70 pointer-events-none z-10" />
        <div className="absolute inset-0 bg-radial-gradient from-[#243A1C]/25 via-transparent to-[#0a150c]/85 pointer-events-none z-10" />

        {/* 3. Top Floating Brand & Craft Badge */}
        <div className="w-full p-6 sm:p-8 md:p-10 flex items-center justify-between z-20 relative">
          <div className="flex items-center gap-2 bg-[#102315]/75 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 text-xs text-[#f8f7f1] shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#d1ce8a]" />
            <span className="font-mono text-[11px] text-white/90">
              {locale === 'ar' ? 'مختبرات الشاي · الفلسفة والحرفة' : 'UENO SARYO · THE CRAFT'}
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2 font-japanese text-xs text-[#d1ce8a] bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
            茶道の一期一会
          </div>
        </div>

        {/* 4. Editorial Content Lockup (Bottom-Start Positioned) */}
        <div
          ref={contentRef}
          className="w-full p-6 sm:p-10 md:p-14 z-20 relative flex flex-col items-start justify-end"
        >
          {/* Eyebrow */}
          <span className="text-[10.5px] sm:text-xs font-japanese text-[#d1ce8a] tracking-widest uppercase mb-2 drop-shadow-sm font-semibold">
            {t.teaRitual.eyebrow}
          </span>

          {/* Heading */}
          <h2 className="font-headline text-[28px] sm:text-[40px] md:text-[52px] lg:text-[60px] font-extrabold text-white leading-[1.08] tracking-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)] max-w-2xl">
            <span>{t.teaRitual.headlinePart1}</span>
            <br />
            <span className="text-[#ede9de]">{t.teaRitual.headlinePart2}</span>
          </h2>

          {/* Description */}
          <p className="text-xs sm:text-sm md:text-base text-[#f8f7f1]/85 max-w-xl mt-3 font-sans leading-relaxed drop-shadow-md">
            {t.teaRitual.description}
          </p>

          {/* CTAs Lockup (Max 2 CTAs) */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-6 sm:mt-8">
            <button
              type="button"
              onClick={onOpenMenu}
              className="bg-[#EFEDE3] text-[#122416] hover:bg-white hover:scale-105 active:scale-95 transition-all duration-300 font-headline font-bold text-xs sm:text-sm px-6 sm:px-7 py-3.5 rounded-full shadow-[0_10px_25px_rgba(0,0,0,0.35)] flex items-center gap-2 group cursor-pointer"
            >
              <span>{t.teaRitual.exploreMenu}</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>

            <button
              type="button"
              onClick={handleVisitClick}
              className="bg-[#102315]/80 hover:bg-[#1a331c] backdrop-blur-md text-[#f8f7f1] hover:text-white border border-white/20 text-xs sm:text-sm px-5 sm:px-6 py-3.5 rounded-full transition-all duration-300 flex items-center gap-2 shadow-sm cursor-pointer hover:border-white/40"
            >
              <Compass className="w-4 h-4 text-[#d1ce8a]" />
              <span>{t.teaRitual.visitUs}</span>
            </button>
          </div>
        </div>

        {/* 5. Contextual Tea Ritual Control Pill (Floating at bottom-end) */}
        <div className="absolute bottom-6 end-6 sm:bottom-10 sm:end-10 z-30 hidden lg:flex items-center gap-1.5 bg-[#102315]/80 backdrop-blur-md p-1.5 rounded-full border border-white/15 shadow-xl">
          {t.teaRitual.steps.map((step, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveStep(idx)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all duration-300 ${
                activeStep === idx
                  ? 'bg-[#EFEDE3] text-[#122416] font-bold shadow-sm'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              {step}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
