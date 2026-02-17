"use client";

import { useTournamentStore } from "@/store/tournamentStore";
import { LeaderboardRow } from "./LeaderboardRow";

interface Props {
  compact?: boolean;
}

export const LeaderboardTable = ({ compact }: Props) => {
  const players = useTournamentStore((s) => s.players);
  const currentUserId = useTournamentStore((s) => s.currentUserId);

  return (
    <div className="max-h-[340px] overflow-auto scrollbar-thin">
      <table className="min-w-full border-separate border-spacing-y-1 text-left">
        <thead className="text-[10px] uppercase tracking-[0.14em] text-slate-500">
          <tr>
            <th className="px-2 py-1">Rank</th>
            <th className="px-2 py-1">Player</th>
            {!compact && <th className="px-2 py-1">Starting</th>}
            <th className="px-2 py-1">Current</th>
            <th className="px-2 py-1">PnL%</th>
            {!compact && <th className="px-2 py-1 text-center">Trades</th>}
            <th className="px-2 py-1">Trajectory</th>
          </tr>
        </thead>
        <tbody>
          {players.map((p) => (
            <LeaderboardRow
              key={p.id}
              player={p}
              isCurrentUser={p.id === currentUserId}
              compact={compact}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

