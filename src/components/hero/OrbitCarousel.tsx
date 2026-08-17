import React, { useRef, useEffect, useState, useCallback, memo } from 'react';
import gsap from 'gsap';
import type { HeroFlavor } from '../../types/matcha';
import { OrbitCard } from './OrbitCard';
import { getCardTransform } from '../../lib/carouselGeometry';

interface OrbitCarouselProps {
  flavors: HeroFlavor[];
  activeIndex: number;
  onSelectFlavor: (index: number) => void;
  isAutoplaying: boolean;
  setIsAutoplaying: (auto: boolean) => void;
}

export const OrbitCarousel: React.FC<OrbitCarouselProps> = memo(({
  flavors,
  activeIndex,
  onSelectFlavor,
  setIsAutoplaying,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [dimensions, setDimensions] = useState({ width: 1200, height: 700 });

  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartOffsetRef = useRef(0);
  const currentOffsetRef = useRef({ val: activeIndex });
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  // Directly update card DOM transforms and opacities (Zero React re-renders during 60fps motion)
  const updateCardDOM = useCallback((offset: number) => {
    const count = flavors.length;
    const isMobile = dimensions.width < 768;

    for (let i = 0; i < count; i++) {
      const cardEl = cardRefs.current[i];
      if (!cardEl) continue;

      // Calculate shortest relative modular distance around the ring
      let diff = (i - (offset % count) + count) % count;
      if (diff > count / 2) diff -= count;

      const t = getCardTransform(diff, dimensions.width, dimensions.height);

      cardEl.style.transform = `translate3d(calc(-50% + ${t.x}px), calc(-50% + ${t.y}px), 0) rotate(${t.rotation}deg) scale(${t.scale})`;
      cardEl.style.opacity = `${t.opacity}`;
      cardEl.style.zIndex = `${t.zIndex}`;
      cardEl.style.pointerEvents = t.opacity < 0.15 ? 'none' : 'auto';

      if (!isMobile && t.blur > 0.2) {
        cardEl.style.filter = `blur(${t.blur}px)`;
      } else {
        cardEl.style.filter = 'none';
      }
    }
  }, [flavors.length, dimensions.width, dimensions.height]);

  // Debounced container measurement
  useEffect(() => {
    let timeoutId: number;
    const updateSize = () => {
      if (containerRef.current) {
        const w = containerRef.current.offsetWidth || window.innerWidth;
        const h = containerRef.current.offsetHeight || 700;
        setDimensions({ width: w, height: h });
      }
    };

    updateSize();

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = window.setTimeout(updateSize, 150);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Update initial DOM on mount or dimension change
  useEffect(() => {
    updateCardDOM(currentOffsetRef.current.val);
  }, [dimensions, updateCardDOM]);

  // Smooth single-master GSAP tween when activeIndex changes
  useEffect(() => {
    if (isDraggingRef.current) return;

    if (tweenRef.current) {
      tweenRef.current.kill();
    }

    const count = flavors.length;
    let target = activeIndex;
    let current = currentOffsetRef.current.val;

    // Calculate shortest circular path from current continuous offset to target
    let diff = (target - (current % count) + count) % count;
    if (diff > count / 2) diff -= count;
    const targetVal = current + diff;

    const isMobile = dimensions.width < 768;

    tweenRef.current = gsap.to(currentOffsetRef.current, {
      val: targetVal,
      duration: isMobile ? 0.58 : 0.65,
      ease: 'power3.out',
      onUpdate: () => {
        updateCardDOM(currentOffsetRef.current.val);
      },
      onComplete: () => {
        // Normalize offset within integer range to prevent float overflow
        currentOffsetRef.current.val = ((targetVal % count) + count) % count;
      },
    });

    return () => {
      if (tweenRef.current) tweenRef.current.kill();
    };
  }, [activeIndex, flavors.length, dimensions.width, updateCardDOM]);

  // Pointer / Drag handlers (Zero latency, direct DOM updates)
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    dragStartXRef.current = e.clientX;
    dragStartOffsetRef.current = currentOffsetRef.current.val;
    setIsAutoplaying(false);

    if (tweenRef.current) {
      tweenRef.current.kill();
    }

    try {
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    } catch {}
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;

    const deltaX = e.clientX - dragStartXRef.current;
    const itemWidth = dimensions.width < 768 ? 170 : 280;
    const offsetDelta = -deltaX / itemWidth;

    currentOffsetRef.current.val = dragStartOffsetRef.current + offsetDelta;
    updateCardDOM(currentOffsetRef.current.val);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;

    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}

    const count = flavors.length;
    // Calculate nearest target integer from current continuous offset
    const currentVal = currentOffsetRef.current.val;
    let targetIndex = Math.round(currentVal);
    const normalizedTarget = ((targetIndex % count) + count) % count;

    // Smoothly animate from CURRENT visual offset to target snapped position
    if (tweenRef.current) tweenRef.current.kill();

    const isMobile = dimensions.width < 768;

    tweenRef.current = gsap.to(currentOffsetRef.current, {
      val: targetIndex,
      duration: isMobile ? 0.45 : 0.55,
      ease: 'power3.out',
      onUpdate: () => {
        updateCardDOM(currentOffsetRef.current.val);
      },
      onComplete: () => {
        currentOffsetRef.current.val = normalizedTarget;
        onSelectFlavor(normalizedTarget);
      },
    });
  };

  // Keyboard navigation (with form input protection)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeTag = document.activeElement?.tagName.toLowerCase();
      if (activeTag === 'input' || activeTag === 'textarea' || activeTag === 'select') {
        return;
      }

      if (e.key === 'ArrowRight') {
        setIsAutoplaying(false);
        onSelectFlavor((activeIndex + 1) % flavors.length);
      } else if (e.key === 'ArrowLeft') {
        setIsAutoplaying(false);
        onSelectFlavor((activeIndex - 1 + flavors.length) % flavors.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, flavors.length, onSelectFlavor, setIsAutoplaying]);

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-auto touch-pan-y cursor-grab active:cursor-grabbing select-none z-20"
    >
      {flavors.map((flavor, index) => {
        return (
          <div
            key={flavor.id}
            ref={(el) => { cardRefs.current[index] = el; }}
            className="absolute top-1/2 left-1/2 will-change-transform"
            style={{
              transform: 'translate3d(-50%, -50%, 0)',
              opacity: 0,
            }}
          >
            <OrbitCard
              flavor={flavor}
              isActive={index === activeIndex}
              onClick={() => {
                setIsAutoplaying(false);
                onSelectFlavor(index);
              }}
            />
          </div>
        );
      })}
    </div>
  );
});

OrbitCarousel.displayName = 'OrbitCarousel';
