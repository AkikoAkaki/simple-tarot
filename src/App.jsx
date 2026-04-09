import { useEffect, useState } from 'react';
import { useDeck } from './hooks/useDeck';
import ShuffleDeck from './components/ShuffleDeck';
import CardSpread from './components/CardSpread';
import MeaningPanel from './components/MeaningPanel';
import { spreads } from './data/spreads';

function App() {
  const { deck, drawn, spread, shuffleDeck, drawCard, changeSpread } = useDeck();
  const [selectedCard, setSelectedCard] = useState(null);

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

  const handleChangeSpread = (key) => {
    changeSpread(key);
    setSelectedCard(null);
  };

  return (
    <div className="min-h-screen flex flex-col p-4 md:p-8 relative">
      <header className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 z-10 border-b border-[var(--border)] pb-4">
        <h1 className="text-2xl font-light-title text-level-primary tracking-widest uppercase">
          TAROT
        </h1>
        
        <div className="flex items-center gap-4">
          <span className="label-small text-level-muted">选择牌阵</span>
          <div className="flex gap-2">
            {Object.entries(spreads).map(([key, config]) => (
              <button
                key={key}
                onClick={() => handleChangeSpread(key)}
                className={`px-3 py-1 text-sm rounded transition-colors duration-300 ${
                  spread.name === config.name 
                    ? 'bg-[var(--bg-elevated)] text-[var(--accent)] border border-[var(--border-hover)]' 
                    : 'text-level-secondary border border-transparent hover:text-level-primary'
                }`}
              >
                {config.name}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col lg:flex-row gap-8 z-10 w-full max-w-[1600px] mx-auto">
        {/* Left Column: Deck and Spread */}
        <div className="flex-1 flex flex-col xl:flex-row gap-12 lg:border-r border-[var(--border)] pr-0 lg:pr-8">
          <div className="flex justify-center shrink-0">
             <ShuffleDeck 
               onShuffle={() => { shuffleDeck(); setSelectedCard(null); }} 
               onDraw={handleDrawCard} 
               remainingCount={deck.length} 
             />
          </div>
          
          <div className="flex-1 xl:border-l xl:border-t-0 border-t border-[var(--border)] xl:pl-8 pt-8 xl:pt-0 flex overflow-y-auto w-full">
             <CardSpread 
               drawn={drawn} 
               onSelectCard={setSelectedCard} 
               spreadConfig={spread} 
             />
          </div>
        </div>

        {/* Right Column: Meaning Panel */}
        <div className="w-full lg:w-[45%] xl:w-[40%] flex flex-col border-t lg:border-t-0 border-[var(--border)] pt-8 lg:pt-0 min-h-[500px]">
          <MeaningPanel card={selectedCard || (drawn.length > 0 ? drawn[drawn.length - 1] : null)} />
        </div>
      </main>
    </div>
  );
}

export default App;
