import React from 'react';
import { BUSINESS_DATA } from '../../data/business';
import { OpeningHoursCard } from './OpeningHoursCard';
import { useLanguage } from '../../i18n/context';
import { Phone, ShoppingBag, ArrowUpRight, Navigation, Sparkles } from 'lucide-react';

export const VisitSection: React.FC = () => {
  const { locale, t } = useLanguage();

  return (
    <section id="visit" className="w-full bg-[#19321d] text-[#f8f7f1] py-20 sm:py-32 relative overflow-hidden border-t border-white/10">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-14 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-xs font-mono uppercase tracking-widest text-[#939458] border border-white/10 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.visit.badge}</span>
          </div>

          <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            {t.visit.heading}
          </h2>

          <p className="text-xs sm:text-base text-[#f8f7f1]/70 leading-relaxed font-sans">
            {t.visit.subheading}
          </p>
        </div>

        {/* 2-Column Grid: Location Details & Map + Opening Hours */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Col 1: Store Location Details & Actions */}
          <div className="lg:col-span-7 bg-[#122416] rounded-3xl p-6 sm:p-10 border border-white/12 shadow-2xl flex flex-col justify-between">
            <div className="flex flex-col gap-6">
              {/* Brand & Address Lockup */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-headline text-2xl sm:text-3xl font-bold text-white">
                    {locale === 'ar' ? 'مختبرات الشاي' : 'UENO SARYO'}
                  </span>
                  <span className="font-japanese text-sm text-[#939458]">茶道研究所</span>
                </div>
                <p className="text-sm sm:text-base text-[#f8f7f1]/80 leading-relaxed font-sans">
                  {t.visit.address}
                </p>
              </div>

              {/* Action Buttons Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <a
                  href={BUSINESS_DATA.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[48px] px-4 rounded-2xl bg-[#29482a] hover:bg-[#365c3b] text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md border border-white/15"
                >
                  <Navigation className="w-4 h-4 text-[#939458]" />
                  <span>{t.visit.getDirectionsBtn}</span>
                </a>

                <a
                  href={`tel:${BUSINESS_DATA.phone}`}
                  className="min-h-[48px] px-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all active:scale-95 border border-white/15"
                >
                  <Phone className="w-4 h-4 text-[#939458]" />
                  <span>{t.visit.callBtn}</span>
                </a>

                {BUSINESS_DATA.hungerStationUrl && (
                  <a
                    href={BUSINESS_DATA.hungerStationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[48px] px-4 rounded-2xl bg-[#f0ede1] text-[#122416] text-xs font-bold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-card"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>{t.visit.orderHungerStation}</span>
                  </a>
                )}
              </div>

              {/* Visual Map / Location Embed Card */}
              <div className="w-full aspect-[16/9] bg-[#19321d] rounded-2xl overflow-hidden border border-white/10 relative group">
                <iframe
                  title="Ueno Saryo Location Map"
                  src="https://maps.google.com/maps?q=Prince%20Saud%20Al%20Faisal%20Ar%20Rawdah%20Jeddah&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0 filter grayscale invert contrast-125 opacity-80 group-hover:opacity-100 transition-opacity"
                  loading="lazy"
                />
                <a
                  href={BUSINESS_DATA.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-3 end-3 bg-[#122416]/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-[11px] font-medium text-white flex items-center gap-1.5 hover:bg-[#122416] transition-colors"
                >
                  <span>Google Maps</span>
                  <ArrowUpRight className="w-3 h-3 text-[#939458]" />
                </a>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs text-[#f8f7f1]/60">
              <span>Ar Rawdah, Jeddah 23432</span>
              <span className="font-mono text-[#939458]">{BUSINESS_DATA.phoneDisplay}</span>
            </div>
          </div>

          {/* Col 2: Real-time Opening Hours Component */}
          <div className="lg:col-span-5 flex flex-col">
            <OpeningHoursCard />
          </div>
        </div>
      </div>
    </section>
  );
};
