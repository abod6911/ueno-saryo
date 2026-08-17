import React from 'react';
import { useLanguage } from '../../i18n/context';
import { Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';
import { getAssetUrl } from '../../lib/assetUrl';
import { MatchaContour } from '../ui/MatchaContour';
import { TeaLabAnnotation } from '../ui/TeaLabAnnotation';
import { JapaneseSeal } from '../ui/JapaneseSeal';
import { AnimatedWords } from '../ui/AnimatedWords';
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
          {/* Left Column: Editorial Copy & Laboratory Pillars (Inline-Start Asymmetric Reveal) */}
          <RevealOnView
            variant="slide-inline-start"
            delay={0}
            className="lg:col-span-6 flex flex-col items-start gap-6"
          >
            {/* Specimen Index Annotation */}
            <TeaLabAnnotation
              index="LAB / 01"
              label={locale === 'ar' ? 'دراسة الماتشا الاحتفالية' : 'CEREMONIAL MATCHA STUDY'}
              kanji="濃茶 · 宇治"
              variant="minimal"
            />

            <div className="flex flex-col">
              <div className="flex items-center gap-3 mb-2">
                <span className="font-japanese text-xs sm:text-sm text-[#939458] tracking-widest uppercase font-medium">
                  茶道研究所 · 宇治抹茶
                </span>
                <JapaneseSeal char="研" size={20} variant="square" />
              </div>

              {/* Word-by-word Heading Reveal */}
              <AnimatedWords
                text={t.featuredMatcha.heading}
                as="h2"
                delay={100}
                className="font-headline text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.08]"
              />
            </div>

            <p className="text-xs sm:text-base text-[#f8f7f1]/80 leading-relaxed font-sans max-w-xl">
              {t.featuredMatcha.subheading}
            </p>

            {/* 3 Scientific Craft Pillars */}
            <div className="flex flex-col gap-3 w-full pt-2">
              <div className="bg-[#19321d]/80 rounded-[20px] p-4 sm:p-5 border border-white/10 flex items-start gap-4 shadow-sm hover:border-[#939458]/40 transition-colors">
                <div className="w-8 h-8 rounded-xl bg-[#29482a] flex items-center justify-center text-[#939458] shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-headline font-bold text-sm sm:text-base text-white">
                      {t.featuredMatcha.point1Title}
                    </h3>
                    <span className="font-mono text-[10px] text-[#939458]/80">21-DAY SHADE</span>
                  </div>
                  <p className="text-xs text-[#f8f7f1]/70 leading-relaxed">
                    {t.featuredMatcha.point1Desc}
                  </p>
                </div>
              </div>

              <div className="bg-[#19321d]/80 rounded-[20px] p-4 sm:p-5 border border-white/10 flex items-start gap-4 shadow-sm hover:border-[#939458]/40 transition-colors">
                <div className="w-8 h-8 rounded-xl bg-[#29482a] flex items-center justify-center text-[#939458] shrink-0 mt-0.5">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-headline font-bold text-sm sm:text-base text-white">
                      {t.featuredMatcha.point2Title}
                    </h3>
                    <span className="font-mono text-[10px] text-[#939458]/80">30g / HR MILL</span>
                  </div>
                  <p className="text-xs text-[#f8f7f1]/70 leading-relaxed">
                    {t.featuredMatcha.point2Desc}
                  </p>
                </div>
              </div>

              <div className="bg-[#19321d]/80 rounded-[20px] p-4 sm:p-5 border border-white/10 flex items-start gap-4 shadow-sm hover:border-[#939458]/40 transition-colors">
                <div className="w-8 h-8 rounded-xl bg-[#29482a] flex items-center justify-center text-[#939458] shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-headline font-bold text-sm sm:text-base text-white">
                      {t.featuredMatcha.point3Title}
                    </h3>
                    <span className="font-mono text-[10px] text-[#939458]/80">100% PURE UJI</span>
                  </div>
                  <p className="text-xs text-[#f8f7f1]/70 leading-relaxed">
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

              {/* Extraction Parameters Specimen Line */}
              <div className="absolute bottom-4 start-4 end-4 flex items-center justify-between text-xs text-white/90">
                <div className="flex items-center gap-2 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#939458]" />
                  <span className="font-mono text-[11px]">Ceremonial Grade 100%</span>
                </div>

                <div className="flex items-center gap-3 font-mono text-[10px] text-[#f8f7f1]/70 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15">
                  <span>3000K / 1.5M</span>
                  <span>·</span>
                  <span>PRONG CHASEN 100</span>
                  <span>·</span>
                  <span className="text-[#939458] font-bold">EXTRACTION / 75°C</span>
                </div>
              </div>

              {/* Floating Japanese Seal Stamp */}
              <div className="absolute top-4 end-4">
                <div className="bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/15 text-[11px] font-japanese text-[#f0ede1]">
                  石臼挽き宇治抹茶
                </div>
              </div>
            </div>
          </RevealOnView>
        </div>
      </div>
    </section>
  );
};
