/**
 * Resolves static asset paths taking into account Vite BASE_URL (e.g. /ueno-saryo/)
 */
export function getAssetUrl(path: string): string {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  const base = (typeof import.meta !== 'undefined' && import.meta.env?.BASE_URL) || '/';
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${cleanBase}${cleanPath}`;
}
