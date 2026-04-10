export interface TarotCardData {
  id: string;
  name: string;
  arcana: string;
  number: number;
  roman: string;
  suit: string | null;
  element: string;
  keywords: string[];
  upright: string;
  reversed: string;
  isReversed?: boolean;
  positionName?: string;
}

export interface SpreadConfig {
  name: string;
  count: number;
  positions: string[];
}
