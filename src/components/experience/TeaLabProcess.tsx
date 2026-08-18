import React, { useState } from 'react';
import { TEA_LAB_STEPS } from '../../data/teaExperience';
import { useLanguage } from '../../i18n/context';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { JapaneseSeal } from '../ui/JapaneseSeal';
import { TeaLabAnnotation } from '../ui/TeaLabAnnotation';
import { RevealOnView } from '../ui/RevealOnView';

const STEP_KANJI = ['選', '量', '温', '点', '碗'];

export const TeaLabProcess: React.FC = () => {
  const { locale, t } = useLanguage();
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [isChanging, setIsChanging] = useState(false);

  const activeStep = TEA_LAB_STEPS[activeStepIndex];

  const handleStepSelect = (index: number) => {
    if (index === activeStepIndex) return;
    setIsChanging(true);
    setTimeout(() => {
      setActiveStepIndex(index);
      setIsChanging(false);
    }, 150);
  };

  const handleNextStep = () => {
    const nextIdx = (activeStepIndex + 1) % TEA_LAB_STEPS.length;
    handleStepSelect(nextIdx);
  };

  return (
    <section id="tea-experience" className="w-full bg-[#1b331f] text-[#f8f7f1] py-16 sm:py-24 relative overflow-hidden border-t border-white/10">
      {/* Background Decorative Rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-white/5 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] rounded-full border border-white/5 pointer-events-none" />

      <div className="max-w-[1640px] mx-auto px-3 sm:px-6 lg:px-12 relative z-10">
        {/* Section Header with Specimen Index */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <TeaLabAnnotation
            index="LAB / 02"
            label={
              locale === 'ar'
                ? 'مراحل وفلسفة التحضير'
                : locale === 'zh-CN'
                ? '五阶沏茶工法'
                : 'TEA EXTRACTION CEREMONY'
            }
            kanji="点前 · 精密抽出"
            variant="minimal"
            className="mb-4 sm:mb-5"
          />

          <div className="flex items-center gap-3 mb-4 sm:mb-5">
            <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-normal leading-[1.28] sm:leading-[1.22]">
              {t.teaExperience.heading}
            </h2>
            <JapaneseSeal char="道" size={24} variant="square" />
          </div>

          <p className="text-xs sm:text-base text-[#f8f7f1]/75 leading-relaxed font-sans max-w-2xl pt-0.5">
            {t.teaExperience.subheading}
          </p>
        </div>

        {/* 5-Stage Floating Control Surface Stepper */}
        <div className="max-w-5xl mx-auto mb-8 sm:mb-12">
          {/* Desktop & Tablet Navigation Deck (>= 768px) */}
          <div className="hidden md:block bg-[#122416]/90 backdrop-blur-xl rounded-[24px] p-4 sm:p-6 border border-white/12 shadow-[0_12px_32px_rgba(0,0,0,0.35)] relative select-none">
            {/* Progress Track */}
            <div className="absolute top-[38px] left-[10%] right-[10%] h-[2px] bg-white/10 z-0">
              <div
                className="h-full bg-[#939458] transition-all duration-500 ease-out"
                style={{
                  width: `${(activeStepIndex / (TEA_LAB_STEPS.length - 1)) * 100}%`,
                }}
              />
            </div>

            {/* 5 Step Nodes */}
            <div className="grid grid-cols-5 gap-2 relative z-10">
              {TEA_LAB_STEPS.map((step, idx) => {
                const isActive = idx === activeStepIndex;
                const isPassed = idx < activeStepIndex;
                const name =
                  locale === 'ar'
                    ? step.nameAr
                    : locale === 'zh-CN'
                    ? step.nameZh || step.nameEn
                    : step.nameEn;
                const kanji = STEP_KANJI[idx] || '茶';

                return (
                  <button
                    key={step.number}
                    type="button"
                    onClick={() => handleStepSelect(idx)}
                    className="flex flex-col items-center text-center group cursor-pointer p-2 focus:outline-none"
                  >
                    {/* Node Badge */}
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 transform-gpu mb-3 border ${
                        isActive
                          ? 'bg-[#f8f7f1] text-[#122416] border-white shadow-[0_8px_20px_rgba(0,0,0,0.3)] scale-110'
                          : isPassed
                          ? 'bg-[#29482a] text-[#939458] border-[#939458]/40'
                          : 'bg-[#122416]/80 text-white/50 border-white/10 group-hover:border-white/30 group-hover:text-white'
                      }`}
                    >
                      <span className="font-japanese text-sm font-bold">{kanji}</span>
                    </div>

                    {/* Step Number & Title */}
                    <span
                      className={`font-mono text-[10.5px] font-bold mb-1 transition-colors ${
                        isActive ? 'text-[#939458]' : 'text-white/40'
                      }`}
                    >
                      {step.number}
                    </span>

                    <span
                      className={`font-headline text-xs sm:text-[13px] font-bold line-clamp-1 transition-colors ${
                        isActive ? 'text-white' : 'text-white/70 group-hover:text-white'
                      }`}
                    >
                      {name}
                    </span>

                    {step.nameJa && (
                      <span
                        className={`text-[10px] font-japanese mt-0.5 transition-colors ${
                          isActive ? 'text-[#939458]' : 'text-white/30'
                        }`}
                      >
                        {step.nameJa.split('·')[0].trim()}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mobile Horizontally Scrollable Step Index (< 768px) */}
          <div className="md:hidden w-full overflow-x-auto no-scrollbar py-2 -mx-1 px-1 select-none">
            <div className="flex items-center gap-2 w-max px-1">
              {TEA_LAB_STEPS.map((step, idx) => {
                const isActive = idx === activeStepIndex;
                const name =
                  locale === 'ar'
                    ? step.nameAr
                    : locale === 'zh-CN'
                    ? step.nameZh || step.nameEn
                    : step.nameEn;
                const kanji = STEP_KANJI[idx] || '茶';

                return (
                  <button
                    key={step.number}
                    type="button"
                    onClick={() => handleStepSelect(idx)}
                    className={`min-h-[46px] px-3.5 py-2 rounded-[16px] text-xs font-medium whitespace-nowrap transition-all duration-200 active:scale-95 flex items-center gap-2.5 shrink-0 border cursor-pointer ${
                      isActive
                        ? 'bg-[#f8f7f1] text-[#122416] border-white shadow-md'
                        : 'bg-[#122416]/70 text-white/70 border-white/10'
                    }`}
                  >
                    <span
                      className={`font-mono text-[10.5px] font-bold ${
                        isActive ? 'text-[#29482a]' : 'text-[#939458]'
                      }`}
                    >
                      {step.number}
                    </span>
                    <span className="font-japanese text-xs font-bold">{kanji}</span>
                    <span className="font-sans font-bold">{name}</span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#29482a] shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Active Step Detailed Showcase Stage (Signature Rise Initial Entrance) */}
        <RevealOnView variant="signature-rise" delay={80} className="w-full">
          <div className="w-full min-h-[360px] bg-[#122416] rounded-[24px] sm:rounded-[32px] p-6 sm:p-10 lg:p-12 border border-white/12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-12">
            {/* Left: Step Information */}
            <div
              className={`flex-1 flex flex-col items-start gap-4 transition-all duration-300 ease-out transform-gpu ${
                isChanging ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl sm:text-4xl font-mono font-extrabold text-[#939458]">
                  {activeStep.number}
                </span>
                <div className="h-6 w-[1px] bg-white/20" />
                <span className="text-xs font-japanese text-[#f8f7f1]/60 tracking-wider">
                  {activeStep.nameJa}
                </span>
              </div>

              <h3 className="font-headline text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
                {locale === 'ar'
                  ? activeStep.nameAr
                  : locale === 'zh-CN'
                  ? activeStep.nameZh || activeStep.nameEn
                  : activeStep.nameEn}
              </h3>

              <p className="text-sm sm:text-base text-[#f8f7f1]/80 leading-relaxed font-sans max-w-xl">
                {locale === 'ar'
                  ? activeStep.descriptionAr
                  : locale === 'zh-CN'
                  ? activeStep.descriptionZh || activeStep.descriptionEn
                  : activeStep.descriptionEn}
              </p>

              {/* Scientific Extraction Metric Note */}
              <div className="w-full bg-[#19321d]/80 rounded-[18px] p-4 border border-white/10 text-xs text-[#f8f7f1]/90 flex items-start gap-3 mt-2">
                <span className="w-2 h-2 rounded-full bg-[#939458] shrink-0 mt-1.5" />
                <p className="leading-relaxed font-sans">
                  {locale === 'ar'
                    ? activeStep.scientificNoteAr
                    : locale === 'zh-CN'
                    ? activeStep.scientificNoteZh || activeStep.scientificNoteEn
                    : activeStep.scientificNoteEn}
                </p>
              </div>

              {/* Next Step Interaction Button */}
              <button
                type="button"
                onClick={handleNextStep}
                className="mt-2 inline-flex items-center gap-2 text-xs font-mono font-bold text-[#939458] hover:text-white transition-colors cursor-pointer group"
              >
                <span>
                  {locale === 'ar'
                    ? 'المرحلة التالية'
                    : locale === 'zh-CN'
                    ? '下一阶段工法'
                    : 'Next Step'}
                </span>
                {locale === 'ar' ? (
                  <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                ) : (
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                )}
              </button>
            </div>

            {/* Right: Step Visual Specimen Image */}
            <div className="w-full lg:w-[440px] aspect-[4/3] rounded-[20px] sm:rounded-[24px] overflow-hidden bg-[#19321d] border border-white/10 shadow-2xl relative shrink-0">
              <img
                src={activeStep.image}
                alt={activeStep.nameEn}
                className={`w-full h-full object-cover transition-all duration-500 transform-gpu ${
                  isChanging ? 'scale-105 opacity-60' : 'scale-100 opacity-100'
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 start-3 px-3 py-1 rounded-full bg-[#122416]/80 backdrop-blur-md border border-white/15 text-[10px] font-mono text-[#939458]">
                UENO LAB ARCHIVE · {activeStep.number}
              </div>
            </div>
          </div>
        </RevealOnView>
      </div>
    </section>
  );
};
