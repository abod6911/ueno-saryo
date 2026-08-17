import React from 'react';
import { REVIEWS_DATA } from '../../data/reviews';
import { BUSINESS_DATA } from '../../data/business';
import { useLanguage } from '../../i18n/context';
import { Star, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { TeaLabAnnotation } from '../ui/TeaLabAnnotation';
import { JapaneseSeal } from '../ui/JapaneseSeal';
import { RevealOnView } from '../ui/RevealOnView';

export const ReviewsSection: React.FC = () => {
  const { locale, t } = useLanguage();

  return (
    <section id="reviews" className="w-full bg-[#162c19] text-[#f8f7f1] py-16 sm:py-24 relative overflow-hidden border-t border-white/10">
      <div className="max-w-[1640px] mx-auto px-3 sm:px-6 lg:px-12 relative z-10">
        {/* Section Header with Specimen Index */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12 sm:mb-14 pb-8 sm:pb-10 border-b border-white/10">
          <RevealOnView variant="fade-up" delay={0} className="lg:col-span-8 flex flex-col items-start gap-3">
            <TeaLabAnnotation
              index="LAB / 07"
              label={locale === 'ar' ? 'انطباعات وشهادات الضيوف' : 'GUEST REVIEWS & FEEDBACK'}
              kanji="評価 · 評判"
              variant="minimal"
            />

            <div className="flex items-center gap-3">
              <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                {t.reviews.heading}
              </h2>
              <JapaneseSeal char="評" size={24} variant="square" />
            </div>

            <p className="text-xs sm:text-base text-[#f8f7f1]/75 leading-relaxed font-sans max-w-xl">
              {t.reviews.subheading}
            </p>
          </RevealOnView>

          {/* Large Social-Proof Google Score Lockup (Scale-in Reveal) */}
          <RevealOnView
            variant="scale-in"
            delay={100}
            className="lg:col-span-4 flex flex-col sm:flex-row items-start sm:items-center justify-between lg:justify-end gap-5 bg-[#122416] p-5 sm:p-6 rounded-[22px] sm:rounded-[26px] border border-white/10 shadow-lg"
          >
            <div className="flex flex-col">
              <div className="flex items-baseline gap-2">
                <span className="font-headline text-4xl sm:text-5xl font-extrabold text-white">
                  {BUSINESS_DATA.rating.score}
                </span>
                <span className="text-sm text-white/50 font-mono">/ 5.0</span>
              </div>
              <div className="flex items-center gap-1 text-amber-400 my-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < 4
                        ? 'fill-amber-400 stroke-amber-400'
                        : 'fill-amber-400/30 stroke-amber-400/50'
                    }`}
                  />
                ))}
              </div>
              <span className="text-[11px] text-[#f8f7f1]/60 font-mono">
                {t.reviews.reviewsCount}
              </span>
            </div>

            <a
              href={BUSINESS_DATA.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/15 transition-all active:scale-95 cursor-pointer self-start sm:self-auto"
            >
              <span>{t.reviews.googleBtn}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#939458]" />
            </a>
          </RevealOnView>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {REVIEWS_DATA.map((review, idx) => (
            <RevealOnView
              key={review.id}
              variant="fade-up"
              delay={idx * 60}
              className="bg-[#122416] rounded-[20px] sm:rounded-[22px] p-6 sm:p-7 border border-white/10 shadow-sm flex flex-col justify-between group hover:border-[#939458]/30 transition-all duration-300 select-none"
            >
              <div>
                {/* Header: Author & Verified Stamp */}
                <div className="flex items-center justify-between mb-4">
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
                        {review.date}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-0.5 text-amber-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                    ))}
                  </div>
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-[#f8f7f1]/85 leading-relaxed font-sans">
                  "{locale === 'ar' ? review.commentAr : review.commentEn}"
                </p>

                {/* Mentioned Drink/Dessert Tag */}
                {(review.highlightAr || review.highlightEn) && (
                  <div className="mt-3.5 inline-block text-[10px] font-mono text-[#939458] bg-white/5 px-2.5 py-1 rounded-[8px] border border-white/10">
                    {locale === 'ar' ? review.highlightAr : review.highlightEn}
                  </div>
                )}
              </div>

              {/* Bottom Card Annotation */}
              <div className="flex items-center justify-between mt-5 pt-3 border-t border-white/5 text-[10px] font-mono text-white/40">
                <span>verified visit · ar Rawdah</span>
                <span className="text-[#939458]/70">Google Maps</span>
              </div>
            </RevealOnView>
          ))}
        </div>
      </div>
    </section>
  );
};
