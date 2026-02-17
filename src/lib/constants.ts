import type { Player } from "@/types";

export const SYMBOLS = ["BTCUSDT", "ETHUSDT", "BNBUSDT", "SOLUSDT"] as const;

export const INITIAL_PLAYERS: Player[] = [
  "AuroraQuant",
  "DeltaDrift",
  "GammaGrid",
  "SigmaScalper",
  "VegaVolt",
  "MomentumMara",
  "AlphaApex",
  "BetaBlade",
  "LambdaLux",
  "PhiPhantom",
  "OmegaFlow",
  "NovaNode",
].map((name, index) => {
  const startingBalance = 10000;
  const baseJitter = (Math.random() - 0.5) * 200;
  const currentValue = startingBalance + baseJitter;
  return {
    id: `player-${index + 1}`,
    name,
    avatarColor: `hsl(${index * 30}, 80%, 55%)`,
    startingBalance,
    currentValue,
    pnl: currentValue - startingBalance,
    pnlPercent: ((currentValue - startingBalance) / startingBalance) * 100,
    trades: Math.floor(Math.random() * 24) + 3,
    pnlHistory: Array.from({ length: 7 }, () => (Math.random() - 0.5) * 8),
    rank: index + 1,
  } satisfies Player;
});

export const TOURNAMENTS = [
  {
    id: "btc-usdt-sprint",
    name: "BTC/USDT Sprint Arena",
    pair: "BTC/USDT",
    status: "LIVE" as const,
    prizePool: 15000,
    entryFee: 50,
    participants: 48,
    maxParticipants: 64,
    endsAt: Date.now() + 1000 * 60 * 42,
  },
  {
    id: "eth-arena",
    name: "ETH Volatility Arena",
    pair: "ETH/USDT",
    status: "LIVE" as const,
    prizePool: 10000,
    entryFee: 25,
    participants: 32,
    maxParticipants: 48,
    endsAt: Date.now() + 1000 * 60 * 18,
  },
  {
    id: "bnb-surge",
    name: "BNB Breakout Surge",
    pair: "BNB/USDT",
    status: "UPCOMING" as const,
    prizePool: 8000,
    entryFee: 15,
    participants: 12,
    maxParticipants: 40,
    endsAt: Date.now() + 1000 * 60 * 90,
  },
  {
    id: "sol-open",
    name: "SOL Open Arena",
    pair: "SOL/USDT",
    status: "UPCOMING" as const,
    prizePool: 5000,
    entryFee: 10,
    participants: 8,
    maxParticipants: 40,
    endsAt: Date.now() + 1000 * 60 * 150,
  },
  {
    id: "night-session",
    name: "Night Session Marathon",
    pair: "BTC/USDT",
    status: "ENDED" as const,
    prizePool: 20000,
    entryFee: 75,
    participants: 72,
    maxParticipants: 72,
    endsAt: Date.now() - 1000 * 60 * 5,
  },
  {
    id: "weekend-clash",
    name: "Weekend Clash Series",
    pair: "Mixed Pairs",
    status: "ENDED" as const,
    prizePool: 12000,
    entryFee: 40,
    participants: 54,
    maxParticipants: 64,
    endsAt: Date.now() - 1000 * 60 * 60,
  },
];

