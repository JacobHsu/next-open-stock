"use client";

import React, { memo } from "react";
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
}

const ETFMarketDataWidget = ({
  scriptUrl,
  config,
  height = 600,
  className,
  showCryptoLinks = false,
  showNasdaq100Links = false,
}: ETFMarketDataWidgetProps) => {
  const containerRef = useTradingViewWidget(scriptUrl, config, height);

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
            href="https://jacobhsu.github.io/stock-watch/etf/qqq"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:text-white transition-colors duration-200"
          >
            QQQ
          </Link>
          {["EWT", "TSM", "NVDA", "AAPL", "META", "GOOG"].map((symbol) => (
            <Link
              key={symbol}
              href={`https://jacobhsu.github.io/stock-watch/stock/${symbol.toLowerCase()}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:text-white transition-colors duration-200"
            >
              {symbol}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default memo(ETFMarketDataWidget);
