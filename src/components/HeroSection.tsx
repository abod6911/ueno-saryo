import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { HlsVideo } from './HlsVideo';

interface HeroSectionProps {
  onSeeWorks: () => void;
  onReachOut: () => void;
}

const roles = ['Creative', 'Fullstack', 'Founder', 'Scholar'];

export const HeroSection: React.FC<HeroSectionProps> = ({ onSeeWorks, onReachOut }) => {
  const [roleIndex, setRoleIndex] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Role cycler every 2s
  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  // GSAP Entrance Timeline
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        '.name-reveal',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, delay: 0.1 }
      );

      tl.fromTo(
        '.blur-in',
        { opacity: 0, y: 20, filter: 'blur(10px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, stagger: 0.1 },
        '-=0.9'
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full min-h-screen flex flex-col justify-between items-center text-center px-4 pt-32 pb-12 overflow-hidden"
    >
      {/* Background Video */}
      <HlsVideo />

      {/* Dark Overlay (bg-black/20) */}
      <div className="absolute inset-0 bg-black/25 pointer-events-none" />

      {/* Subtle radial center vignette */}
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none opacity-40" />

      {/* Bottom Fade: h-48 bg-gradient-to-t from-bg to-transparent */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-bg via-bg/80 to-transparent pointer-events-none z-0" />

      {/* Centered Main Content (z-10) */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center justify-center my-auto">
        {/* Eyebrow */}
        <div className="blur-in text-xs text-muted uppercase tracking-[0.3em] mb-8 font-medium">
          COLLECTION &apos;26
        </div>

        {/* Name */}
        <h1 className="name-reveal text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-display italic leading-[0.9] tracking-tight text-text-primary mb-6 selection:bg-accent/30">
          Michael Smith
        </h1>

        {/* Role line */}
        <p className="blur-in text-lg sm:text-xl md:text-2xl text-text-primary/90 font-light mb-4 flex items-center justify-center gap-2 flex-wrap">
          <span>A</span>
          <span
            key={roleIndex}
            className="font-display italic text-text-primary animate-role-fade-in inline-block text-2xl sm:text-3xl md:text-4xl px-1 font-normal"
          >
            {roles[roleIndex]}
          </span>
          <span>lives in Chicago.</span>
        </p>

        {/* Description */}
        <p className="blur-in text-sm md:text-base text-muted max-w-md mb-10 leading-relaxed font-light">
          Designing seamless digital interactions by focusing on the unique nuances which bring systems to life.
        </p>

        {/* CTA Buttons */}
        <div className="blur-in inline-flex items-center gap-4 flex-wrap justify-center">
          {/* See Works button */}
          <button
            onClick={onSeeWorks}
            className="group relative rounded-full text-sm font-medium px-7 py-3.5 transition-all duration-300 hover:scale-105 focus:outline-none"
          >
            {/* Hover gradient border ring */}
            <span className="absolute -inset-[1.5px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            <span className="inline-flex items-center justify-center w-full h-full rounded-full bg-text-primary text-bg font-semibold group-hover:bg-bg group-hover:text-text-primary transition-colors duration-300 px-7 py-3.5">
              See Works
            </span>
          </button>

          {/* Reach out button */}
          <button
            onClick={onReachOut}
            className="group relative rounded-full text-sm font-medium px-7 py-3.5 transition-all duration-300 hover:scale-105 focus:outline-none"
          >
            {/* Hover gradient border ring */}
            <span className="absolute -inset-[1.5px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            <span className="inline-flex items-center justify-center w-full h-full rounded-full border-2 border-stroke bg-bg/80 backdrop-blur-sm text-text-primary group-hover:border-transparent group-hover:bg-surface transition-all duration-300 px-7 py-3.5">
              Reach out...
            </span>
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="relative z-10 flex flex-col items-center gap-2 mt-auto">
        <span className="text-[10px] sm:text-xs text-muted uppercase tracking-[0.25em] font-medium">
          SCROLL
        </span>
        <div className="w-px h-10 bg-stroke relative overflow-hidden rounded-full">
          <div className="w-full h-1/2 accent-gradient animate-scroll-down absolute inset-x-0" />
        </div>
      </div>
    </section>
  );
};
