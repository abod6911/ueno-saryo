import React, { useEffect } from 'react';
import type { MenuItem } from '../../types/menu';
import { useLanguage } from '../../i18n/context';
import { BUSINESS_DATA } from '../../data/business';
import { X, Flame, Coffee, Check, ShoppingBag, ArrowUpRight } from 'lucide-react';

interface ProductDetailModalProps {
  item: MenuItem | null;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ item, onClose }) => {
  const { locale, t } = useLanguage();

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (item) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [item, onClose]);

  if (!item) return null;

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
  const tastingNotes =
    locale === 'ar'
      ? item.tastingNotes?.ar
      : locale === 'zh-CN'
      ? item.tastingNotes?.zh || item.tastingNotes?.en
      : item.tastingNotes?.en;
  const ingredients =
    locale === 'ar'
      ? item.ingredients?.ar
      : locale === 'zh-CN'
      ? item.ingredients?.zh || item.ingredients?.en
      : item.ingredients?.en;

  const formatCaffeine = (level?: 'Zero' | 'Low' | 'Medium' | 'High') => {
    if (!level) return null;
    if (level === 'Zero') return locale === 'ar' ? 'خالٍ من الكافيين' : locale === 'zh-CN' ? '无咖啡因' : 'Zero';
    if (level === 'Low') return locale === 'ar' ? 'منخفض' : locale === 'zh-CN' ? '低' : 'Low';
    if (level === 'Medium') return locale === 'ar' ? 'متوسط' : locale === 'zh-CN' ? '中等' : 'Medium';
    return locale === 'ar' ? 'مرتفع' : locale === 'zh-CN' ? '高' : 'High';
  };

  const formatTemperature = (temp?: 'Iced' | 'Hot' | 'Both') => {
    if (!temp) return null;
    if (temp === 'Iced') return locale === 'ar' ? 'بارد' : locale === 'zh-CN' ? '冰饮' : 'Iced';
    if (temp === 'Hot') return locale === 'ar' ? 'ساخن' : locale === 'zh-CN' ? '热饮' : 'Hot';
    return locale === 'ar' ? 'بارد / ساخن' : locale === 'zh-CN' ? '冷热皆可' : 'Both';
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl bg-[#f8f7f1] rounded-t-[32px] sm:rounded-[32px] shadow-2xl overflow-hidden border border-black/10 flex flex-col max-h-[90vh] sm:max-h-[85vh] animate-slide-up select-none"
      >
        {/* Modal Header */}
        <div className="relative w-full bg-[#122416] p-6 sm:p-8 flex items-center justify-between text-[#f8f7f1] overflow-hidden">
          {/* Decorative Background */}
          <div className="absolute inset-0 bg-radial-gradient from-[#29482a]/50 via-transparent to-black/80 pointer-events-none" />

          <div className="relative z-10 flex flex-col">
            {item.name.ja && (
              <span className="font-japanese text-xs text-[#939458] tracking-widest uppercase mb-1">
                {item.name.ja}
              </span>
            )}
            <h2 id="product-modal-title" className="font-headline text-xl sm:text-2xl font-bold text-white">
              {name}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="relative z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all active:scale-95 border border-white/15 cursor-pointer"
          >
            <X className="w-5 h-5 stroke-[2]" />
          </button>
        </div>

        {/* Modal Content Scroll Area */}
        <div className="p-6 sm:p-8 overflow-y-auto custom-scrollbar flex flex-col gap-6 text-[#181813]">
          {/* Main Visual & Key Stats */}
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="w-48 h-48 sm:w-56 sm:h-56 bg-white rounded-2xl overflow-hidden shadow-sm border border-black/5 shrink-0">
              <img
                src={item.image}
                alt={name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col justify-center gap-3 w-full">
              <div className="flex items-baseline gap-2">
                <span className="font-headline text-2xl sm:text-3xl font-extrabold text-[#122416]">
                  {item.priceSAR} {t.menu.sar}
                </span>
                <span className="text-xs text-[#181813]/50">
                  (
                  {locale === 'ar'
                    ? 'شامل الضريبة'
                    : locale === 'zh-CN'
                    ? '已含增值税'
                    : 'VAT Included'}
                  )
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {item.calories !== undefined && (
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-900 text-xs font-semibold border border-amber-200">
                    <Flame className="w-3.5 h-3.5 text-amber-700" />
                    <span>
                      {item.calories} {t.menu.calories}
                    </span>
                  </div>
                )}
                {item.caffeineLevel && (
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-900 text-xs font-semibold border border-emerald-200">
                    <Coffee className="w-3.5 h-3.5 text-emerald-700" />
                    <span>
                      {t.menu.caffeine}: {formatCaffeine(item.caffeineLevel)}
                    </span>
                  </div>
                )}
                {item.temperature && (
                  <div className="px-3 py-1 rounded-full bg-black/5 text-xs text-[#181813]/70 font-medium">
                    {t.menu.temperature}: {formatTemperature(item.temperature)}
                  </div>
                )}
              </div>

              <p className="text-xs sm:text-sm text-[#181813]/75 leading-relaxed pt-1 font-sans">
                {description}
              </p>
            </div>
          </div>

          {/* Tasting Notes */}
          {tastingNotes && tastingNotes.length > 0 && (
            <div className="flex flex-col gap-2 pt-4 border-t border-black/5">
              <span className="text-xs font-mono uppercase tracking-widest text-[#29482a] font-bold">
                {t.menu.tastingProfile}
              </span>
              <div className="flex flex-wrap gap-2">
                {tastingNotes.map((note, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-[#122416]/5 text-[#122416] px-3 py-1 rounded-full font-medium flex items-center gap-1.5 font-sans"
                  >
                    <Check className="w-3 h-3 text-[#939458]" />
                    {note}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Ingredients list */}
          {ingredients && ingredients.length > 0 && (
            <div className="flex flex-col gap-2 pt-4 border-t border-black/5">
              <span className="text-xs font-mono uppercase tracking-widest text-[#29482a] font-bold">
                {t.menu.ingredients}
              </span>
              <ul className="text-xs text-[#181813]/70 list-disc list-inside space-y-1 font-sans">
                {ingredients.map((ing, idx) => (
                  <li key={idx}>{ing}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Modal Bottom CTA */}
        <div className="p-4 sm:p-6 bg-white border-t border-black/5 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] px-5 rounded-xl bg-black/5 hover:bg-black/10 text-xs font-semibold text-[#181813] transition-colors cursor-pointer"
          >
            {t.menu.close}
          </button>

          {BUSINESS_DATA.hungerStationUrl && (
            <a
              href={BUSINESS_DATA.hungerStationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] flex-1 px-6 rounded-xl bg-[#122416] hover:bg-[#19321d] text-white text-xs font-bold flex items-center justify-center gap-2 active:scale-95 transition-all shadow-card cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-[#939458]" />
              <span>{t.menu.orderCTA}</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
