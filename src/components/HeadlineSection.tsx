import React from 'react';

export const HeadlineSection: React.FC = () => {
  return (
    <div className="absolute bottom-6 sm:bottom-10 left-0 right-0 w-full flex justify-center items-center pointer-events-none z-30 px-4">
      <h1 className="font-headline text-[32px] sm:text-[46px] md:text-[62px] lg:text-[76px] font-extrabold text-white text-center tracking-tight leading-[0.95] drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)] select-none">
        Chooise you matcha tea
      </h1>
    </div>
  );
};
