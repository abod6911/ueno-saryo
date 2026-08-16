import React, { useState } from 'react';
import { TEA_LAB_STEPS } from '../../data/teaExperience';
import { useLanguage } from '../../i18n/context';
import { Sparkles, ArrowRight } from 'lucide-react';
import { TeaLabAnnotation } from '../ui/TeaLabAnnotation';
import { JapaneseSeal } from '../ui/JapaneseSeal';

export const TeaLabProcess: React.FC = () => {
  const { locale, t } = useLanguage();
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const activeStep = TEA_LAB_STEPS[activeStepIndex];

  return (
    <section id="tea-experience" className="w-full bg-[#19321d] text-[#f8f7f1] py-16 sm:py-24 relative overflow-hidden border-t border-white/10">
      {/* Background Decorative Kanji */}
      <div className="absolute top-10 start-8 text-[120px] sm:text-[180px] font-japanese font-black text-white/[0.02] pointer-events-none select-none">
        点前
      </div>

      <div className="max-w-[1640px] mx-auto px-3 sm:px-6 lg:px-12 relative z-10">
        {/* Section Header with Specimen Index */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <TeaLabAnnotation
            index="LAB / 02"
            label={locale === 'ar' ? 'مراحل وفلسفة التحضير' : 'TEA EXTRACTION CEREMONY'}
            kanji="点前 · 精密抽出"
            variant="minimal"
            className="mb-3"
          />

          <div className="flex items-center gap-3 mb-3">
            <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              {t.teaExperience.heading}
            </h2>
            <JapaneseSeal char="道" size={24} variant="square" />
          </div>

          <p className="text-xs sm:text-base text-[#f8f7f1]/75 leading-relaxed font-sans max-w-2xl">
            {t.teaExperience.subheading}
          </p>
        </div>

        {/* 5-Step Process Tabs Navigation */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-8 sm:mb-10">
          {TEA_LAB_STEPS.map((step, idx) => {
            const isActive = idx === activeStepIndex;
            const name = locale === 'ar' ? step.nameAr : step.nameEn;

            return (
              <button
                key={step.number}
                type="button"
                onClick={() => setActiveStepIndex(idx)}
                className={`min-h-[70px] sm:min-h-[85px] p-3.5 sm:p-4 rounded-[18px] sm:rounded-[20px] flex flex-col justify-between text-start transition-all duration-300 active:scale-95 border cursor-pointer ${
                  isActive
                    ? 'bg-[#EFEDE3] text-[#122416] shadow-card border-transparent ring-2 ring-white/20'
                    : 'bg-[#122416]/60 hover:bg-[#122416] text-white/80 border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-mono text-xs font-bold text-[#939458]">
                    {step.number}
                  </span>
                  <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-[#29482a]' : 'bg-white/20'}`} />
                </div>

                <div className="flex flex-col mt-2">
                  <span className="font-headline text-xs sm:text-sm font-bold truncate">
                    {name}
                  </span>
                  {step.nameJa && (
                    <span className={`text-[10px] font-japanese ${isActive ? 'text-[#122416]/60' : 'text-white/40'}`}>
                      {step.nameJa}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Step Detailed Showcase Stage */}
        <div className="w-full bg-[#122416] rounded-[24px] sm:rounded-[28px] p-6 sm:p-10 lg:p-12 border border-white/12 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-12">
          {/* Left: Step Information */}
          <div className="flex-1 flex flex-col items-start gap-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl sm:text-4xl font-mono font-extrabold text-[#939458]">
                {activeStep.number}
              </span>
              <div className="w-px h-8 bg-white/20" />
              <div className="flex flex-col">
                <span className="font-japanese text-xs text-[#939458] tracking-wider uppercase font-semibold">
                  {activeStep.nameJa}
                </span>
                <h3 className="font-headline text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                  {locale === 'ar' ? activeStep.nameAr : activeStep.nameEn}
                </h3>
              </div>
            </div>

            <p className="text-sm sm:text-base text-[#f8f7f1]/85 leading-relaxed pt-2 font-sans">
              {locale === 'ar' ? activeStep.descriptionAr : activeStep.descriptionEn}
            </p>

            <div className="w-full p-4 rounded-[16px] bg-white/5 border border-white/10 text-xs text-[#939458] flex items-start gap-3 mt-2">
              <Sparkles className="w-4 h-4 shrink-0 mt-0.5 text-[#939458]" />
              <p className="text-white/80 leading-relaxed font-sans">
                {locale === 'ar' ? activeStep.scientificNoteAr : activeStep.scientificNoteEn}
              </p>
            </div>

            {/* Next Step Shortcut */}
            <button
              type="button"
              onClick={() => setActiveStepIndex((prev) => (prev + 1) % TEA_LAB_STEPS.length)}
              className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-[#939458] hover:text-white transition-colors cursor-pointer"
            >
              <span>{locale === 'ar' ? 'المرحلة التالية' : 'Next Stage'}</span>
              <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
            </button>
          </div>

          {/* Right: Step Visual Photo with Organic Contour Crop */}
          <div className="w-full lg:w-[460px] aspect-[4/3] matcha-organic-crop border border-white/15 overflow-hidden relative shadow-2xl shrink-0 group bg-[#19321d]">
            <img
              src={activeStep.image}
              alt={activeStep.nameEn}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              loading="eager"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
            <div className="absolute bottom-4 start-4 end-4 flex items-center justify-between text-xs text-white/90">
              <span className="font-japanese font-bold text-sm text-[#f0ede1] bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                {activeStep.nameJa}
              </span>
              <span className="font-mono text-[11px] text-[#939458] bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                UENO SARYO · CRAFT
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
