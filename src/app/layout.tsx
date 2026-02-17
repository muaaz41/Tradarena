import type { Metadata } from "next";
import { Syne, Space_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { TickerBar } from "@/components/layout/TickerBar";
import { ClientProviders } from "@/components/layout/ClientProviders";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["600", "700", "800"],
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-space-mono",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "TradArena – Trading Tournament Platform",
  description:
    "TradArena is a real-time trading tournament platform demo powered by live Binance market data.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${syne.variable} ${spaceMono.variable} antialiased page-shell`}
      >
        <ClientProviders>
          <Header />
          <TickerBar />
          <main className="page-main">{children}</main>
        </ClientProviders>
      </body>
    </html>
  );
}
