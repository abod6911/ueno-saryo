import React, { memo } from 'react';

export type MatchaContourVariant = 'hero-flow' | 'ridge-soft' | 'divider-shallow';

interface MatchaContourProps {
  variant?: MatchaContourVariant;
  className?: string;
  fill?: string;
  flip?: boolean;
  opacity?: number;
  height?: number | string;
}

/**
 * Reusable organic Matcha powder contour motif.
 * Derived from the natural asymmetrical silhouette of stone-ground Uji matcha dunes.
 * Pure vector SVG with zero runtime overhead.
 */
export const MatchaContour: React.FC<MatchaContourProps> = memo(({
  variant = 'hero-flow',
  className = '',
  fill = '#102315',
  flip = false,
  opacity = 1,
  height = 'auto',
}) => {
  const transform = flip ? 'scale(-1, 1)' : undefined;
  const transformOrigin = flip ? 'center' : undefined;

  if (variant === 'ridge-soft') {
    return (
      <div
        className={`w-full overflow-hidden leading-none pointer-events-none ${className}`}
        style={{ height, opacity }}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1440 72"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-full block"
          style={{ transform, transformOrigin }}
        >
          {/* Layer 1: Background Subtle Ambient Ridge */}
          <path
            d="M0 48C180 48 320 22 540 32C760 42 920 62 1140 38C1280 24 1380 36 1440 40V72H0V48Z"
            fill={fill}
            fillOpacity="0.35"
          />
          {/* Layer 2: Main Tactile Powder Dune Profile */}
          <path
            d="M0 24C160 24 340 52 560 38C780 24 940 8 1160 28C1290 40 1390 20 1440 14V72H0V24Z"
            fill={fill}
          />
        </svg>
      </div>
    );
  }

  if (variant === 'divider-shallow') {
    return (
      <div
        className={`w-full overflow-hidden leading-none pointer-events-none ${className}`}
        style={{ height, opacity }}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1440 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-full block"
          style={{ transform, transformOrigin }}
        >
          <path
            d="M0 16C240 28 480 6 720 18C960 30 1200 10 1440 20V36H0V16Z"
            fill={fill}
          />
        </svg>
      </div>
    );
  }

  // Default: 'hero-flow' (Graceful organic downward contour)
  return (
    <div
      className={`w-full overflow-hidden leading-none pointer-events-none ${className}`}
      style={{ height, opacity }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 96"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="w-full h-full block"
        style={{ transform, transformOrigin }}
      >
        {/* Deep ambient shadow under contour */}
        <path
          d="M0 64C220 64 380 32 640 48C900 64 1080 84 1320 54C1390 46 1420 52 1440 58V96H0V64Z"
          fill="#0a150c"
          fillOpacity="0.4"
        />
        {/* Main sculpted matcha terrain contour */}
        <path
          d="M0 36C200 36 390 70 660 52C930 34 1110 14 1340 38C1400 44 1425 32 1440 26V96H0V36Z"
          fill={fill}
        />
      </svg>
    </div>
  );
});

MatchaContour.displayName = 'MatchaContour';
