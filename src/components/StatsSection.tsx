import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  {
    number: '20+',
    label: 'Years Experience',
    description: 'Crafting expressive digital platforms & bespoke engineering.',
  },
  {
    number: '95+',
    label: 'Projects Done',
    description: 'Shipped high-impact web apps, design systems & 3D canvases.',
  },
  {
    number: '200%',
    label: 'Satisfied Clients',
    description: 'Long-term enterprise partners & visionary startup founders.',
  },
];

export const StatsSection: React.FC = () => {
  return (
    <section id="stats" className="bg-bg py-16 md:py-24 relative border-y border-stroke/50">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, delay: index * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative flex flex-col p-6 sm:p-8 rounded-3xl bg-surface/20 border border-stroke/70 hover:border-stroke hover:bg-surface/40 transition-all duration-300 group"
            >
              {/* Top stat number */}
              <div className="text-5xl sm:text-6xl lg:text-7xl font-display italic text-text-primary mb-3 tracking-tight group-hover:text-white transition-colors">
                {stat.number}
              </div>

              {/* Label */}
              <div className="text-sm uppercase tracking-widest text-[#89AACC] font-medium mb-2">
                {stat.label}
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-muted leading-relaxed">
                {stat.description}
              </p>

              {/* Corner accent glow on hover */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#89AACC]/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
