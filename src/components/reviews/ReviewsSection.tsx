import React from 'react';
import { REVIEWS_DATA } from '../../data/reviews';
import { BUSINESS_DATA } from '../../data/business';
import { useLanguage } from '../../i18n/context';
import { Star, MessageSquare, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const { locale, t } = useLanguage();

  return (
    <section id="reviews" className="w-full bg-[#162c19] text-[#f8f7f1] py-20 sm:py-32 relative overflow-hidden border-t border-white/10">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-14 relative z-10">
        {/* Section Header with Overall Rating Badge */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end mb-16 pb-12 border-b border-white/10">
          <div className="lg:col-span-8 flex flex-col items-start gap-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-xs font-mono uppercase tracking-widest text-[#939458] border border-white/10">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{t.reviews.badge}</span>
            </div>

            <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              {t.reviews.heading}
            </h2>

            <p className="text-xs sm:text-base text-[#f8f7f1]/70 leading-relaxed font-sans max-w-xl">
              {t.reviews.subheading}
            </p>
          </div>

          {/* Google Score Pill */}
          <div className="lg:col-span-4 flex flex-col sm:flex-row items-start sm:items-center justify-between lg:justify-end gap-6 bg-[#122416] p-6 rounded-3xl border border-white/10 shadow-lg">
            <div className="flex flex-col">
              <div className="flex items-baseline gap-2">
                <span className="font-headline text-4xl sm:text-5xl font-extrabold text-white">
                  {BUSINESS_DATA.rating.score}
                </span>
                <span className="text-sm text-white/50">/ 5.0</span>
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
              <span className="text-[11px] text-[#f8f7f1]/60">
                {t.reviews.reviewsCount}
              </span>
            </div>

            <a
              href={BUSINESS_DATA.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] px-4 py-2 rounded-2xl bg-[#29482a] hover:bg-[#365c3b] text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm shrink-0 border border-white/15"
            >
              <span>{t.reviews.googleBtn}</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
            </a>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {REVIEWS_DATA.map((rev) => {
            const comment = locale === 'ar' ? rev.commentAr : rev.commentEn;
            const highlight = locale === 'ar' ? rev.highlightAr : rev.highlightEn;

            return (
              <div
                key={rev.id}
                className="bg-[#122416]/90 rounded-3xl p-6 sm:p-8 border border-white/10 flex flex-col justify-between hover:border-[#939458]/40 transition-all duration-300 shadow-md group"
              >
                <div className="flex flex-col gap-3">
                  {/* Top Bar: Author, Stars & Date */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-full bg-[#29482a] text-[#939458] font-bold flex items-center justify-center text-sm border border-white/10">
                        {rev.authorName.charAt(0)}
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1.5">
                          <span className="font-headline font-bold text-sm text-white">
                            {rev.authorName}
                          </span>
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#939458]" />
                        </div>
                        <span className="text-[10px] text-white/40">{rev.date}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-0.5 text-amber-400">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Highlight statement */}
                  {highlight && (
                    <h3 className="font-headline text-base font-bold text-[#939458] pt-2">
                      «{highlight}»
                    </h3>
                  )}

                  {/* Comment */}
                  <p className="text-xs sm:text-sm text-[#f8f7f1]/80 leading-relaxed font-sans">
                    {comment}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-white/40 font-mono">
                  <span>{rev.source}</span>
                  <span className="text-[#939458]">Verified Visit · Ar Rawdah</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
