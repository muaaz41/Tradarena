"use client";

import { TOURNAMENTS } from "@/lib/constants";
import { useState } from "react";
import { TournamentCard } from "@/components/tournament/TournamentCard";

const FILTERS = ["All", "Live", "Upcoming", "Ended"] as const;

export default function TournamentsPage() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");

  const filtered = TOURNAMENTS.filter((t) => {
    if (filter === "All") return true;
    return t.status.toUpperCase() === filter.toUpperCase();
  });

  return (
    <div className="mx-auto flex max-w-7xl flex-1 flex-col gap-6 py-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-slate-50 sm:text-2xl">
            Active Tournaments
          </h1>
          <p className="mt-1 text-xs text-slate-400 sm:text-sm">
            Join a live arena or schedule your next sprint session.
          </p>
        </div>
        <button className="rounded-md bg-gradient-to-r from-cyan-400 to-purple-500 px-4 py-2 text-xs font-semibold text-black shadow-lg shadow-cyan-500/40">
          Create Tournament
        </button>
      </div>

      <div className="glass-panel flex items-center gap-1 px-2 py-1.5 text-xs text-slate-300 sm:px-3 sm:py-2">
        {FILTERS.map((f) => {
          const active = f === filter;
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`relative rounded-md px-3 py-1 transition-colors ${
                active
                  ? "bg-slate-900/80 text-cyan-200"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {f}
              {active && (
                <span className="absolute inset-x-2 bottom-0 h-[2px] rounded-full bg-gradient-to-r from-cyan-400 via-emerald-400 to-purple-400" />
              )}
            </button>
          );
        })}
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((t) => (
          <TournamentCard key={t.id} tournament={t} />
        ))}
      </div>
    </div>
  );
}

