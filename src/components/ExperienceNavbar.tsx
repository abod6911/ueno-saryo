import React from 'react';
import { LayoutGrid, AtSign, MapPin } from 'lucide-react';

export const ExperienceNavbar: React.FC = () => {
  return (
    <div className="w-full px-6 sm:px-10 pt-6 sm:pt-8 flex items-center justify-between z-40 relative">
      {/* Left: Kumo Logo */}
      <div className="flex items-center">
        <span className="font-headline text-2xl sm:text-3xl font-bold tracking-tight text-[#f4f2e9] lowercase select-none cursor-pointer hover:opacity-90 transition-opacity">
          kumo
        </span>
      </div>

      {/* Center: Floating Pill Toolbar */}
      <nav
        aria-label="Experience Toolbar"
        className="flex items-center bg-[#dbe0c8]/20 backdrop-blur-md px-1.5 py-1 rounded-full border border-white/10 shadow-sm space-x-1"
      >
        <button
          type="button"
          aria-label="Grid View"
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[#f4f2e9]/80 hover:text-white hover:bg-white/10 transition-all"
        >
          <LayoutGrid className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[1.8]" />
        </button>

        <button
          type="button"
          aria-label="Instagram"
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[#f4f2e9]/80 hover:text-white hover:bg-white/10 transition-all"
        >
          <svg className="w-3.5 h-3.5 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
          </svg>
        </button>

        <button
          type="button"
          aria-label="Threads"
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[#f4f2e9]/80 hover:text-white hover:bg-white/10 transition-all"
        >
          <AtSign className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[1.8]" />
        </button>

        <button
          type="button"
          aria-label="X / Twitter"
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[#f4f2e9]/80 hover:text-white hover:bg-white/10 transition-all font-sans text-xs font-semibold"
        >
          𝕏
        </button>

        <button
          type="button"
          aria-label="Cart"
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-[#142317] text-white flex items-center justify-center shadow-inner hover:bg-[#0e1a10] transition-all"
        >
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
          </svg>
        </button>
      </nav>

      {/* Right: Location / Place Pin Button */}
      <button
        type="button"
        aria-label="Location & Store Finder"
        className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-[#dbe0c8]/20 backdrop-blur-md border border-white/10 flex items-center justify-center text-[#f4f2e9]/90 hover:text-white hover:bg-[#dbe0c8]/30 transition-all shadow-sm"
      >
        <MapPin className="w-4 h-4 stroke-[2]" />
      </button>
    </div>
  );
};
