import React from 'react';
import { MENU_ITEMS } from '../../data/menu';
import { useLanguage } from '../../i18n/context';
import { Flame, Sparkles } from 'lucide-react';
import type { MenuItem } from '../../types/menu';
import { TeaLabAnnotation } from '../ui/TeaLabAnnotation';
import { JapaneseSeal } from '../ui/JapaneseSeal';
import { RevealOnView } from '../ui/RevealOnView';

interface DessertShowcaseProps {
  onSelectItem: (item: MenuItem) => void;
}

export const DessertShowcase: React.FC<DessertShowcaseProps> = ({ onSelectItem }) => {
  const { locale, t } = useLanguage();
  const desserts = MENU_ITEMS.filter((item) => item.categoryId === 'desserts');

  const getPairingText = (itemId: string) => {
    if (locale === 'ar') {
      return itemId.includes('cheesecake')
        ? 'يتناغم مع ماتشا أوسوتشا الساخن'
        : itemId.includes('cake')
        ? 'يتناغم مع شاي الهوجيتشا المحمص'
        : 'يتناغم مع الماتشا الباردة';
    }
    if (locale === 'zh-CN') {
      return itemId.includes('cheesecake')
        ? '宜配热点浓茶薄茶'
        : itemId.includes('cake')
        ? '宜配焙茶或煎茶'
        : '宜配冰点抹茶云朵';
    }
    return itemId.includes('cheesecake')
      ? 'Pairs with Hot Usucha'
      : itemId.includes('cake')
      ? 'Pairs with Roasted Hojicha'
      : 'Pairs with Iced Matcha';
  };

  return (
    <section id="desserts" className="w-full bg-[#f0ede1] text-[#181813] py-16 sm:py-24 relative overflow-hidden border-t border-black/5">
      {/* Background Texture */}
      <div className="absolute inset-0 bg-paper-texture opacity-60 pointer-events-none" />

      {/* Subtle Japanese Calligraphy Watermark */}
      <div className="absolute -bottom-8 -end-8 text-[140px] sm:text-[200px] font-japanese font-black text-black/[0.025] select-none pointer-events-none">
        甘味
      </div>

      <div className="max-w-[1640px] mx-auto px-3 sm:px-6 lg:px-12 relative z-10">
        {/* Section Header with Specimen Index */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <TeaLabAnnotation
            index="LAB / 05"
            label={
              locale === 'ar'
                ? 'الحلويات والمخبوزات اليابانية'
                : locale === 'zh-CN'
                ? '日式和菓子与甜点'
                : 'JAPANESE SWEETS & WAGASHI'
            }
            kanji="甘味 · 和菓子"
            variant="minimal"
            theme="light"
            className="mb-4 sm:mb-5"
          />

          <div className="flex items-center gap-3 mb-4 sm:mb-5">
            <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#122416] tracking-normal leading-[1.28] sm:leading-[1.22]">
              {t.desserts.heading}
            </h2>
            <JapaneseSeal char="菓" size={24} variant="square" />
          </div>

          <p className="text-xs sm:text-base text-[#181813]/75 leading-relaxed font-sans max-w-2xl pt-0.5">
            {t.desserts.subheading}
          </p>
        </div>

        {/* Desserts Grid with Staggered Rise */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {desserts.map((item, idx) => {
            const name =
              locale === 'ar'
                ? item.name.ar
                : locale === 'zh-CN'
                ? item.name.zh || item.name.en
                : item.name.en;
            const description =
              locale === 'ar'
                ? item.description.ar
                : locale === 'zh-CN'
                ? item.description.zh || item.description.en
                : item.description.en;
            const pairing = getPairingText(item.id);

            return (
              <RevealOnView
                key={item.id}
                variant="signature-rise"
                delay={idx * 60}
                className="h-full"
              >
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => onSelectItem(item)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onSelectItem(item);
                    }
                  }}
                  className="h-full bg-white rounded-[22px] sm:rounded-[24px] p-5 sm:p-6 border border-black/[0.06] shadow-sm hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between cursor-pointer group hover:-translate-y-1 select-none focus:outline-none focus:ring-2 focus:ring-[#29482a]/40"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[9.5px] font-sans font-medium px-2 py-0.5 rounded-[6px] bg-[#122416]/10 text-[#122416]">
                        {locale === 'ar'
                          ? 'حلى ياباني طازج'
                          : locale === 'zh-CN'
                          ? '日式手工茶点'
                          : 'Japanese Sweet'}
                      </span>
                      {item.name.ja && (
                        <span className="text-[11px] font-japanese text-[#181813]/40">
                          {item.name.ja}
                        </span>
                      )}
                    </div>

                    <div className="w-full aspect-[4/3] rounded-[16px] overflow-hidden bg-[#f8f7f1] mb-4 relative shadow-inner">
                      <img
                        src={item.image}
                        alt={name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        loading="eager"
                        decoding="async"
                      />
                    </div>

                    <h3 className="font-headline text-lg sm:text-xl font-bold text-[#122416] mb-1.5 leading-snug group-hover:text-[#29482a] transition-colors">
                      {name}
                    </h3>

                    <p className="text-xs text-[#181813]/70 line-clamp-2 font-sans leading-relaxed mb-3">
                      {description}
                    </p>

                    {/* Pairing Recommendation */}
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#f0ede1]/70 text-[10px] font-sans text-[#29482a] border border-black/[0.04]">
                      <span className="w-1 h-1 rounded-full bg-[#939458]" />
                      <span>{pairing}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-5 pt-3 border-t border-black/[0.05]">
                    <div className="flex items-baseline gap-1">
                      <span className="font-mono font-extrabold text-base text-[#29482a]">
                        {item.priceSAR}
                      </span>
                      <span className="text-[10px] font-mono text-[#181813]/60">
                        {locale === 'ar' ? 'ر.س' : 'SAR'}
                      </span>
                      {item.calories && (
                        <span className="text-[10.5px] font-mono text-[#181813]/50 ms-2 flex items-center gap-0.5">
                          <Flame className="w-3 h-3 text-[#939458]" />
                          {item.calories}
                        </span>
                      )}
                    </div>

                    <div className="w-7 h-7 rounded-full bg-[#122416] text-white flex items-center justify-center group-hover:bg-[#29482a] transition-colors shadow-xs">
                      <Sparkles className="w-3.5 h-3.5 text-[#939458]" />
                    </div>
                  </div>
                </div>
              </RevealOnView>
            );
          })}
        </div>
      </div>
    </section>
  );
};
