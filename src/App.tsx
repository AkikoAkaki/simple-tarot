import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Drawer } from 'vaul';
import { useDeck } from './hooks/useDeck';
import ShuffleDeck from './components/ShuffleDeck';
import CardSpread from './components/CardSpread';
import MeaningPanel from './components/MeaningPanel';
import { spreads } from './data/spreads';
import { TarotCardData } from './types';

function App() {
  const { deck, drawn, spread, shuffleDeck, drawCard, changeSpread } = useDeck();
  const [selectedCard, setSelectedCard] = useState<TarotCardData | null>(null);
  const [isMobilePanelOpen, setIsMobilePanelOpen] = useState(false);
  const [snap, setSnap] = useState<number | string | null>(0.55);

  useEffect(() => {
    shuffleDeck();
  }, [shuffleDeck]);

  const handleShuffle = () => {
    shuffleDeck();
    setSelectedCard(null);
    setIsMobilePanelOpen(false);
  };

  const handleDrawCard = () => {
    const card = drawCard();
    if (card) {
      setSelectedCard(card);
    }
  };

  const handleSelectCard = (card: TarotCardData) => {
    setSelectedCard(card);
    setSnap(0.55); // Snap to 55% first
    setIsMobilePanelOpen(true);
  };

  const spreadKeys = Object.keys(spreads);
  const currentSpreadIndex = spreadKeys.findIndex(k => spreads[k].name === spread.name);

  const handleNextSpread = () => {
    const nextIndex = (currentSpreadIndex + 1) % spreadKeys.length;
    const nextKey = spreadKeys[nextIndex];
    changeSpread(nextKey);
    setSelectedCard(null);
    setIsMobilePanelOpen(false);
  };

  const handlePrevSpread = () => {
    const prevIndex = (currentSpreadIndex - 1 + spreadKeys.length) % spreadKeys.length;
    const prevKey = spreadKeys[prevIndex];
    changeSpread(prevKey);
    setSelectedCard(null);
    setIsMobilePanelOpen(false);
  };

  const handleChangeSpread = (key: string) => {
    changeSpread(key);
    setSelectedCard(null);
    setIsMobilePanelOpen(false);
  };

  const displayCard = selectedCard ?? (drawn.length > 0 ? drawn[drawn.length - 1] : null);

  return (
    <div className="min-h-[100svh] lg:h-[100dvh] w-full flex flex-col lg:flex-row relative bg-[var(--bg-base)] selection:bg-[var(--accent)] selection:text-black lg:overflow-hidden">
      {/* Floating Header */}
      <header className="absolute top-0 left-0 w-full lg:w-[65%] pt-[max(1.5rem,env(safe-area-inset-top))] pb-4 px-6 md:px-10 z-50 flex flex-col sm:flex-row items-center sm:items-center justify-between gap-4 pointer-events-none">
        <h1 className="text-2xl md:text-3xl font-light-title font-medium text-[var(--text-primary)] tracking-[0.2em] uppercase pointer-events-auto">
          TAROT
        </h1>
        
        <div className="flex items-center justify-center gap-4 pointer-events-auto bg-[var(--bg-surface)]/90 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full border border-[var(--border)] overflow-x-auto w-auto max-w-full sm:w-auto custom-scrollbar" style={{ backdropFilter: 'blur(12px)' }}>
          <span className="label-small text-[var(--text-secondary)] hidden md:inline shrink-0">牌阵</span>
          <div className="flex justify-center gap-2 shrink-0">
            {Object.entries(spreads).map(([key, config]) => (
              <button
                key={key}
                onClick={() => handleChangeSpread(key)}
                className={`px-3 py-1 sm:px-4 sm:py-1.5 text-sm sm:text-base rounded-full transition-colors duration-300 ${
                  spread.name === config.name 
                    ? 'bg-[var(--bg-elevated)] text-[var(--accent)] border-none font-medium shadow-sm' 
                    : 'text-[var(--text-secondary)] hover:text-level-primary'
                }`}
              >
                {config.name}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Left Column: Board */}
      <main className="flex-1 w-full lg:w-[65%] relative flex items-center justify-center bg-transparent pt-[max(7rem,env(safe-area-inset-top))] pb-[max(8rem,env(safe-area-inset-bottom))] px-4 shrink-0">
         <CardSpread 
           drawn={drawn} 
           onSelectCard={handleSelectCard} 
           spreadConfig={spread} 
         />
         
         {/* Desktop Floating Shuffle Deck */}
         <div className="hidden lg:block absolute bottom-10 left-10 z-40">
           <ShuffleDeck
             onShuffle={handleShuffle}
             onDraw={handleDrawCard}
             remainingCount={deck.length}
           />
         </div>

         <motion.div 
           className="lg:hidden fixed bottom-[max(1.5rem,calc(env(safe-area-inset-bottom)+0.5rem))] left-1/2 -translate-x-1/2 z-40 w-max max-w-[90%] touch-none"
           initial={false}
           whileTap={{ scale: 0.96 }}
           drag="x"
           dragConstraints={{ left: 0, right: 0 }}
           dragElastic={0.1}
           onDragEnd={(_, info) => {
             const threshold = 50;
             if (info.offset.x < -threshold) handleNextSpread();
             if (info.offset.x > threshold) handlePrevSpread();
           }}
         >
           <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-full px-6 py-2.5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center gap-5">
             {/* Dynamic Shuffle */}
             <button
               onClick={handleShuffle}
               className="text-[11px] font-medium text-[var(--text-secondary)] hover:text-white transition-colors py-1 pointer-events-auto"
             >
               洗牌
             </button>

             {/* Minimal Divider */}
             <div className="w-[1px] h-4 bg-white/10" />

             {/* Primary Draw Action */}
             <button 
               onClick={handleDrawCard}
               disabled={deck.length === 0}
               className="flex flex-col items-center group pointer-events-auto active:opacity-60 transition-opacity px-2"
             >
               <span className="text-[13px] font-semibold text-[var(--accent)] tracking-wider">抽牌</span>
               <span className="text-[7px] text-[var(--text-muted)] tracking-[0.2em] font-bold -mt-0.5">DRAW</span>
             </button>

             {/* Minimal Divider */}
             <div className="w-[1px] h-4 bg-white/10" />

             {/* Deck Info & Indicator */}
             <div className="flex flex-col items-center gap-1">
                <span className="text-[10px] font-bold text-[var(--text-muted)] font-mono leading-none">{deck.length}</span>
                <div className="flex gap-1">
                    {spreadKeys.map((_, i) => (
                      <div 
                        key={i} 
                        className={`h-0.5 rounded-full transition-all duration-300 ${i === currentSpreadIndex ? 'w-2.5 bg-[var(--accent)]' : 'w-0.5 bg-white/10'}`} 
                      />
                    ))}
                </div>
             </div>
           </div>
         </motion.div>
      </main>

      {/* Right Column: Editorial Meaning Panel (Desktop) */}
      <aside className="hidden lg:block w-[35%] max-w-[600px] shrink-0 h-full border-l border-[var(--border)] bg-[var(--bg-surface)] overflow-y-auto custom-scrollbar relative z-20 shadow-[-10px_0_30px_rgba(0,0,0,0.3)]">
        <MeaningPanel card={displayCard} />
      </aside>

      {/* Mobile Drawer (Vaul) */}
      <Drawer.Root 
        open={isMobilePanelOpen} 
        onOpenChange={setIsMobilePanelOpen}
        snapPoints={[0.55, 1]}
        activeSnapPoint={snap}
        setActiveSnapPoint={setSnap}
        fadeFromIndex={0}
      >
        <Drawer.Portal>
          <Drawer.Overlay 
            className="fixed inset-0 z-[60] lg:hidden bg-black/40 backdrop-blur-[2px]" 
          />
          <Drawer.Content className="fixed border-t border-[var(--border)] bottom-0 left-0 right-0 h-[100dvh] bg-[var(--bg-surface)]/95 backdrop-blur-3xl z-[60] rounded-t-[32px] flex flex-col focus:outline-none lg:hidden shadow-[0_-10px_40px_rgba(0,0,0,0.5)] pb-[env(safe-area-inset-bottom)]">
            <Drawer.Handle className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-white/20 my-4" />
            <div className="flex-1 overflow-y-auto custom-scrollbar px-2">
              <MeaningPanel
                card={displayCard}
                onClose={() => setIsMobilePanelOpen(false)}
              />
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </div>
  );
}

export default App;
