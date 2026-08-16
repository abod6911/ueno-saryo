import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowUpRight, Mail } from 'lucide-react';
import { HlsVideo } from './HlsVideo';

interface ContactFooterProps {
  onOpenContact: () => void;
}

export const ContactFooter: React.FC<ContactFooterProps> = ({ onOpenContact }) => {
  const marqueeRef = useRef<HTMLDivElement | null>(null);

  // GSAP Infinite Marquee
  useEffect(() => {
    const el = marqueeRef.current;
    if (!el) return;

    const anim = gsap.to(el, {
      xPercent: -50,
      duration: 35,
      ease: 'none',
      repeat: -1,
    });

    return () => {
      anim.kill();
    };
  }, []);

  const marqueeText = Array(10).fill('BUILDING THE FUTURE • ').join('');

  const socialLinks = [
    { name: 'Twitter', url: 'https://twitter.com' },
    { name: 'LinkedIn', url: 'https://linkedin.com' },
    { name: 'Dribbble', url: 'https://dribbble.com' },
    { name: 'GitHub', url: 'https://github.com' },
  ];

  return (
    <footer id="contact" className="relative bg-bg pt-20 md:pt-28 pb-10 md:pb-14 overflow-hidden">
      {/* Background Flipped HLS Video */}
      <HlsVideo flipped />

      {/* Heavier Overlay (bg-black/60) */}
      <div className="absolute inset-0 bg-black/65 pointer-events-none" />

      {/* Top transition fade */}
      <div className="absolute top-0 inset-x-0 h-36 bg-gradient-to-b from-bg to-transparent pointer-events-none" />

      {/* Main Content Area (z-10) */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 flex flex-col items-center text-center mb-16 md:mb-24">
        {/* Eyebrow */}
        <div className="text-xs text-muted uppercase tracking-[0.3em] font-medium mb-6">
          Get In Touch
        </div>

        {/* Heading */}
        <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display italic text-text-primary mb-8 tracking-tight max-w-3xl leading-[0.95]">
          Let&apos;s build something <span className="underline decoration-[#89AACC]/40 decoration-wavy">extraordinary</span>.
        </h2>

        <p className="text-sm sm:text-base text-muted max-w-lg mb-10 leading-relaxed">
          Open for select consulting, product engineering, design systems, and creative director roles.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          {/* Email button with gradient hover border */}
          <a
            href="mailto:hello@michaelsmith.com"
            className="group relative inline-flex items-center justify-center rounded-full text-sm font-medium py-3.5 px-8 text-text-primary transition-all duration-300 hover:scale-105 focus:outline-none"
          >
            {/* Hover gradient border ring */}
            <span className="absolute -inset-[1.5px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            <span className="inline-flex items-center gap-2.5 rounded-full bg-surface border border-stroke px-8 py-3.5 group-hover:border-transparent group-hover:bg-bg transition-colors duration-200">
              <Mail className="w-4 h-4 text-[#89AACC]" />
              <span>hello@michaelsmith.com</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </a>

          {/* Quick contact modal button */}
          <button
            onClick={onOpenContact}
            className="rounded-full text-sm font-medium py-3.5 px-6 border border-stroke/60 bg-bg/60 text-muted hover:text-text-primary hover:border-stroke transition-colors"
          >
            Send a direct note
          </button>
        </div>
      </div>

      {/* GSAP Continuous Marquee Banner */}
      <div className="relative z-10 w-full overflow-hidden border-y border-stroke/50 py-5 sm:py-6 bg-surface/40 backdrop-blur-md mb-16">
        <div
          ref={marqueeRef}
          className="inline-block whitespace-nowrap text-2xl sm:text-3xl md:text-4xl font-display italic text-text-primary/70 tracking-widest uppercase select-none"
        >
          <span>{marqueeText}</span>
          <span>{marqueeText}</span>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 flex flex-col md:flex-row items-center justify-between gap-6 pt-4 text-xs text-muted">
        {/* Availability Badge with pulsing green dot */}
        <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-surface border border-stroke">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <span className="text-text-primary/90 font-medium text-[11px] uppercase tracking-wider">
            Available for projects
          </span>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-6">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-text-primary transition-colors duration-200"
            >
              {social.name}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <div className="text-muted/60">
          © {new Date().getFullYear()} Michael Smith. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
