import Card from './Card';
import { motion } from 'framer-motion';
import { TarotCardData, SpreadConfig } from '../types';

export interface CardSpreadProps {
  drawn: TarotCardData[];
  onSelectCard: (card: TarotCardData) => void;
  spreadConfig: SpreadConfig;
}

export default function CardSpread({ drawn, onSelectCard, spreadConfig }: CardSpreadProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 w-full p-4">
      {drawn.map((card, index) => (
        <motion.div 
          key={`${card.id}-${index}`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="label-small text-level-secondary">
            {card.positionName || `位置 ${index + 1}`}
          </div>
          <Card 
            card={card} 
            isReversed={card.isReversed} 
            isFlipped={true} // Drawn cards in the spread are flipped
            onClick={onSelectCard} 
          />
        </motion.div>
      ))}
      
      {/* Empty skeleton slots for remaining cards in the spread */}
      {Array.from({ length: Math.max(0, spreadConfig.count - drawn.length) }).map((_, i) => (
        <div key={`empty-${i}`} className="flex flex-col items-center gap-4 opacity-30">
          <div className="label-small text-level-muted">
            {spreadConfig.positions[drawn.length + i] || `位置 ${drawn.length + i + 1}`}
          </div>
          <div 
            className="border border-dashed border-[var(--border)] rounded"
            style={{ 
              aspectRatio: '1 / 1.727', 
              width: 'clamp(90px, 12vw, 140px)'
            }}
          ></div>
        </div>
      ))}
    </div>
  );
}
