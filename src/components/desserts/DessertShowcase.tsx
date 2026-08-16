import React from 'react';
import { MENU_ITEMS } from '../../data/menu';
import { useLanguage } from '../../i18n/context';
import { Sparkles, Flame, Plus } from 'lucide-react';
import type { MenuItem } from '../../types/menu';

interface DessertShowcaseProps {
  onSelectItem: (item: MenuItem) => void;
}

export const DessertShowcase: React.FC<DessertShowcaseProps> = ({ onSelectItem }) => {
  const { locale, t } = useLanguage();
  const desserts = MENU_ITEMS.filter((item) => item.categoryId === 'desserts');

  return (
    <section id="desserts" className="w-full bg-[#f0ede1] text-[#181813] py-20 sm:py-32 relative overflow-hidden">
      {/* Background Texture */}
      <div className="absolute inset-0 bg-paper-texture opacity-50 pointer-events-none" />

      <div className="max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-14 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#122416]/10 text-xs font-mono uppercase tracking-widest text-[#122416] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#939458]" />
            <span>{t.desserts.badge}</span>
          </div>

          <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#122416] tracking-tight mb-4">
            {t.desserts.heading}
          </h2>

          <p className="text-xs sm:text-base text-[#181813]/70 leading-relaxed font-sans">
            {t.desserts.subheading}
          </p>
        </div>

        {/* Desserts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {desserts.map((item) => {
            const name = locale === 'ar' ? item.name.ar : item.name.en;
            const description = locale === 'ar' ? item.description.ar : item.description.en;

            return (
              <div
                key={item.id}
                onClick={() => onSelectItem(item)}
                className="bg-white rounded-3xl p-5 sm:p-6 border border-black/5 shadow-sm hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between cursor-pointer group hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-[#122416]/10 text-[#122416]">
                      {locale === 'ar' ? 'حلى ياباني' : 'Japanese Sweet'}
                    </span>
                    {item.name.ja && (
                      <span className="text-[11px] font-japanese text-[#181813]/40">
                        {item.name.ja}
                      </span>
                    )}
                  </div>

                  <div className="w-full aspect-[4/3] bg-[#f8f7f1] rounded-2xl overflow-hidden my-3 shadow-inner">
                    <img
                      src={item.image}
                      alt={name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <h3 className="font-headline text-lg font-bold text-[#181813] group-hover:text-[#29482a] transition-colors mb-1.5 line-clamp-1">
                    {name}
                  </h3>

                  <p className="text-xs text-[#181813]/65 line-clamp-2 leading-relaxed h-8 mb-4">
                    {description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-black/5">
                  <span className="font-headline font-bold text-base text-[#122416]">
                    {item.priceSAR} {t.menu.sar}
                  </span>

                  <div className="flex items-center gap-2">
                    {item.calories && (
                      <span className="flex items-center gap-1 text-[11px] text-[#181813]/50 font-mono">
                        <Flame className="w-3 h-3 text-[#939458]" />
                        {item.calories} {t.menu.calories}
                      </span>
                    )}
                    <div className="w-7 h-7 rounded-full bg-[#122416]/5 group-hover:bg-[#122416] group-hover:text-white text-[#122416] flex items-center justify-center transition-colors">
                      <Plus className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
