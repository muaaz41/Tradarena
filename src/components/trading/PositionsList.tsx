"use client";

import { useTournamentStore } from "@/store/tournamentStore";
import { classNames, formatPercent } from "@/lib/utils";

interface Props {
  currentPrice: number | null;
}

export const PositionsList = ({ currentPrice }: Props) => {
  const positions = useTournamentStore((s) => s.positions);
  const closePosition = useTournamentStore((s) => s.closePosition);

  return (
    <div className="glass-panel space-y-2 px-4 py-3 text-[11px] text-slate-200">
      <div className="flex items-center justify-between">
        <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
          Your Positions
        </div>
        <span className="text-[10px] text-slate-500">
          {positions.length} open
        </span>
      </div>
      {positions.length === 0 ? (
        <div className="rounded-md border border-dashed border-slate-700/80 bg-slate-950/60 px-3 py-3 text-[11px] text-slate-400">
          Simulated positions appear here as you trade the arena.
        </div>
      ) : (
        <div className="space-y-2">
          {positions.map((p) => {
            const livePrice =
              currentPrice && p.symbol.toLowerCase().startsWith("btc")
                ? currentPrice
                : p.currentPrice;
            const pnl =
              ((livePrice - p.entryPrice) *
                (p.side === "buy" ? 1 : -1) *
                p.quantity) /
              p.amount;
            const pnlPercent = pnl * 100;
            return (
              <div
                key={p.id}
                className="flex items-center justify-between gap-3 rounded-md border border-slate-800/80 bg-slate-950/60 px-3 py-2"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="price-mono text-xs text-slate-100">
                      {p.symbol}
                    </span>
                    <span
                      className={classNames(
                        "rounded-full px-2 py-0.5 text-[10px] font-semibold",
                        p.side === "buy"
                          ? "bg-emerald-500/10 text-emerald-300"
                          : "bg-rose-500/10 text-rose-300"
                      )}
                    >
                      {p.side.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex gap-3 text-[10px] text-slate-400">
                    <span>
                      Entry{" "}
                      <span className="price-mono text-slate-100">
                        {p.entryPrice.toFixed(1)}
                      </span>
                    </span>
                    <span>
                      Mark{" "}
                      <span className="price-mono text-slate-100">
                        {livePrice?.toFixed(1) ?? "—"}
                      </span>
                    </span>
                    <span>
                      Size{" "}
                      <span className="price-mono text-slate-100">
                        {p.quantity.toFixed(4)}
                      </span>
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span
                    className={classNames(
                      "price-mono rounded-full px-2 py-0.5 text-[10px]",
                      pnlPercent >= 0 ? "pnl-positive" : "pnl-negative"
                    )}
                  >
                    {formatPercent(pnlPercent)}
                  </span>
                  <button
                    onClick={() => closePosition(p.id)}
                    className="text-[10px] text-slate-400 hover:text-slate-200"
                  >
                    Close
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

