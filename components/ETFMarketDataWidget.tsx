'use client';

import React, { memo } from 'react';
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
}

const ETFMarketDataWidget = ({ scriptUrl, config, height = 600, className }: ETFMarketDataWidgetProps) => {
    const containerRef = useTradingViewWidget(scriptUrl, config, height);

    return (
        <div className="w-full">
            <div className={cn('tradingview-widget-container', className)} ref={containerRef}>
                <div className="tradingview-widget-container__widget" style={{ height, width: "100%" }} />
            </div>

            {/* Links below the widget table */}
            <div className="flex items-center gap-3 mt-3 text-sm">
                <span className="text-gray-400">Data source:</span>
                {config.symbolsGroups?.map((group) => (
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
                ))}
            </div>
        </div>
    );
}

export default memo(ETFMarketDataWidget);
