import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import type { ExplorationItem } from '../types';
import { explorationsData } from '../data/explorations';
import { LightboxModal } from './LightboxModal';

gsap.registerPlugin(ScrollTrigger);

export const ExplorationsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const col1Ref = useRef<HTMLDivElement | null>(null);
  const col2Ref = useRef<HTMLDivElement | null>(null);
  const [activeItem, setActiveItem] = useState<ExplorationItem | null>(null);

  const col1Items = explorationsData.filter((item) => item.column === 1);
  const col2Items = explorationsData.filter((item) => item.column === 2);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Column 1 Parallax (faster speed)
      if (col1Ref.current) {
        gsap.fromTo(
          col1Ref.current,
          { y: 150 },
          {
            y: -350,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          }
        );
      }

      // Column 2 Parallax (slower offset speed)
      if (col2Ref.current) {
        gsap.fromTo(
          col2Ref.current,
          { y: 300 },
          {
            y: -200,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.5,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="explorations"
      ref={sectionRef}
      className="relative min-h-[220vh] sm:min-h-[260vh] lg:min-h-[300vh] bg-bg overflow-hidden"
    >
      {/* Background ambient radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#4E85BF]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Layer 1: Pinned / Sticky Center (z-10) */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center text-center px-6 z-10 pointer-events-none">
        <div className="max-w-md pointer-events-auto backdrop-blur-[2px] p-6 rounded-3xl">
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#89AACC]" />
            <span className="text-xs text-muted uppercase tracking-[0.3em] font-medium">
              Explorations
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-light text-text-primary tracking-tight leading-tight mb-4">
            Visual <span className="font-display italic font-normal">playground</span>
          </h2>

          {/* Subtext */}
          <p className="text-sm md:text-base text-muted mb-8 max-w-sm mx-auto">
            Unconstrained lab experiments in shaders, typography, physics, and spatial geometry.
          </p>

          {/* Dribbble Button */}
          <a
            href="https://dribbble.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center rounded-full text-xs uppercase tracking-widest font-medium py-2.5 px-6 text-text-primary transition-all duration-300 focus:outline-none"
          >
            <span className="absolute -inset-[1.5px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            <span className="inline-flex items-center gap-2 rounded-full bg-surface border border-stroke px-5 py-2.5 group-hover:border-transparent transition-colors duration-200">
              Explore on Dribbble
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </a>
        </div>
      </div>

      {/* Layer 2: Parallax Floating Columns (z-20) */}
      <div className="absolute inset-0 max-w-[1400px] mx-auto px-6 sm:px-12 md:px-20 z-20 pointer-events-none">
        <div className="grid grid-cols-2 gap-8 sm:gap-16 md:gap-32 lg:gap-48 h-full pt-40">
          {/* Column 1 */}
          <div ref={col1Ref} className="flex flex-col gap-24 sm:gap-36 items-start pointer-events-auto">
            {col1Items.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveItem(item)}
                className={`group relative aspect-square w-full max-w-[260px] sm:max-w-[320px] rounded-3xl overflow-hidden bg-surface border border-stroke shadow-2xl shadow-black/50 cursor-pointer transition-transform duration-500 hover:scale-105 hover:border-white/30 ${
                  item.rotation || ''
                }`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                {/* Halftone texture */}
                <div className="absolute inset-0 halftone-overlay opacity-20 pointer-events-none" />
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-bg/70 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-left">
                  <span className="text-[10px] uppercase tracking-widest text-[#89AACC] font-medium mb-1">
                    {item.category}
                  </span>
                  <h4 className="text-lg font-display italic text-text-primary">
                    {item.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>

          {/* Column 2 */}
          <div ref={col2Ref} className="flex flex-col gap-24 sm:gap-36 items-end pointer-events-auto pt-24 sm:pt-40">
            {col2Items.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveItem(item)}
                className={`group relative aspect-square w-full max-w-[260px] sm:max-w-[320px] rounded-3xl overflow-hidden bg-surface border border-stroke shadow-2xl shadow-black/50 cursor-pointer transition-transform duration-500 hover:scale-105 hover:border-white/30 ${
                  item.rotation || ''
                }`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                {/* Halftone texture */}
                <div className="absolute inset-0 halftone-overlay opacity-20 pointer-events-none" />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-bg/70 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-left">
                  <span className="text-[10px] uppercase tracking-widest text-[#89AACC] font-medium mb-1">
                    {item.category}
                  </span>
                  <h4 className="text-lg font-display italic text-text-primary">
                    {item.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeItem && (
        <LightboxModal item={activeItem} onClose={() => setActiveItem(null)} />
      )}
    </section>
  );
};
