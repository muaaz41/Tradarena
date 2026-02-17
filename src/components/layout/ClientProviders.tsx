"use client";

import { ThemeProvider } from "next-themes";
import { ReactNode, useEffect } from "react";
import { useTournamentStore } from "@/store/tournamentStore";

interface Props {
  children: ReactNode;
}

export const ClientProviders = ({ children }: Props) => {
  const updateLeaderboard = useTournamentStore(
    (s) => s.updateLeaderboardStream
  );

  useEffect(() => {
    const id = setInterval(() => {
      updateLeaderboard();
    }, 3000);
    return () => clearInterval(id);
  }, [updateLeaderboard]);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
};

