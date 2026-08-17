import React, { memo } from 'react';

interface TeaLabAnnotationProps {
  index?: string;
  label?: string;
  meta?: string;
  kanji?: string;
  align?: 'start' | 'center' | 'end';
  variant?: 'line' | 'bracket' | 'minimal';
  className?: string;
  lineOpacity?: number;
}

/**
 * Editorial Japanese Tea Laboratory Specimen Annotation.
 * Provides microscopic, high-precision metadata and delicate rule lines with clean Arabic & English typography.
 */
export const TeaLabAnnotation: React.FC<TeaLabAnnotationProps> = memo(({
  index,
  label,
  meta,
  kanji,
  align = 'start',
  variant = 'line',
  className = '',
  lineOpacity = 0.2,
}) => {
  const alignmentClass =
    align === 'center'
      ? 'items-center text-center'
      : align === 'end'
      ? 'items-end text-end'
      : 'items-start text-start';

  if (variant === 'bracket') {
    return (
      <div
        className={`inline-flex items-center gap-2 text-[10.5px] text-[#939458] select-none ${className}`}
        aria-hidden="true"
      >
        <span className="opacity-40 font-mono">[</span>
        {index && <span className="font-mono font-bold text-white/90 tracking-wider">{index}</span>}
        {label && <span className="text-[#939458] font-sans font-medium">{label}</span>}
        {kanji && <span className="font-japanese text-[11px] text-white/50">{kanji}</span>}
        <span className="opacity-40 font-mono">]</span>
      </div>
    );
  }

  if (variant === 'minimal') {
    return (
      <div
        className={`inline-flex items-center gap-2 text-[11px] text-[#939458]/90 select-none ${className}`}
        aria-hidden="true"
      >
        {index && <span className="font-mono font-bold text-[#939458] tracking-wider">{index}</span>}
        {index && label && <span className="w-1 h-1 rounded-full bg-[#939458]/40" />}
        {label && <span className="font-sans font-medium text-white/80">{label}</span>}
        {kanji && <span className="font-japanese text-[11px] text-[#939458] font-normal">{kanji}</span>}
        {meta && <span className="font-mono text-white/40 text-[9px]">({meta})</span>}
      </div>
    );
  }

  // Default: 'line' with delicate 1px rule line
  return (
    <div className={`flex flex-col gap-1 select-none ${alignmentClass} ${className}`} aria-hidden="true">
      <div className="flex items-center gap-3 w-full">
        {index && (
          <span className="font-mono text-[11px] font-bold text-[#939458] tracking-wider shrink-0">
            {index}
          </span>
        )}
        <div
          className="h-px flex-1 bg-current"
          style={{ opacity: lineOpacity }}
        />
        {label && (
          <span className="font-sans text-[11px] text-white/80 shrink-0 font-medium">
            {label}
          </span>
        )}
        {kanji && (
          <span className="font-japanese text-xs text-[#939458] shrink-0 font-medium">
            {kanji}
          </span>
        )}
      </div>
      {meta && (
        <span className="font-mono text-[9px] text-white/40 tracking-wider">
          {meta}
        </span>
      )}
    </div>
  );
});

TeaLabAnnotation.displayName = 'TeaLabAnnotation';
