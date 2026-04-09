import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Card({ card, isReversed = false, isFlipped: initialFlipped = false, onClick }) {
  const [isFlipped, setIsFlipped] = useState(initialFlipped);

  const handleClick = () => {
    if (!isFlipped) {
      setIsFlipped(true);
    }
    if (onClick) onClick(card);
  };

  const transitionConfig = {
    duration: 0.4,
    ease: [0.16, 1, 0.3, 1] // Expo Out
  };

  return (
    <div 
      className="card-container relative cursor-pointer"
      style={{ 
        aspectRatio: '1 / 1.727', 
        width: 'clamp(90px, 12vw, 140px)', // Responsive width 
        perspective: '1200px' 
      }}
      onClick={handleClick}
    >
      <motion.div
        className="w-full h-full relative tarot-border rounded shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
        style={{ transformStyle: 'preserve-3d' }}
        whileHover={{ y: -6 }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={transitionConfig}
      >
        {/* Card Back */}
        <div 
          className="absolute inset-0 w-full h-full rounded"
          style={{ 
            backfaceVisibility: 'hidden',
            backgroundColor: 'var(--bg-elevated)',
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, var(--border) 10px, var(--border) 20px)'
          }}
        >
          {/* Decorative center logo for back */}
          <div className="absolute inset-0 m-auto w-10 h-10 border border-[var(--border)] rotate-45"></div>
        </div>

        {/* Card Front */}
        <div 
          className="absolute inset-0 w-full h-full rounded bg-[var(--bg-surface)] flex flex-col items-center justify-center p-2 text-center"
          style={{ 
            backfaceVisibility: 'hidden',
            transform: `rotateY(180deg) ${isFlipped && isReversed ? 'rotateZ(180deg)' : ''}`
          }}
        >
          {/* Purple tint for reversed cards */}
          {isFlipped && isReversed && (
            <div className="absolute inset-0 z-10 pointer-events-none rounded" style={{ backgroundColor: 'rgba(160,130,200,0.06)' }}></div>
          )}

          <div className="text-level-muted label-small mb-2">
            {card.roman}
          </div>
          <div className="text-level-primary font-light-title text-base mb-1">
            {card.name}
          </div>
          {card.element && (
            <div className="text-level-secondary label-small mt-2">
              {card.element}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
