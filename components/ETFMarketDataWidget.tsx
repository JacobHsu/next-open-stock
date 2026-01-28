"use client";

import React, { memo, useState, useEffect } from "react";
import useTradingViewWidget from "@/hooks/useTradingViewWidget";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface ETFMarketDataWidgetProps {
  scriptUrl: string;
  config: Record<string, unknown> & {
    symbolsGroups?: Array<{
      name: string;
      sourceUrl?: string;
      symbols: unknown[];
    }>;
  };
  height?: number;
  className?: string;
  showCryptoLinks?: boolean;
  showNasdaq100Links?: boolean;
  showTopLosers?: boolean;
}

const ETFMarketDataWidget = ({
  scriptUrl,
  config,
  height = 600,
  className,
  showCryptoLinks = false,
  showNasdaq100Links = false,
  showTopLosers = false,
}: ETFMarketDataWidgetProps) => {
  const containerRef = useTradingViewWidget(scriptUrl, config, height);
  const [topLosers, setTopLosers] = useState<string[]>([]);
  const [topLosersData, setTopLosersData] = useState<Array<{ ticker: string; change: string }>>([]);

  useEffect(() => {
    if (!showNasdaq100Links) return;

    // Fetch top losers from QQQ
    const fetchTopLosers = async () => {
      try {
        const res = await fetch('/api/etf/top-losers?symbol=QQQ&limit=5');
        const data = await res.json();

        if (data.success && data.topLosers) {
          const symbols = data.topLosers.map((loser: { symbol: string }) => loser.symbol);
          setTopLosers(symbols);
        }
      } catch (error) {
        console.error('Failed to fetch top losers:', error);
      }
    };

    fetchTopLosers();
  }, [showNasdaq100Links]);

  useEffect(() => {
    if (!showTopLosers) return;

    // Fetch top losers from finviz-map API
    const fetchTopLosersData = async () => {
      try {
        const res = await fetch('https://jacobhsu.github.io/finviz-map/api/top_losers.json');
        const data = await res.json();

        if (data.status === 'success' && data.data?.top_losers) {
          setTopLosersData(data.data.top_losers);
          
          // Log top losers in red color
          console.log('%c📉 Top Losers:', 'font-weight: bold; font-size: 14px; color: #EF4444;');
          data.data.top_losers.forEach((loser: { ticker: string; change: string }) => {
            console.log(`%c${loser.ticker}%c - ${loser.change}`,
              'font-weight: bold; color: #EF4444;',
              'color: #9CA3AF;'
            );
          });
        }
      } catch (error) {
        console.error('Failed to fetch top losers from finviz-map:', error);
      }
    };

    fetchTopLosersData();
  }, [showTopLosers]);

  return (
    <div className="w-full">
      <div
        className={cn("tradingview-widget-container", className)}
        ref={containerRef}
      >
        <div
          className="tradingview-widget-container__widget"
          style={{ height, width: "100%" }}
        />
      </div>

      {/* Links below the widget table */}
      <div className="flex items-center gap-3 mt-3 text-sm">
        <span className="text-gray-400">Data source:</span>
        {config.symbolsGroups?.map(
          (group) =>
            group.sourceUrl && (
              <Link
                key={group.name}
                href={group.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 hover:underline font-medium transition-colors"
                title={`View ${group.name} holdings on StockAnalysis.com`}
              >
                {group.name}
              </Link>
            )
        )}
      </div>

      {/* Hidden crypto links - only show on crypto page */}
      {showCryptoLinks && (
        <div className="flex items-center gap-4 mt-2 text-sm">
          {["BTC", "ETH", "XRP", "SOL"].map((crypto) => (
            <Link
              key={crypto}
              href={`https://jacobhsu.github.io/crypto-watch/${crypto.toLowerCase()}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:text-white transition-colors duration-200"
            >
              {crypto}
            </Link>
          ))}
        </div>
      )}

      {/* Hidden Nasdaq 100 links - only show on nasdaq100 page */}
      {showNasdaq100Links && (
        <div className="flex items-center gap-4 mt-2 text-sm">
          <Link
            href="https://jacobhsu.github.io/stock-watch/stock?s=QQQ"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:text-white transition-colors duration-200"
          >
            QQQ
          </Link>
          {/* Dynamic top losers */}
          {topLosers.map((symbol) => (
            <Link
              key={symbol}
              href={`https://jacobhsu.github.io/stock-watch/stock/?s=${symbol}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:text-red-400 transition-colors duration-200"
              title={`Top loser from QQQ`}
            >
              {symbol}
            </Link>
          ))}
        </div>
      )}

      {/* Top Losers from finviz-map API - show on home page */}
      {showTopLosers && topLosersData.length > 0 && (
        <div className="flex items-center gap-4 mt-2 text-sm flex-wrap">
          {topLosersData.map((loser) => (
            <Link
              key={loser.ticker}
              href={`https://jacobhsu.github.io/stock-watch/stock/?s=${loser.ticker}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:text-red-400 transition-colors duration-200"
              title={`${loser.ticker}: ${loser.change}`}
            >
              {loser.ticker}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default memo(ETFMarketDataWidget);
