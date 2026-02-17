"use client";

import { motion } from "framer-motion";
import type { Player } from "@/types";
import { classNames, formatCurrency, formatPercent } from "@/lib/utils";
import { PnLSparkline } from "./PnLSparkline";

interface Props {
  player: Player;
  isCurrentUser: boolean;
  compact?: boolean;
}

export const LeaderboardRow = ({ player, isCurrentUser, compact }: Props) => {
  const positive = player.pnlPercent >= 0;
  const medal =
    player.rank === 1 ? "🥇" : player.rank === 2 ? "🥈" : player.rank === 3 ? "🥉" : null;

  return (
    <motion.tr
      layout
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className={classNames(
        "text-[11px]",
        isCurrentUser && "bg-cyan-500/5"
      )}
    >
      <td className="px-2 py-1.5 text-center price-mono text-slate-300">
        {medal ? (
          <span className="text-base">{medal}</span>
        ) : (
          <span>{player.rank}</span>
        )}
      </td>
      <td className="px-2 py-1.5">
        <div className="flex items-center gap-2">
          <span
            className="inline-flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-semibold text-black"
            style={{ backgroundColor: player.avatarColor }}
          >
            {player.name[0]}
          </span>
          <span className="text-slate-100">{player.name}</span>
          {isCurrentUser && (
            <span className="rounded-full border border-cyan-400/80 bg-cyan-500/10 px-1.5 py-0.5 text-[9px] font-semibold text-cyan-200">
              You
            </span>
          )}
        </div>
      </td>
      {!compact && (
        <td className="px-2 py-1.5 price-mono text-slate-300">
          {formatCurrency(player.startingBalance, 0)}
        </td>
      )}
      <td className="px-2 py-1.5 price-mono text-slate-300">
        {formatCurrency(player.currentValue, 0)}
      </td>
      <td className="px-2 py-1.5">
        <span
          className={classNames(
            "price-mono rounded-full px-2 py-0.5 text-[10px]",
            positive ? "pnl-positive" : "pnl-negative"
          )}
        >
          {formatPercent(player.pnlPercent)}
        </span>
      </td>
      {!compact && (
        <td className="px-2 py-1.5 text-center price-mono text-slate-300">
          {player.trades}
        </td>
      )}
      <td className="px-2 py-1.5">
        <PnLSparkline points={player.pnlHistory} positive={positive} />
      </td>
    </motion.tr>
  );
};

