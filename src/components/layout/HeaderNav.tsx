import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../i18n/context';
import { BUSINESS_DATA } from '../../data/business';
import { Menu, MapPin, Globe, ArrowUpRight } from 'lucide-react';

interface HeaderNavProps {
  onOpenMobileMenu: () => void;
  onOpenMenuSection: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({ onOpenMobileMenu, onOpenMenuSection }) => {
  const { locale, toggleLocale, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#122416]/90 backdrop-blur-lg border-b border-white/10 shadow-lg py-2.5'
          : 'bg-transparent py-3 sm:py-4'
      }`}
    >
      <div className="max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-14 flex items-center justify-between">
        {/* Left: Brand Lockup */}
        <a
          href="#home"
          className="flex flex-col items-start group select-none transition-transform active:scale-95"
          aria-label="Ueno Saryo - Home"
        >
          <div className="flex items-center gap-2">
            <span className="font-headline text-lg sm:text-2xl font-bold tracking-tight text-[#f8f7f1] group-hover:text-white transition-colors">
              {locale === 'ar' ? 'مختبرات الشاي' : 'UENO SARYO'}
            </span>
            <span className="font-japanese text-[11px] sm:text-xs text-[#939458] font-bold tracking-wider px-2 py-0.5 rounded-full bg-white/10 border border-white/15">
              茶道研究所
            </span>
          </div>
          <span className="text-[10px] sm:text-xs text-[#f8f7f1]/60 tracking-wider uppercase mt-0.5">
            {locale === 'ar' ? 'UENO SARYO · تجربة الشاي' : 'Tea Experience · Ar Rawdah'}
          </span>
        </a>

        {/* Center: Desktop Navigation Links */}
        <nav
          aria-label="Main Navigation"
          className="hidden xl:flex items-center gap-1 bg-[#29482a]/40 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 shadow-sm"
        >
          <a
            href="#home"
            className="px-3.5 py-1.5 text-xs font-medium text-[#f8f7f1]/80 hover:text-white hover:bg-white/10 rounded-full transition-all"
          >
            {t.nav.home}
          </a>
          <button
            type="button"
            onClick={onOpenMenuSection}
            className="px-3.5 py-1.5 text-xs font-medium text-[#f8f7f1]/80 hover:text-white hover:bg-white/10 rounded-full transition-all"
          >
            {t.nav.menu}
          </button>
          <a
            href="#matcha-studied"
            className="px-3.5 py-1.5 text-xs font-medium text-[#f8f7f1]/80 hover:text-white hover:bg-white/10 rounded-full transition-all"
          >
            {locale === 'ar' ? 'الماتشا' : 'Matcha'}
          </a>
          <a
            href="#tea-experience"
            className="px-3.5 py-1.5 text-xs font-medium text-[#f8f7f1]/80 hover:text-white hover:bg-white/10 rounded-full transition-all"
          >
            {t.nav.experience}
          </a>
          <a
            href="#collection"
            className="px-3.5 py-1.5 text-xs font-medium text-[#f8f7f1]/80 hover:text-white hover:bg-white/10 rounded-full transition-all"
          >
            {t.nav.collection}
          </a>
          <a
            href="#desserts"
            className="px-3.5 py-1.5 text-xs font-medium text-[#f8f7f1]/80 hover:text-white hover:bg-white/10 rounded-full transition-all"
          >
            {locale === 'ar' ? 'الحلويات' : 'Desserts'}
          </a>
          <a
            href="#gallery"
            className="px-3.5 py-1.5 text-xs font-medium text-[#f8f7f1]/80 hover:text-white hover:bg-white/10 rounded-full transition-all"
          >
            {t.nav.gallery}
          </a>
          <a
            href="#reviews"
            className="px-3.5 py-1.5 text-xs font-medium text-[#f8f7f1]/80 hover:text-white hover:bg-white/10 rounded-full transition-all"
          >
            {t.nav.reviews}
          </a>
          <a
            href="#visit"
            className="px-3.5 py-1.5 text-xs font-medium text-[#f8f7f1]/80 hover:text-white hover:bg-white/10 rounded-full transition-all"
          >
            {t.nav.visit}
          </a>
        </nav>

        {/* Right: Actions & Language Switch */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Switch Button */}
          <button
            type="button"
            onClick={toggleLocale}
            aria-label="Switch Language"
            className="h-9 sm:h-10 px-3 sm:px-4 rounded-full bg-[#f8f7f1]/10 hover:bg-[#f8f7f1]/20 backdrop-blur-md border border-white/15 text-[#f8f7f1] text-xs font-semibold flex items-center gap-1.5 transition-all active:scale-95 shadow-sm"
          >
            <Globe className="w-3.5 h-3.5 stroke-[2] opacity-80" />
            <span>{t.nav.langToggle}</span>
          </button>

          {/* Directions Quick Link (Desktop) */}
          <a
            href={BUSINESS_DATA.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex h-9 sm:h-10 px-3.5 sm:px-4 rounded-full bg-[#29482a]/70 hover:bg-[#29482a] border border-white/15 text-[#f8f7f1] text-xs font-medium items-center gap-1.5 transition-all shadow-sm"
          >
            <MapPin className="w-3.5 h-3.5 text-[#939458]" />
            <span>{t.nav.directions}</span>
            <ArrowUpRight className="w-3 h-3 opacity-60" />
          </a>

          {/* Menu Button CTA */}
          <button
            type="button"
            onClick={onOpenMenuSection}
            className="hidden sm:inline-flex h-9 sm:h-10 px-4 sm:px-5 rounded-full bg-[#f0ede1] text-[#122416] text-xs font-bold items-center gap-1.5 hover:bg-white hover:shadow-card transition-all active:scale-95 shadow-sm"
          >
            <span>{t.nav.menu}</span>
          </button>

          {/* Mobile Menu Trigger Button */}
          <button
            type="button"
            onClick={onOpenMobileMenu}
            aria-label="Open Navigation Menu"
            className="xl:hidden w-10 h-10 rounded-full bg-[#122416]/60 backdrop-blur-md border border-white/15 flex items-center justify-center text-white hover:bg-[#122416]/90 transition-all active:scale-95"
          >
            <Menu className="w-5 h-5 stroke-[2]" />
          </button>
        </div>
      </div>
    </header>
  );
};
