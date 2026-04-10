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

  // Initialize deck on mount
  useEffect(() => {
    shuffleDeck();
  }, [shuffleDeck]);

  const handleDrawCard = () => {
    const card = drawCard();
    if (card) {
      setSelectedCard(card);
    }
  };

  const handleChangeSpread = (key: string) => {
    changeSpread(key);
    setSelectedCard(null);
  };

  return (
    <div className="h-screen w-full flex flex-col lg:flex-row overflow-hidden relative">
      {/* Floating Header */}
      <header className="absolute top-0 left-0 w-full lg:w-[65%] p-6 md:px-10 z-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pointer-events-none">
        <h1 className="text-2xl font-light-title text-level-primary tracking-widest uppercase pointer-events-auto">
          TAROT
        </h1>
        
        <div className="flex items-center gap-4 pointer-events-auto bg-[var(--bg-surface)]/80 px-4 py-2 rounded-full border border-[var(--border)]" style={{ backdropFilter: 'blur(8px)' }}>
          <span className="label-small text-level-muted hidden md:inline">牌阵</span>
          <div className="flex gap-1">
            {Object.entries(spreads).map(([key, config]) => (
              <button
                key={key}
                onClick={() => handleChangeSpread(key)}
                className={`px-3 py-1 text-sm rounded-full transition-colors duration-300 ${
                  spread.name === config.name 
                    ? 'bg-[var(--bg-elevated)] text-[var(--accent)] border-none' 
                    : 'text-level-secondary hover:text-level-primary'
                }`}
              >
                {config.name}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Left Column: Board */}
      <main className="flex-1 w-full lg:w-[65%] relative flex items-center justify-center bg-transparent pt-24 pb-8 px-4 h-[60vh] lg:h-full shrink-0">
         <CardSpread 
           drawn={drawn} 
           onSelectCard={setSelectedCard} 
           spreadConfig={spread} 
         />
         
         {/* Floating Shuffle Deck */}
         <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 z-40 transform scale-75 origin-bottom-left md:scale-100">
           <ShuffleDeck 
             onShuffle={() => { shuffleDeck(); setSelectedCard(null); }} 
             onDraw={handleDrawCard} 
             remainingCount={deck.length} 
           />
         </div>
      </main>

      {/* Right Column: Editorial Meaning Panel */}
      <aside className="w-full lg:w-[35%] lg:max-w-[600px] shrink-0 h-[40vh] lg:h-full border-t lg:border-t-0 lg:border-l border-[var(--border)] bg-[var(--bg-surface)] overflow-y-auto custom-scrollbar relative z-20 shadow-[-10px_0_30px_rgba(0,0,0,0.3)]">
        <MeaningPanel card={selectedCard || (drawn.length > 0 ? drawn[drawn.length - 1] : null)} />
      </aside>
    </div>
  );
}

export default App;
