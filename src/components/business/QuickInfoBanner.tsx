import React, { useMemo } from 'react';
import { useLanguage } from '../../i18n/context';
import { BUSINESS_DATA } from '../../data/business';
import { getJeddahOpenStatus } from '../../lib/openingHours';
import { Star, MapPin, ArrowUpRight, BookOpen } from 'lucide-react';
import { JapaneseSeal } from '../ui/JapaneseSeal';
import { RevealOnView } from '../ui/RevealOnView';

interface QuickInfoBannerProps {
  onOpenMenu: () => void;
}

export const QuickInfoBanner: React.FC<QuickInfoBannerProps> = ({ onOpenMenu }) => {
  const { locale, t } = useLanguage();
  const openStatus = useMemo(() => getJeddahOpenStatus(BUSINESS_DATA), []);

  return (
    <section className="w-full max-w-[1640px] mx-auto px-3 sm:px-6 lg:px-12 py-3 relative z-20">
      {/* 3-Panel Ueno Editorial Strip */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.35fr_0.95fr_1fr] gap-3">
        {/* PANEL A: Brand & Location (Printed Washi Specimen Card) */}
        <RevealOnView
          variant="fade-up"
          delay={0}
          className="bg-[#f8f7f1] text-[#122416] rounded-[20px] sm:rounded-[22px] p-4 sm:p-5 border border-black/[0.08] shadow-[0_8px_20px_rgba(0,0,0,0.15)] flex items-center justify-between gap-3.5 group"
        >
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-[14px] bg-[#ede9de] border border-black/10 flex items-center justify-center shrink-0 shadow-inner">
              <JapaneseSeal char="茶" size={24} variant="square" />
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="font-headline text-base sm:text-lg font-bold tracking-tight text-[#122416] truncate">
                  {locale === 'ar' ? 'مختبرات الشاي' : 'UENO SARYO'}
                </h2>
                <span className="text-[9.5px] sm:text-[10px] font-japanese font-bold text-[#29482a] bg-[#122416]/10 px-2 py-0.5 rounded-full shrink-0">
                  茶道研究所
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[#181813]/70 mt-1 truncate">
                <MapPin className="w-3.5 h-3.5 text-[#29482a] shrink-0" />
                <span className="truncate">
                  {locale === 'ar'
                    ? 'طريق الأمير سعود الفيصل، حي الروضة'
                    : locale === 'zh-CN'
                    ? '吉达 · Ar Rawdah 区 萨欧德·费萨尔王子路'
                    : 'Prince Saud Al Faisal, Ar Rawdah'}
                </span>
              </div>
            </div>
          </div>
        </RevealOnView>

        {/* PANEL B: Live Jeddah Hours & Rating */}
        <RevealOnView
          variant="fade-up"
          delay={80}
          className="bg-[#1b331f] text-[#f8f7f1] rounded-[20px] sm:rounded-[22px] p-4 sm:p-5 border border-white/10 shadow-[0_8px_20px_rgba(0,0,0,0.2)] flex items-center justify-between gap-3"
        >
          {/* Live Open Status */}
          <div className="flex items-center gap-2.5">
            <div className="relative flex items-center justify-center shrink-0">
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
              <span className="font-bold text-white leading-tight">
                {locale === 'ar'
                  ? openStatus.statusTextAr
                  : locale === 'zh-CN'
                  ? openStatus.statusTextZh || openStatus.statusTextEn
                  : openStatus.statusTextEn}
              </span>
              <span className="text-[10.5px] text-[#f8f7f1]/65 font-mono mt-0.5">
                {locale === 'ar'
                  ? openStatus.closesOrOpensAtTextAr
                  : locale === 'zh-CN'
                  ? openStatus.closesOrOpensAtTextZh || openStatus.closesOrOpensAtTextEn
                  : openStatus.closesOrOpensAtTextEn}
              </span>
            </div>
          </div>

          {/* Rating Snapshot */}
          <div className="flex flex-col items-end shrink-0">
            <div className="flex items-center gap-1 text-amber-300 font-bold bg-white/10 px-2 py-0.5 rounded-[8px] border border-white/15 text-xs">
              <Star className="w-3.5 h-3.5 fill-amber-300 stroke-amber-300" />
              <span className="font-mono">{BUSINESS_DATA.rating.score}</span>
            </div>
            <span className="text-[10px] text-[#f8f7f1]/60 font-mono mt-1">
              {BUSINESS_DATA.rating.reviewCount}{' '}
              {locale === 'ar' ? 'تقييم' : locale === 'zh-CN' ? '条好评' : 'reviews'}
            </span>
          </div>
        </RevealOnView>

        {/* PANEL C: Quick Action Buttons */}
        <RevealOnView
          variant="fade-up"
          delay={160}
          className="bg-[#122416] text-[#f8f7f1] rounded-[20px] sm:rounded-[22px] p-3 sm:p-3.5 border border-white/10 shadow-[0_8px_20px_rgba(0,0,0,0.25)] flex items-center justify-between gap-2 md:col-span-2 lg:col-span-1"
        >
          <button
            type="button"
            onClick={onOpenMenu}
            className="flex-1 min-h-[44px] px-4 py-2 rounded-[14px] bg-[#f0ede1] hover:bg-white text-[#122416] text-xs font-bold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-sm cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-[#29482a]" />
            <span>{t.quickInfo.viewMenuBtn}</span>
          </button>

          <a
            href={BUSINESS_DATA.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[44px] px-3.5 sm:px-4 py-2 rounded-[14px] bg-white/10 hover:bg-white/20 text-[#f8f7f1] text-xs font-medium flex items-center justify-center gap-1.5 border border-white/10 transition-all active:scale-95 cursor-pointer"
          >
            <span>{t.quickInfo.directionsBtn}</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#939458]" />
          </a>
        </RevealOnView>
      </div>
    </section>
  );
};
