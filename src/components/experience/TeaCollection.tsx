import React from 'react';
import { TEA_VARIETIES } from '../../data/teaExperience';
import { Thermometer, Clock, MapPin } from 'lucide-react';
import { MatchaContour } from '../ui/MatchaContour';
import { TeaLabAnnotation } from '../ui/TeaLabAnnotation';
import { JapaneseSeal } from '../ui/JapaneseSeal';
import { RevealOnView } from '../ui/RevealOnView';

export const TeaCollection: React.FC = () => {
  const { locale, t } = useLanguage();

  return (
    <section id="collection" className="w-full bg-[#122416] text-[#f8f7f1] pt-16 sm:pt-24 pb-4 relative overflow-hidden border-t border-white/10">
      {/* Background Decorative Specimen Coordinates */}
      <div className="absolute top-12 end-12 font-mono text-[10px] text-white/[0.05] select-none pointer-events-none hidden lg:block">
        ARCHIVE SPECIMENS / LEAF TO CUP · SHIZUOKA · UJI · YAME
      </div>

      <div className="max-w-[1640px] mx-auto px-3 sm:px-6 lg:px-12 relative z-10">
        {/* Section Header with Specimen Index */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <TeaLabAnnotation
            index="LAB / 03"
            label={
              locale === 'ar'
                ? 'أندر أوراق الشاي الياباني'
                : locale === 'zh-CN'
                ? '日本单一大产区原叶名茶'
                : 'SINGLE ORIGIN TEA ARCHIVE'
            }
            kanji="名茶 · 原葉標本"
            variant="minimal"
            className="mb-4 sm:mb-5"
          />

          <div className="flex items-center gap-3 mb-4 sm:mb-5">
            <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-normal leading-[1.28] sm:leading-[1.22]">
              {t.teaExperience.collectionHeading}
            </h2>
            <JapaneseSeal char="葉" size={24} variant="square" />
          </div>

          <p className="text-xs sm:text-base text-[#f8f7f1]/75 leading-relaxed font-sans max-w-2xl pt-0.5">
            {t.teaExperience.collectionSubheading}
          </p>
        </div>

        {/* Tea Varieties Grid — Archival Specimen Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-8">
          {TEA_VARIETIES.map((tea, idx) => {
            const name =
              locale === 'ar'
                ? tea.nameAr
                : locale === 'zh-CN'
                ? tea.nameZh || tea.nameEn
                : tea.nameEn;
            const type =
              locale === 'ar'
                ? tea.typeAr
                : locale === 'zh-CN'
                ? tea.typeZh || tea.typeEn
                : tea.typeEn;
            const origin =
              locale === 'ar'
                ? tea.originAr
                : locale === 'zh-CN'
                ? tea.originZh || tea.originEn
                : tea.originEn;
            const description =
              locale === 'ar'
                ? tea.descriptionAr
                : locale === 'zh-CN'
                ? tea.descriptionZh || tea.descriptionEn
                : tea.descriptionEn;
            const flavorProfile =
              locale === 'ar'
                ? tea.flavorProfileAr
                : locale === 'zh-CN'
                ? tea.flavorProfileZh || tea.flavorProfileEn
                : tea.flavorProfileEn;

            return (
              <RevealOnView
                key={tea.id}
                variant="signature-rise"
                delay={idx * 60}
                className="h-full"
              >
                <div className="h-full bg-[#19321d]/90 backdrop-blur-md rounded-[22px] sm:rounded-[26px] p-6 sm:p-7 border border-white/10 hover:border-[#939458]/40 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 shadow-lg">
                  <div className="flex flex-col">
                    {/* Top Category & Kanji */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10.5px] font-bold text-[#939458]">
                          {tea.specimenCode}
                        </span>
                        <span className="text-[10px] font-sans font-semibold text-[#f8f7f1]/80 bg-white/10 px-2.5 py-0.5 rounded-full border border-white/5">
                          {type}
                        </span>
                      </div>
                      <span className="font-japanese text-base text-white/40 group-hover:text-[#939458] transition-colors font-medium">
                        {tea.nameJa}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-headline text-xl sm:text-2xl font-bold text-white mb-2 leading-tight group-hover:text-[#939458] transition-colors">
                      {name}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-[#f8f7f1]/75 leading-relaxed mb-4 font-sans">
                      {description}
                    </p>

                    {/* Flavor Profile Pills */}
                    {flavorProfile && flavorProfile.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {flavorProfile.map((note, noteIdx) => (
                          <span
                            key={noteIdx}
                            className="text-[10px] font-sans text-white/70 bg-[#122416]/60 border border-white/5 px-2 py-0.5 rounded-md"
                          >
                            {note}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Brewing Parameters Specimen Card Bottom */}
                  <div className="border-t border-white/10 pt-4 flex items-center justify-between text-xs text-[#f8f7f1]/70 font-mono">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#939458]" />
                      <span className="truncate max-w-[90px]">{origin}</span>
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
              </RevealOnView>
            );
          })}
        </div>
      </div>

      {/* Bottom Organic Transition to Olive Canvas */}
      <MatchaContour variant="divider-shallow" fill="#9b9b57" className="w-full mt-4 -mb-1 transform-gpu" />
    </section>
  );
};
