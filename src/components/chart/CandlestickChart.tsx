"use client";

import { useEffect, useRef } from "react";
import type { IChartApi, ISeriesApi } from "lightweight-charts";
import type { Candle } from "@/types";

interface Props {
  symbol: string;
  data: Candle[];
  isLoading: boolean;
}

export const CandlestickChart = ({ symbol, data, isLoading }: Props) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);

  useEffect(() => {
    let chart: IChartApi | null = null;
    let series: ISeriesApi<"Candlestick"> | null = null;

    const init = async () => {
      if (!containerRef.current) return;

      const { createChart, ColorType } = await import("lightweight-charts");

      chart = createChart(containerRef.current, {
        layout: {
          background: { type: ColorType.Solid, color: "#050712" },
          textColor: "#e5f2ff",
        },
        grid: {
          vertLines: { color: "rgba(30, 64, 175, 0.3)" },
          horzLines: { color: "rgba(30, 64, 175, 0.3)" },
        },
        timeScale: {
          borderColor: "rgba(148, 163, 184, 0.5)",
        },
        rightPriceScale: {
          borderColor: "rgba(148, 163, 184, 0.5)",
        },
        crosshair: {
          mode: 1,
        },
      });

      series = chart.addCandlestickSeries({
        upColor: "#00e676",
        downColor: "#ff1744",
        wickUpColor: "#00e676",
        wickDownColor: "#ff1744",
        borderVisible: false,
      });

      chartRef.current = chart;
      seriesRef.current = series;

      const handleResize = () => {
        if (!containerRef.current || !chart) return;
        chart.applyOptions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        });
        chart.timeScale().fitContent();
      };

      handleResize();
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    };

    init();

    return () => {
      if (chartRef.current) {
        chartRef.current.remove();
      }
      chartRef.current = null;
      seriesRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!seriesRef.current || data.length === 0) return;
    seriesRef.current.setData(
      data.map((c) => ({
        time: c.time / 1000,
        open: c.open,
        high: c.high,
        low: c.low,
        close: c.close,
      }))
    );
    chartRef.current?.timeScale().fitContent();
  }, [data]);

  return (
    <div className="relative h-full w-full">
      <div
        ref={containerRef}
        className="h-full w-full rounded-md border border-slate-800/90 bg-[#050712]"
      />
      {isLoading && (
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-md bg-slate-950/70 text-xs text-slate-400">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-cyan-400/70 border-t-transparent" />
          <span>Connecting to live data...</span>
        </div>
      )}
      <div className="pointer-events-none absolute left-3 top-2 text-[11px] text-slate-400">
        <span className="price-mono font-semibold text-slate-100">
          {symbol.toUpperCase()}
        </span>{" "}
        <span className="text-slate-500">1m · Binance</span>
      </div>
    </div>
  );
};

