import React, { useEffect, useRef, useState } from 'react';

interface RevealOnViewProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'signature-rise' | 'fade-up' | 'slide-inline-start' | 'slide-inline-end' | 'scale-in' | 'fade';
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
      case 'signature-rise':
        return isVisible
          ? 'translate-y-0 scale-100 opacity-100'
          : 'translate-y-8 sm:translate-y-10 scale-[0.98] opacity-0';
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

  const isSignatureRise = variant === 'signature-rise';

  return (
    <div
      ref={containerRef}
      style={{
        transitionDuration: isSignatureRise ? '850ms' : '700ms',
        transitionTimingFunction: isSignatureRise
          ? 'cubic-bezier(0.22, 1, 0.36, 1)'
          : 'cubic-bezier(0.16, 1, 0.3, 1)',
        transitionDelay: `${delay}ms`,
      }}
      className={`will-change-transform transform-gpu transition-[opacity,transform] ${getTransformClasses()} ${className}`}
    >
      {children}
    </div>
  );
};
