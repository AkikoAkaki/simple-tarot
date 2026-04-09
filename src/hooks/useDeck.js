import { useState, useCallback } from 'react';
import allCards from '../data/cards.json';
import { spreads } from '../data/spreads';

export function useDeck() {
  const [deck, setDeck] = useState([]);
  const [drawn, setDrawn] = useState([]);
  const [spread, setSpread] = useState(spreads.single);

  // Fisher-Yates shuffle
  const shuffleDeck = useCallback(() => {
    let cloned = [...allCards];
    for (let i = cloned.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cloned[i], cloned[j]] = [cloned[j], cloned[i]];
    }
    setDeck(cloned);
    setDrawn([]);
  }, []);

  const drawCard = useCallback(() => {
    if (deck.length === 0) return null;
    if (drawn.length >= spread.count) return null;

    const remainingDeck = [...deck];
    const drawnCard = remainingDeck.pop();
    
    // Determine reversed (50% probability)
    const isReversed = Math.random() < 0.5;
    
    const cardWithState = {
      ...drawnCard,
      isReversed,
      positionName: spread.positions[drawn.length]
    };
    
    setDeck(remainingDeck);
    setDrawn(prev => [...prev, cardWithState]);

    return cardWithState;
  }, [deck, drawn, spread]);

  const changeSpread = useCallback((spreadKey) => {
    if (spreads[spreadKey]) {
      setSpread(spreads[spreadKey]);
      shuffleDeck(); // Reset when spread changes
    }
  }, [shuffleDeck]);

  return {
    deck,
    drawn,
    spread,
    shuffleDeck,
    drawCard,
    changeSpread
  };
}
