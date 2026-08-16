import React from 'react';
import { TEA_VARIETIES } from '../../data/teaExperience';
import { useLanguage } from '../../i18n/context';
import { Thermometer, Clock, MapPin, Sparkles } from 'lucide-react';
import { MatchaContour } from '../ui/MatchaContour';

export const TeaCollection: React.FC = () => {
  const { locale, t } = useLanguage();

  return (
    <section id="collection" className="w-full bg-[#122416] text-[#f8f7f1] pt-16 sm:pt-24 pb-4 relative overflow-hidden border-t border-white/10">
      <div className="max-w-[1640px] mx-auto px-3 sm:px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[11px] font-mono text-[#939458] font-bold tracking-wider">
              03 / {locale === 'ar' ? 'تشكيلة الشاي' : 'COLLECTION'}
            </span>
            <span className="w-1 h-1 rounded-full bg-[#939458]/50" />
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/10 text-xs font-mono uppercase tracking-widest text-[#939458] border border-white/10">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{locale === 'ar' ? 'أندر أوراق الشاي' : 'Single Origin Leaves'}</span>
            </div>
          </div>

          <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-3">
            {t.teaExperience.collectionHeading}
          </h2>

          <p className="text-xs sm:text-base text-[#f8f7f1]/75 leading-relaxed font-sans max-w-2xl">
            {t.teaExperience.collectionSubheading}
          </p>
        </div>

        {/* Tea Varieties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-8">
          {TEA_VARIETIES.map((tea) => {
            const name = locale === 'ar' ? tea.nameAr : tea.nameEn;
            const type = locale === 'ar' ? tea.typeAr : tea.typeEn;
            const origin = locale === 'ar' ? tea.originAr : tea.originEn;
            const description = locale === 'ar' ? tea.descriptionAr : tea.descriptionEn;

            return (
              <div
                key={tea.id}
                className="bg-[#19321d]/80 backdrop-blur-md rounded-[22px] sm:rounded-[24px] p-6 sm:p-7 border border-white/10 hover:border-[#939458]/40 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 shadow-lg"
              >
                <div className="flex flex-col">
                  {/* Top Category & Kanji */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10.5px] font-mono uppercase tracking-wider text-[#939458] bg-white/5 px-2.5 py-0.5 rounded-full border border-white/5 font-semibold">
                      {type}
                    </span>
                    <span className="font-japanese text-base text-white/40 group-hover:text-[#939458] transition-colors font-medium">
                      {tea.nameJa}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-headline text-xl sm:text-2xl font-bold text-white mb-2 leading-tight">
                    {name}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-[#f8f7f1]/70 leading-relaxed mb-6 font-sans">
                    {description}
                  </p>
                </div>

                {/* Brewing Parameters Card Bottom */}
                <div className="border-t border-white/10 pt-4 flex items-center justify-between text-xs text-[#f8f7f1]/60 font-mono">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#939458]" />
                    <span className="truncate max-w-[80px]">{origin}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Thermometer className="w-3.5 h-3.5 text-[#939458]" />
                    <span>{tea.steepTemp}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#939458]" />
                    <span>{tea.steepTime}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Organic Transition to Olive Canvas */}
      <MatchaContour variant="divider-shallow" fill="#9b9b57" className="w-full mt-4 -mb-1 transform-gpu" />
    </section>
  );
};
