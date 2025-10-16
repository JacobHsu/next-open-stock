'use client';

import TradingViewWidget from "@/components/TradingViewWidget";
import ETFMarketDataWidget from "@/components/ETFMarketDataWidget";
import {
    DOW30_HEATMAP_WIDGET_CONFIG,
    DOW30_MARKET_DATA_WIDGET_CONFIG,
    DOW30_MARKET_OVERVIEW_WIDGET_CONFIG,
    DOW30_TOP_STORIES_WIDGET_CONFIG
} from "@/lib/configs/dow30-config";
import { useEffect } from "react";

const Dow30Page = () => {
    const scriptUrl = `https://s3.tradingview.com/external-embedding/embed-widget-`;

    useEffect(() => {
        const dow30Info = [
            { code: 'DIA', link: 'https://stockanalysis.com/etf/dia/holdings/' },
        ];

        console.log('%c📊 Dow Jones 30 Data Source:', 'font-weight: bold; font-size: 14px; color: #0FEDBE;');
        dow30Info.forEach(etf => {
            console.log(`%c${etf.code}%c - ${etf.link}`,
                'font-weight: bold; color: #60A5FA;',
                'color: #9CA3AF;'
            );
        });
    }, []);

    return (
        <div className="flex min-h-screen home-wrapper">
            <section className="grid w-full gap-8 home-section">
                <div className="md:col-span-1 xl:col-span-1">
                    <TradingViewWidget
                        title="Dow Jones 30 Market Overview"
                        scriptUrl={`${scriptUrl}market-overview.js`}
                        config={DOW30_MARKET_OVERVIEW_WIDGET_CONFIG}
                        className="custom-chart"
                        height={600}
                    />
                </div>
                <div className="md-col-span xl:col-span-2">
                    <TradingViewWidget
                        title="Dow Jones 30 Heatmap"
                        titleLink="https://finviz.com/map.ashx?t=sec_dji"
                        scriptUrl={`${scriptUrl}stock-heatmap.js`}
                        config={DOW30_HEATMAP_WIDGET_CONFIG}
                        height={600}
                    />
                </div>
            </section>
            <section className="grid w-full gap-8 home-section">
                <div className="h-full md:col-span-1 xl:col-span-2">
                    <ETFMarketDataWidget
                        scriptUrl={`${scriptUrl}market-quotes.js`}
                        config={DOW30_MARKET_DATA_WIDGET_CONFIG}
                        height={600}
                    />
                </div>
                <div className="h-full md:col-span-1 xl:col-span-1">
                    <TradingViewWidget
                        scriptUrl={`${scriptUrl}timeline.js`}
                        config={DOW30_TOP_STORIES_WIDGET_CONFIG}
                        height={600}
                    />
                </div>
            </section>
        </div>
    )
}

export default Dow30Page;
