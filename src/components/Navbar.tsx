import React, { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenContact: () => void;
  onOpenResume: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  onOpenContact,
  onOpenResume,
}) => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [logoHovered, setLogoHovered] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', target: 'hero' },
    { label: 'Work', target: 'work' },
    { label: 'Resume', target: 'resume' },
  ];

  const handleItemClick = (e: React.MouseEvent, item: { label: string; target: string }) => {
    e.preventDefault();
    if (item.target === 'resume') {
      onOpenResume();
    } else {
      onNavigate(item.target);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4 pointer-events-none transition-all duration-300">
      <nav
        className={`pointer-events-auto inline-flex items-center gap-1 sm:gap-2 rounded-full backdrop-blur-md border border-white/10 bg-surface/80 px-2 py-1.5 sm:py-2 transition-all duration-300 ${
          isScrolled ? 'shadow-lg shadow-black/40 bg-surface/90 border-white/15' : 'shadow-md shadow-black/10'
        }`}
      >
        {/* 1. Logo */}
        <button
          onClick={() => onNavigate('hero')}
          onMouseEnter={() => setLogoHovered(true)}
          onMouseLeave={() => setLogoHovered(false)}
          className="relative w-9 h-9 rounded-full p-[1.5px] transition-transform duration-300 hover:scale-110 focus:outline-none flex items-center justify-center group"
          aria-label="Home logo"
        >
          {/* Accent gradient border (reverses on hover) */}
          <div
            className="absolute inset-0 rounded-full transition-all duration-500"
            style={{
              background: logoHovered
                ? 'linear-gradient(270deg, #89AACC 0%, #4E85BF 100%)'
                : 'linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)',
            }}
          />
          {/* Inner circle */}
          <div className="relative w-full h-full rounded-full bg-bg flex items-center justify-center">
            <span className="font-display italic text-[13px] text-text-primary tracking-tight font-medium">
              JA
            </span>
          </div>
        </button>

        {/* 2. Divider */}
        <div className="w-px h-5 bg-stroke mx-1 hidden sm:block" />

        {/* 3. Nav Links */}
        <div className="flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = activeSection === item.target;
            return (
              <button
                key={item.label}
                onClick={(e) => handleItemClick(e, item)}
                className={`text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 font-medium transition-all duration-200 ${
                  isActive
                    ? 'text-text-primary bg-stroke/60 shadow-inner'
                    : 'text-muted hover:text-text-primary hover:bg-stroke/40'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* 4. Divider */}
        <div className="w-px h-5 bg-stroke mx-1" />

        {/* 5. "Say hi" button with gradient underlay on hover */}
        <button
          onClick={onOpenContact}
          className="group relative inline-flex items-center justify-center rounded-full text-xs sm:text-sm font-medium transition-all duration-300 focus:outline-none"
        >
          {/* Gradient glow underlay on hover */}
          <span
            className="absolute -inset-[2px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-[1px]"
            aria-hidden="true"
          />
          {/* Inner content */}
          <span className="inline-flex items-center gap-1.5 rounded-full bg-surface px-3 sm:px-4 py-1.5 sm:py-2 text-text-primary border border-stroke/50 group-hover:border-transparent transition-colors duration-200">
            Say hi
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </button>
      </nav>
    </header>
  );
};
