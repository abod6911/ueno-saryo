import React, { memo } from 'react';
import { MENU_ITEMS } from '../../data/menu';
import type { MenuItem } from '../../types/menu';
import { useLanguage } from '../../i18n/context';

interface SignatureMarqueeProps {
  onSelectItem: (item: MenuItem) => void;
}

export const SignatureMarquee: React.FC<SignatureMarqueeProps> = memo(({ onSelectItem }) => {
  const { locale, t } = useLanguage();

  // Curated signature selection from MENU_ITEMS
  const signatureItems = MENU_ITEMS.filter(
    (item) => item.featured || item.badges?.includes('signature') || item.badges?.includes('bestseller')
  ).slice(0, 8);

  // Duplicate items for seamless continuous looping
  const marqueeItems = [...signatureItems, ...signatureItems];

  return (
    <section
      className="w-full py-6 sm:py-9 overflow-hidden relative select-none"
      aria-label={locale === 'ar' ? 'اختياراتنا المميزة' : 'Signature Selection'}
    >
      {/* Optional Subtle Eyebrow Label */}
      <div className="w-full max-w-[1640px] mx-auto px-3 sm:px-6 lg:px-12 mb-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#29482a]" />
          <span className="text-[11px] sm:text-xs font-japanese font-semibold tracking-widest text-[#243f25] uppercase">
            {t.marquee.eyebrow}
          </span>
        </div>
        <span className="text-[10.5px] font-mono text-[#243f25]/70 hidden sm:inline-block">
          {locale === 'ar' ? 'انقر على أي صنف للتفاصيل' : 'Click any item for details'}
        </span>
      </div>

      {/* Marquee Track with Edge Masking */}
      <div
        className="w-full overflow-hidden relative py-1"
        dir="ltr"
        style={{
          maskImage:
            'linear-gradient(to right, transparent, black 4%, black 96%, transparent)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent, black 4%, black 96%, transparent)',
        }}
      >
        <div className="animate-marquee gap-3 sm:gap-4 px-2">
          {marqueeItems.map((item, idx) => (
            <button
              key={`${item.id}-${idx}`}
              type="button"
              dir={locale === 'ar' ? 'rtl' : 'ltr'}
              onClick={() => onSelectItem(item)}
              className="flex-shrink-0 w-[210px] sm:w-[245px] md:w-[265px] h-[82px] sm:h-[92px] bg-[#EFEDE3] rounded-[18px] sm:rounded-[20px] p-2 sm:p-2.5 flex items-center gap-3 text-start shadow-[0_4px_16px_rgba(0,0,0,0.12)] border border-black/5 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.2)] hover:border-[#29482a]/30 transition-all duration-300 group cursor-pointer"
            >
              {/* Product Thumbnail */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-black/5 overflow-hidden flex-shrink-0 flex items-center justify-center p-1 group-hover:scale-105 transition-transform duration-300">
                <img
                  src={item.image}
                  alt={locale === 'ar' ? item.name.ar : item.name.en}
                  className="w-full h-full object-contain"
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                />
              </div>

              {/* Product Details */}
              <div className="flex-1 min-w-0 flex flex-col justify-center">
                <span className="text-[11.5px] sm:text-[13px] font-headline font-bold text-[#122416] truncate group-hover:text-[#29482a] transition-colors leading-snug">
                  {locale === 'ar' ? item.name.ar : item.name.en}
                </span>

                <div className="flex items-center justify-between mt-1 text-[10px] sm:text-[11px]">
                  <span className="font-japanese text-[#122416]/60 truncate max-w-[90px]">
                    {item.name.ja}
                  </span>
                  <span className="font-mono font-bold text-[#29482a]">
                    {item.priceSAR} {locale === 'ar' ? 'ر.س' : 'SAR'}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
});

SignatureMarquee.displayName = 'SignatureMarquee';
