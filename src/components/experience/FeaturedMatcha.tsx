import React from 'react';
import { useLanguage } from '../../i18n/context';
import { Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';

export const FeaturedMatcha: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="matcha-studied" className="w-full bg-[#122416] text-[#f8f7f1] py-20 sm:py-32 relative overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#29482a]/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-14 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Editorial Copy */}
          <div className="lg:col-span-6 flex flex-col items-start gap-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-xs font-mono uppercase tracking-widest text-[#939458] border border-white/10">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.featuredMatcha.badge}</span>
            </div>

            <div className="flex flex-col">
              <span className="font-japanese text-sm text-[#939458] tracking-widest uppercase mb-1">
                茶道研究所 · 宇治抹茶
              </span>
              <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.08]">
                {t.featuredMatcha.heading}
              </h2>
            </div>

            <p className="text-xs sm:text-base text-[#f8f7f1]/75 leading-relaxed font-sans">
              {t.featuredMatcha.subheading}
            </p>

            {/* 3 Scientific Craft Pillars */}
            <div className="flex flex-col gap-4 w-full pt-2">
              <div className="bg-[#19321d]/80 rounded-2xl p-4 sm:p-5 border border-white/10 flex items-start gap-4">
                <div className="w-8 h-8 rounded-xl bg-[#29482a] flex items-center justify-center text-[#939458] shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="font-headline font-bold text-sm sm:text-base text-white">
                    {t.featuredMatcha.point1Title}
                  </h3>
                  <p className="text-xs text-[#f8f7f1]/65 leading-relaxed">
                    {t.featuredMatcha.point1Desc}
                  </p>
                </div>
              </div>

              <div className="bg-[#19321d]/80 rounded-2xl p-4 sm:p-5 border border-white/10 flex items-start gap-4">
                <div className="w-8 h-8 rounded-xl bg-[#29482a] flex items-center justify-center text-[#939458] shrink-0 mt-0.5">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="font-headline font-bold text-sm sm:text-base text-white">
                    {t.featuredMatcha.point2Title}
                  </h3>
                  <p className="text-xs text-[#f8f7f1]/65 leading-relaxed">
                    {t.featuredMatcha.point2Desc}
                  </p>
                </div>
              </div>

              <div className="bg-[#19321d]/80 rounded-2xl p-4 sm:p-5 border border-white/10 flex items-start gap-4">
                <div className="w-8 h-8 rounded-xl bg-[#29482a] flex items-center justify-center text-[#939458] shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="font-headline font-bold text-sm sm:text-base text-white">
                    {t.featuredMatcha.point3Title}
                  </h3>
                  <p className="text-xs text-[#f8f7f1]/65 leading-relaxed">
                    {t.featuredMatcha.point3Desc}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Stage Showcase */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            <div className="relative w-full aspect-[4/3] max-w-[540px] rounded-[36px] bg-[#19321d] border border-white/15 overflow-hidden shadow-2xl group">
              {/* Product Photo */}
              <img
                src="/assets/products/menu_matcha_latte.jpg"
                alt="Ceremonial Matcha Preparation"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Subtle Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

              {/* Floating ingredient detail pills */}
              <div className="absolute top-6 start-6 z-20 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 text-[11px] text-[#f8f7f1] font-mono">
                Stone-ground Uji Tencha
              </div>

              <div className="absolute bottom-6 end-6 z-20 bg-[#f0ede1] text-[#122416] px-4 py-2 rounded-2xl font-bold text-xs shadow-lg">
                100% Ceremonial Grade
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
