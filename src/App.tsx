import { useEffect, useState } from 'react';
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

  // Initialize deck on mount
  useEffect(() => {
    shuffleDeck();
  }, [shuffleDeck]);

  const handleDrawCard = () => {
    const card = drawCard();
    if (card) {
      setSelectedCard(card);
      setIsMobilePanelOpen(true);
    }
  };

  const handleSelectCard = (card: TarotCardData) => {
    setSelectedCard(card);
    setIsMobilePanelOpen(true);
  };

  const handleChangeSpread = (key: string) => {
    changeSpread(key);
    setSelectedCard(null);
    setIsMobilePanelOpen(false);
  };

  return (
    <div className="min-h-[100dvh] h-[100dvh] w-full flex flex-col lg:flex-row overflow-hidden relative selection:bg-[var(--accent)] selection:text-black">
      {/* Floating Header */}
      <header className="absolute top-0 left-0 w-full lg:w-[65%] pt-[max(1.5rem,env(safe-area-inset-top))] pb-4 px-6 md:px-10 z-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pointer-events-none">
        <h1 className="text-2xl md:text-3xl font-light-title font-medium text-[var(--text-primary)] tracking-[0.2em] uppercase pointer-events-auto">
          TAROT
        </h1>
        
        <div className="flex items-center gap-4 pointer-events-auto bg-[var(--bg-surface)]/90 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full border border-[var(--border)] overflow-x-auto w-full sm:w-auto custom-scrollbar" style={{ backdropFilter: 'blur(12px)' }}>
          <span className="label-small text-[var(--text-secondary)] hidden md:inline shrink-0">牌阵</span>
          <div className="flex gap-2 shrink-0">
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
      <main className="flex-1 w-full lg:w-[65%] relative flex items-center justify-center bg-transparent pt-[max(7rem,env(safe-area-inset-top))] pb-[max(5rem,env(safe-area-inset-bottom))] px-4 h-full shrink-0">
         <CardSpread 
           drawn={drawn} 
           onSelectCard={handleSelectCard} 
           spreadConfig={spread} 
         />
         
         {/* Floating Shuffle Deck */}
         <div className="absolute bottom-[max(1.5rem,env(safe-area-inset-bottom))] left-4 md:bottom-10 md:left-10 z-40 transform scale-75 origin-bottom-left md:scale-100">
           <ShuffleDeck 
             onShuffle={() => { shuffleDeck(); setSelectedCard(null); setIsMobilePanelOpen(false); }} 
             onDraw={handleDrawCard} 
             remainingCount={deck.length} 
           />
         </div>
      </main>

      {/* Right Column: Editorial Meaning Panel */}
      {/* On mobile: fixed bottom sheet styling. On desktop: standard flex column */}
      <aside 
        className={`w-full lg:w-[35%] lg:max-w-[600px] shrink-0 lg:h-full border-t border-[var(--border)] lg:border-t-0 lg:border-l bg-[var(--bg-surface)]/95 lg:bg-[var(--bg-surface)] overflow-y-auto custom-scrollbar absolute lg:relative z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] lg:shadow-[-10px_0_30px_rgba(0,0,0,0.3)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
          ${isMobilePanelOpen ? 'bottom-0 h-[85dvh]' : '-bottom-full h-[85dvh] lg:bottom-auto lg:h-full'}
          rounded-t-[32px] lg:rounded-none backdrop-blur-xl lg:backdrop-blur-none
        `}
      >
        {/* Mobile handle indicator */}
        <div 
           className="w-full h-8 flex items-center justify-center lg:hidden sticky top-0 z-40 bg-[var(--bg-surface)]/40 backdrop-blur-sm cursor-pointer"
           onClick={() => setIsMobilePanelOpen(!isMobilePanelOpen)}
        >
          <div className="w-12 h-1.5 bg-white/20 rounded-full"></div>
        </div>

        <MeaningPanel 
          card={selectedCard || (drawn.length > 0 ? drawn[drawn.length - 1] : null)} 
          onClose={() => setIsMobilePanelOpen(false)}
        />
      </aside>

      {/* Overlay to dim background when mobile panel is open */}
      <div 
        className={`fixed inset-0 bg-black/60 z-40 lg:hidden transition-opacity duration-500 pointer-events-auto ${isMobilePanelOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsMobilePanelOpen(false)}
      ></div>
    </div>
  );
}

export default App;
