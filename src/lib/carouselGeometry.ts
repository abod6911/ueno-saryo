import type { CardTransform } from '../types/matcha';

/**
 * Calculates deterministic, art-directed 3D orbital transforms for carousel cards.
 * Implements true Depth-of-Field (blur), perspective scaling, atmospheric falloff,
 * and elegant parabolic arc trajectory around the central product.
 */
export function getCardTransform(
  relativeOffset: number, // continuous float during drag/transitions (-2 to +2 for visible cards)
  containerWidth: number,
  _containerHeight: number = 700
): CardTransform {
  const u = relativeOffset;
  const isMobile = containerWidth < 768;
  const dist = Math.abs(u);

  if (isMobile) {
    // Mobile geometry: 3 prominently visible cards + clipped edge hints
    const spacingX = containerWidth * 0.35;
    const x = u * spacingX;
    // Parabolic arc curvature
    const y = (u * u) * 18 - 8;
    const rotation = u * 8.5;
    const scale = Math.max(0.68, 1 - dist * 0.14);
    
    let blur = 0;
    if (dist > 1.2) {
      blur = Math.min(2.0, (dist - 1.2) * 1.4);
    }

    let opacity = 1;
    if (dist < 0.3) {
      // Hidden behind the central cup
      opacity = 0;
    } else if (dist < 0.7) {
      opacity = (dist - 0.3) / 0.4;
    } else if (dist > 1.8) {
      opacity = Math.max(0, 1 - (dist - 1.8) * 1.2);
    }

    const zIndex = Math.round(25 - dist * 6);

    return {
      x,
      y,
      rotation,
      scale,
      opacity,
      blur: Math.round(blur * 10) / 10,
      zIndex,
    };
  }

  // Desktop geometry: 5-card orbital composition
  // Center is at u=0 (where drink lives). Nearest cards sit at u=±1, far cards sit at u=±2.
  const baseSpacing = Math.min(containerWidth * 0.22, 330);
  const x = u * baseSpacing;
  
  // Parabolic upward-lifted arc (cards at u=±1 are highest/mid, cards at u=±2 slope gracefully lower)
  const y = (u * u) * 36 - 28;

  // Angular tilt matching the orbital arc (-14° at far left, -7° at left-mid, +7° at right-mid, +14° at far right)
  const rotation = u * 7.0;

  // Perspective scale: near cards (u=±1) are 0.98, far cards (u=±2) are 0.82
  const scale = Math.max(0.72, 1.02 - dist * 0.10);

  // Depth-of-Field blur: near cards are tack-sharp, far cards have optical defocus
  let blur = 0;
  if (dist > 1.3) {
    blur = Math.min(1.6, (dist - 1.3) * 1.2);
  }

  // Atmospheric opacity: cards at u=±1 have 1.0 opacity, cards at u=±2 have 0.55 opacity, u=0 is hidden behind drink
  let opacity = 1;
  if (dist < 0.4) {
    // Hidden directly behind the central drink
    opacity = 0;
  } else if (dist < 0.8) {
    opacity = (dist - 0.4) / 0.4;
  } else if (dist > 1.1) {
    opacity = Math.max(0, 1 - (dist - 1.1) * 0.45);
  }

  // Stacking z-index: near cards sit above far cards
  const zIndex = Math.round(24 - dist * 5);

  return {
    x,
    y,
    rotation,
    scale,
    opacity,
    blur: Math.round(blur * 10) / 10,
    zIndex,
  };
}
