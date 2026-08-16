import React, { useRef, useEffect, useState } from 'react';
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

export const OrbitCarousel: React.FC<OrbitCarouselProps> = ({
  flavors,
  activeIndex,
  onSelectFlavor,
  setIsAutoplaying,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 1200, height: 750 });
  const [dragOffset, setDragOffset] = useState(0);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const currentOffsetRef = useRef(activeIndex);

  // Measure container size
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Sync GSAP smooth animation when activeIndex changes
  useEffect(() => {
    if (isDraggingRef.current) return;

    gsap.to(currentOffsetRef, {
      current: activeIndex,
      duration: 0.65,
      ease: 'power3.out',
      onUpdate: () => {
        setDragOffset(currentOffsetRef.current);
      },
    });
  }, [activeIndex]);

  // Pointer / Drag handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    dragStartXRef.current = e.clientX;
    setIsAutoplaying(false);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - dragStartXRef.current;
    const itemWidth = dimensions.width < 768 ? 150 : 250;
    const offsetDelta = -deltaX / itemWidth;
    currentOffsetRef.current = activeIndex + offsetDelta;
    setDragOffset(currentOffsetRef.current);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}

    // Snap to nearest index
    const count = flavors.length;
    let targetIndex = Math.round(currentOffsetRef.current);
    targetIndex = ((targetIndex % count) + count) % count;

    onSelectFlavor(targetIndex);
    setTimeout(() => setIsAutoplaying(true), 4000);
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
        // Calculate shortest relative distance around the ring
        let diff = index - dragOffset;
        while (diff > count / 2) diff -= count;
        while (diff < -count / 2) diff += count;

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
              filter: transform.blur > 0.1 ? `blur(${transform.blur}px)` : 'none',
              pointerEvents: transform.opacity < 0.1 ? 'none' : 'auto',
            }}
          />
        );
      })}
    </div>
  );
};
