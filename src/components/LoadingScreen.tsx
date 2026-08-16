import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

const words = ['Design', 'Create', 'Inspire'];

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [count, setCount] = useState<number>(0);
  const [wordIndex, setWordIndex] = useState<number>(0);

  // Counter using requestAnimationFrame over 2700ms
  useEffect(() => {
    let animationFrameId: number;
    let startTime: number | null = null;
    const duration = 2700; // ms

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Eased progress for a smooth accelerating feel
      const easedProgress = Math.floor(progress * 100);
      setCount(easedProgress);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setCount(100);
        const timer = setTimeout(() => {
          onComplete();
        }, 400);
        return () => clearTimeout(timer);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [onComplete]);

  // Cycling words every 900ms
  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 900);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }}
      className="fixed inset-0 z-[9999] bg-bg flex flex-col justify-between p-6 sm:p-10 md:p-14 select-none overflow-hidden"
    >
      {/* Top row */}
      <div className="flex items-center justify-between w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-xs text-muted uppercase tracking-[0.3em] font-medium"
        >
          Portfolio
        </motion.div>
        
        <div className="text-xs text-muted/60 uppercase tracking-widest hidden sm:block">
          Michael Smith © 2026
        </div>
      </div>

      {/* Center rotating words */}
      <div className="relative flex items-center justify-center h-32 my-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={wordIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.45, ease: 'easeInOut' }}
            className="text-4xl md:text-6xl lg:text-7xl font-display italic text-text-primary/80 text-center tracking-wide"
          >
            {words[wordIndex]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom area with counter & progress bar */}
      <div className="w-full flex flex-col items-end gap-4">
        <div className="text-6xl md:text-8xl lg:text-9xl font-display text-text-primary tabular-nums tracking-tight">
          {String(count).padStart(3, '0')}
        </div>

        {/* Bottom progress bar */}
        <div className="w-full h-[3px] bg-stroke/50 rounded-full overflow-hidden">
          <div
            className="h-full accent-gradient origin-left transition-transform duration-75 ease-out"
            style={{
              transform: `scaleX(${count / 100})`,
              boxShadow: '0 0 8px rgba(137, 170, 204, 0.35)',
            }}
          />
        </div>
      </div>
    </motion.div>
  );
};
