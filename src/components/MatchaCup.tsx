import React from 'react';
import type { Flavor } from '../types/matcha';

interface MatchaCupProps {
  currentFlavor: Flavor;
  previousFlavor?: Flavor;
  isTransitioning?: boolean;
  onPriceTagClick?: () => void;
}

export const MatchaCup: React.FC<MatchaCupProps> = ({
  currentFlavor,
  previousFlavor,
  isTransitioning,
  onPriceTagClick,
}) => {
  return (
    <div className="relative z-30 flex flex-col items-center justify-center pointer-events-none select-none">
      {/* Cup Image Container */}
      <div className="relative w-[180px] sm:w-[240px] md:w-[280px] lg:w-[310px] aspect-[400/540] flex items-center justify-center filter drop-shadow-2xl">
        {/* Previous Drink Crossfade */}
        {previousFlavor && isTransitioning && (
          <img
            src={previousFlavor.productImage}
            alt={previousFlavor.name}
            className="absolute inset-0 w-full h-full object-contain pointer-events-none opacity-0 transition-opacity duration-500"
            draggable={false}
          />
        )}

        {/* Current Active Drink */}
        <img
          key={currentFlavor.id}
          src={currentFlavor.productImage}
          alt={currentFlavor.name}
          className="w-full h-full object-contain pointer-events-none transition-transform duration-500 ease-out"
          draggable={false}
        />

        {/* Dynamic Flavor Label overlaid on cup */}
        <div className="absolute top-[64%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none">
          <h2
            key={currentFlavor.name}
            className="font-serif text-2xl sm:text-3xl md:text-[34px] font-bold text-white tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] transition-all duration-300 transform-gpu animate-flavor-in"
          >
            {currentFlavor.name}
          </h2>
        </div>

        {/* Mini Price & Cart Pill at base */}
        <button
          type="button"
          onClick={onPriceTagClick}
          aria-label={`Buy ${currentFlavor.name} for ${currentFlavor.price}`}
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-11 sm:w-14 h-16 sm:h-20 bg-[#f0eee5] rounded-2xl shadow-card flex flex-col items-center justify-between py-2 sm:py-2.5 px-1.5 pointer-events-auto hover:-translate-y-1 hover:scale-105 active:scale-95 transition-all duration-200 group border border-black/5"
        >
          <span className="font-headline font-bold text-[10px] sm:text-xs text-[#172d1a] tracking-tight">
            {currentFlavor.price}
          </span>
          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-transparent flex items-center justify-center text-[#172d1a] group-hover:scale-110 transition-transform">
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" viewBox="0 0 24 24">
              <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
};
