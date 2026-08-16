import React from 'react';
import { useLanguage } from '../../i18n/context';
import { Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';
import { getAssetUrl } from '../../lib/assetUrl';
import { MatchaContour } from '../ui/MatchaContour';
import { TeaLabAnnotation } from '../ui/TeaLabAnnotation';
import { JapaneseSeal } from '../ui/JapaneseSeal';

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
          <div className="lg:col-span-6 flex flex-col items-start gap-6">
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
              <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.08]">
                {t.featuredMatcha.heading}
              </h2>
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
          </div>

          {/* Right Column: Visual Stage Showcase with Tea Lab Annotations */}
          <div className="lg:col-span-6 relative flex flex-col items-center justify-center">
            {/* Subtle Vertical Japanese Accent */}
            <div className="absolute -end-3 sm:-end-6 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-2 font-japanese text-[11px] text-[#939458]/50 select-none writing-vertical-rl pointer-events-none">
              一期一会 · 宇治手摘み · 本生抹茶
            </div>

            <div className="relative w-full aspect-[4/3] max-w-[540px] matcha-organic-crop bg-[#19321d] border border-white/15 overflow-hidden shadow-2xl group">
              {/* Product Photo */}
              <img
                src={getAssetUrl('assets/products/menu_matcha_latte.jpg')}
                alt="Ceremonial Matcha Preparation"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
                decoding="async"
              />

              {/* Subtle Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

              {/* Top Specimen Tag */}
              <div className="absolute top-5 start-5 z-20 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/15 text-[10.5px] text-[#f8f7f1] font-mono flex items-center gap-2 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Stone-ground Uji Tencha</span>
              </div>

              {/* Bottom Certificate Badge */}
              <div className="absolute bottom-5 end-5 z-20 bg-[#f0ede1] text-[#122416] px-4 py-2 rounded-2xl font-bold text-xs shadow-lg flex items-center gap-2">
                <span>100% Ceremonial Grade</span>
                <JapaneseSeal char="印" size={16} variant="circle" />
              </div>
            </div>

            {/* Microscopic Specimen Metadata Line Beneath Photo */}
            <div className="w-full max-w-[540px] mt-4 flex items-center justify-between text-[10px] font-mono text-white/40 px-2 select-none">
              <span>EXTRACTION · 75°C</span>
              <span className="text-[#939458]">100-PRONG CHASEN</span>
              <span>JEDDAH · LAB</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Organic Matcha Contour Transition to Next Section */}
      <MatchaContour variant="ridge-soft" fill="#122416" flip className="w-full -mb-1 rotate-180 transform-gpu" />
    </section>
  );
};
