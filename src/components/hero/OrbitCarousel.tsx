import React, { useRef, useEffect, useState, memo } from 'react';
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
  const [dimensions, setDimensions] = useState({ width: 1200, height: 700 });
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const currentOffsetRef = useRef({ val: activeIndex });
  const [animOffset, setAnimOffset] = useState(activeIndex);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  // Debounced container measurement
  useEffect(() => {
    let timeoutId: number;
    const updateSize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
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

  // Sync GSAP smooth animation when activeIndex changes
  useEffect(() => {
    if (isDraggingRef.current) return;

    if (tweenRef.current) {
      tweenRef.current.kill();
    }

    const count = flavors.length;
    let target = activeIndex;
    let current = currentOffsetRef.current.val;

    // Calculate shortest circular difference
    let diff = (target - (current % count) + count) % count;
    if (diff > count / 2) diff -= count;
    const targetVal = current + diff;

    tweenRef.current = gsap.to(currentOffsetRef.current, {
      val: targetVal,
      duration: 0.65,
      ease: 'power3.out',
      onUpdate: () => {
        setAnimOffset(currentOffsetRef.current.val);
      },
    });

    return () => {
      if (tweenRef.current) tweenRef.current.kill();
    };
  }, [activeIndex, flavors.length]);

  // Pointer / Drag handlers (Safe touch handling)
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    dragStartXRef.current = e.clientX;
    setIsAutoplaying(false);
    if (tweenRef.current) tweenRef.current.kill();
    try {
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    } catch {}
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - dragStartXRef.current;
    const itemWidth = dimensions.width < 768 ? 160 : 260;
    const offsetDelta = -deltaX / itemWidth;
    currentOffsetRef.current.val = activeIndex + offsetDelta;
    setAnimOffset(currentOffsetRef.current.val);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}

    // Snap to nearest index
    const count = flavors.length;
    let targetIndex = Math.round(currentOffsetRef.current.val);
    targetIndex = ((targetIndex % count) + count) % count;

    onSelectFlavor(targetIndex);
    setTimeout(() => setIsAutoplaying(true), 2500);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
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

  const isMobile = dimensions.width < 768;

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-auto touch-pan-y cursor-grab active:cursor-grabbing select-none"
    >
      {flavors.map((flavor, index) => {
        const count = flavors.length;
        // Calculate shortest relative modular distance around the ring
        let diff = (index - (animOffset % count) + count) % count;
        if (diff > count / 2) diff -= count;

        const transform = getCardTransform(
          diff,
          dimensions.width,
          dimensions.height
        );

        return (
          <OrbitCard
            key={flavor.id}
            flavor={flavor}
            isActive={Math.abs(diff) < 0.3}
            onClick={() => {
              setIsAutoplaying(false);
              onSelectFlavor(index);
            }}
            style={{
              transform: `translate3d(calc(-50% + ${transform.x}px), calc(-50% + ${transform.y}px), 0) rotate(${transform.rotation}deg) scale(${transform.scale})`,
              opacity: transform.opacity,
              zIndex: transform.zIndex,
              // On mobile, eliminate dynamic CSS blur recalculation for smooth 60fps
              filter: !isMobile && transform.blur > 0.2 ? `blur(${transform.blur}px)` : 'none',
              pointerEvents: transform.opacity < 0.15 ? 'none' : 'auto',
              willChange: isDraggingRef.current ? 'transform' : 'auto',
            }}
          />
        );
      })}
    </div>
  );
});

OrbitCarousel.displayName = 'OrbitCarousel';
