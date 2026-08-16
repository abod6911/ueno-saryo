import React, { useMemo } from 'react';
import { useLanguage } from '../../i18n/context';
import { BUSINESS_DATA } from '../../data/business';
import { getJeddahOpenStatus } from '../../lib/openingHours';
import { Star, MapPin, ArrowUpRight, BookOpen } from 'lucide-react';

interface QuickInfoBannerProps {
  onOpenMenu: () => void;
}

export const QuickInfoBanner: React.FC<QuickInfoBannerProps> = ({ onOpenMenu }) => {
  const { locale, t } = useLanguage();
  const openStatus = useMemo(() => getJeddahOpenStatus(BUSINESS_DATA), []);

  return (
    <section className="w-full max-w-[1640px] mx-auto px-3 sm:px-6 lg:px-12 py-3 relative z-20">
      <div className="w-full bg-[#122416]/90 backdrop-blur-xl border border-white/12 rounded-[20px] sm:rounded-[26px] p-4 sm:p-5 shadow-frame flex flex-col md:flex-row items-center justify-between gap-6 text-[#f8f7f1]">
        {/* Left: Brand Identity & Location */}
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#29482a] border border-white/10 flex items-center justify-center shrink-0 shadow-inner">
            <span className="font-japanese text-xl sm:text-2xl text-[#939458] font-bold">茶</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h2 className="font-headline text-lg sm:text-xl font-bold tracking-tight text-white">
                {locale === 'ar' ? 'مختبرات الشاي' : 'UENO SARYO'}
              </h2>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-[#939458]/20 text-[#f0ede1] border border-[#939458]/30">
                {locale === 'ar' ? 'جدة' : 'Jeddah'}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-[#f8f7f1]/70 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-[#939458] shrink-0" />
              <span>
                {locale === 'ar'
                  ? 'طريق الأمير سعود الفيصل، الروضة'
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
              <span className="text-[11px] text-[#f8f7f1]/60">
                {locale === 'ar'
                  ? openStatus.closesOrOpensAtTextAr
                  : openStatus.closesOrOpensAtTextEn}
              </span>
            </div>
          </div>

          {/* Rating Snapshot */}
          <div className="flex items-center gap-2 text-xs">
            <div className="flex items-center gap-1 text-amber-400 font-bold bg-white/5 px-2.5 py-1 rounded-xl border border-white/10">
              <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
              <span>{BUSINESS_DATA.rating.score}</span>
            </div>
            <div className="flex flex-col text-[11px] text-[#f8f7f1]/60">
              <span>{locale === 'ar' ? 'تقييم Google' : 'Google Rating'}</span>
              <span>{BUSINESS_DATA.rating.reviewCount}+ {locale === 'ar' ? 'تقييم موثق' : 'Reviews'}</span>
            </div>
          </div>
        </div>

        {/* Right: Quick Action CTAs */}
        <div className="flex items-center gap-2.5 w-full md:w-auto justify-end">
          <button
            type="button"
            onClick={onOpenMenu}
            className="flex-1 md:flex-initial min-h-[44px] px-5 rounded-xl bg-[#f0ede1] text-[#122416] text-xs font-bold flex items-center justify-center gap-2 hover:bg-white active:scale-95 transition-all shadow-card"
          >
            <BookOpen className="w-4 h-4" />
            <span>{t.quickInfo.viewMenuBtn}</span>
          </button>

          <a
            href={BUSINESS_DATA.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 md:flex-initial min-h-[44px] px-4 rounded-xl bg-[#29482a] hover:bg-[#365c3b] text-white text-xs font-semibold flex items-center justify-center gap-1.5 border border-white/15 active:scale-95 transition-all shadow-sm"
          >
            <MapPin className="w-3.5 h-3.5 text-[#939458]" />
            <span>{t.quickInfo.directionsBtn}</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
          </a>
        </div>
      </div>
    </section>
  );
};
