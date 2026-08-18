import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../../data/gallery';
import { LightboxModal } from './LightboxModal';
import { useLanguage } from '../../i18n/context';
import { Eye } from 'lucide-react';
import { MatchaContour } from '../ui/MatchaContour';
import { TeaLabAnnotation } from '../ui/TeaLabAnnotation';
import { JapaneseSeal } from '../ui/JapaneseSeal';

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
    <section id="gallery" className="w-full bg-[#122416] text-[#f8f7f1] relative overflow-hidden border-t border-white/10">
      {/* Top Organic Contour Transition */}
      <MatchaContour variant="hero-flow" fill="#122416" className="w-full -mt-1 transform-gpu" />

      <div className="max-w-[1640px] mx-auto px-3 sm:px-6 lg:px-12 py-16 sm:py-24 relative z-10">
        {/* Section Header with Specimen Index */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <TeaLabAnnotation
            index="LAB / 06"
            label={locale === 'ar' ? 'معرض الأجواء والسكينة' : 'ATMOSPHERE & VISUAL ESSENCE'}
            kanji="空間 · 喫茶"
            variant="minimal"
            className="mb-4 sm:mb-5"
          />

          <div className="flex items-center gap-3 mb-4 sm:mb-5">
            <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-normal leading-[1.28] sm:leading-[1.22]">
              {t.gallery.heading}
            </h2>
            <JapaneseSeal char="景" size={24} variant="square" />
          </div>

          <p className="text-xs sm:text-base text-[#f8f7f1]/75 leading-relaxed font-sans max-w-2xl pt-0.5">
            {t.gallery.subheading}
          </p>
        </div>

        {/* Gallery Grid with Asymmetrical Organic Rhythm */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {GALLERY_ITEMS.map((photo, idx) => {
            const title = locale === 'ar' ? photo.titleAr : photo.titleEn;
            const categoryLabel = locale === 'ar'
              ? (photo.category === 'atmosphere' ? 'الأجواء والسكينة' : photo.category === 'craft' ? 'حرفة الشاي' : photo.category === 'origin' ? 'المصدر والزراعة' : 'الحلويات اليابانية')
              : photo.category.toUpperCase();

            // Selective organic contour crop for intentional rhythm (1 in 3)
            const cropClass = idx === 1 ? 'matcha-organic-crop' : idx === 4 ? 'matcha-organic-crop-alt' : 'rounded-[22px] sm:rounded-[24px]';

            return (
              <div
                key={photo.id}
                onClick={() => setSelectedPhotoIndex(idx)}
                className={`group relative overflow-hidden bg-[#19321d] aspect-[4/3] cursor-pointer border border-white/10 shadow-lg transform-gpu transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${cropClass}`}
              >
                <img
                  src={photo.image}
                  alt={title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="eager"
                  decoding="async"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300 flex flex-col justify-end p-5 sm:p-6" />

                {/* Text Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-between p-5 sm:p-6 z-10 pointer-events-none">
                  <div className="flex justify-end">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-sm">
                      <Eye className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-[10.5px] font-sans text-[#939458] font-semibold">
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
