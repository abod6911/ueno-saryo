import React, { useEffect, useRef, useState, memo } from 'react';
import { REVIEWS_DATA } from '../../data/reviews';
import { BUSINESS_DATA } from '../../data/business';
import { useLanguage } from '../../i18n/context';
import { Star, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { TeaLabAnnotation } from '../ui/TeaLabAnnotation';
import { JapaneseSeal } from '../ui/JapaneseSeal';

export const ReviewsSection: React.FC = memo(() => {
  const { locale, t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    if (mediaQuery.matches) {
      setIsInView(true);
      return;
    }

    const el = sectionRef.current;
    if (!el) return;

    // Check if already in viewport
    const check = () => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight + 100) {
        setIsInView(true);
        return true;
      }
      return false;
    };

    if (check()) return;

    const onScroll = () => {
      if (check()) {
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onScroll);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
          window.removeEventListener('scroll', onScroll);
          window.removeEventListener('resize', onScroll);
        }
      },
      { threshold: 0.05, rootMargin: '100px 0px 100px 0px' }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="reviews"
      className="w-full bg-[#162c19] text-[#f8f7f1] py-16 sm:py-24 relative overflow-hidden border-t border-white/10"
    >
      <div className="max-w-[1640px] mx-auto px-3 sm:px-6 lg:px-12 relative z-10">
        {/* Section Header with Specimen Index & Coordinated Motion */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12 sm:mb-14 pb-8 sm:pb-10 border-b border-white/10">
          {/* Header Column */}
          <div className="lg:col-span-8 flex flex-col items-start gap-3">
            {/* 1. Lab Annotation (t = 0ms) */}
            <div
              style={{
                transitionDuration: prefersReducedMotion ? '0ms' : '500ms',
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                transitionDelay: prefersReducedMotion ? '0ms' : '0ms',
              }}
              className={`will-change-transform transform-gpu transition-[opacity,transform] ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2.5'
              }`}
            >
              <TeaLabAnnotation
                index="LAB / 07"
                label={
                  locale === 'ar'
                    ? 'انطباعات وشهادات الضيوف'
                    : locale === 'zh-CN'
                    ? '宾客品鉴评价'
                    : 'GUEST REVIEWS & FEEDBACK'
                }
                kanji="評価 · 評判"
                variant="minimal"
              />
            </div>

            {/* 2. Main Heading & Japanese Seal (t = 80ms) */}
            <div
              style={{
                transitionDuration: prefersReducedMotion ? '0ms' : '650ms',
                transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
                transitionDelay: prefersReducedMotion ? '0ms' : '80ms',
              }}
              className={`flex items-center gap-3 will-change-transform transform-gpu transition-[opacity,transform] ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3.5'
              }`}
            >
              <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-normal">
                {t.reviews.heading}
              </h2>
              <JapaneseSeal char="評" size={24} variant="square" />
            </div>

            {/* 3. Subheading (t = 140ms) */}
            <p
              style={{
                transitionDuration: prefersReducedMotion ? '0ms' : '600ms',
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                transitionDelay: prefersReducedMotion ? '0ms' : '140ms',
              }}
              className={`text-xs sm:text-base text-[#f8f7f1]/75 leading-relaxed font-sans max-w-xl will-change-transform transform-gpu transition-[opacity,transform] ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
              }`}
            >
              {t.reviews.subheading}
            </p>
          </div>

          {/* Large Social-Proof Google Score Lockup (Signature Rise: t = 120ms) */}
          <div
            style={{
              transitionDuration: prefersReducedMotion ? '0ms' : '800ms',
              transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
              transitionDelay: prefersReducedMotion ? '0ms' : '120ms',
            }}
            className={`lg:col-span-4 flex flex-col sm:flex-row items-start sm:items-center justify-between lg:justify-end gap-5 bg-[#122416] p-5 sm:p-6 rounded-[22px] sm:rounded-[26px] border border-white/10 shadow-lg will-change-transform transform-gpu transition-[opacity,transform] ${
              isInView
                ? 'opacity-100 translate-y-0 scale-100'
                : 'opacity-0 translate-y-7 scale-[0.965]'
            }`}
          >
            <div className="flex flex-col">
              {/* Score Number Secondary Reveal */}
              <div
                style={{
                  transitionDuration: prefersReducedMotion ? '0ms' : '450ms',
                  transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                  transitionDelay: prefersReducedMotion ? '0ms' : '200ms',
                }}
                className={`flex items-baseline gap-2 will-change-transform transform-gpu transition-[opacity,transform] ${
                  isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.94]'
                }`}
              >
                <span className="font-headline text-4xl sm:text-5xl font-extrabold text-white">
                  {BUSINESS_DATA.rating.score}
                </span>
                <span className="text-sm text-white/50 font-mono">/ 5.0</span>
              </div>

              {/* 5 Stars Sequential Reveal (t = 280ms + i * 40ms) */}
              <div className="flex items-center gap-1 text-amber-400 my-1">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    style={{
                      transitionDuration: prefersReducedMotion ? '0ms' : '300ms',
                      transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
                      transitionDelay: prefersReducedMotion ? '0ms' : `${280 + i * 40}ms`,
                    }}
                    className={`inline-block will-change-transform transform-gpu transition-[opacity,transform] ${
                      isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.8]'
                    }`}
                  >
                    <Star
                      className={`w-4 h-4 ${
                        i < 4
                          ? 'fill-amber-400 stroke-amber-400'
                          : 'fill-amber-400/30 stroke-amber-400/50'
                      }`}
                    />
                  </span>
                ))}
              </div>

              {/* Reviews Count */}
              <span
                style={{
                  transitionDuration: prefersReducedMotion ? '0ms' : '400ms',
                  transitionDelay: prefersReducedMotion ? '0ms' : '480ms',
                }}
                className={`text-[11px] text-[#f8f7f1]/60 font-mono transition-opacity ${
                  isInView ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {t.reviews.reviewsCount}
              </span>
            </div>

            {/* Google Maps CTA Button */}
            <a
              href={BUSINESS_DATA.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                transitionDuration: prefersReducedMotion ? '0ms' : '500ms',
                transitionDelay: prefersReducedMotion ? '0ms' : '240ms',
              }}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/15 transition-all active:scale-95 cursor-pointer self-start sm:self-auto will-change-transform transform-gpu ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'
              }`}
            >
              <span>{t.reviews.googleBtn}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#939458]" />
            </a>
          </div>
        </div>

        {/* Reviews Grid (Editorial Stagger & Directional Inline Reveal) */}
        <div className="group/grid grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {REVIEWS_DATA.map((review, idx) => {
            const cardDelay = 220 + idx * 80;
            const isEven = idx % 2 === 0;

            return (
              <div
                key={review.id}
                style={{
                  transitionDuration: prefersReducedMotion ? '0ms' : '680ms',
                  transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
                  transitionDelay: prefersReducedMotion ? '0ms' : `${cardDelay}ms`,
                }}
                className={`bg-[#122416] rounded-[20px] sm:rounded-[22px] p-6 sm:p-7 border border-white/10 shadow-sm flex flex-col justify-between select-none will-change-transform transform-gpu transition-[opacity,transform,border-color,box-shadow] duration-300 md:hover:-translate-y-[3px] md:hover:scale-[1.005] md:hover:border-[#939458]/40 md:hover:shadow-[0_12px_28px_rgba(0,0,0,0.35)] group-hover/grid:opacity-90 hover:!opacity-100 ${
                  isInView
                    ? 'opacity-100 translate-x-0 translate-y-0 scale-100 rotate-0'
                    : isEven
                    ? 'opacity-0 ltr:md:-translate-x-7 rtl:md:translate-x-7 translate-y-5.5 scale-[0.98] md:-rotate-[0.35deg]'
                    : 'opacity-0 ltr:md:translate-x-7 rtl:md:-translate-x-7 translate-y-5.5 scale-[0.98] md:rotate-[0.35deg]'
                }`}
              >
                <div>
                  {/* Header: Author & Verified Stamp (Delay: cardDelay + 70ms) */}
                  <div
                    style={{
                      transitionDuration: prefersReducedMotion ? '0ms' : '350ms',
                      transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                      transitionDelay: prefersReducedMotion ? '0ms' : `${cardDelay + 70}ms`,
                    }}
                    className={`flex items-center justify-between mb-4 will-change-transform transform-gpu transition-[opacity,transform] ${
                      isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1.5'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#1b331f] border border-white/15 flex items-center justify-center text-xs font-bold text-[#f8f7f1]">
                        {review.authorName[0]}
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1.5">
                          <span className="font-headline font-bold text-sm text-white">
                            {review.authorName}
                          </span>
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#939458]" />
                        </div>
                        <span className="text-[10.5px] font-mono text-white/50">
                          {locale === 'zh-CN' ? review.dateZh || review.date : review.date}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-0.5 text-amber-400">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                      ))}
                    </div>
                  </div>

                  {/* Review Text (Delay: cardDelay + 120ms) */}
                  <p
                    style={{
                      transitionDuration: prefersReducedMotion ? '0ms' : '450ms',
                      transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                      transitionDelay: prefersReducedMotion ? '0ms' : `${cardDelay + 120}ms`,
                    }}
                    className={`text-xs sm:text-sm text-[#f8f7f1]/85 leading-relaxed font-sans will-change-transform transform-gpu transition-[opacity,transform] ${
                      isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                    }`}
                  >
                    "
                    {locale === 'ar'
                      ? review.commentAr
                      : locale === 'zh-CN'
                      ? review.commentZh || review.commentEn
                      : review.commentEn}
                    "
                  </p>

                  {/* Mentioned Drink/Dessert Highlight Tag (Delay: cardDelay + 180ms) */}
                  {(review.highlightAr || review.highlightEn || review.highlightZh) && (
                    <div
                      style={{
                        transitionDuration: prefersReducedMotion ? '0ms' : '300ms',
                        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                        transitionDelay: prefersReducedMotion ? '0ms' : `${cardDelay + 180}ms`,
                      }}
                      className={`mt-3.5 inline-block text-[10px] font-mono text-[#939458] bg-white/5 px-2.5 py-1 rounded-[8px] border border-white/10 will-change-transform transform-gpu transition-[opacity,transform] ${
                        isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.96]'
                      }`}
                    >
                      {locale === 'ar'
                        ? review.highlightAr
                        : locale === 'zh-CN'
                        ? review.highlightZh || review.highlightEn
                        : review.highlightEn}
                    </div>
                  )}
                </div>

                {/* Bottom Card Annotation */}
                <div className="flex items-center justify-between mt-5 pt-3 border-t border-white/5 text-[10px] font-mono text-white/40">
                  <span>
                    {locale === 'ar'
                      ? 'زيارة موثقة · حي الروضة'
                      : locale === 'zh-CN'
                      ? '真实宾客探店 · Ar Rawdah 街区'
                      : 'verified visit · Ar Rawdah'}
                  </span>
                  <span className="text-[#939458]/70">Google Maps</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
});

ReviewsSection.displayName = 'ReviewsSection';
