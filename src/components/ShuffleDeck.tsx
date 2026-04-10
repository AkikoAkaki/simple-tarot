import { motion } from 'framer-motion';

export interface ShuffleDeckProps {
  onShuffle: () => void;
  onDraw: () => void;
  remainingCount: number;
}

export default function ShuffleDeck({ onShuffle, onDraw, remainingCount }: ShuffleDeckProps) {
  return (
    <div className="flex flex-col items-center gap-8">
      <div 
        className="relative cursor-pointer group"
        onClick={onDraw}
      >
        <motion.div 
          className="relative tarot-border rounded shadow-[0_8px_30px_rgba(0,0,0,0.6)] flex items-center justify-center"
          style={{ 
            aspectRatio: '1 / 1.727', 
            width: 'clamp(90px, 12vw, 140px)',
            backgroundColor: 'var(--bg-elevated)',
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, var(--border) 10px, var(--border) 20px)'
          }}
          whileHover={{ y: -6 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="absolute inset-0 m-auto w-10 h-10 border border-[var(--border)] rotate-45 transform transition-transform group-hover:scale-110 duration-500"></div>
          {/* Faux stack effect */}
          {remainingCount > 1 && (
            <div className="absolute -bottom-1 -right-1 w-full h-full border border-[var(--border)] rounded" style={{ zIndex: -1 }}></div>
          )}
          {remainingCount > 2 && (
            <div className="absolute -bottom-2 -right-2 w-full h-full border border-[var(--border)] rounded" style={{ zIndex: -2 }}></div>
          )}
        </motion.div>
        
        <div className="absolute -bottom-8 left-0 right-0 text-center text-level-secondary label-small">
          剩余 {remainingCount} 张
        </div>
      </div>

      <div className="flex flex-col gap-3 mt-4">
        <button 
          onClick={onDraw}
          disabled={remainingCount === 0}
          className="px-6 py-2 border border-[var(--border)] text-level-primary text-sm hover:border-[var(--border-hover)] hover:bg-[rgba(255,255,255,0.02)] transition-colors duration-300 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          抽牌
        </button>
        <button 
          onClick={onShuffle}
          className="px-6 py-2 text-level-secondary text-sm hover:text-level-primary transition-colors duration-300 rounded"
        >
          重新洗牌
        </button>
      </div>
    </div>
  );
}
