import type { CardTransform } from '../types/matcha';

/**
 * Calculates physically grounded 3D orbital transforms for carousel cards.
 * Implements true Depth-of-Field (blur), perspective scale, atmospheric opacity,
 * and natural parabolic trajectory.
 */
export function getCardTransform(
  relativeOffset: number, // e.g. -2, -1, 0, 1, 2 (continuous float during drag/transitions)
  containerWidth: number,
  _containerHeight?: number
): CardTransform {
  const u = relativeOffset;
  const isMobile = containerWidth < 768;
  const dist = Math.abs(u);

  // Horizontal distribution tailored to screen width
  const spacingX = isMobile
    ? containerWidth * 0.36
    : Math.min(containerWidth * 0.22, 320);

  // Parabolic downward orbit trajectory
  const arcCurvature = isMobile ? 28 : 42;
  const x = u * spacingX;
  const y = (u * u) * arcCurvature - (isMobile ? 8 : 20);

  // Subtle angular tilt matching orbital curvature
  const rotation = u * (isMobile ? 7.8 : 6.8);

  // Perspective scale: far cards shrink realistically
  const scale = isMobile
    ? Math.max(0.68, 1 - dist * 0.12)
    : Math.max(0.74, 1 - dist * 0.11);

  // Depth-of-field blur: near cards are tack-sharp, far cards have subtle optical defocus
  let blur = 0;
  if (dist > 0.4) {
    blur = Math.min(1.8, (dist - 0.4) * 0.9);
  }

  // Atmospheric falloff opacity
  let opacity = 1;
  if (dist > 0.9) {
    opacity = Math.max(0, 1 - (dist - 0.9) * 0.65);
  }

  // Stacking z-index: cards closer to center sit in front
  const zIndex = Math.round(26 - dist * 5);

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
