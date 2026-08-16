import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Tag, ArrowUpRight } from 'lucide-react';
import type { Project } from '../types';

interface ProjectDetailModalProps {
  project: Project;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
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
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/85 backdrop-blur-xl"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-surface border border-stroke rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-bg border border-stroke flex items-center justify-center text-muted hover:text-text-primary hover:border-white/20 transition-all z-20"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header info */}
          <div className="mb-6">
            <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-muted mb-2">
              <span className="flex items-center gap-1">
                <Tag className="w-3 h-3 text-[#89AACC]" />
                {project.category}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3 text-[#89AACC]" />
                {project.year}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display italic text-text-primary">
              {project.title}
            </h2>
          </div>

          {/* Featured Image */}
          <div className="relative rounded-2xl overflow-hidden mb-8 border border-stroke/50 max-h-[420px]">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 halftone-overlay opacity-20 pointer-events-none" />
          </div>

          {/* Body Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-4">
              <h3 className="text-lg font-medium text-text-primary">Overview & Strategy</h3>
              <p className="text-sm sm:text-base text-muted leading-relaxed">
                {project.description}
              </p>
              <p className="text-sm text-muted/80 leading-relaxed">
                Crafted with modular token design patterns and optimized WebGL shaders to ensure sub-millisecond frame rendering across responsive breakpoints.
              </p>
            </div>

            <div className="bg-bg/60 rounded-2xl p-5 border border-stroke space-y-5">
              <div>
                <h4 className="text-xs uppercase tracking-wider text-muted font-medium mb-2.5">
                  Tech Stack & Tools
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 rounded-full bg-surface border border-stroke text-text-primary/90"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="#contact"
                  onClick={onClose}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full py-2.5 px-4 text-xs font-semibold uppercase tracking-wider text-bg bg-text-primary hover:bg-white transition-all shadow-md"
                >
                  Request Case Study
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
