"use client";

import type { Candle } from "@/types";

interface Props {
  symbol: string;
  data: Candle[];
  isLoading: boolean;
}

// Simplified placeholder chart that avoids lightweight-charts entirely,
// but still visualizes the last few candles as a tiny bar strip.
export const CandlestickChart = ({ symbol, data, isLoading }: Props) => {
  const last = data.slice(-40);

  const min =
    last.length > 0 ? Math.min(...last.map((c) => c.low)) : undefined;
  const max =
    last.length > 0 ? Math.max(...last.map((c) => c.high)) : undefined;

  return (
    <div className="relative flex h-full w-full flex-col rounded-md border border-slate-800/90 bg-[#050712] px-3 py-2">
      <div className="mb-1 flex items-center justify-between text-[11px] text-slate-400">
        <div>
          <span className="price-mono font-semibold text-slate-100">
            {symbol.toUpperCase()}
          </span>{" "}
          <span className="text-slate-500">1m · Binance</span>
        </div>
        {last.length > 0 && (
          <span className="price-mono text-xs text-slate-200">
            {last[last.length - 1].close.toFixed(2)}
          </span>
        )}
      </div>

      <div className="relative flex-1 overflow-hidden rounded-sm bg-slate-950/70">
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-xs text-slate-400">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-cyan-400/70 border-t-transparent" />
            <span>Connecting to live data...</span>
          </div>
        )}
        {!isLoading && last.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-[11px] text-slate-500">
            Waiting for first candle...
          </div>
        )}
        {!isLoading && last.length > 0 && min !== undefined && max !== undefined && (
          <div className="flex h-full w-full items-end gap-[2px] px-1 pb-1">
            {last.map((c) => {
              const range = max - min || 1;
              const height = ((c.close - min) / range) * 100;
              const positive = c.close >= c.open;
              return (
                <div
                  key={c.time}
                  className="flex-1 rounded-t-[2px]"
                  style={{
                    height: `${Math.max(6, height)}%`,
                    backgroundColor: positive ? "#00e676" : "#ff1744",
                    opacity: 0.8,
                  }}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

