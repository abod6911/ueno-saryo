import { forwardRef } from 'react';
import { useLanguage } from '../../i18n/context';

interface HeroHeadlineProps {
  className?: string;
}

export const HeroHeadline = forwardRef<HTMLDivElement, HeroHeadlineProps>((_, ref) => {
  const { t, locale } = useLanguage();

  return (
    <div
      ref={ref}
      className="absolute bottom-4 sm:bottom-7 md:bottom-8 left-0 right-0 w-full flex flex-col justify-center items-center pointer-events-none z-35 px-4 select-none"
    >
      {/* Eyebrow */}
      <span className="text-[10px] sm:text-[11.5px] font-japanese text-[#d1ce8a] tracking-widest uppercase mb-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)] font-semibold">
        {locale === 'ar' ? 'لحظة الشاي · 茶の時間' : 'TEA CEREMONY · 茶の時間'}
      </span>

      {/* Main Headline */}
      <h1 className="font-headline text-[24px] sm:text-[34px] md:text-[44px] lg:text-[54px] font-extrabold text-white text-center tracking-tight leading-[1.1] drop-shadow-[0_4px_18px_rgba(0,0,0,0.9)] max-w-2xl px-2">
        {t.hero.headline}
      </h1>

      {/* Short Subtitle */}
      <p className="text-[11px] sm:text-[12.5px] text-[#f8f7f1]/80 text-center max-w-md mt-1 font-sans hidden sm:block tracking-normal drop-shadow-sm">
        {t.hero.subheadline}
      </p>
    </div>
  );
});

HeroHeadline.displayName = 'HeroHeadline';
