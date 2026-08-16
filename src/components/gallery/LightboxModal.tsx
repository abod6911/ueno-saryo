import React, { useEffect } from 'react';
import type { GalleryPhoto } from '../../types/teaExperience';
import { useLanguage } from '../../i18n/context';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface LightboxModalProps {
  photo: GalleryPhoto | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  photo,
  onClose,
  onPrev,
  onNext,
}) => {
  const { locale } = useLanguage();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    if (photo) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [photo, onClose, onPrev, onNext]);

  if (!photo) return null;

  const title = locale === 'ar' ? photo.titleAr : photo.titleEn;
  const category = locale === 'ar' ? photo.categoryAr : photo.categoryEn;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-xl animate-fade-in select-none"
      onClick={onClose}
    >
      {/* Close Button */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close Lightbox"
        className="absolute top-6 end-6 z-50 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all border border-white/20 active:scale-95"
      >
        <X className="w-6 h-6 stroke-[2]" />
      </button>

      {/* Prev Navigation Button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        aria-label="Previous Image"
        className="absolute start-4 sm:start-8 z-50 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all border border-white/20 active:scale-95"
      >
        <ChevronLeft className="w-6 h-6 stroke-[2] rtl:rotate-180" />
      </button>

      {/* Next Navigation Button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        aria-label="Next Image"
        className="absolute end-4 sm:end-8 z-50 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all border border-white/20 active:scale-95"
      >
        <ChevronRight className="w-6 h-6 stroke-[2] rtl:rotate-180" />
      </button>

      {/* Center Image Stage */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-4xl max-h-[85vh] flex flex-col items-center justify-center"
      >
        <img
          src={photo.image}
          alt={title}
          className="max-h-[75vh] max-w-full object-contain rounded-2xl shadow-2xl border border-white/10"
        />

        <div className="mt-4 text-center flex flex-col items-center">
          <span className="text-xs font-mono uppercase tracking-widest text-[#939458]">
            {category}
          </span>
          <h3 className="font-headline text-lg sm:text-xl font-bold text-white mt-1">
            {title}
          </h3>
        </div>
      </div>
    </div>
  );
};
