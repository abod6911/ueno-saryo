import React, { useState, useEffect, useRef } from 'react';
import type { MenuItem } from '../../types/menu';
import { useLanguage } from '../../i18n/context';
import { BUSINESS_DATA } from '../../data/business';
import {
  X,
  Flame,
  Coffee,
  Thermometer,
  MapPin,
  Sparkles,
  ShoppingBag,
  ArrowUpRight,
  Layers,
  Leaf,
} from 'lucide-react';

interface DrinkExperienceModalProps {
  item: MenuItem | null;
  onClose: () => void;
}

export const DrinkExperienceModal: React.FC<DrinkExperienceModalProps> = ({ item, onClose }) => {
  const { locale, t } = useLanguage();
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [mounted, setMounted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const isAr = locale === 'ar';
  const isZh = locale === 'zh-CN';

  // Handle ESC key, focus management & body scroll locking
  useEffect(() => {
    if (!item) {
      setMounted(false);
      setIsVideoLoaded(false);
      setVideoError(false);
      return;
    }

    setMounted(true);
    setIsVideoLoaded(false);
    setVideoError(false);

    // Save previous overflow state
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Focus close button on open
    const timer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 100);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [item, onClose]);

  if (!item) return null;

  const name = isAr ? item.name.ar : isZh ? item.name.zh || item.name.en : item.name.en;
  const description = isAr ? item.description.ar : isZh ? item.description.zh || item.description.en : item.description.en;
  const tastingNotes = isAr ? item.tastingNotes?.ar : isZh ? item.tastingNotes?.zh || item.tastingNotes?.en : item.tastingNotes?.en;
  const ingredients = isAr ? item.ingredients?.ar : isZh ? item.ingredients?.zh || item.ingredients?.en : item.ingredients?.en;

  // Laboratory details
  const lab = item.labDetails;
  const labCode = lab?.labCode || `UENO LAB / ${item.id.slice(0, 3).toUpperCase()}`;
  const originText = lab?.origin
    ? isAr
      ? lab.origin.ar
      : isZh
      ? lab.origin.zh
      : lab.origin.en
    : null;

  const brewingText = lab?.brewingStyle
    ? isAr
      ? lab.brewingStyle.ar
      : isZh
      ? lab.brewingStyle.zh
      : lab.brewingStyle.en
    : null;

  const teaBaseText = lab?.teaBase
    ? isAr
      ? lab.teaBase.ar
      : isZh
      ? lab.teaBase.zh
      : lab.teaBase.en
    : null;

  const servingTemp = lab?.servingTemp || (item.temperature === 'Hot' ? '75°C' : item.temperature === 'Iced' ? '4°C' : '4°C / 75°C');

  const formatCaffeine = (level?: 'Zero' | 'Low' | 'Medium' | 'High') => {
    if (!level) return null;
    return t.drinkExperience.caffeineLevels[level] || level;
  };

  const hasVideo = item.media?.type === 'video' && item.media.src && !videoError;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="drink-reveal-title"
      className="fixed inset-0 z-[120] flex items-center justify-center p-0 sm:p-4 md:p-6 lg:p-8 bg-[#0a140d]/88 backdrop-blur-2xl transition-all duration-300 select-none animate-in fade-in"
      onClick={onClose}
    >
      {/* Outer Modal Container */}
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-5xl h-full sm:h-auto sm:max-h-[92vh] bg-[#f8f7f1] text-[#181813] sm:rounded-[32px] shadow-2xl overflow-hidden border border-white/20 flex flex-col lg:flex-row transition-all duration-500 transform-gpu ${
          mounted ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-4'
        }`}
      >
        {/* ========================================================= */}
        {/* 1. CINEMATIC MEDIA STAGE (Left on Desktop, Top on Mobile) */}
        {/* ========================================================= */}
        <div className="relative w-full lg:w-[48%] h-[34vh] sm:h-[42vh] lg:h-auto bg-[#0e1c12] text-[#f8f7f1] overflow-hidden flex items-center justify-center shrink-0">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute inset-0 bg-radial-gradient from-[#29482a]/60 via-[#122416]/90 to-[#0a140d] pointer-events-none" />

          {/* Background Japanese Watermark */}
          <div className="absolute -bottom-6 -right-6 text-[110px] sm:text-[140px] font-japanese font-black text-white/[0.03] select-none pointer-events-none">
            茶道
          </div>

          {/* Media Container */}
          <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
            {/* Video Renderer (Lazy loaded on modal open) */}
            {hasVideo ? (
              <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                onCanPlay={() => setIsVideoLoaded(true)}
                onError={() => setVideoError(true)}
                poster={item.media?.poster || item.image}
                className={`w-full h-full object-cover object-center shadow-2xl transition-opacity duration-700 ${
                  isVideoLoaded ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <source src={item.media?.src} type="video/mp4" />
                <source src={item.media?.src} type="video/webm" />
              </video>
            ) : null}

            {/* Fallback Animated-Image Stage with Layered Motion */}
            <div
              className={`absolute inset-0 flex items-center justify-center overflow-hidden transition-opacity duration-500 ${
                hasVideo && isVideoLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
              }`}
            >
              {/* Drink Image with Ambient Breathe Zoom */}
              <img
                src={item.image}
                alt={name}
                className="w-full h-full object-cover object-center animate-drink-breathe transform-gpu"
                loading="eager"
              />

              {/* Cinematic Ambient Shimmer & Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e1c12]/85 via-transparent to-black/30 pointer-events-none" />

              {/* Gentle Steam & Mist Floating Particle Layer */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30 mix-blend-screen">
                <div className="absolute w-32 h-32 rounded-full bg-[#939458]/40 blur-2xl top-1/3 left-1/4 animate-pulse" />
                <div className="absolute w-40 h-40 rounded-full bg-[#f8f7f1]/30 blur-3xl bottom-1/4 right-1/4 animate-float-slow" />
              </div>
            </div>

            {/* Top Bar inside Media: Specimen Badge & Japanese Seal */}
            <div className="absolute top-4 sm:top-5 start-4 sm:start-5 z-20 flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#122416]/85 backdrop-blur-md border border-white/20 text-[10px] sm:text-xs font-mono font-bold tracking-wider text-[#939458] shadow-md">
                {labCode}
              </span>
              {item.name.ja && (
                <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-white/15 backdrop-blur-md border border-white/15 text-[10px] font-japanese font-medium text-white/90">
                  {item.name.ja}
                </span>
              )}
            </div>

            {/* Subtle Video / Media Loop Progress Line */}
            <div className="absolute bottom-3 sm:bottom-4 start-4 sm:start-5 end-4 sm:end-5 z-20 flex flex-col gap-1.5 pointer-events-none">
              <div className="flex items-center justify-between text-[10px] font-mono text-white/70">
                <span className="tracking-widest uppercase">
                  {isAr ? 'عرض سينمائي للتحضير' : isZh ? '茶道研析 · 现点点茶' : 'CINEMATIC SPECIMEN'}
                </span>
                <span className="text-[#939458] font-bold">100% ARTISANAL</span>
              </div>
              <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#939458] to-[#f0ede1] animate-drink-progress rounded-full" />
              </div>
            </div>
          </div>

          {/* Floating Mobile Close Button */}
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label={t.drinkExperience.closeAria}
            className="lg:hidden absolute top-4 end-4 z-30 w-10 h-10 rounded-full bg-[#122416]/80 backdrop-blur-md border border-white/25 text-white flex items-center justify-center transition-all active:scale-90 hover:bg-[#122416] cursor-pointer shadow-lg"
          >
            <X className="w-5 h-5 stroke-[2]" />
          </button>
        </div>

        {/* ========================================================= */}
        {/* 2. EDITORIAL INFORMATION LAYER (Right on Desktop, Bottom) */}
        {/* ========================================================= */}
        <div className="flex-1 flex flex-col justify-between overflow-y-auto custom-scrollbar bg-[#f8f7f1] p-5 sm:p-8 lg:p-9 relative">
          {/* Desktop Top Header Row */}
          <div className="hidden lg:flex items-center justify-between border-b border-black/[0.07] pb-3.5 mb-4">
            <div className="flex items-center gap-2 text-xs font-mono text-[#29482a] font-bold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#939458]" />
              <span>{t.drinkExperience.labStudy}</span>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label={t.drinkExperience.closeAria}
              className="w-9 h-9 rounded-full bg-black/5 hover:bg-black/10 text-[#181813] flex items-center justify-center transition-all active:scale-95 border border-black/10 cursor-pointer"
            >
              <X className="w-4 h-4 stroke-[2]" />
            </button>
          </div>

          {/* Progressive Information Sequence */}
          <div className="flex flex-col gap-4 text-start">
            {/* Step 1: Badges & Japanese Subtitle */}
            <div className="flex flex-wrap items-center gap-2">
              {item.badges?.map((badge) => (
                <span
                  key={badge}
                  className={`text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full shadow-xs ${
                    badge === 'signature'
                      ? 'bg-[#122416] text-[#939458]'
                      : badge === 'bestseller'
                      ? 'bg-[#29482a]/15 text-[#29482a] border border-[#29482a]/20'
                      : badge === 'limited'
                      ? 'bg-[#a33527]/15 text-[#a33527] border border-[#a33527]/20'
                      : 'bg-black/5 text-[#181813]/80'
                  }`}
                >
                  {t.menu.badges[badge] || badge}
                </span>
              ))}

              {item.name.ja && (
                <span className="text-xs font-japanese text-[#181813]/60 font-semibold px-2 py-0.5 rounded-md bg-black/5">
                  {item.name.ja}
                </span>
              )}
            </div>

            {/* Step 2: Main Headline Title & Price */}
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2.5">
              <h2
                id="drink-reveal-title"
                className="font-headline text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#122416] tracking-normal leading-tight"
              >
                {name}
              </h2>

              <div className="flex items-baseline gap-1.5 shrink-0">
                <span className="font-mono font-black text-2xl sm:text-3xl text-[#122416]">
                  {item.priceSAR}
                </span>
                <span className="text-xs font-mono font-semibold text-[#181813]/60">
                  {t.menu.sar}
                </span>
                <span className="text-[10px] text-[#181813]/50 ms-1 font-sans">
                  ({t.drinkExperience.vatIncluded})
                </span>
              </div>
            </div>

            {/* Step 3: Story & Description Narrative */}
            <p className="text-xs sm:text-sm text-[#181813]/80 leading-relaxed font-sans">
              {description}
            </p>

            {/* Step 4: Refined Typographic Flavor Notes */}
            {tastingNotes && tastingNotes.length > 0 && (
              <div className="flex flex-col gap-1.5 pt-2 border-t border-black/[0.06]">
                <span className="text-[10.5px] font-mono uppercase tracking-widest text-[#29482a] font-bold">
                  {t.drinkExperience.flavorNotes}
                </span>
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                  {tastingNotes.map((note, idx) => (
                    <div
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#122416]/5 border border-black/5 text-xs text-[#122416] font-medium font-sans shadow-xs"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#939458]" />
                      <span>{note}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 5: Mini Tea Lab Specimen Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 pt-2.5 border-t border-black/[0.06]">
              {/* Origin */}
              {originText && (
                <div className="flex flex-col p-2.5 sm:p-3 rounded-2xl bg-white border border-black/[0.06] shadow-xs">
                  <div className="flex items-center gap-1 text-[9.5px] font-mono text-[#29482a] uppercase font-bold mb-1">
                    <MapPin className="w-3 h-3 text-[#939458] shrink-0" />
                    <span>{t.drinkExperience.origin}</span>
                  </div>
                  <span className="text-[11.5px] sm:text-xs font-semibold text-[#181813] leading-snug">
                    {originText}
                  </span>
                </div>
              )}

              {/* Serving Temp */}
              <div className="flex flex-col p-2.5 sm:p-3 rounded-2xl bg-white border border-black/[0.06] shadow-xs">
                <div className="flex items-center gap-1 text-[9.5px] font-mono text-[#29482a] uppercase font-bold mb-1">
                  <Thermometer className="w-3 h-3 text-[#939458] shrink-0" />
                  <span>{t.drinkExperience.servingTemp}</span>
                </div>
                <span className="text-[11.5px] sm:text-xs font-semibold text-[#181813] font-mono">
                  {servingTemp}
                </span>
              </div>

              {/* Caffeine Level */}
              {item.caffeineLevel && (
                <div className="flex flex-col p-2.5 sm:p-3 rounded-2xl bg-white border border-black/[0.06] shadow-xs">
                  <div className="flex items-center gap-1 text-[9.5px] font-mono text-[#29482a] uppercase font-bold mb-1">
                    <Coffee className="w-3 h-3 text-[#939458] shrink-0" />
                    <span>{t.drinkExperience.caffeine}</span>
                  </div>
                  <span className="text-[11.5px] sm:text-xs font-semibold text-[#181813]">
                    {formatCaffeine(item.caffeineLevel)}
                  </span>
                </div>
              )}

              {/* Tea Base / Brewing Craft */}
              <div className="flex flex-col p-2.5 sm:p-3 rounded-2xl bg-white border border-black/[0.06] shadow-xs">
                <div className="flex items-center gap-1 text-[9.5px] font-mono text-[#29482a] uppercase font-bold mb-1">
                  {teaBaseText ? (
                    <>
                      <Leaf className="w-3 h-3 text-[#939458] shrink-0" />
                      <span>{t.drinkExperience.teaBase}</span>
                    </>
                  ) : brewingText ? (
                    <>
                      <Layers className="w-3 h-3 text-[#939458] shrink-0" />
                      <span>{t.drinkExperience.brewingStyle}</span>
                    </>
                  ) : (
                    <>
                      <Flame className="w-3 h-3 text-[#939458] shrink-0" />
                      <span>{t.menu.calories}</span>
                    </>
                  )}
                </div>
                <span className="text-[11.5px] sm:text-xs font-semibold text-[#181813] leading-snug">
                  {teaBaseText || brewingText || `${item.calories || 110} kcal`}
                </span>
              </div>
            </div>

            {/* Ingredients formula list */}
            {ingredients && ingredients.length > 0 && (
              <div className="flex flex-col gap-1 pt-1.5 border-t border-black/[0.06]">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#29482a] font-bold">
                  {t.drinkExperience.ingredients}
                </span>
                <p className="text-[11px] sm:text-xs text-[#181813]/70 font-sans leading-relaxed">
                  {ingredients.join(' · ')}
                </p>
              </div>
            )}
          </div>

          {/* Step 6: Bottom Action CTAs */}
          <div className="pt-4 mt-4 border-t border-black/[0.08] flex items-center justify-between gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="min-h-[46px] px-4 sm:px-5 rounded-2xl bg-black/5 hover:bg-black/10 text-xs font-bold text-[#181813] transition-all active:scale-95 cursor-pointer"
            >
              {t.drinkExperience.backToMenu}
            </button>

            {BUSINESS_DATA.hungerStationUrl && (
              <a
                href={BUSINESS_DATA.hungerStationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[46px] flex-1 px-5 rounded-2xl bg-[#122416] hover:bg-[#1a3520] text-white text-xs font-bold flex items-center justify-center gap-2 active:scale-95 transition-all shadow-card cursor-pointer group"
              >
                <ShoppingBag className="w-4 h-4 text-[#939458] group-hover:scale-110 transition-transform" />
                <span>{t.drinkExperience.orderPrompt}</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
