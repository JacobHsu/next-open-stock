'use client';

import { useParams } from 'next/navigation';
import { notFound } from 'next/navigation';
import TradingViewWidget from "@/components/TradingViewWidget";
import ETFMarketDataWidget from "@/components/ETFMarketDataWidget";
import {
    ETF_HEATMAP_WIDGET_CONFIG,
    ETF_MARKET_OVERVIEW_WIDGET_CONFIG,
    ETF_TOP_STORIES_WIDGET_CONFIG
} from "@/lib/constants";
import { fetchETFHoldings, ETFHoldingConfig } from "@/lib/types/etf-holdings";
import { useState, useEffect } from "react";

const ETFSymbolPage = () => {
    const params = useParams();
    const symbol = params.symbol as string;
    const scriptUrl = `https://s3.tradingview.com/external-embedding/embed-widget-`;

    // State for ETF holdings configuration
    const [etfConfig, setEtfConfig] = useState<ETFHoldingConfig | null>(null);
    const [loading, setLoading] = useState(true);

    // Fetch ETF holdings on mount
    useEffect(() => {
        const loadETFData = async () => {
            setLoading(true);
            const data = await fetchETFHoldings(symbol);
            setEtfConfig(data);
            setLoading(false);

            // If ETF not found, show 404
            if (!data) {
                notFound();
            }
        };

        loadETFData();
    }, [symbol]);

    // Show loading state
    if (loading || !etfConfig) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-lg">Loading ETF data...</div>
            </div>
        );
    }

    // Create custom market data widget config for this ETF
    const customMarketDataConfig = {
        title: `${etfConfig.symbol} - ${etfConfig.name}`,
        width: '100%',
        height: 600,
        locale: 'en',
        showSymbolLogo: true,
        colorTheme: 'dark',
        isTransparent: false,
        backgroundColor: '#0F0F0F',
        symbolsGroups: [
            {
                name: etfConfig.symbol,
                sourceUrl: etfConfig.sourceUrl,
                symbols: etfConfig.holdings,
            },
        ],
    };

    return (
        <div className="flex min-h-screen home-wrapper">
            <section className="grid w-full gap-8 home-section">
                <div className="md:col-span-1 xl:col-span-1">
                    <TradingViewWidget
                        title={`${etfConfig.symbol} - ${etfConfig.name}`}
                        scriptUrl={`${scriptUrl}market-overview.js`}
                        config={ETF_MARKET_OVERVIEW_WIDGET_CONFIG}
                        className="custom-chart"
                        height={600}
                    />
                </div>
                <div className="md-col-span xl:col-span-2">
                    <TradingViewWidget
                        title="ETF Heatmap"
                        titleLink="https://finviz.com/map.ashx?t=etf"
                        scriptUrl={`${scriptUrl}etf-heatmap.js`}
                        config={ETF_HEATMAP_WIDGET_CONFIG}
                        height={600}
                    />
                </div>
            </section>
            <section className="grid w-full gap-8 home-section">
                <div className="h-full md:col-span-1 xl:col-span-2">
                    <ETFMarketDataWidget
                        scriptUrl={`${scriptUrl}market-quotes.js`}
                        config={customMarketDataConfig}
                        height={600}
                    />
                </div>
                <div className="h-full md:col-span-1 xl:col-span-1">
                    <TradingViewWidget
                        scriptUrl={`${scriptUrl}timeline.js`}
                        config={ETF_TOP_STORIES_WIDGET_CONFIG}
                        height={600}
                    />
                </div>
            </section>
        </div>
    );
};

export default ETFSymbolPage;
