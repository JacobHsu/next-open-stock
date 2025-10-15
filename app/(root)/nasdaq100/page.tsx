'use client';

import TradingViewWidget from "@/components/TradingViewWidget";
import ETFMarketDataWidget from "@/components/ETFMarketDataWidget";
import {
    NASDAQ100_HEATMAP_WIDGET_CONFIG,
    NASDAQ100_MARKET_DATA_WIDGET_CONFIG,
    NASDAQ100_MARKET_OVERVIEW_WIDGET_CONFIG,
    NASDAQ100_TOP_STORIES_WIDGET_CONFIG
} from "@/lib/configs/nasdaq100-config";
import { useEffect } from "react";

const Nasdaq100Page = () => {
    const scriptUrl = `https://s3.tradingview.com/external-embedding/embed-widget-`;

    useEffect(() => {
        const nasdaq100Info = [
            { code: 'QQQ', link: 'https://stockanalysis.com/etf/qqq/holdings/' },
            { code: 'QQQM', link: 'https://stockanalysis.com/etf/qqqm/holdings/' },
        ];

        console.log('%c📊 Nasdaq 100 Data Source:', 'font-weight: bold; font-size: 14px; color: #0FEDBE;');
        nasdaq100Info.forEach(etf => {
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
                        title="Nasdaq 100 Market Overview"
                        scriptUrl={`${scriptUrl}market-overview.js`}
                        config={NASDAQ100_MARKET_OVERVIEW_WIDGET_CONFIG}
                        className="custom-chart"
                        height={600}
                    />
                </div>
                <div className="md-col-span xl:col-span-2">
                    <TradingViewWidget
                        title="Nasdaq 100 Heatmap"
                        titleLink="https://finviz.com/map.ashx?t=sec_ndx"
                        scriptUrl={`${scriptUrl}stock-heatmap.js`}
                        config={NASDAQ100_HEATMAP_WIDGET_CONFIG}
                        height={600}
                    />
                </div>
            </section>
            <section className="grid w-full gap-8 home-section">
                <div className="h-full md:col-span-1 xl:col-span-2">
                    <ETFMarketDataWidget
                        scriptUrl={`${scriptUrl}market-quotes.js`}
                        config={NASDAQ100_MARKET_DATA_WIDGET_CONFIG}
                        height={600}
                    />
                </div>
                <div className="h-full md:col-span-1 xl:col-span-1">
                    <TradingViewWidget
                        scriptUrl={`${scriptUrl}timeline.js`}
                        config={NASDAQ100_TOP_STORIES_WIDGET_CONFIG}
                        height={600}
                    />
                </div>
            </section>
        </div>
    )
}

export default Nasdaq100Page;
