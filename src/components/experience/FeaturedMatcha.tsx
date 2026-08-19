import React from 'react';
import { useLanguage } from '../../i18n/context';
import { Sparkles, ShieldCheck, Leaf, Compass } from 'lucide-react';
import { getAssetUrl } from '../../lib/assetUrl';
import { MatchaContour } from '../ui/MatchaContour';
import { TeaLabAnnotation } from '../ui/TeaLabAnnotation';
import { JapaneseSeal } from '../ui/JapaneseSeal';
import { RevealOnView } from '../ui/RevealOnView';

export const FeaturedMatcha: React.FC = () => {
  const { t, locale } = useLanguage();

  return (
    <section id="matcha-studied" className="w-full bg-[#122416] text-[#f8f7f1] relative overflow-hidden">
      {/* Top Organic Matcha Contour Transition */}
      <MatchaContour variant="hero-flow" fill="#122416" className="w-full -mt-1 transform-gpu" />

      {/* Large Subtle Editorial Typography Background */}
      <div className="absolute top-1/2 -start-10 -translate-y-1/2 text-[140px] sm:text-[220px] font-headline font-black text-white/[0.015] pointer-events-none select-none tracking-tighter">
        MATCHA
      </div>

      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#29482a]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1640px] mx-auto px-3 sm:px-6 lg:px-12 py-16 sm:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Editorial Copy & Laboratory Pillars */}
          <RevealOnView
            variant="slide-inline-start"
            delay={0}
            className="lg:col-span-6 flex flex-col items-start gap-6"
          >
            {/* Specimen Index Annotation */}
            <TeaLabAnnotation
              index="LAB / 01"
              label={
                locale === 'ar'
                  ? 'دراسة الماتشا الاحتفالية'
                  : locale === 'zh-CN'
                  ? '仪式级抹茶研析'
                  : 'CEREMONIAL MATCHA STUDY'
              }
              kanji="濃茶 · 宇治"
              variant="minimal"
            />

            <div className="flex flex-col">
              <div className="flex items-center gap-3 mb-2.5">
                <span className="font-japanese text-xs sm:text-sm text-[#939458] tracking-widest uppercase font-medium">
                  茶道研究所 · 宇治抹茶
                </span>
                <JapaneseSeal char="研" size={20} variant="square" />
              </div>

              {/* Signature Rise Heading Reveal */}
              <RevealOnView variant="signature-rise" delay={100}>
                <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-normal leading-[1.12]">
                  {t.featuredMatcha.heading}
                </h2>
              </RevealOnView>
            </div>

            <p className="text-xs sm:text-base text-[#f8f7f1]/80 leading-relaxed font-sans max-w-xl">
              {t.featuredMatcha.subheading}
            </p>

            {/* 3 Scientific Craft Pillars — Refined Architectural Rail */}
            <div className="flex flex-col gap-3.5 w-full pt-2">
              {/* Pillar 01: Shaded Tencha */}
              <div className="bg-[#19321d]/90 backdrop-blur-md rounded-[22px] p-4 sm:p-5 border border-white/10 flex items-start gap-4 shadow-sm hover:border-[#939458]/40 transition-all group">
                <div className="w-9 h-9 rounded-xl bg-[#29482a] flex items-center justify-center text-[#939458] shrink-0 mt-0.5 shadow-inner">
                  <Leaf className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[11px] font-bold text-[#939458]">01</span>
                      <h3 className="font-headline font-bold text-sm sm:text-base text-white">
                        {t.featuredMatcha.point1Title}
                      </h3>
                    </div>
                    <span className="font-mono text-[10px] text-[#939458] bg-[#122416]/80 px-2 py-0.5 rounded-md border border-white/5">
                      21-DAY SHADE
                    </span>
                  </div>
                  <p className="text-xs text-[#f8f7f1]/70 leading-relaxed font-sans">
                    {t.featuredMatcha.point1Desc}
                  </p>
                </div>
              </div>

              {/* Pillar 02: Granite Mill */}
              <div className="bg-[#19321d]/90 backdrop-blur-md rounded-[22px] p-4 sm:p-5 border border-white/10 flex items-start gap-4 shadow-sm hover:border-[#939458]/40 transition-all group">
                <div className="w-9 h-9 rounded-xl bg-[#29482a] flex items-center justify-center text-[#939458] shrink-0 mt-0.5 shadow-inner">
                  <Sparkles className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[11px] font-bold text-[#939458]">02</span>
                      <h3 className="font-headline font-bold text-sm sm:text-base text-white">
                        {t.featuredMatcha.point2Title}
                      </h3>
                    </div>
                    <span className="font-mono text-[10px] text-[#939458] bg-[#122416]/80 px-2 py-0.5 rounded-md border border-white/5">
                      30g / HR MILL
                    </span>
                  </div>
                  <p className="text-xs text-[#f8f7f1]/70 leading-relaxed font-sans">
                    {t.featuredMatcha.point2Desc}
                  </p>
                </div>
              </div>

              {/* Pillar 03: Fresh Fruit Puree */}
              <div className="bg-[#19321d]/90 backdrop-blur-md rounded-[22px] p-4 sm:p-5 border border-white/10 flex items-start gap-4 shadow-sm hover:border-[#939458]/40 transition-all group">
                <div className="w-9 h-9 rounded-xl bg-[#29482a] flex items-center justify-center text-[#939458] shrink-0 mt-0.5 shadow-inner">
                  <ShieldCheck className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[11px] font-bold text-[#939458]">03</span>
                      <h3 className="font-headline font-bold text-sm sm:text-base text-white">
                        {t.featuredMatcha.point3Title}
                      </h3>
                    </div>
                    <span className="font-mono text-[10px] text-[#939458] bg-[#122416]/80 px-2 py-0.5 rounded-md border border-white/5">
                      100% BOTANICAL
                    </span>
                  </div>
                  <p className="text-xs text-[#f8f7f1]/70 leading-relaxed font-sans">
                    {t.featuredMatcha.point3Desc}
                  </p>
                </div>
              </div>
            </div>
          </RevealOnView>

          {/* Right Column: Visual Stage with Signature Rise Motion */}
          <RevealOnView
            variant="signature-rise"
            delay={100}
            className="lg:col-span-6 flex flex-col items-center justify-center"
          >
            <div className="relative w-full max-w-[540px] aspect-[4/3] matcha-organic-crop overflow-hidden border border-white/15 shadow-2xl group bg-[#19321d]">
              <img
                src={getAssetUrl('assets/products/menu_matcha_latte.jpg')}
                alt="Ceremonial Matcha Extraction"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="eager"
                decoding="async"
              />

              {/* Ambient Shadow Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

              {/* Terroir & Coordinates Stamp Top */}
              <div className="absolute top-4 start-4 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15">
                <Compass className="w-3.5 h-3.5 text-[#939458]" />
                <span className="font-mono text-[10.5px] text-white/90">UJI · 34.88°N, 135.81°E</span>
              </div>

              {/* Floating Japanese Seal Stamp Top-End */}
              <div className="absolute top-4 end-4">
                <div className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15 text-[11px] font-japanese text-[#f0ede1]">
                  石臼挽き宇治抹茶
                </div>
              </div>

              {/* Extraction Parameters Specimen Line Bottom */}
              <div className="absolute bottom-4 start-4 end-4 flex items-center justify-between text-xs text-white/90">
                <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#939458]" />
                  <span className="font-mono text-[11px]">Ceremonial Grade 100%</span>
                </div>

                <div className="flex items-center gap-2 font-mono text-[10px] text-[#f8f7f1]/80 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15">
                  <span>100-CHASEN</span>
                  <span>·</span>
                  <span className="text-[#939458] font-bold">EXTRACTION 75°C</span>
                </div>
              </div>
            </div>
          </RevealOnView>
        </div>
      </div>
    </section>
  );
};
