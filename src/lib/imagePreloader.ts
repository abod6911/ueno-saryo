import { HERO_FLAVORS } from '../data/heroFlavors';

/**
 * Pre-decodes all Hero product images and fruit botanical assets into GPU memory.
 * Ensures zero main-thread decode jank or texture upload hitches during carousel transitions.
 */
export function preloadHeroImages(): Promise<void[]> {
  if (typeof window === 'undefined') return Promise.resolve([]);

  const promises: Promise<void>[] = [];

  HERO_FLAVORS.forEach((flavor) => {
    // Preload & decode product image
    if (flavor.productImage) {
      const img = new Image();
      img.src = flavor.productImage;
      if ('decode' in img) {
        promises.push(
          img.decode().catch(() => {
            // Fallback gracefully if decode fails
          })
        );
      }
    }

    // Preload & decode fruit/botanical image
    if (flavor.fruitImage) {
      const img = new Image();
      img.src = flavor.fruitImage;
      if ('decode' in img) {
        promises.push(
          img.decode().catch(() => {
            // Fallback gracefully if decode fails
          })
        );
      }
    }
  });

  return Promise.all(promises);
}
