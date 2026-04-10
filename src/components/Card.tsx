import { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { TarotCardData } from '../types';

export interface CardProps {
  card: TarotCardData;
  isReversed?: boolean;
  isFlipped?: boolean;
  onClick?: (card: TarotCardData) => void;
}

export default function Card({ card, isReversed = false, isFlipped: initialFlipped = false, onClick }: CardProps) {
  const [isFlipped, setIsFlipped] = useState(initialFlipped);
  const cardRef = useRef<HTMLDivElement>(null);

  // Holographic glare engine
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 40 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 40 });

  const backgroundRadial = useTransform(
    [mouseXSpring, mouseYSpring],
    ([currX, currY]) => `radial-gradient(circle at ${Number(currX) * 100}% ${Number(currY) * 100}%, rgba(255, 255, 255, 0.15) 0%, transparent 70%)`
  );

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    x.set(px);
    y.set(py);
  };

  const handlePointerLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  const handleClick = () => {
    if (!isFlipped) {
      setIsFlipped(true);
    }
    if (onClick) onClick(card);
  };

  const transitionConfig = {
    duration: 0.4,
    ease: [0.16, 1, 0.3, 1] as const // Expo Out
  };

  return (
    <div 
      className="card-container relative cursor-pointer"
      style={{ 
        width: '100%',
        height: '100%',
        perspective: '1200px' 
      }}
      onClick={handleClick}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      ref={cardRef}
    >
      <motion.div
        className="w-full h-full relative tarot-border rounded shadow-[0_8px_20px_rgba(0,0,0,0.6)]"
        style={{ transformStyle: 'preserve-3d' }}
        whileHover={{ scale: 1.05, y: -8 }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={transitionConfig}
      >
        {/* Card Back */}
        <div 
          className="absolute inset-0 w-full h-full rounded overflow-hidden"
          style={{ 
            backfaceVisibility: 'hidden',
            backgroundColor: 'var(--bg-elevated)',
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, var(--border) 10px, var(--border) 20px)'
          }}
        >
          {/* Decorative center logo for back */}
          <div className="absolute inset-0 m-auto w-10 h-10 border border-[var(--border)] rotate-45"></div>
          
          {/* Glare Layer */}
          <motion.div 
            className="absolute inset-0 pointer-events-none"
            style={{ background: backgroundRadial }}
          />
        </div>

        {/* Card Front */}
        <div 
          className="absolute inset-0 w-full h-full rounded bg-[var(--bg-surface)] flex flex-col items-center justify-center p-2 text-center overflow-hidden"
          style={{ 
            backfaceVisibility: 'hidden',
            transform: `rotateY(180deg) ${isFlipped && isReversed ? 'rotateZ(180deg)' : ''}`
          }}
        >
          {/* Purple tint for reversed cards */}
          {isFlipped && isReversed && (
            <div className="absolute inset-0 z-10 pointer-events-none" style={{ backgroundColor: 'rgba(160,130,200,0.06)' }}></div>
          )}

          {/* Glare Layer */}
          <motion.div 
            className="absolute inset-0 pointer-events-none z-20 mix-blend-screen"
            style={{ background: backgroundRadial }}
          />

          <div className="text-level-muted label-small mb-2 z-10">
            {card.roman}
          </div>
          <div className="text-level-primary font-light-title text-lg md:text-xl xl:text-3xl mb-1 z-10 whitespace-nowrap">
            {card.name}
          </div>
          {card.element && (
            <div className="text-level-secondary label-small mt-2 z-10 uppercase tracking-widest text-[9px]">
              {card.element}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
