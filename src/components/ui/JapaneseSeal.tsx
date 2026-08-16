import React, { memo } from 'react';

interface JapaneseSealProps {
  char?: string;
  size?: number;
  className?: string;
  variant?: 'square' | 'circle';
}

/**
 * Traditional Japanese Hanko / Inkan seal accent in muted burnt vermilion.
 * Used with extreme restraint (1-3 places max) to sign authenticity.
 */
export const JapaneseSeal: React.FC<JapaneseSealProps> = memo(({
  char = '茶',
  size = 24,
  className = '',
  variant = 'square',
}) => {
  const isCircle = variant === 'circle';

  return (
    <div
      className={`inline-flex items-center justify-center border border-[#a33527]/70 text-[#a33527] bg-[#a33527]/10 select-none shadow-sm ${
        isCircle ? 'rounded-full' : 'rounded-[4px]'
      } ${className}`}
      style={{
        width: size,
        height: size,
        minWidth: size,
        minHeight: size,
      }}
      aria-hidden="true"
    >
      <span
        className="font-japanese font-black leading-none"
        style={{ fontSize: Math.floor(size * 0.58) }}
      >
        {char}
      </span>
    </div>
  );
});

JapaneseSeal.displayName = 'JapaneseSeal';
