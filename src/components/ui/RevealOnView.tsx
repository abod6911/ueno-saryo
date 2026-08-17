import React, { useEffect, useRef, useState } from 'react';

interface RevealOnViewProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'fade-up' | 'slide-inline-start' | 'slide-inline-end' | 'scale-in' | 'fade';
  delay?: number;
  threshold?: number;
}

export const RevealOnView: React.FC<RevealOnViewProps> = ({
  children,
  className = '',
  variant = 'fade-up',
  delay = 0,
  threshold = 0.1,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
      { threshold, rootMargin: '0px 0px -30px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const getTransformClasses = () => {
    switch (variant) {
      case 'fade-up':
        return isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0';
      case 'slide-inline-start':
        // Left in LTR, Right in RTL
        return isVisible
          ? 'translate-x-0 opacity-100'
          : '-translate-x-7 rtl:translate-x-7 opacity-0';
      case 'slide-inline-end':
        // Right in LTR, Left in RTL
        return isVisible
          ? 'translate-x-0 opacity-100'
          : 'translate-x-7 rtl:-translate-x-7 opacity-0';
      case 'scale-in':
        return isVisible ? 'scale-100 opacity-100' : 'scale-[0.965] opacity-0';
      case 'fade':
      default:
        return isVisible ? 'opacity-100' : 'opacity-0';
    }
  };

  return (
    <div
      ref={containerRef}
      style={{
        transitionDuration: '700ms',
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        transitionDelay: `${delay}ms`,
      }}
      className={`will-change-transform transform-gpu transition-all ${getTransformClasses()} ${className}`}
    >
      {children}
    </div>
  );
};
