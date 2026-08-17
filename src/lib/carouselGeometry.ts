import type { CardTransform } from '../types/matcha';

/**
 * Calculates deterministic, art-directed 3D orbital transforms for carousel cards.
 * Implements Zero-Visibility Wrap Zones to completely prevent edge-teleport glitches,
 * smooth Hermite center occlusion behind the cup, and responsive parabolic trajectories.
 */
export function getCardTransform(
  relativeOffset: number, // continuous float during drag/transitions (-2.5 to +2.5)
  containerWidth: number,
  _containerHeight: number = 700
): CardTransform {
  const u = relativeOffset;
  const isMobile = containerWidth < 768;
  const dist = Math.abs(u);

  if (isMobile) {
    // Mobile geometry: 2 prominent side cards + subtle edge hints + central drink focus
    const spacingX = containerWidth * 0.38;
    const x = u * spacingX;
    // Parabolic arc curvature (cups sit higher near edges)
    const y = (u * u) * 20 - 10;
    const rotation = u * 7.5;
    const scale = Math.max(0.68, 1 - dist * 0.12);

    // 1. Smooth Center Occlusion (passing behind the central cup)
    let opacity = 1;
    if (dist < 0.25) {
      opacity = 0; // Fully occluded by cup belly
    } else if (dist < 0.65) {
      // Smooth sinusoidal emergence from behind cup
      const t = (dist - 0.25) / 0.40;
      opacity = Math.sin(t * Math.PI * 0.5);
    } else if (dist > 1.45) {
      // 2. Zero-Visibility Wrap Zone:
      // Smoothly fade to 0.0 well BEFORE the coordinate wrap boundary (|u| = 2.5)
      // Card is 100% invisible by |u| = 1.95 so coordinate flip is completely imperceptible
      if (dist >= 1.95) {
        opacity = 0;
      } else {
        const t = (dist - 1.45) / 0.50; // 0 to 1
        opacity = Math.max(0, 1 - t * t * (3 - 2 * t)); // Hermite smoothstep
      }
    }

    const zIndex = Math.round(24 - dist * 6);

    return {
      x,
      y,
      rotation,
      scale,
      opacity,
      blur: 0, // No dynamic CSS blur on mobile for 60fps
      zIndex,
    };
  }

  // Desktop geometry: 5-card orbital composition
  const baseSpacing = Math.min(containerWidth * 0.22, 330);
  const x = u * baseSpacing;
  const y = (u * u) * 36 - 28;
  const rotation = u * 6.5;
  const scale = Math.max(0.72, 1.02 - dist * 0.10);

  // Optical defocus blur on desktop
  let blur = 0;
  if (dist > 1.3) {
    blur = Math.min(1.6, (dist - 1.3) * 1.2);
  }

  // Desktop opacity with smooth center occlusion and outer wrap zone
  let opacity = 1;
  if (dist < 0.35) {
    opacity = 0;
  } else if (dist < 0.75) {
    const t = (dist - 0.35) / 0.40;
    opacity = Math.sin(t * Math.PI * 0.5);
  } else if (dist > 1.5) {
    if (dist >= 2.3) {
      opacity = 0;
    } else {
      const t = (dist - 1.5) / 0.8;
      opacity = Math.max(0, 1 - t * t * (3 - 2 * t));
    }
  }

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
