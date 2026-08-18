import { forwardRef } from 'react';
import { useLanguage } from '../../i18n/context';

interface HeroHeadlineProps {
  className?: string;
}

export const HeroHeadline = forwardRef<HTMLDivElement, HeroHeadlineProps>((_, ref) => {
  const { t, locale } = useLanguage();
  const isAr = locale === 'ar';
  const isZh = locale === 'zh-CN';

  return (
    <div
      ref={ref}
      className="absolute bottom-3.5 sm:bottom-6 md:bottom-7 left-0 right-0 w-full flex flex-col justify-center items-center pointer-events-none z-35 px-4 select-none"
    >
      {/* Main Headline */}
      <h1
        className={`font-headline text-[22px] sm:text-[30px] md:text-[40px] lg:text-[48px] font-extrabold text-white text-center drop-shadow-[0_4px_18px_rgba(0,0,0,0.9)] max-w-2xl px-2 ${
          isAr
            ? 'tracking-normal leading-[1.32] sm:leading-[1.26] md:leading-[1.22]'
            : isZh
            ? 'tracking-normal leading-[1.3] sm:leading-[1.25]'
            : 'tracking-tight leading-[1.14]'
        }`}
      >
        {t.hero.headline}
      </h1>

      {/* Short Subtitle */}
      <p
        className={`text-[11px] sm:text-[12.5px] text-[#f8f7f1]/80 text-center max-w-md mt-2 sm:mt-2.5 font-sans hidden sm:block tracking-normal drop-shadow-sm ${
          isAr || isZh ? 'leading-relaxed' : 'leading-normal'
        }`}
      >
        {t.hero.subheadline}
      </p>
    </div>
  );
});

HeroHeadline.displayName = 'HeroHeadline';
