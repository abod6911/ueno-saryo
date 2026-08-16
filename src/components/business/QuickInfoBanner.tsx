import React, { useMemo } from 'react';
import { useLanguage } from '../../i18n/context';
import { BUSINESS_DATA } from '../../data/business';
import { getJeddahOpenStatus } from '../../lib/openingHours';
import { Star, MapPin, ArrowUpRight, BookOpen } from 'lucide-react';
import { JapaneseSeal } from '../ui/JapaneseSeal';

interface QuickInfoBannerProps {
  onOpenMenu: () => void;
}

export const QuickInfoBanner: React.FC<QuickInfoBannerProps> = ({ onOpenMenu }) => {
  const { locale } = useLanguage();
  const openStatus = useMemo(() => getJeddahOpenStatus(BUSINESS_DATA), []);

  return (
    <section className="w-full max-w-[1640px] mx-auto px-3 sm:px-6 lg:px-12 py-3 relative z-20">
      <div className="w-full bg-[#122416]/95 backdrop-blur-xl border border-white/12 rounded-[22px] sm:rounded-[26px] p-4 sm:p-5 shadow-frame flex flex-col md:flex-row items-center justify-between gap-6 text-[#f8f7f1]">
        {/* Left: Brand Identity & Location */}
        <div className="flex items-center gap-3.5 w-full md:w-auto">
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-[14px] bg-[#19321d] border border-white/12 flex items-center justify-center shrink-0 shadow-inner">
            <JapaneseSeal char="茶" size={26} variant="square" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h2 className="font-headline text-lg sm:text-xl font-bold tracking-tight text-white">
                {locale === 'ar' ? 'مختبرات الشاي' : 'UENO SARYO'}
              </h2>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-[#939458]/20 text-[#f0ede1] border border-[#939458]/30">
                {locale === 'ar' ? 'جدة · حي الروضة' : 'Jeddah · Ar Rawdah'}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-[#f8f7f1]/70 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-[#939458] shrink-0" />
              <span>
                {locale === 'ar'
                  ? 'طريق الأمير سعود الفيصل، حي الروضة'
                  : 'Prince Saud Al Faisal, Ar Rawdah'}
              </span>
            </div>
          </div>
        </div>

        {/* Center: Live Jeddah Hours & Rating */}
        <div className="flex flex-wrap items-center justify-start md:justify-center gap-4 sm:gap-8 w-full md:w-auto py-2 md:py-0 border-y md:border-y-0 md:border-x border-white/10 px-0 md:px-8">
          {/* Live Open Status */}
          <div className="flex items-center gap-2.5">
            <div className="relative flex items-center justify-center">
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  openStatus.isOpen ? 'bg-emerald-400' : 'bg-amber-400'
                }`}
              />
              <span
                className={`absolute w-2.5 h-2.5 rounded-full animate-ping opacity-75 ${
                  openStatus.isOpen ? 'bg-emerald-400' : 'bg-amber-400'
                }`}
              />
            </div>
            <div className="flex flex-col text-xs">
              <span className="font-bold text-white">
                {locale === 'ar' ? openStatus.statusTextAr : openStatus.statusTextEn}
              </span>
              <span className="text-[11px] text-[#f8f7f1]/60 font-mono">
                {locale === 'ar'
                  ? openStatus.closesOrOpensAtTextAr
                  : openStatus.closesOrOpensAtTextEn}
              </span>
            </div>
          </div>

          {/* Rating Snapshot */}
          <div className="flex items-center gap-2 text-xs">
            <div className="flex items-center gap-1.5 text-amber-400 font-bold bg-white/5 px-2.5 py-1 rounded-[12px] border border-white/10">
              <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
              <span className="font-mono">{BUSINESS_DATA.rating.score}</span>
            </div>
            <span className="text-[11px] text-[#f8f7f1]/60 hidden sm:inline">
              ({BUSINESS_DATA.rating.reviewCount} {locale === 'ar' ? 'تقييم موثق' : 'reviews'})
            </span>
          </div>
        </div>

        {/* Right: Quick Menu CTA & Directions */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <button
            type="button"
            onClick={onOpenMenu}
            className="flex-1 md:flex-none min-h-[44px] px-5 py-2 rounded-full bg-[#f0ede1] hover:bg-white text-[#122416] text-xs font-bold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-sm cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-[#29482a]" />
            <span>{locale === 'ar' ? 'تصفح القائمة' : 'Explore Menu'}</span>
          </button>

          <a
            href={BUSINESS_DATA.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[44px] px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-white text-xs font-medium flex items-center justify-center gap-1.5 transition-all border border-white/15 cursor-pointer"
          >
            <span>{locale === 'ar' ? 'الاتجاهات' : 'Directions'}</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
          </a>
        </div>
      </div>
    </section>
  );
};
