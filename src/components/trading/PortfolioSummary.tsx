"use client";

import { useTournamentStore } from "@/store/tournamentStore";
import { classNames, formatCurrency, formatPercent } from "@/lib/utils";

export const PortfolioSummary = () => {
  const players = useTournamentStore((s) => s.players);
  const currentUserId = useTournamentStore((s) => s.currentUserId);
  const currentUser = players.find((p) => p.id === currentUserId) ?? players[0];

  const pnlPercent = currentUser?.pnlPercent ?? 0;

  return (
    <div className="glass-panel flex items-center justify-between gap-3 px-4 py-3 text-[11px] text-slate-200">
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
      <div
        className={classNames(
          "rounded-md px-3 py-1.5 text-right price-mono",
          pnlPercent >= 0 ? "pnl-positive" : "pnl-negative"
        )}
      >
        <div className="stat-label">Total PnL</div>
        <div className="text-xs">{formatPercent(pnlPercent)}</div>
      </div>
    </div>
  );
};

