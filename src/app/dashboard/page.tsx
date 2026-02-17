"use client";

import { useState } from "react";
import { useMarketData } from "@/hooks/useMarketData";
import { CandlestickChart } from "@/components/chart/CandlestickChart";
import { OrderPanel } from "@/components/trading/OrderPanel";
import { PositionsList } from "@/components/trading/PositionsList";
import { PortfolioSummary } from "@/components/trading/PortfolioSummary";
import { LeaderboardTable } from "@/components/leaderboard/LeaderboardTable";
import { useTournamentStore } from "@/store/tournamentStore";
import { classNames, formatCurrency, formatPercent } from "@/lib/utils";

const PAIRS = [
  { label: "BTC/USDT", symbol: "btcusdt" },
  { label: "ETH/USDT", symbol: "ethusdt" },
  { label: "BNB/USDT", symbol: "bnbusdt" },
  { label: "SOL/USDT", symbol: "solusdt" },
] as const;

export default function DashboardPage() {
  const [activePair, setActivePair] = useState<(typeof PAIRS)[number]>(
    PAIRS[0]
  );
  const market = useMarketData(activePair.symbol);
  const players = useTournamentStore((s) => s.players);
  const currentUserId = useTournamentStore((s) => s.currentUserId);
  const currentUser = players.find((p) => p.id === currentUserId) ?? players[0];

  const timeLeft = "00:42:31";

  return (
    <div className="mx-auto flex max-w-7xl flex-1 flex-col gap-4 py-6 text-xs text-slate-200">
      <div className="glass-panel flex flex-wrap items-center justify-between gap-4 px-4 py-3">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="live-dot inline-flex h-3 w-3 items-center justify-center rounded-full" />
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                BTC/USDT Sprint Arena
              </div>
              <div className="text-[11px] text-slate-400">
                Live PnL% leaderboard · Real market feed
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="rounded-md border border-slate-700/80 bg-slate-900/70 px-3 py-1.5 text-[11px] text-slate-300">
            <span className="stat-label">Time Left</span>
            <div className="price-mono text-xs text-slate-100">{timeLeft}</div>
          </div>
          <div className="rounded-md border border-slate-700/80 bg-slate-900/70 px-3 py-1.5 text-[11px] text-slate-300">
            <span className="stat-label">Your Rank</span>
            <div className="price-mono text-xs text-amber-300">
              #{currentUser?.rank ?? 1} of {players.length}
            </div>
          </div>
          <div
            className={classNames(
              "rounded-md px-3 py-1.5 text-[11px] price-mono",
              (currentUser?.pnlPercent ?? 0) >= 0
                ? "pnl-positive border border-emerald-500/40"
                : "pnl-negative border border-rose-500/40"
            )}
          >
            <span className="stat-label">Your PnL%</span>
            <div className="text-xs">
              {formatPercent(currentUser?.pnlPercent ?? 0)}
            </div>
          </div>
          <div className="hidden items-center gap-2 rounded-full border border-slate-700/80 bg-slate-900/70 px-2 py-1 sm:flex">
            <span className="h-6 w-6 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 text-[11px] font-semibold text-black flex items-center justify-center">
              Y
            </span>
            <div className="leading-tight">
              <div className="text-[11px] font-semibold text-slate-200">
                You
              </div>
              <div className="text-[10px] text-slate-500">Guest Trader</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.8fr)_minmax(0,0.9fr)]">
        <div className="space-y-3">
          <div className="glass-panel flex flex-col gap-2 px-3 py-3 sm:px-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-[11px] text-slate-300">
                {PAIRS.map((pair) => {
                  const active = pair.symbol === activePair.symbol;
                  return (
                    <button
                      key={pair.symbol}
                      onClick={() => setActivePair(pair)}
                      className={classNames(
                        "price-mono rounded-md px-2.5 py-1 text-[11px] transition-colors",
                        active
                          ? "bg-slate-900 text-cyan-200 border border-cyan-500/60"
                          : "border border-slate-700/70 bg-slate-900/60 text-slate-300 hover:border-cyan-500/50 hover:text-cyan-100"
                      )}
                    >
                      {pair.label}
                    </button>
                  );
                })}
              </div>
              <div className="flex items-center gap-3 text-[11px] text-slate-400">
                <span>
                  24h High:{" "}
                  <span className="price-mono text-slate-100">
                    {market.high24h?.toFixed(1) ?? "—"}
                  </span>
                </span>
                <span>
                  24h Low:{" "}
                  <span className="price-mono text-slate-100">
                    {market.low24h?.toFixed(1) ?? "—"}
                  </span>
                </span>
                <span>
                  24h Vol:{" "}
                  <span className="price-mono text-slate-100">
                    {market.volume24h
                      ? market.volume24h.toFixed(0)
                      : "—"}
                  </span>
                </span>
              </div>
            </div>
            <div className="mt-2 h-[320px] sm:h-[380px]">
              <CandlestickChart
                symbol={activePair.symbol}
                data={market.candles}
                isLoading={market.isLoading}
              />
            </div>
          </div>

          <div className="glass-panel grid grid-cols-2 gap-3 px-4 py-3 text-[11px] text-slate-300 sm:grid-cols-4">
            <div>
              <div className="stat-label">Mark Price</div>
              <div className="price-mono text-xs text-slate-100">
                {market.currentPrice?.toLocaleString("en-US", {
                  maximumFractionDigits: 2,
                }) ?? "—"}
              </div>
            </div>
            <div>
              <div className="stat-label">24h Change</div>
              <div
                className={classNames(
                  "price-mono text-xs",
                  (market.priceChange24h ?? 0) >= 0
                    ? "text-emerald-400"
                    : "text-rose-400"
                )}
              >
                {market.priceChange24h != null
                  ? formatPercent(market.priceChange24h)
                  : "—"}
              </div>
            </div>
            <div>
              <div className="stat-label">Starting Balance</div>
              <div className="price-mono text-xs text-slate-100">
                {formatCurrency(currentUser?.startingBalance ?? 10000, 0)}
              </div>
            </div>
            <div>
              <div className="stat-label">Current Value</div>
              <div className="price-mono text-xs text-slate-100">
                {formatCurrency(currentUser?.currentValue ?? 10000, 0)}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <OrderPanel
            symbol={activePair.label}
            rawSymbol={activePair.symbol}
            currentPrice={market.currentPrice}
          />
          <PositionsList currentPrice={market.currentPrice} />
          <PortfolioSummary />
        </div>
      </div>

      <div className="glass-panel mt-2 overflow-hidden px-3 py-3 sm:px-4 sm:py-4">
        <div className="mb-2 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
              Live Leaderboard
            </div>
            <div className="text-[11px] text-slate-500">
              Every 3 seconds, players shuffle as trades stream in.
            </div>
          </div>
        </div>
        <LeaderboardTable compact />
      </div>
    </div>
  );
}

