"use client";

import { useTournamentStore } from "@/store/tournamentStore";
import { classNames, formatCurrency, formatPercent } from "@/lib/utils";

export const PodiumSection = () => {
  const players = useTournamentStore((s) => s.players);
  const top3 = [...players].slice(0, 3);

  const tiers = [
    { rank: 2, label: "Silver", color: "#e5e7eb" },
    { rank: 1, label: "Gold", color: "#facc15" },
    { rank: 3, label: "Bronze", color: "#fed7aa" },
  ];

  return (
    <div className="glass-panel mb-4 grid gap-3 px-4 py-4 sm:grid-cols-3">
      {tiers.map((tier) => {
        const player = top3.find((p) => p.rank === tier.rank);
        if (!player)
          return (
            <div
              key={tier.rank}
              className="flex flex-col items-center justify-end rounded-lg border border-slate-800/80 bg-slate-950/80 px-3 py-4 text-xs text-slate-400"
            >
              <span className="text-[11px] uppercase tracking-[0.16em] text-slate-500">
                #{tier.rank} · {tier.label}
              </span>
              <span className="mt-2 text-[10px] text-slate-500">
                Waiting for contender
              </span>
            </div>
          );

        const heightClass =
          tier.rank === 1 ? "h-40" : tier.rank === 2 ? "h-32" : "h-28";

        return (
          <div
            key={tier.rank}
            className={classNames(
              "flex flex-col items-center justify-end rounded-lg border border-slate-800/80 bg-slate-950/80 px-3 pt-3 pb-4 text-xs text-slate-200"
            )}
          >
            <span className="text-[11px] uppercase tracking-[0.16em] text-slate-500">
              #{player.rank} · {tier.label}
            </span>
            <div className="mt-2 flex flex-col items-center gap-2">
              <span
                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold text-black"
                style={{ backgroundColor: player.avatarColor }}
              >
                {player.name[0]}
              </span>
              <span className="text-sm font-semibold text-slate-50">
                {player.name}
              </span>
              <span className="price-mono text-[11px] text-slate-400">
                {formatCurrency(player.currentValue, 0)}
              </span>
              <span
                className={classNames(
                  "price-mono rounded-full px-2 py-0.5 text-[10px]",
                  player.pnlPercent >= 0 ? "pnl-positive" : "pnl-negative"
                )}
              >
                {formatPercent(player.pnlPercent)}
              </span>
            </div>
            <div
              className={classNames(
                "mt-3 w-full rounded-t-md bg-gradient-to-t from-slate-800 to-slate-700",
                heightClass
              )}
              style={{
                boxShadow: `0 0 24px ${tier.color}33`,
                borderTop: `2px solid ${tier.color}`,
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

