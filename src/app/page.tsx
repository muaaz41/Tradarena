import Link from "next/link";
import { TOURNAMENTS } from "@/lib/constants";

export default function Home() {
  const live = TOURNAMENTS.filter((t) => t.status === "LIVE");

  return (
    <div className="mx-auto flex max-w-7xl flex-1 flex-col gap-10 py-10">
      <section className="grid gap-10 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1.1fr)]">
        <div className="glass-panel relative overflow-hidden p-8 sm:p-10">
          <div className="pointer-events-none absolute inset-0 opacity-50 mix-blend-screen">
            <div className="absolute -left-10 top-10 h-40 w-40 rounded-full bg-cyan-500/20 blur-3xl" />
            <div className="absolute -right-10 bottom-0 h-40 w-40 rounded-full bg-purple-500/25 blur-3xl" />
          </div>

          <div className="relative z-10 space-y-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/50 bg-slate-900/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-cyan-200">
              <span className="live-dot mr-1 inline-flex h-2 w-2 items-center justify-center rounded-full" />
              Live trading tournaments
              <span className="mx-2 h-px w-5 bg-cyan-500/60" />
              Powered by Binance
            </div>

            <div>
              <h1 className="text-balance text-4xl font-extrabold tracking-tight text-slate-50 sm:text-5xl lg:text-6xl">
                Compete. Trade.{" "}
                <span className="bg-gradient-to-r from-cyan-300 via-emerald-300 to-purple-300 bg-clip-text text-transparent">
                  Dominate.
                </span>
              </h1>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
                Join live peer-to-peer trading tournaments tracked by real
                Binance market data. Every tick updates your PnL% in a global
                arena of crypto-native competitors.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-cyan-400 to-purple-500 px-6 py-2.5 text-sm font-semibold text-black shadow-lg shadow-cyan-500/40 transition hover:shadow-cyan-400/60"
              >
                Join Live Tournament
              </Link>
              <Link
                href="/leaderboard"
                className="inline-flex items-center justify-center rounded-md border border-slate-600/80 bg-slate-900/60 px-5 py-2.5 text-sm font-semibold text-slate-100 transition hover:border-cyan-400/70 hover:text-cyan-100"
              >
                View Leaderboard
              </Link>
              <div className="ml-1 flex items-center gap-3 text-xs text-slate-400">
                <div className="flex -space-x-2">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-cyan-500/80 text-[11px] font-semibold text-black">
                    TA
                  </span>
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-purple-500/80 text-[11px] font-semibold text-black">
                    QX
                  </span>
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/80 text-[11px] font-semibold text-black">
                    Δ
                  </span>
                </div>
                <span className="max-w-[160px] text-[11px] text-slate-400">
                  Built for portfolio showpieces and live trading demos.
                </span>
              </div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="rounded-lg border border-slate-700/80 bg-slate-950/50 px-4 py-3">
                <div className="stat-label">Traders</div>
                <div className="stat-value price-mono">1,200+</div>
              </div>
              <div className="rounded-lg border border-slate-700/80 bg-slate-950/50 px-4 py-3">
                <div className="stat-label">Prize Pool</div>
                <div className="stat-value price-mono">$50K+</div>
              </div>
              <div className="rounded-lg border border-slate-700/80 bg-slate-950/50 px-4 py-3">
                <div className="stat-label">Live Tournaments</div>
                <div className="stat-value price-mono">24/7</div>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-panel relative flex flex-col justify-between overflow-hidden p-6 sm:p-7">
          <div className="mb-4 flex items-center justify-between text-xs text-slate-300">
            <span className="font-semibold tracking-[0.16em] uppercase text-slate-400">
              Live arenas
            </span>
            <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-[11px] font-semibold text-emerald-300">
              Synced with Binance WebSocket
            </span>
          </div>
          <div className="space-y-3 text-xs text-slate-200">
            {live.map((t) => (
              <div
                key={t.id}
                className="relative overflow-hidden rounded-lg border border-emerald-500/40 bg-slate-900/70 px-4 py-3"
              >
                <div className="absolute -right-6 top-0 h-20 w-20 rounded-full bg-emerald-500/15 blur-2xl" />
                <div className="relative flex items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="rounded-full border border-emerald-500/70 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
                        Live
                      </span>
                      <span className="price-mono text-[11px] text-slate-400">
                        {t.pair}
                      </span>
                    </div>
                    <div className="mt-1 text-sm font-semibold text-slate-50">
                      {t.name}
                    </div>
                    <div className="mt-1 flex gap-4 text-[11px] text-slate-400">
                      <span>Prize pool ${t.prizePool.toLocaleString()}</span>
                      <span>
                        {t.participants}/{t.maxParticipants} traders
                      </span>
                    </div>
                  </div>
                  <Link
                    href="/dashboard"
                    className="rounded-md bg-emerald-500 px-3 py-1.5 text-[11px] font-semibold text-black shadow shadow-emerald-500/40"
                  >
                    Enter Arena
                  </Link>
                </div>
              </div>
            ))}
            {live.length === 0 && (
              <div className="rounded-lg border border-slate-800 bg-slate-900/70 px-4 py-6 text-center text-xs text-slate-400">
                Live tournaments will appear here in real-time.
              </div>
            )}
          </div>

          <div className="mt-5 grid grid-cols-3 gap-3 text-[10px] text-slate-400">
            <div>
              <div className="stat-label">Latency</div>
              <div className="price-mono text-xs text-slate-100">
                &lt; 250ms
              </div>
            </div>
            <div>
              <div className="stat-label">Leaderboard refresh</div>
              <div className="price-mono text-xs text-slate-100">3s</div>
            </div>
            <div>
              <div className="stat-label">Data source</div>
              <div className="price-mono text-xs text-slate-100">
                Binance WS
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
