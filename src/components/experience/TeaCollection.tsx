import React from 'react';
import { TEA_VARIETIES } from '../../data/teaExperience';
import { useLanguage } from '../../i18n/context';
import { Thermometer, Clock, MapPin, Sparkles } from 'lucide-react';

export const TeaCollection: React.FC = () => {
  const { locale, t } = useLanguage();

  return (
    <section id="collection" className="w-full bg-[#122416] text-[#f8f7f1] py-20 sm:py-32 relative overflow-hidden border-t border-white/10">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-14 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-xs font-mono uppercase tracking-widest text-[#939458] border border-white/10 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{locale === 'ar' ? 'أندر أوراق الشاي' : 'Single Origin Leaves'}</span>
          </div>

          <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            {t.teaExperience.collectionHeading}
          </h2>

          <p className="text-xs sm:text-base text-[#f8f7f1]/70 leading-relaxed font-sans">
            {t.teaExperience.collectionSubheading}
          </p>
        </div>

        {/* Tea Varieties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {TEA_VARIETIES.map((tea) => {
            const name = locale === 'ar' ? tea.nameAr : tea.nameEn;
            const type = locale === 'ar' ? tea.typeAr : tea.typeEn;
            const origin = locale === 'ar' ? tea.originAr : tea.originEn;
            const description = locale === 'ar' ? tea.descriptionAr : tea.descriptionEn;

            return (
              <div
                key={tea.id}
                className="bg-[#19321d]/75 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/10 hover:border-[#939458]/40 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 shadow-lg"
              >
                <div className="flex flex-col">
                  {/* Top Category & Kanji */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#939458] bg-white/5 px-2.5 py-1 rounded-full border border-white/5">
                      {type}
                    </span>
                    <span className="font-japanese text-base text-white/40 group-hover:text-[#939458] transition-colors">
                      {tea.nameJa}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-headline text-xl sm:text-2xl font-bold text-white mb-2">
                    {name}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-[#f8f7f1]/70 leading-relaxed mb-6 font-sans">
                    {description}
                  </p>
                </div>

                {/* Technical Brewing Metrics */}
                <div className="pt-4 border-t border-white/10 grid grid-cols-3 gap-2 text-center text-xs font-mono text-[#f8f7f1]/80">
                  <div className="flex flex-col items-center bg-black/20 rounded-xl p-2">
                    <div className="flex items-center gap-1 text-[#939458] text-[10px] uppercase mb-0.5">
                      <Thermometer className="w-3 h-3" />
                      <span>{t.teaExperience.temp}</span>
                    </div>
                    <span className="font-bold text-white">{tea.steepTemp}</span>
                  </div>

                  <div className="flex flex-col items-center bg-black/20 rounded-xl p-2">
                    <div className="flex items-center gap-1 text-[#939458] text-[10px] uppercase mb-0.5">
                      <Clock className="w-3 h-3" />
                      <span>{t.teaExperience.steep}</span>
                    </div>
                    <span className="font-bold text-white">{tea.steepTime}</span>
                  </div>

                  <div className="flex flex-col items-center bg-black/20 rounded-xl p-2">
                    <div className="flex items-center gap-1 text-[#939458] text-[10px] uppercase mb-0.5">
                      <MapPin className="w-3 h-3" />
                      <span>{t.teaExperience.origin}</span>
                    </div>
                    <span className="font-bold text-white truncate max-w-[80px]">
                      {origin}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
