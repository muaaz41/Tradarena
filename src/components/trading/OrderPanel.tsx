"use client";

import { useState } from "react";
import { useTournamentStore } from "@/store/tournamentStore";
import type { Side } from "@/types";
import { classNames } from "@/lib/utils";

interface Props {
  symbol: string;
  rawSymbol: string;
  currentPrice: number | null;
}

export const OrderPanel = ({ symbol, rawSymbol, currentPrice }: Props) => {
  const [side, setSide] = useState<Side>("buy");
  const [amount, setAmount] = useState("500");
  const executeTrade = useTournamentStore((s) => s.executeTrade);

  const parsedAmount = parseFloat(amount) || 0;
  const quantity =
    currentPrice && parsedAmount > 0 ? parsedAmount / currentPrice : 0;

  const handleSubmit = () => {
    if (!currentPrice || parsedAmount <= 0) return;
    executeTrade(side, parsedAmount, currentPrice, rawSymbol.toUpperCase());
  };

  return (
    <div className="glass-panel space-y-3 px-4 py-3 text-[11px] text-slate-200">
      <div className="flex items-center justify-between">
        <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
          Order Panel
        </div>
        <div className="rounded-full border border-slate-700/80 bg-slate-900/60 px-2 py-0.5 text-[10px] text-slate-400">
          1x · No leverage
        </div>
      </div>

      <div className="inline-flex rounded-md border border-slate-700/80 bg-slate-900/70 text-xs">
        <button
          onClick={() => setSide("buy")}
          className={classNames(
            "px-3 py-1.5 text-xs font-semibold",
            side === "buy"
              ? "bg-emerald-500 text-black"
              : "text-slate-300 hover:text-slate-100"
          )}
        >
          Buy
        </button>
        <button
          onClick={() => setSide("sell")}
          className={classNames(
            "px-3 py-1.5 text-xs font-semibold",
            side === "sell"
              ? "bg-rose-500 text-black"
              : "text-slate-300 hover:text-slate-100"
          )}
        >
          Sell
        </button>
      </div>

      <div className="space-y-2">
        <label className="block text-[10px] text-slate-400">
          Amount (USDT)
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            min={0}
            className="mt-1 w-full rounded-md border border-slate-700/80 bg-slate-950/70 px-2 py-1.5 text-xs text-slate-100 outline-none ring-0 focus:border-cyan-400/80"
          />
        </label>
        <div className="flex items-center justify-between text-[11px] text-slate-400">
          <span>
            Est. size{" "}
            <span className="price-mono text-slate-100">
              {quantity ? quantity.toFixed(4) : "0.0000"}{" "}
              {symbol.replace("/USDT", "")}
            </span>
          </span>
          <span>
            Mark{" "}
            <span className="price-mono text-slate-100">
              {currentPrice?.toLocaleString("en-US", {
                maximumFractionDigits: 1,
              }) ?? "—"}
            </span>
          </span>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={!currentPrice || parsedAmount <= 0}
        className={classNames(
          "mt-1 flex w-full items-center justify-center rounded-md px-3 py-2 text-xs font-semibold shadow-md transition-colors",
          side === "buy"
            ? "bg-emerald-500 text-black hover:bg-emerald-400"
            : "bg-rose-500 text-black hover:bg-rose-400",
          (!currentPrice || parsedAmount <= 0) && "opacity-60"
        )}
      >
        {side === "buy" ? "BUY" : "SELL"} {symbol.replace("/USDT", "")}
      </button>
    </div>
  );
};

