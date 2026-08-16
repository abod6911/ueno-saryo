import React from 'react';
import { useLanguage } from '../../i18n/context';
import { BUSINESS_DATA } from '../../data/business';
import { MapPin, Phone, Globe, ArrowUp } from 'lucide-react';
import { MatchaContour } from '../ui/MatchaContour';

interface FooterProps {
  onOpenMenu: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenMenu }) => {
  const { locale, toggleLocale, t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#122416] text-[#f8f7f1] border-t border-white/10 relative overflow-hidden">
      {/* Top Organic Contour Transition */}
      <MatchaContour variant="divider-shallow" fill="#122416" className="w-full -mt-1 transform-gpu" />

      {/* Background Decorative Kanji */}
      <div className="absolute -bottom-10 right-4 sm:right-16 text-[140px] sm:text-[220px] font-japanese font-black text-white/[0.02] pointer-events-none select-none">
        茶道
      </div>

      <div className="max-w-[1640px] mx-auto px-3 sm:px-6 lg:px-12 pt-14 pb-24 sm:pb-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          {/* Col 1: Brand & Bio */}
          <div className="flex flex-col items-start gap-4">
            <div className="flex flex-col">
              <div className="flex items-baseline gap-2.5">
                <span className="font-headline text-2xl font-bold tracking-tight text-white">
                  {locale === 'ar' ? 'مختبرات الشاي' : 'UENO SARYO'}
                </span>
                <span className="font-japanese text-sm text-[#939458] tracking-widest font-medium">
                  茶道研究所
                </span>
              </div>
              <span className="text-xs text-[#939458] uppercase tracking-wider font-mono pt-0.5 font-semibold">
                JEDDAH · SAUDI ARABIA
              </span>
            </div>
            <p className="text-xs text-[#f8f7f1]/70 leading-relaxed max-w-sm">
              {t.footer.brandBio}
            </p>
            <div className="flex items-center gap-3 pt-2">
              {BUSINESS_DATA.instagramUrl && (
                <a
                  href={BUSINESS_DATA.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all cursor-pointer"
                >
                  <svg className="w-4 h-4 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                  </svg>
                </a>
              )}
              <button
                type="button"
                onClick={toggleLocale}
                className="h-8 px-3 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold flex items-center gap-1.5 transition-all text-white cursor-pointer"
              >
                <Globe className="w-3.5 h-3.5 text-[#939458]" />
                <span>{t.nav.langToggle}</span>
              </button>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="flex flex-col items-start gap-3">
            <span className="text-xs font-mono uppercase tracking-widest text-[#939458] font-bold">
              {t.footer.quickLinks}
            </span>
            <ul className="flex flex-col gap-2 text-xs text-[#f8f7f1]/75">
              <li>
                <a href="#home" className="hover:text-white transition-colors">
                  {t.nav.home}
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenMenu}
                  className="hover:text-white transition-colors text-start cursor-pointer"
                >
                  {t.nav.menu}
                </button>
              </li>
              <li>
                <a href="#matcha-studied" className="hover:text-white transition-colors">
                  {locale === 'ar' ? 'الماتشا الاحتفالية' : 'Ceremonial Matcha'}
                </a>
              </li>
              <li>
                <a href="#tea-experience" className="hover:text-white transition-colors">
                  {t.nav.experience}
                </a>
              </li>
              <li>
                <a href="#collection" className="hover:text-white transition-colors">
                  {t.nav.collection}
                </a>
              </li>
              <li>
                <a href="#desserts" className="hover:text-white transition-colors">
                  {locale === 'ar' ? 'الحلويات اليابانية' : 'Desserts & Sweets'}
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-white transition-colors">
                  {t.nav.gallery}
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-white transition-colors">
                  {t.nav.reviews}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Location & Hours */}
          <div className="flex flex-col items-start gap-3">
            <span className="text-xs font-mono uppercase tracking-widest text-[#939458] font-bold">
              {t.footer.contact}
            </span>
            <div className="flex flex-col gap-2.5 text-xs text-[#f8f7f1]/75">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#939458] shrink-0 mt-0.5" />
                <span>
                  {locale === 'ar'
                    ? `${BUSINESS_DATA.address.streetAr}، ${BUSINESS_DATA.address.districtAr}، ${BUSINESS_DATA.address.cityAr}`
                    : `${BUSINESS_DATA.address.streetEn}, ${BUSINESS_DATA.address.districtEn}, ${BUSINESS_DATA.address.cityEn}`}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#939458] shrink-0" />
                <a href={`tel:${BUSINESS_DATA.phone}`} className="hover:text-white transition-colors ltr:font-mono">
                  {BUSINESS_DATA.phoneDisplay}
                </a>
              </div>
              <div className="pt-2">
                <a
                  href={BUSINESS_DATA.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-[11px] font-medium text-white transition-all cursor-pointer"
                >
                  <MapPin className="w-3 h-3 text-[#939458]" />
                  <span>{t.visit.getDirectionsBtn}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Col 4: Philosophy Note */}
          <div className="flex flex-col items-start gap-3">
            <span className="text-xs font-mono uppercase tracking-widest text-[#939458] font-bold">
              {locale === 'ar' ? 'فلسفة الشاي' : 'Tea Philosophy'}
            </span>
            <p className="text-xs text-[#f8f7f1]/70 leading-relaxed italic">
              {locale === 'ar'
                ? '«إيتشي-غو إيتشي-إي» — نقاء اللحظة الواحدة التي لا تتكرر أبداً في وعاء من الشاي المصنوع بحب وسكينة.'
                : '"Ichi-go ichi-e" — Treasure every encounter, for it will never recur in the exact same way.'}
            </p>
            <div className="pt-3 w-full">
              <button
                type="button"
                onClick={scrollToTop}
                aria-label="Scroll to top"
                className="w-full h-10 rounded-2xl bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center gap-2 text-xs text-white/80 hover:text-white transition-all active:scale-95 cursor-pointer"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                <span>{locale === 'ar' ? 'العودة للأعلى' : 'Back to Top'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#f8f7f1]/50">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Ueno Saryo (مختبرات الشاي). {t.footer.rights}</span>
          </div>
          <div className="text-[11px] font-mono tracking-wider text-[#939458]">
            AR RAWDAH · JEDDAH · SAUDI ARABIA
          </div>
        </div>
      </div>
    </footer>
  );
};
