import React, { useEffect, useRef, useState } from 'react';

interface AnimatedWordsProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'span' | 'p';
  delay?: number; // base delay in ms
  staggerMs?: number; // stagger per word
  ariaLabel?: string;
}

export const AnimatedWords: React.FC<AnimatedWordsProps> = ({
  text,
  className = '',
  as: Component = 'h2',
  delay = 0,
  staggerMs = 55,
  ariaLabel,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const words = text.split(' ').filter(Boolean);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Component
      ref={containerRef as any}
      className={className}
      aria-label={ariaLabel || text}
    >
      {words.map((word, idx) => {
        const wordDelay = delay + idx * staggerMs;

        return (
          <span
            key={`${word}-${idx}`}
            className="inline-block overflow-hidden align-top me-[0.26em] last:me-0"
            aria-hidden="true"
          >
            <span
              style={{
                transitionDuration: '650ms',
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                transitionDelay: `${wordDelay}ms`,
              }}
              className={`inline-block will-change-transform transform-gpu transition-all ${
                isVisible
                  ? 'translate-y-0 opacity-100 blur-0'
                  : 'translate-y-[105%] opacity-0 blur-[3px]'
              }`}
            >
              {word}
            </span>
          </span>
        );
      })}
    </Component>
  );
};
