"use client";

import { useTicker } from "@/hooks/useTicker";
import { formatPercent } from "@/lib/utils";

export const TickerBar = () => {
  const items = useTicker();

  return (
    <div className="border-b border-slate-800/70 bg-[#050711]/90 text-xs text-slate-300">
      <div className="mx-auto flex max-w-7xl overflow-hidden px-4 py-1.5 lg:px-8">
        <div className="flex flex-1 animate-[ticker_40s_linear_infinite] gap-6 whitespace-nowrap">
          {items.length === 0 ? (
            <span className="text-slate-500">
              Connecting to live market data...
            </span>
          ) : (
            [...items, ...items].map((item, index) => {
              const isUp = item.changePercent > 0;
              const isDown = item.changePercent < 0;
              return (
                <div
                  key={`${item.symbol}-${index}`}
                  className="flex items-baseline gap-2 px-1"
                >
                  <span className="price-mono text-[11px] font-semibold text-slate-200">
                    {item.symbol.replace("USDT", "/USDT")}
                  </span>
                  <span className="price-mono text-[11px] text-slate-50">
                    {item.price.toLocaleString("en-US", {
                      maximumFractionDigits: 2,
                    })}
                  </span>
                  <span
                    className={`price-mono rounded-full px-1.5 py-0.5 text-[10px] ${
                      isUp
                        ? "bg-emerald-500/10 text-emerald-400"
                        : isDown
                          ? "bg-rose-500/10 text-rose-400"
                          : "bg-slate-700/40 text-slate-300"
                    }`}
                  >
                    {isUp ? "▲" : isDown ? "▼" : "■"}{" "}
                    {formatPercent(item.changePercent)}
                  </span>
                </div>
              );
            })
          )}
        </div>
      </div>
      <style jsx global>{`
        @keyframes ticker {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
};

