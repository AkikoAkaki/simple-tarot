import { motion, AnimatePresence } from 'framer-motion';
import { TarotCardData } from '../types';

export interface MeaningPanelProps {
  card: TarotCardData | null;
  onClose?: () => void;
}

export default function MeaningPanel({ card, onClose }: MeaningPanelProps) {
  if (!card) {
    return (
      <div className="h-full flex items-center justify-center text-level-secondary font-light-title p-10 text-center text-lg lg:text-xl tracking-wide leading-relaxed">
        当命运的轮盘转动<br/>在此处解读它的指引
      </div>
    );
  }

  const { isReversed } = card;

  return (
    <div className="relative p-6 pt-10 md:p-12 lg:px-14 min-h-full">
      {/* Mobile Close Button */}
      {onClose && (
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 lg:hidden w-8 h-8 flex items-center justify-center rounded-full bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-white transition-colors z-50 border border-[var(--border)]"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 1L1 13M1 1L13 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}
      {/* Background Watermark */}
      <div 
        className="absolute top-10 right-10 text-[10rem] font-light-title pointer-events-none select-none overflow-hidden"
        style={{ 
          color: 'var(--text-muted)', 
          opacity: 0.05,
          lineHeight: 0.8
        }}
      >
        {card.roman || card.number}
      </div>

      <AnimatePresence mode="wait">
        <motion.div 
          key={card.id + (isReversed ? '-rev' : '-up')} 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full pb-[max(5rem,env(safe-area-inset-bottom))]"
        >
          {/* Header section */}
          <div className="mb-10">
            <div className="flex items-center gap-4 mb-4">
              <span className="label-small text-level-muted">{card.arcana}</span>
              {card.element && (
                <span className="label-small text-[var(--accent)]">{card.element}</span>
              )}
              <span className={`label-small ${isReversed ? 'text-purple-400/70' : 'text-level-secondary'}`}>
                {isReversed ? '逆位' : '正位'}
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-5xl font-light-title text-level-primary tracking-wide">
              {card.name}
            </h2>
          </div>

          {/* Keywords */}
          {card.keywords && card.keywords.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8 border-b border-[var(--border)] pb-8">
              {card.keywords.map((kw, i) => (
                <span key={i} className="px-4 py-1.5 bg-[var(--bg-elevated)] border border-[var(--border)] rounded-full text-level-secondary text-sm">
                  {kw}
                </span>
              ))}
            </div>
          )}

          {/* Story / Description */}
          {card.description && (
            <div className="mb-10 text-level-secondary text-base leading-relaxed italic border-l-2 border-[var(--border-hover)] pl-6">
              {card.description}
            </div>
          )}

          {/* Main Meaning */}
          <div className="space-y-6 mb-14">
            <h3 className="text-sm label-small text-level-muted border-b border-[var(--border)] pb-2 inline-block">核心释义</h3>
            <p className="text-[1.1rem] md:text-[1.05rem] text-level-primary leading-loose md:leading-[2.2] font-normal-body whitespace-pre-wrap tracking-wide">
              {isReversed ? card.reversed : card.upright}
            </p>
          </div>

          {/* Advice */}
          {card.advice && (
            <div className="mb-10 bg-[var(--bg-elevated)]/50 p-6 rounded border border-[var(--border)]">
              <h3 className="text-xs label-small text-[var(--accent)] mb-3">神谕指引</h3>
              <p className="text-[0.95rem] text-level-primary leading-relaxed font-normal-body">
                {card.advice}
              </p>
            </div>
          )}

          {/* Questions */}
          {card.questions && card.questions.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xs label-small text-level-muted mb-4">灵魂拷问</h3>
              <ul className="space-y-4">
                {card.questions.map((q, i) => (
                  <li key={i} className="flex gap-3 text-level-secondary text-[0.95rem]">
                    <span className="text-[var(--accent)] opacity-50">✦</span>
                    <span className="leading-relaxed">{q}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
