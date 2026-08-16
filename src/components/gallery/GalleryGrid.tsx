import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../../data/gallery';
import { LightboxModal } from './LightboxModal';
import { useLanguage } from '../../i18n/context';
import { Sparkles, Eye } from 'lucide-react';

export const GalleryGrid: React.FC = () => {
  const { locale, t } = useLanguage();
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const activePhoto = selectedPhotoIndex !== null ? GALLERY_ITEMS[selectedPhotoIndex] : null;

  const handlePrev = () => {
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex(
        (selectedPhotoIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length
      );
    }
  };

  const handleNext = () => {
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex + 1) % GALLERY_ITEMS.length);
    }
  };

  return (
    <section id="gallery" className="w-full bg-[#122416] text-[#f8f7f1] py-20 sm:py-32 relative overflow-hidden border-t border-white/10">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-14 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-xs font-mono uppercase tracking-widest text-[#939458] border border-white/10 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.gallery.badge}</span>
          </div>

          <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            {t.gallery.heading}
          </h2>

          <p className="text-xs sm:text-base text-[#f8f7f1]/70 leading-relaxed font-sans">
            {t.gallery.subheading}
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {GALLERY_ITEMS.map((photo, idx) => {
            const title = locale === 'ar' ? photo.titleAr : photo.titleEn;
            const categoryLabel = locale === 'ar'
              ? (photo.category === 'atmosphere' ? 'الأجواء والسكينة' : photo.category === 'craft' ? 'حرفة الشاي' : photo.category === 'origin' ? 'المصدر والزراعة' : 'الحلويات اليابانية')
              : photo.category.toUpperCase();

            return (
              <div
                key={photo.id}
                onClick={() => setSelectedPhotoIndex(idx)}
                className="group relative rounded-3xl overflow-hidden bg-[#19321d] aspect-[4/3] cursor-pointer border border-white/10 shadow-lg transform-gpu transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                <img
                  src={photo.image}
                  alt={title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="eager"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300 flex flex-col justify-end p-6" />

                {/* Text Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-between p-6 z-10 pointer-events-none">
                  <div className="flex justify-end">
                    <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Eye className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#939458]">
                      {categoryLabel}
                    </span>
                    <h3 className="font-headline text-base sm:text-lg font-bold text-white mt-0.5 drop-shadow-md">
                      {title}
                    </h3>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      <LightboxModal
        photo={activePhoto ? {
          ...activePhoto,
          categoryEn: activePhoto.category.toUpperCase(),
          categoryAr: activePhoto.category === 'atmosphere' ? 'الأجواء والسكينة' : activePhoto.category === 'craft' ? 'حرفة الشاي' : activePhoto.category === 'origin' ? 'المصدر والزراعة' : 'الحلويات اليابانية'
        } : null}
        onClose={() => setSelectedPhotoIndex(null)}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </section>
  );
};
