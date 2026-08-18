import React, { memo } from 'react';

interface TeaLabAnnotationProps {
  index?: string;
  label?: string;
  meta?: string;
  kanji?: string;
  align?: 'start' | 'center' | 'end';
  variant?: 'line' | 'bracket' | 'minimal';
  theme?: 'dark' | 'light';
  className?: string;
  lineOpacity?: number;
}

/**
 * Editorial Japanese Tea Laboratory Specimen Annotation.
 * Provides microscopic, high-precision metadata and delicate rule lines with clean Arabic & English typography.
 * Supports both dark matcha backgrounds and light rice/paper backgrounds.
 */
export const TeaLabAnnotation: React.FC<TeaLabAnnotationProps> = memo(({
  index,
  label,
  meta,
  kanji,
  align = 'start',
  variant = 'line',
  theme = 'dark',
  className = '',
  lineOpacity = 0.2,
}) => {
  const isLight = theme === 'light';

  const labelColor = isLight ? 'text-[#122416] font-semibold' : 'text-[#f8f7f1]/90 font-medium';
  const indexColor = isLight ? 'text-[#29482a]' : 'text-[#939458]';
  const kanjiColor = isLight ? 'text-[#29482a]' : 'text-[#939458]';
  const dotColor = isLight ? 'bg-[#29482a]/50' : 'bg-[#939458]/40';
  const metaColor = isLight ? 'text-[#181813]/60' : 'text-[#f8f7f1]/50';
  const bracketColor = isLight ? 'text-[#29482a]/50' : 'text-white/40';

  const alignmentClass =
    align === 'center'
      ? 'items-center text-center'
      : align === 'end'
      ? 'items-end text-end'
      : 'items-start text-start';

  if (variant === 'bracket') {
    return (
      <div
        className={`inline-flex items-center gap-2 text-[10.5px] select-none ${className}`}
        aria-hidden="true"
      >
        <span className={`font-mono ${bracketColor}`}>[</span>
        {index && <span className={`font-mono font-bold tracking-wider ${indexColor}`}>{index}</span>}
        {label && <span className={`font-sans ${labelColor}`}>{label}</span>}
        {kanji && <span className={`font-japanese text-[11px] ${kanjiColor}`}>{kanji}</span>}
        <span className={`font-mono ${bracketColor}`}>]</span>
      </div>
    );
  }

  if (variant === 'minimal') {
    return (
      <div
        className={`inline-flex items-center gap-2 text-[11px] select-none ${className}`}
        aria-hidden="true"
      >
        {index && <span className={`font-mono font-bold tracking-wider ${indexColor}`}>{index}</span>}
        {index && label && <span className={`w-1 h-1 rounded-full ${dotColor}`} />}
        {label && <span className={`font-sans ${labelColor}`}>{label}</span>}
        {kanji && <span className={`font-japanese text-[11px] font-normal ${kanjiColor}`}>{kanji}</span>}
        {meta && <span className={`font-mono text-[9px] ${metaColor}`}>({meta})</span>}
      </div>
    );
  }

  // Default: 'line' with delicate 1px rule line
  return (
    <div className={`flex flex-col gap-1 select-none ${alignmentClass} ${className}`} aria-hidden="true">
      <div className="flex items-center gap-3 w-full">
        {index && (
          <span className={`font-mono text-[11px] font-bold tracking-wider shrink-0 ${indexColor}`}>
            {index}
          </span>
        )}
        <div
          className={`h-px flex-1 ${isLight ? 'bg-black/15' : 'bg-white/15'}`}
          style={{ opacity: lineOpacity }}
        />
        {label && (
          <span className={`font-sans text-[11px] shrink-0 ${labelColor}`}>
            {label}
          </span>
        )}
        {kanji && (
          <span className={`font-japanese text-xs shrink-0 ${kanjiColor}`}>
            {kanji}
          </span>
        )}
      </div>
      {meta && (
        <span className={`font-mono text-[9px] tracking-wider ${metaColor}`}>
          {meta}
        </span>
      )}
    </div>
  );
});

TeaLabAnnotation.displayName = 'TeaLabAnnotation';
