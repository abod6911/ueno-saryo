import React, { useState } from 'react';
import { TEA_LAB_STEPS } from '../../data/teaExperience';
import { useLanguage } from '../../i18n/context';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { TeaLabAnnotation } from '../ui/TeaLabAnnotation';
import { JapaneseSeal } from '../ui/JapaneseSeal';
import { RevealOnView } from '../ui/RevealOnView';

const STEP_KANJI = ['葉', '量', '温', '点', '碗'];

export const TeaLabProcess: React.FC = () => {
  const { locale, t } = useLanguage();
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [isChanging, setIsChanging] = useState(false);

  const handleStepSelect = (idx: number) => {
    if (idx === activeStepIndex) return;
    setIsChanging(true);
    setActiveStepIndex(idx);
    setTimeout(() => setIsChanging(false), 280);
  };

  const handleNextStep = () => {
    const nextIdx = (activeStepIndex + 1) % TEA_LAB_STEPS.length;
    handleStepSelect(nextIdx);
  };

  const activeStep = TEA_LAB_STEPS[activeStepIndex];

  return (
    <section id="tea-experience" className="w-full bg-[#19321d] text-[#f8f7f1] py-16 sm:py-24 relative overflow-hidden border-t border-white/10">
      {/* Background Decorative Kanji */}
      <div className="absolute top-10 start-8 text-[120px] sm:text-[180px] font-japanese font-black text-white/[0.02] pointer-events-none select-none">
        点前
      </div>

      <div className="max-w-[1640px] mx-auto px-3 sm:px-6 lg:px-12 relative z-10">
        {/* Section Header with Specimen Index */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10 sm:mb-14">
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

        {/* Japanese Tea Lab Precision Rail (Unified Process Surface) */}
        <div className="w-full max-w-5xl mx-auto mb-10 sm:mb-14">
          {/* Desktop Precision Rail (>= 768px) */}
          <div className="hidden md:block relative">
            {/* Background Connecting Timeline */}
            <div className="absolute top-6 inset-x-8 h-[2px] bg-white/10 z-0">
              {/* Active Step Progress Fill */}
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
                const name = locale === 'ar' ? step.nameAr : step.nameEn;
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
                    <span className={`font-mono text-[10.5px] font-bold mb-1 transition-colors ${
                      isActive ? 'text-[#939458]' : 'text-white/40'
                    }`}>
                      {step.number}
                    </span>

                    <span className={`font-headline text-xs sm:text-[13px] font-bold line-clamp-1 transition-colors ${
                      isActive ? 'text-white' : 'text-white/70 group-hover:text-white'
                    }`}>
                      {name}
                    </span>

                    {step.nameJa && (
                      <span className={`text-[10px] font-japanese mt-0.5 transition-colors ${
                        isActive ? 'text-[#939458]' : 'text-white/30'
                      }`}>
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
                const name = locale === 'ar' ? step.nameAr : step.nameEn;
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
                    <span className={`font-mono text-[10.5px] font-bold ${isActive ? 'text-[#29482a]' : 'text-[#939458]'}`}>
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
                {locale === 'ar' ? activeStep.nameAr : activeStep.nameEn}
              </h3>

              <p className="text-sm sm:text-base text-[#f8f7f1]/80 leading-relaxed font-sans max-w-xl">
                {locale === 'ar' ? activeStep.descriptionAr : activeStep.descriptionEn}
              </p>

              {/* Scientific Extraction Metric Note */}
              <div className="w-full bg-[#19321d]/80 rounded-[18px] p-4 border border-white/10 text-xs text-[#f8f7f1]/90 flex items-start gap-3 mt-2">
                <span className="w-2 h-2 rounded-full bg-[#939458] shrink-0 mt-1.5" />
                <p className="leading-relaxed">
                  {locale === 'ar' ? activeStep.scientificNoteAr : activeStep.scientificNoteEn}
                </p>
              </div>

              {/* Next Step Interaction Button */}
              <button
                type="button"
                onClick={handleNextStep}
                className="mt-2 inline-flex items-center gap-2 text-xs font-mono font-bold text-[#939458] hover:text-white transition-colors cursor-pointer group"
              >
                <span>{locale === 'ar' ? 'المرحلة التالية' : 'Next Step'}</span>
                {locale === 'ar' ? (
                  <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                ) : (
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                )}
              </button>
            </div>

            {/* Right: Authentic Photograph Showcase with Organic Crop */}
            <div className="w-full lg:w-[480px] h-[260px] sm:h-[320px] rounded-[20px] sm:rounded-[24px] overflow-hidden border border-white/15 relative shadow-xl shrink-0 group bg-[#19321d]">
              <img
                key={activeStep.number}
                src={activeStep.image}
                alt={activeStep.nameEn}
                className={`w-full h-full object-cover transition-all duration-500 ease-out ${
                  isChanging ? 'opacity-0 scale-[1.03]' : 'opacity-100 scale-100'
                }`}
                loading="eager"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

              {/* Step Identification Specimen Tag */}
              <div className="absolute bottom-3 start-3 end-3 flex items-center justify-between text-[11px] font-mono text-white/80 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                <span>UENO SARYO · CRAFT</span>
                <span className="text-[#939458] font-bold">{activeStep.nameJa}</span>
              </div>
            </div>
          </div>
        </RevealOnView>
      </div>
    </section>
  );
};
