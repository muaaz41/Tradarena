"use client";

import { useEffect, useRef, useState } from "react";
import type { Candle, MarketDataState } from "@/types";

const BINANCE_WS_BASE = "wss://stream.binance.com:9443/ws";

export const useMarketData = (symbol: string): MarketDataState => {
  const [state, setState] = useState<MarketDataState>({
    candles: [],
    currentPrice: null,
    priceChange24h: null,
    volume24h: null,
    high24h: null,
    low24h: null,
    isLoading: true,
  });

  const lastPriceRef = useRef<number | null>(null);

  useEffect(() => {
    if (!symbol) return;
    let ws: WebSocket | null = null;

    try {
      ws = new WebSocket(
        `${BINANCE_WS_BASE}/${symbol.toLowerCase()}@kline_1m`
      );
    } catch {
      return;
    }

    ws.onopen = () => {
      setState((s) => ({ ...s, isLoading: true }));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const k = data.k;
      if (!k) return;

      const candle: Candle = {
        time: k.t,
        open: parseFloat(k.o),
        high: parseFloat(k.h),
        low: parseFloat(k.l),
        close: parseFloat(k.c),
        volume: parseFloat(k.v),
      };

      lastPriceRef.current = candle.close;

      setState((prev) => {
        const candles = [...prev.candles];
        const last = candles[candles.length - 1];

        if (last && last.time === candle.time) {
          candles[candles.length - 1] = candle;
        } else {
          candles.push(candle);
        }

        const limited = candles.slice(-300);

        const high24h =
          prev.high24h != null
            ? Math.max(prev.high24h, candle.high)
            : candle.high;
        const low24h =
          prev.low24h != null ? Math.min(prev.low24h, candle.low) : candle.low;
        const volume24h = (prev.volume24h ?? 0) + candle.volume;

        const firstPrice = limited[0]?.open ?? candle.open;
        const priceChange24h =
          ((candle.close - firstPrice) / firstPrice) * 100;

        return {
          candles: limited,
          currentPrice: candle.close,
          priceChange24h,
          volume24h,
          high24h,
          low24h,
          isLoading: false,
        };
      });
    };

    ws.onerror = () => {
      setState((s) => ({ ...s, isLoading: false }));
    };

    ws.onclose = () => {
      // Keep last candles; mark as not loading
      setState((s) => ({ ...s, isLoading: false }));
    };

    return () => {
      ws?.close();
    };
  }, [symbol]);

  return state;
};

