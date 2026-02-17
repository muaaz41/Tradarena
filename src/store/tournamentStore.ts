import { create } from "zustand";
import type { Player, Position, TournamentState } from "@/types";
import { INITIAL_PLAYERS } from "@/lib/constants";

const computePnlPercent = (starting: number, current: number) =>
  ((current - starting) / starting) * 100;

const sortAndRank = (players: Player[]): Player[] => {
  const sorted = [...players].sort((a, b) => b.pnlPercent - a.pnlPercent);
  return sorted.map((p, index) => ({ ...p, rank: index + 1 }));
};

export const useTournamentStore = create<TournamentState>((set) => ({
  players: sortAndRank(INITIAL_PLAYERS),
  currentUserId: INITIAL_PLAYERS[0]?.id ?? "you",
  positions: [],

  executeTrade: (side, amount, price, symbol) =>
    set((state) => {
      const qty = amount / price;
      const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;

      const position: Position = {
        id,
        symbol,
        side,
        amount,
        quantity: qty,
        entryPrice: price,
        currentPrice: price,
        openedAt: Date.now(),
      };

      return {
        positions: [position, ...state.positions],
      };
    }),

  updatePositionPrices: (symbol, price) =>
    set((state) => ({
      positions: state.positions.map((p) =>
        p.symbol === symbol ? { ...p, currentPrice: price } : p
      ),
    })),

  closePosition: (id) =>
    set((state) => ({
      positions: state.positions.filter((p) => p.id !== id),
    })),

  updateLeaderboardStream: () =>
    set((state) => {
      const jitterPlayers = state.players.map((p) => {
        const deltaPercent =
          (Math.random() * 0.7 + 0.1) * (Math.random() > 0.5 ? 1 : -1);
        const newCurrent = p.currentValue * (1 + deltaPercent / 100);
        const pnlPercent = computePnlPercent(p.startingBalance, newCurrent);
        const nextHistory = [...p.pnlHistory.slice(-6), pnlPercent];

        return {
          ...p,
          currentValue: newCurrent,
          pnlPercent,
          pnl: newCurrent - p.startingBalance,
          pnlHistory: nextHistory,
          trades: p.trades + (Math.random() > 0.8 ? 1 : 0),
        };
      });

      return {
        players: sortAndRank(jitterPlayers),
      };
    }),
}));

