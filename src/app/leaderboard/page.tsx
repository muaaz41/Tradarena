"use client";

import { useState } from "react";
import { LeaderboardTable } from "@/components/leaderboard/LeaderboardTable";
import { PodiumSection } from "@/components/leaderboard/PodiumSection";

export default function LeaderboardPage() {
  const [query, setQuery] = useState("");

  return (
    <div className="mx-auto flex max-w-7xl flex-1 flex-col gap-4 py-6 text-xs text-slate-200">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-slate-50 sm:text-2xl">
            Global Leaderboard
          </h1>
          <p className="mt-1 text-xs text-slate-400 sm:text-sm">
            Live ranking of all TradArena contenders, updated in real-time.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <select className="rounded-md border border-slate-700/80 bg-slate-950/70 px-2 py-1 text-[11px] text-slate-200">
            <option>BTC/USDT Sprint Arena</option>
            <option>ETH Volatility Arena</option>
            <option>Weekend Clash Series</option>
          </select>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search player..."
            className="w-40 rounded-md border border-slate-700/80 bg-slate-950/70 px-2 py-1 text-[11px] text-slate-100 placeholder:text-slate-500 focus:border-cyan-400/80"
          />
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div>
          <PodiumSection />
          <div className="glass-panel px-4 py-3">
            <LeaderboardTable />
          </div>
        </div>
        <div className="glass-panel flex flex-col justify-between gap-4 px-4 py-3 text-[11px] text-slate-200">
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <div className="stat-label">Total Participants</div>
              <div className="price-mono text-lg text-slate-100">1,248</div>
            </div>
            <div>
              <div className="stat-label">Total Volume</div>
              <div className="price-mono text-lg text-slate-100">
                $58.2M
              </div>
            </div>
            <div>
              <div className="stat-label">Average PnL</div>
              <div className="price-mono text-lg text-slate-100">
                +3.4%
              </div>
            </div>
            <div>
              <div className="stat-label">Top Gainer</div>
              <div className="text-sm text-slate-100">AuroraQuant · +42.8%</div>
            </div>
          </div>
          <p className="text-[11px] text-slate-400">
            This leaderboard is backed by simulated tournament state and live
            Binance price feeds, designed to showcase real-time UI updates
            suitable for portfolio demos and trading hackathons.
          </p>
        </div>
      </div>
    </div>
  );
}

