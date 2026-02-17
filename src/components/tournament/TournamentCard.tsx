"use client";

import Link from "next/link";
import { useTournamentTimer } from "@/hooks/useTournamentTimer";
import { classNames, formatCurrency } from "@/lib/utils";

interface TournamentCardProps {
  tournament: {
    id: string;
    name: string;
    pair: string;
    status: "LIVE" | "UPCOMING" | "ENDED" | (string & {});
    prizePool: number;
    entryFee: number;
    participants: number;
    maxParticipants: number;
    endsAt: number;
  };
}

export const TournamentCard = ({ tournament }: TournamentCardProps) => {
  const timeLeft = useTournamentTimer(
    tournament.status === "ENDED" ? null : tournament.endsAt
  );

  const isLive = tournament.status === "LIVE";
  const isUpcoming = tournament.status === "UPCOMING";

  return (
    <div
      className={classNames(
        "relative overflow-hidden rounded-xl border bg-slate-950/80 px-4 py-4 transition-colors",
        "glass-panel border-slate-800/80",
        isLive && "border-emerald-500/70 shadow-[0_0_25px_rgba(16,185,129,0.35)]"
      )}
    >
      {isLive && (
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-emerald-500/8 via-transparent to-emerald-500/8 opacity-80" />
      )}
      <div className="relative space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span
                className={classNames(
                  "rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em]",
                  isLive &&
                    "border-emerald-400/80 bg-emerald-500/10 text-emerald-300",
                  isUpcoming &&
                    "border-cyan-400/80 bg-cyan-500/10 text-cyan-200",
                  !isLive &&
                    !isUpcoming &&
                    "border-slate-600/80 bg-slate-800/80 text-slate-300"
                )}
              >
                {tournament.status}
              </span>
              <span className="price-mono text-[11px] text-slate-400">
                {tournament.pair}
              </span>
            </div>
            <h3 className="mt-1 text-sm font-semibold text-slate-50">
              {tournament.name}
            </h3>
          </div>
          {isLive && (
            <span className="live-dot inline-flex h-3 w-3 items-center justify-center rounded-full" />
          )}
        </div>

        <div className="grid grid-cols-2 gap-3 text-[11px] text-slate-300">
          <div>
            <div className="stat-label">Prize Pool</div>
            <div className="price-mono text-xs text-slate-100">
              {formatCurrency(tournament.prizePool, 0)}
            </div>
          </div>
          <div>
            <div className="stat-label">Entry</div>
            <div className="price-mono text-xs text-slate-100">
              {formatCurrency(tournament.entryFee, 0)}
            </div>
          </div>
          <div>
            <div className="stat-label">Participants</div>
            <div className="price-mono text-xs text-slate-100">
              {tournament.participants}/{tournament.maxParticipants}
            </div>
          </div>
          <div>
            <div className="stat-label">Time Remaining</div>
            <div className="price-mono text-xs text-slate-100">
              {tournament.status === "ENDED" ? "Ended" : timeLeft}
            </div>
          </div>
        </div>

        <div className="mt-2 flex items-center justify-between gap-3 text-[11px]">
          <span className="text-slate-400">
            Top traders ranked by real-time PnL%.
          </span>
          <Link
            href="/dashboard"
            className={classNames(
              "rounded-md px-3 py-1.5 text-[11px] font-semibold shadow-sm transition-colors",
              isLive
                ? "bg-emerald-500 text-black hover:bg-emerald-400"
                : "bg-slate-800/80 text-slate-300 hover:bg-slate-700/80"
            )}
          >
            {isLive ? "Join Now" : isUpcoming ? "Notify Me" : "View Recap"}
          </Link>
        </div>
      </div>
    </div>
  );
};

