'use client';

import TradingViewWidget from "@/components/TradingViewWidget";
import ETFMarketDataWidget from "@/components/ETFMarketDataWidget";
import {
    RUSSELL2000_HEATMAP_WIDGET_CONFIG,
    RUSSELL2000_MARKET_DATA_WIDGET_CONFIG,
    RUSSELL2000_MARKET_OVERVIEW_WIDGET_CONFIG,
    RUSSELL2000_TOP_STORIES_WIDGET_CONFIG
} from "@/lib/configs/russell2000-config";
import { useEffect } from "react";

const Russell2000Page = () => {
    const scriptUrl = `https://s3.tradingview.com/external-embedding/embed-widget-`;

    useEffect(() => {
        const russell2000Info = [
            { code: 'IWM', link: 'https://stockanalysis.com/etf/iwm/holdings/' },
            { code: 'VTWO', link: 'https://stockanalysis.com/etf/vtwo/holdings/' },
        ];

        console.log('%c📊 Russell 2000 Data Source:', 'font-weight: bold; font-size: 14px; color: #0FEDBE;');
        russell2000Info.forEach(etf => {
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
                        title="Russell 2000 Market Overview"
                        scriptUrl={`${scriptUrl}market-overview.js`}
                        config={RUSSELL2000_MARKET_OVERVIEW_WIDGET_CONFIG}
                        className="custom-chart"
                        height={600}
                    />
                </div>
                <div className="md-col-span xl:col-span-2">
                    <TradingViewWidget
                        title="Russell 2000 Heatmap"
                        titleLink="https://finviz.com/map.ashx?t=sec_rut"
                        scriptUrl={`${scriptUrl}stock-heatmap.js`}
                        config={RUSSELL2000_HEATMAP_WIDGET_CONFIG}
                        height={600}
                    />
                </div>
            </section>
            <section className="grid w-full gap-8 home-section">
                <div className="h-full md:col-span-1 xl:col-span-2">
                    <ETFMarketDataWidget
                        scriptUrl={`${scriptUrl}market-quotes.js`}
                        config={RUSSELL2000_MARKET_DATA_WIDGET_CONFIG}
                        height={600}
                    />
                </div>
                <div className="h-full md:col-span-1 xl:col-span-1">
                    <TradingViewWidget
                        scriptUrl={`${scriptUrl}timeline.js`}
                        config={RUSSELL2000_TOP_STORIES_WIDGET_CONFIG}
                        height={600}
                    />
                </div>
            </section>
        </div>
    )
}

export default Russell2000Page;
