export type Side = "buy" | "sell";

export interface Player {
  id: string;
  name: string;
  avatarColor: string;
  startingBalance: number;
  currentValue: number;
  pnl: number;
  pnlPercent: number;
  trades: number;
  pnlHistory: number[];
  rank: number;
}

export interface Position {
  id: string;
  symbol: string;
  side: Side;
  amount: number;
  quantity: number;
  entryPrice: number;
  currentPrice: number;
  openedAt: number;
}

export interface TournamentState {
  players: Player[];
  currentUserId: string;
  positions: Position[];
  executeTrade: (side: Side, amount: number, price: number, symbol: string) => void;
  updatePositionPrices: (symbol: string, price: number) => void;
  closePosition: (id: string) => void;
  updateLeaderboardStream: () => void;
}

export interface Candle {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface MarketDataState {
  candles: Candle[];
  currentPrice: number | null;
  priceChange24h: number | null;
  volume24h: number | null;
  high24h: number | null;
  low24h: number | null;
  isLoading: boolean;
}

export interface TickerItem {
  symbol: string;
  price: number;
  changePercent: number;
  direction: "up" | "down" | "flat";
}

