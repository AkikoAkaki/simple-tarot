import { motion } from 'framer-motion';
import { TarotCardData } from '../types';

export interface MeaningPanelProps {
  card: TarotCardData | null;
}

export default function MeaningPanel({ card }: MeaningPanelProps) {
  if (!card) {
    return (
      <div className="flex-1 flex items-center justify-center text-level-muted font-light-title">
        请抽牌或选择卡片以查看释义
      </div>
    );
  }

  const { isReversed } = card;

  return (
    <div className="relative flex-1 p-8 md:p-12 overflow-hidden flex flex-col justify-center min-h-[400px]">
      {/* Background Watermark */}
      <div 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[12rem] md:text-[20rem] font-light-title pointer-events-none select-none"
        style={{ 
          color: 'var(--text-muted)', 
          opacity: 0.1 
        }}
      >
        {card.roman || card.number}
      </div>

      <motion.div 
        key={card.id + (isReversed ? '-rev' : '-up')} // 触发进场动画
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-2xl mx-auto w-full"
      >
        <div className="flex items-center gap-4 mb-4">
          <span className="label-small text-level-muted">{card.arcana}</span>
          {card.element && (
            <span className="label-small text-level-muted">{card.element}</span>
          )}
          <span className="label-small text-[var(--accent)]">{isReversed ? '逆位' : '正位'}</span>
        </div>

        <h2 className="text-4xl md:text-5xl font-light-title text-level-primary mb-6">
          {card.name}
        </h2>

        <div className="flex flex-wrap gap-2 mb-8">
          {card.keywords && card.keywords.map((kw, i) => (
            <span key={i} className="px-3 py-1 border border-[var(--border)] rounded-full text-level-secondary text-sm">
              {kw}
            </span>
          ))}
        </div>

        <div className="space-y-4">
          <p className="text-lg text-level-primary leading-relaxed font-normal-body">
            {isReversed ? card.reversed : card.upright}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
