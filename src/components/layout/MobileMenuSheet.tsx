import React from 'react';
import { useLanguage } from '../../i18n/context';
import { BUSINESS_DATA } from '../../data/business';
import { X, Globe, MapPin, Phone, ShoppingBag, ArrowUpRight } from 'lucide-react';

interface MobileMenuSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToMenu: () => void;
}

export const MobileMenuSheet: React.FC<MobileMenuSheetProps> = ({
  isOpen,
  onClose,
  onNavigateToMenu,
}) => {
  const { locale, toggleLocale, t } = useLanguage();

  if (!isOpen) return null;

  const handleLinkClick = (hash: string) => {
    onClose();
    if (hash === '#menu') {
      onNavigateToMenu();
    } else {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Navigation Menu"
      className="fixed inset-0 z-[100] bg-[#122416]/98 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-10 animate-fade-in text-[#f8f7f1] overflow-y-auto"
    >
      {/* Header with Brand & Close Button */}
      <div className="flex items-center justify-between border-b border-white/10 pb-5">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="font-headline text-xl font-bold tracking-tight text-white">
              {locale === 'ar' ? 'مختبرات الشاي' : 'UENO SARYO'}
            </span>
            <span className="font-japanese text-xs text-[#939458]">茶道研究所</span>
          </div>
          <span className="text-[11px] text-white/50">{BUSINESS_DATA.address.districtEn}, {BUSINESS_DATA.address.cityEn}</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Language Switch */}
          <button
            type="button"
            onClick={toggleLocale}
            className="min-h-[44px] min-w-[44px] px-3.5 rounded-full bg-white/10 text-xs font-semibold flex items-center justify-center gap-1.5 border border-white/15"
          >
            <Globe className="w-4 h-4 text-[#939458]" />
            <span>{t.nav.langToggle}</span>
          </button>

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close Menu"
            className="min-h-[44px] min-w-[44px] rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 active:scale-95 border border-white/15"
          >
            <X className="w-6 h-6 stroke-[2]" />
          </button>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="flex flex-col gap-2 py-6 my-auto">
        <button
          type="button"
          onClick={() => handleLinkClick('#home')}
          className="text-start min-h-[48px] py-2 font-headline text-2xl sm:text-3xl font-bold text-white/90 hover:text-white transition-colors"
        >
          {t.nav.home}
        </button>

        <button
          type="button"
          onClick={() => handleLinkClick('#menu')}
          className="text-start min-h-[48px] py-2 font-headline text-2xl sm:text-3xl font-bold text-[#939458] hover:text-white transition-colors flex items-center justify-between"
        >
          <span>{t.nav.menu}</span>
          <span className="text-xs uppercase px-2.5 py-0.5 rounded-full bg-[#939458]/20 text-[#f0ede1] font-sans font-normal">
            {locale === 'ar' ? 'تفاعلي' : 'Interactive'}
          </span>
        </button>

        <button
          type="button"
          onClick={() => handleLinkClick('#matcha-studied')}
          className="text-start min-h-[48px] py-2 font-headline text-2xl sm:text-3xl font-bold text-white/90 hover:text-white transition-colors"
        >
          {locale === 'ar' ? 'الماتشا، بتفاصيلها' : 'Matcha, Studied'}
        </button>

        <button
          type="button"
          onClick={() => handleLinkClick('#tea-experience')}
          className="text-start min-h-[48px] py-2 font-headline text-2xl sm:text-3xl font-bold text-white/90 hover:text-white transition-colors"
        >
          {t.nav.experience}
        </button>

        <button
          type="button"
          onClick={() => handleLinkClick('#collection')}
          className="text-start min-h-[48px] py-2 font-headline text-2xl sm:text-3xl font-bold text-white/90 hover:text-white transition-colors"
        >
          {t.nav.collection}
        </button>

        <button
          type="button"
          onClick={() => handleLinkClick('#desserts')}
          className="text-start min-h-[48px] py-2 font-headline text-2xl sm:text-3xl font-bold text-white/90 hover:text-white transition-colors"
        >
          {locale === 'ar' ? 'الحلويات والمخبوزات' : 'Japanese Desserts'}
        </button>

        <button
          type="button"
          onClick={() => handleLinkClick('#gallery')}
          className="text-start min-h-[48px] py-2 font-headline text-2xl sm:text-3xl font-bold text-white/90 hover:text-white transition-colors"
        >
          {t.nav.gallery}
        </button>

        <button
          type="button"
          onClick={() => handleLinkClick('#reviews')}
          className="text-start min-h-[48px] py-2 font-headline text-2xl sm:text-3xl font-bold text-white/90 hover:text-white transition-colors"
        >
          {t.nav.reviews}
        </button>

        <button
          type="button"
          onClick={() => handleLinkClick('#visit')}
          className="text-start min-h-[48px] py-2 font-headline text-2xl sm:text-3xl font-bold text-white/90 hover:text-white transition-colors"
        >
          {t.nav.visit}
        </button>
      </nav>

      {/* Footer Quick Action Buttons */}
      <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
        <div className="grid grid-cols-2 gap-2.5">
          <a
            href={BUSINESS_DATA.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[48px] px-4 rounded-xl bg-[#29482a] text-white text-xs font-semibold flex items-center justify-center gap-2 active:scale-95 shadow-sm"
          >
            <MapPin className="w-4 h-4 text-[#939458]" />
            <span>{t.nav.directions}</span>
          </a>

          <a
            href={`tel:${BUSINESS_DATA.phone}`}
            className="min-h-[48px] px-4 rounded-xl bg-white/10 text-white text-xs font-semibold flex items-center justify-center gap-2 active:scale-95 border border-white/15"
          >
            <Phone className="w-4 h-4 text-[#939458]" />
            <span>{t.nav.call}</span>
          </a>
        </div>

        {BUSINESS_DATA.hungerStationUrl && (
          <a
            href={BUSINESS_DATA.hungerStationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[48px] w-full px-4 rounded-xl bg-[#f0ede1] text-[#122416] text-xs font-bold flex items-center justify-center gap-2 active:scale-95 shadow-card"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>{t.menu.orderCTA}</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
          </a>
        )}

        <p className="text-[11px] text-center text-white/40 pt-2 font-japanese">
          茶道研究所 · UENO SARYO · JEDDAH
        </p>
      </div>
    </div>
  );
};
