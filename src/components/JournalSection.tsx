import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Clock, Calendar } from 'lucide-react';
import { journalData } from '../data/journal';

export const JournalSection: React.FC = () => {
  return (
    <section id="journal" className="bg-bg py-16 md:py-24 relative">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6"
        >
          <div className="max-w-xl">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em] font-medium">
                Journal
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-light text-text-primary tracking-tight leading-tight">
              Recent <span className="font-display italic font-normal">thoughts</span>
            </h2>

            {/* Subtext */}
            <p className="text-sm md:text-base text-muted mt-3">
              Essays on software architecture, interface design, and typography.
            </p>
          </div>

          {/* "View all" button */}
          <a
            href="#journal"
            className="group relative hidden md:inline-flex items-center rounded-full text-xs uppercase tracking-widest font-medium py-3 px-6 text-text-primary transition-all duration-300 focus:outline-none self-start md:self-end"
          >
            <span className="absolute -inset-[1.5px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            <span className="inline-flex items-center gap-2 rounded-full bg-surface border border-stroke px-5 py-2.5 group-hover:border-transparent transition-colors duration-200">
              View all thoughts
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            </span>
          </a>
        </motion.div>

        {/* 4 Journal entries displayed as horizontal pills */}
        <div className="flex flex-col gap-4">
          {journalData.map((entry, index) => {
            return (
              <motion.article
                key={entry.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.7, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                className="group relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6 p-4 sm:p-5 rounded-[32px] sm:rounded-full bg-surface/30 hover:bg-surface border border-stroke transition-all duration-300 cursor-pointer hover:border-white/20 hover:shadow-xl hover:shadow-black/20"
              >
                {/* Left: Thumbnail + Title */}
                <div className="flex items-center gap-4 sm:gap-6">
                  {/* Image thumbnail */}
                  <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden shrink-0 border border-stroke">
                    <img
                      src={entry.image}
                      alt={entry.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/20" />
                  </div>

                  {/* Title & Category tag */}
                  <div>
                    <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#89AACC] font-medium block mb-1">
                      {entry.category}
                    </span>
                    <h3 className="text-base sm:text-lg md:text-xl font-medium text-text-primary group-hover:text-white transition-colors duration-200 line-clamp-1 sm:line-clamp-none">
                      {entry.title}
                    </h3>
                  </div>
                </div>

                {/* Right: Meta info + Arrow */}
                <div className="flex items-center justify-between sm:justify-end gap-6 sm:gap-8 pl-18 sm:pl-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-stroke/40">
                  <div className="flex items-center gap-4 text-xs text-muted font-normal">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {entry.readTime}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {entry.date}
                    </span>
                  </div>

                  {/* Pill arrow icon */}
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-bg border border-stroke flex items-center justify-center text-muted group-hover:text-text-primary group-hover:border-white/20 transition-all duration-300 group-hover:scale-105 shrink-0">
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
