"use client";

import { useEffect, useState } from "react";
import type { TickerItem } from "@/types";
import { SYMBOLS } from "@/lib/constants";

const STREAM_URL =
  "wss://stream.binance.com:9443/stream?streams=btcusdt@ticker/ethusdt@ticker/bnbusdt@ticker/solusdt@ticker";

export const useTicker = () => {
  const [items, setItems] = useState<TickerItem[]>([]);

  useEffect(() => {
    let ws: WebSocket | null = null;

    try {
      ws = new WebSocket(STREAM_URL);
    } catch {
      return;
    }

    ws.onmessage = (event) => {
      const payload = JSON.parse(event.data);
      const t = payload.data;
      if (!t || !t.s || !SYMBOLS.includes(t.s)) return;

      setItems((prev) => {
        const price = parseFloat(t.c);
        const changePercent = parseFloat(t.P);
        const existing = prev.find((p) => p.symbol === t.s);
        const direction: TickerItem["direction"] =
          !existing || existing.price === price
            ? "flat"
            : price > existing.price
              ? "up"
              : "down";

        const next: TickerItem = {
          symbol: t.s,
          price,
          changePercent,
          direction,
        };

        const others = prev.filter((p) => p.symbol !== t.s);
        return [...others, next].sort((a, b) => {
          const ia = SYMBOLS.indexOf(a.symbol as (typeof SYMBOLS)[number]);
          const ib = SYMBOLS.indexOf(b.symbol as (typeof SYMBOLS)[number]);
          return ia - ib;
        });
      });
    };

    return () => {
      ws?.close();
    };
  }, []);

  return items;
};

