import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import type { ExplorationItem } from '../types';

interface LightboxModalProps {
  item: ExplorationItem;
  onClose: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({ item, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[9990] flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-xl cursor-zoom-out"
      >
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.85, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-4xl max-h-[85vh] flex flex-col items-center bg-surface border border-stroke rounded-3xl p-4 sm:p-6 overflow-hidden shadow-2xl cursor-default"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 w-9 h-9 rounded-full bg-bg/80 border border-stroke flex items-center justify-center text-muted hover:text-white transition-all z-20"
            aria-label="Close lightbox"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Image */}
          <div className="relative w-full overflow-hidden rounded-2xl max-h-[60vh] flex items-center justify-center bg-bg">
            <img
              src={item.image}
              alt={item.title}
              className="w-auto h-full max-h-[60vh] object-contain rounded-2xl"
            />
            <div className="absolute inset-0 halftone-overlay opacity-15 pointer-events-none" />
          </div>

          {/* Caption */}
          <div className="w-full mt-4 sm:mt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-stroke/40 pt-4">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#89AACC] font-medium">
                {item.category}
              </span>
              <h3 className="text-xl sm:text-2xl font-display italic text-text-primary">
                {item.title}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-muted max-w-sm text-right">
              {item.description}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
