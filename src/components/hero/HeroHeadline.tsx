import React from 'react';
import { useLanguage } from '../../i18n/context';

export const HeroHeadline: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="absolute bottom-6 sm:bottom-9 left-0 right-0 w-full flex flex-col justify-center items-center pointer-events-none z-35 px-4 select-none">
      <span className="text-[10px] sm:text-xs font-japanese text-[#939458] tracking-widest uppercase mb-1 drop-shadow-sm font-medium">
        {t.hero.kanjiTag}
      </span>
      <h1 className="font-headline text-[24px] sm:text-[36px] md:text-[48px] lg:text-[60px] font-extrabold text-white text-center tracking-tight leading-[1.08] drop-shadow-[0_4px_18px_rgba(0,0,0,0.7)] max-w-3xl">
        {t.hero.headline}
      </h1>
      <p className="text-xs sm:text-[13px] text-[#f8f7f1]/75 text-center max-w-md mt-1.5 font-sans hidden sm:block tracking-normal">
        {t.hero.subheadline}
      </p>
    </div>
  );
};
