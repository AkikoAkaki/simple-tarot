import Card from './Card';
import { motion } from 'framer-motion';
import { TarotCardData, SpreadConfig } from '../types';

const CELTIC_CROSS_TRANSFORMS = [
  { x: '-80%', y: '0%', r: 0, z: 10 },        // 1. Core
  { x: '-80%', y: '0%', r: -90, z: 11 },      // 2. Obstacle (Crosses 1)
  { x: '-80%', y: '135%', r: 0, z: 10 },      // 3. Subconscious
  { x: '-220%', y: '0%', r: 0, z: 10 },       // 4. Past
  { x: '-80%', y: '-135%', r: 0, z: 10 },     // 5. Conscious
  { x: '60%', y: '0%', r: 0, z: 10 },         // 6. Future
  { x: '220%', y: '195%', r: 0, z: 10 },      // 7. Self
  { x: '220%', y: '65%', r: 0, z: 10 },       // 8. Environment
  { x: '220%', y: '-65%', r: 0, z: 10 },      // 9. Hopes/Fears
  { x: '220%', y: '-195%', r: 0, z: 10 }      // 10. Outcome
] as const;

export interface CardSpreadProps {
  drawn: TarotCardData[];
  onSelectCard: (card: TarotCardData) => void;
  spreadConfig: SpreadConfig;
}

export default function CardSpread({ drawn, onSelectCard, spreadConfig }: CardSpreadProps) {
  
  const renderSingleOrThree = () => {
    const totalSlots = spreadConfig.count;
    
    return (
      <div className={`flex items-center justify-center w-full h-full ${totalSlots === 3 ? 'gap-6 md:gap-12 lg:gap-16' : ''}`}>
        {Array.from({ length: totalSlots }).map((_, i) => {
          const card = drawn[i];
          const isSingle = totalSlots === 1;

          if (card) {
            return (
              <motion.div 
                key={`${card.id}-${i}`}
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                animate={{ opacity: 1, scale: isSingle ? 1.3 : 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
                className={`flex flex-col items-center gap-4 ${isSingle ? 'z-10' : ''}`}
                style={{ transformOrigin: 'center' }}
              >
                <div className="label-small text-[var(--text-secondary)] text-center font-medium tracking-wide">
                  {card.positionName || spreadConfig.positions[i]}
                </div>
                <div style={{ width: 'clamp(110px, 14vw, 180px)' }}>
                  <Card 
                    card={card} 
                    isReversed={card.isReversed} 
                    isFlipped={true}
                    onClick={onSelectCard} 
                  />
                </div>
              </motion.div>
            );
          } else {
            return (
              <div key={`empty-${i}`} className={`flex flex-col items-center gap-4 opacity-30 mt-6 ${isSingle ? 'scale-125 transform-origin-center' : ''}`}>
                <div className="label-small text-[var(--text-secondary)] opacity-80 tracking-wide text-center">
                  {spreadConfig.positions[i]}
                </div>
                <div 
                  className="border border-dashed border-[var(--border)] rounded flex items-center justify-center transition-all duration-500"
                  style={{ 
                    aspectRatio: '1 / 1.727', 
                    width: 'clamp(110px, 14vw, 180px)',
                  }}
                >
                  <div className="text-[var(--text-muted)] opacity-60 text-lg font-medium">{i + 1}</div>
                </div>
              </div>
            );
          }
        })}
      </div>
    );
  };

  const renderCelticCross = () => {
    return (
      <div className="relative w-full h-full min-h-[400px] sm:min-h-[500px] lg:min-h-[600px]">
        {Array.from({ length: 10 }).map((_, i) => {
          const card = drawn[i];
          const t = CELTIC_CROSS_TRANSFORMS[i];

          const slotContent = card ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-full"
            >
               <Card 
                  card={card} 
                  isReversed={card.isReversed} 
                  isFlipped={true}
                  onClick={onSelectCard} 
               />
            </motion.div>
          ) : (
            <div 
               className="w-full h-full border border-dashed border-[var(--border)] rounded flex items-center justify-center opacity-20"
            >
               <div className="text-[var(--text-muted)] opacity-60 text-base font-medium">{i + 1}</div>
            </div>
          );

          return (
            <div
              key={`celtic-${i}`}
              className="absolute left-1/2 top-1/2 flex flex-col items-center select-none"
              style={{
                transform: `translate(calc(-50% + ${t.x}), calc(-50% + ${t.y})) rotate(${t.r}deg)`,
                zIndex: t.z,
                width: 'clamp(50px, 10.5vw, 120px)',
                aspectRatio: '1 / 1.727'
              }}
            >
              {t.r === 0 && (
                 <div className="absolute -top-5 md:-top-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-[8px] sm:text-[10px] text-[var(--text-secondary)] opacity-70 uppercase tracking-[0.15em] font-medium text-center min-w-max px-1">
                   {spreadConfig.positions[i] || `Position ${i+1}`}
                 </div>
              )}
              {t.r === -90 && (
                 <div className="absolute -left-10 rotate-90 whitespace-nowrap text-[8px] sm:text-[10px] text-[var(--text-secondary)] opacity-70 uppercase tracking-[0.15em] font-medium top-1/2 -translate-y-1/2 -translate-x-1/2 min-w-max">
                   {spreadConfig.positions[i]}
                 </div>
              )}
              {slotContent}
            </div>
          );
        })}
      </div>
    );
  };

  if (spreadConfig.count === 10) {
    return renderCelticCross();
  }

  return renderSingleOrThree();
}
