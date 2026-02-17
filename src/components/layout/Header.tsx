"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { classNames } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Overview" },
  { href: "/tournaments", label: "Tournaments" },
  { href: "/dashboard", label: "Live Dashboard" },
  { href: "/leaderboard", label: "Leaderboard" },
];

export const Header = () => {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/70 bg-[#050711]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-gradient-to-br from-cyan-400 to-purple-500 text-xl font-bold text-black shadow-lg shadow-cyan-500/40">
            TA
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold tracking-[0.2em] text-slate-400 uppercase">
              TradArena
            </div>
            <div className="text-xs text-slate-500">
              Trading Tournament Platform
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 text-sm font-medium text-slate-300 md:flex">
          {navItems.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={classNames(
                  "relative rounded-md px-3 py-1.5 transition-colors hover:text-cyan-200",
                  active && "text-cyan-300"
                )}
              >
                {active && (
                  <span className="absolute inset-x-2 bottom-0 h-[2px] rounded-full bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400" />
                )}
                <span className="relative z-10">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <button className="hidden rounded-md bg-gradient-to-r from-cyan-400 to-purple-500 px-4 py-1.5 text-xs font-semibold tracking-wide text-black shadow-md shadow-cyan-500/40 transition hover:shadow-cyan-400/60 md:inline-flex">
            Enter Tournament
          </button>
          <div className="flex items-center gap-2 rounded-full border border-slate-700/80 bg-slate-900/60 px-2 py-1 text-xs text-slate-300">
            <span className="live-dot mr-1 inline-flex h-2 w-2 items-center justify-center rounded-full" />
            <span className="font-semibold text-emerald-400">LIVE</span>
            <span className="mx-1 h-3 w-px bg-slate-700" />
            <span className="text-slate-400">BTC/USDT Arena</span>
          </div>
        </div>
      </div>
    </header>
  );
};

