import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../i18n/context';
import { BUSINESS_DATA } from '../../data/business';
import { BookOpen, MapPin, Phone, ShoppingBag } from 'lucide-react';

interface MobileActionDockProps {
  onOpenMenu: () => void;
}

export const MobileActionDock: React.FC<MobileActionDockProps> = ({ onOpenMenu }) => {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 100) {
        setVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY - lastScrollY > 10) {
        // Scrolling down
        setVisible(false);
      } else if (lastScrollY - currentScrollY > 8) {
        // Scrolling up
        setVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <div
      className={`fixed bottom-4 left-4 right-4 sm:hidden z-40 transition-all duration-300 transform ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0 pointer-events-none'
      }`}
    >
      <div className="bg-[#122416]/92 backdrop-blur-xl border border-white/15 rounded-2xl shadow-dock p-1.5 flex items-center justify-around">
        {/* Menu Button */}
        <button
          type="button"
          onClick={onOpenMenu}
          aria-label={t.dock.menu}
          className="flex-1 min-h-[44px] flex flex-col items-center justify-center gap-1 text-[#f8f7f1] hover:text-white rounded-xl hover:bg-white/10 active:scale-95 transition-all"
        >
          <BookOpen className="w-4 h-4 text-[#939458]" />
          <span className="text-[10px] font-semibold tracking-tight">{t.dock.menu}</span>
        </button>

        {/* Directions Link */}
        <a
          href={BUSINESS_DATA.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t.dock.directions}
          className="flex-1 min-h-[44px] flex flex-col items-center justify-center gap-1 text-[#f8f7f1] hover:text-white rounded-xl hover:bg-white/10 active:scale-95 transition-all"
        >
          <MapPin className="w-4 h-4 text-[#939458]" />
          <span className="text-[10px] font-semibold tracking-tight">{t.dock.directions}</span>
        </a>

        {/* Call Link */}
        <a
          href={`tel:${BUSINESS_DATA.phone}`}
          aria-label={t.dock.call}
          className="flex-1 min-h-[44px] flex flex-col items-center justify-center gap-1 text-[#f8f7f1] hover:text-white rounded-xl hover:bg-white/10 active:scale-95 transition-all"
        >
          <Phone className="w-4 h-4 text-[#939458]" />
          <span className="text-[10px] font-semibold tracking-tight">{t.dock.call}</span>
        </a>

        {/* Order Link */}
        {BUSINESS_DATA.hungerStationUrl && (
          <a
            href={BUSINESS_DATA.hungerStationUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.dock.order}
            className="flex-1 min-h-[44px] flex flex-col items-center justify-center gap-1 bg-[#f0ede1] text-[#122416] rounded-xl font-bold active:scale-95 transition-all shadow-sm"
          >
            <ShoppingBag className="w-4 h-4 text-[#122416]" />
            <span className="text-[10px] font-bold tracking-tight">{t.dock.order}</span>
          </a>
        )}
      </div>
    </div>
  );
};
