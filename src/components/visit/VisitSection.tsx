import React from 'react';
import { BUSINESS_DATA } from '../../data/business';
import { OpeningHoursCard } from './OpeningHoursCard';
import { useLanguage } from '../../i18n/context';
import { Phone, ShoppingBag, Navigation } from 'lucide-react';
import { MatchaContour } from '../ui/MatchaContour';
import { TeaLabAnnotation } from '../ui/TeaLabAnnotation';
import { JapaneseSeal } from '../ui/JapaneseSeal';
import { RevealOnView } from '../ui/RevealOnView';

export const VisitSection: React.FC = () => {
  const { locale, t } = useLanguage();

  return (
    <section id="visit" className="w-full bg-[#19321d] text-[#f8f7f1] relative overflow-hidden border-t border-white/10">
      {/* Top Organic Contour Transition */}
      <MatchaContour variant="ridge-soft" fill="#19321d" className="w-full -mt-1 transform-gpu" />

      <div className="max-w-[1640px] mx-auto px-3 sm:px-6 lg:px-12 py-16 sm:py-24 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <TeaLabAnnotation
            index="LAB / 08"
            label={
              locale === 'ar'
                ? 'ملاذ الشاي بجدة'
                : locale === 'zh-CN'
                ? '吉达茶道圣所与到店指南'
                : 'JEDDAH SANCTUARY & VISITING'
            }
            kanji="訪茶 · 茶道研究所"
            variant="minimal"
            className="mb-4 sm:mb-5"
          />

          <div className="flex items-center gap-3 mb-4 sm:mb-5">
            <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-normal leading-[1.28] sm:leading-[1.22]">
              {t.visit.heading}
            </h2>
            <JapaneseSeal char="館" size={24} variant="square" />
          </div>

          <p className="text-xs sm:text-base text-[#f8f7f1]/75 leading-relaxed font-sans max-w-2xl pt-0.5">
            {t.visit.subheading}
          </p>
        </div>

        {/* 2-Column Grid: Location Details & Map + Opening Hours with Signature Rise */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          {/* Col 1: Store Location Details & Actions as Japanese Address Card */}
          <RevealOnView variant="signature-rise" delay={0} className="lg:col-span-7 h-full">
            <div className="h-full bg-[#122416] rounded-[24px] sm:rounded-[28px] p-6 sm:p-10 border border-white/12 shadow-2xl flex flex-col justify-between">
              <div className="flex flex-col gap-6">
                {/* Brand & Address Lockup */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="font-headline text-2xl sm:text-3xl font-bold text-white">
                      {locale === 'ar' ? 'مختبرات الشاي' : 'UENO SARYO'}
                    </span>
                    <span className="font-japanese text-sm text-[#939458] font-medium">茶道研究所</span>
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
                    className="min-h-[48px] px-4 rounded-full bg-[#29482a] hover:bg-[#365c3b] text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md border border-white/15 cursor-pointer"
                  >
                    <Navigation className="w-4 h-4 text-[#939458]" />
                    <span>{t.visit.getDirectionsBtn}</span>
                  </a>

                  <a
                    href={`tel:${BUSINESS_DATA.phone}`}
                    className="min-h-[48px] px-4 rounded-full bg-white/5 hover:bg-white/10 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all active:scale-95 border border-white/10 cursor-pointer"
                  >
                    <Phone className="w-4 h-4 text-[#939458]" />
                    <span>{t.visit.callBtn}</span>
                  </a>

                  <a
                    href={BUSINESS_DATA.hungerStationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[48px] px-4 rounded-full bg-white/5 hover:bg-white/10 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all active:scale-95 border border-white/10 cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4 text-[#939458]" />
                    <span>{t.visit.orderHungerStation}</span>
                  </a>
                </div>

                {/* Embedded Clean Google Map View */}
                <div className="w-full h-64 sm:h-72 rounded-[20px] overflow-hidden border border-white/10 relative shadow-inner bg-black/20">
                  <iframe
                    title="Ueno Saryo Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3710.606214064508!2d39.14361517592473!3d21.56221768022421!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15c3d1bfa11b9319%3A0xe54e3d3600f135b!2sUeno%20Saryo%20%7C%20%D9%85%D8%AE%D8%AA%D8%A8%D8%B1%D8%A7%D8%AA%20%D8%A7%D9%84%D8%B4%D8%A7%D9%8A!5e0!3m2!1sen!2ssa!4v1700000000000!5m2!1sen!2ssa"
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: 'contrast(1.05) saturate(0.9)' }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>

              <div className="pt-5 mt-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#f8f7f1]/70">
                <span className="font-mono text-[11px] text-[#f8f7f1]/60">7140 Prince Saud Al Faisal, Ar Rawdah 23432</span>
                
                {/* Social media links */}
                <div className="flex items-center gap-2">
                  {BUSINESS_DATA.instagramUrl && (
                    <a
                      href={BUSINESS_DATA.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 hover:bg-[#29482a] border border-white/10 text-white text-[11px] font-mono transition-all duration-200 active:scale-95"
                      aria-label="Instagram: @ueno_saryo"
                    >
                      <svg className="w-3.5 h-3.5 stroke-current fill-none text-[#939458]" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                      </svg>
                      <span>@ueno_saryo</span>
                    </a>
                  )}
                  {BUSINESS_DATA.tiktokUrl && (
                    <a
                      href={BUSINESS_DATA.tiktokUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 hover:bg-[#29482a] border border-white/10 text-white text-[11px] font-mono transition-all duration-200 active:scale-95"
                      aria-label="TikTok: @uenosaryotea"
                    >
                      <svg className="w-3.5 h-3.5 fill-current text-[#939458]" viewBox="0 0 24 24">
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.47 6.27 6.27 0 0 0 1.94-4.47V8.58a8.27 8.27 0 0 0 4.83 1.56V6.69z"/>
                      </svg>
                      <span>@uenosaryotea</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </RevealOnView>

          {/* Col 2: Opening Hours Table & Hospitality Detail */}
          <RevealOnView variant="signature-rise" delay={120} className="lg:col-span-5 h-full flex flex-col">
            <OpeningHoursCard />
          </RevealOnView>
        </div>
      </div>
    </section>
  );
};
