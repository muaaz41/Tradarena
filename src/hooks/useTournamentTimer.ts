"use client";

import { useEffect, useState } from "react";

export const useTournamentTimer = (targetTime: number | null) => {
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    if (!targetTime) return;

    const update = () => {
      setRemaining(Math.max(0, targetTime - Date.now()));
    };

    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [targetTime]);

  if (remaining == null) {
    return "—";
  }

  const totalSeconds = Math.floor(remaining / 1000);
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const minutes = String(
    Math.floor((totalSeconds % 3600) / 60)
  ).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
};

