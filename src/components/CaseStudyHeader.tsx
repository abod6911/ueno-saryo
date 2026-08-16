import React from 'react';
import { Plus } from 'lucide-react';

export const CaseStudyHeader: React.FC = () => {
  return (
    <header className="w-full max-w-[1800px] mx-auto px-6 sm:px-12 pt-5 pb-3 flex items-center justify-between text-white text-[10px] sm:text-[11px] font-sans tracking-[0.14em] uppercase font-medium select-none">
      {/* Left zone: Bookmark + Case label */}
      <div className="flex items-center space-x-2 opacity-95">
        <svg
          className="w-3.5 h-3.5 fill-current text-white"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M5 3a2 2 0 0 0-2 2v16l9-4 9 4V5a2 2 0 0 0-2-2H5z" />
        </svg>
        <span className="font-semibold tracking-wider">CASE UI/UX</span>
      </div>

      {/* Center zone: Minimal + Icon centered in entire page */}
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center pointer-events-none">
        <Plus className="w-3.5 h-3.5 text-white/90 stroke-[2.2]" />
      </div>

      {/* Right zone: Designer credit + heart */}
      <div className="flex items-center space-x-1.5 opacity-95">
        <span className="font-semibold tracking-wider">KRIS ANFALOVA</span>
        <svg
          className="w-3 h-3 fill-current text-white inline-block"
          viewBox="0 0 24 24"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </div>
    </header>
  );
};
