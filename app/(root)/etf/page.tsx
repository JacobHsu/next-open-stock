'use client';

import TradingViewWidget from "@/components/TradingViewWidget";
import ETFMarketDataWidget from "@/components/ETFMarketDataWidget";
import {
    ETF_HEATMAP_WIDGET_CONFIG,
    ETF_MARKET_DATA_WIDGET_CONFIG,
    ETF_MARKET_OVERVIEW_WIDGET_CONFIG,
    ETF_TOP_STORIES_WIDGET_CONFIG
} from "@/lib/constants";
import { useEffect } from "react";

const ETFPage = () => {
    const scriptUrl = `https://s3.tradingview.com/external-embedding/embed-widget-`;

    useEffect(() => {
        const vanguardETFs = [
            { code: 'VGT', link: 'https://stockanalysis.com/etf/vgt/holdings/' },
            { code: 'VFH', link: 'https://stockanalysis.com/etf/vfh/holdings/' },
            { code: 'VDE', link: 'https://stockanalysis.com/etf/vde/holdings/' },
            { code: 'VHT', link: 'https://stockanalysis.com/etf/vht/holdings/' },
            { code: 'VIS', link: 'https://stockanalysis.com/etf/vis/holdings/' },
            { code: 'VDC', link: 'https://stockanalysis.com/etf/vdc/holdings/' },
            { code: 'VCR', link: 'https://stockanalysis.com/etf/vcr/holdings/' },
            { code: 'VAW', link: 'https://stockanalysis.com/etf/vaw/holdings/' },
            { code: 'VNQ', link: 'https://stockanalysis.com/etf/vnq/holdings/' },
            { code: 'VPU', link: 'https://stockanalysis.com/etf/vpu/holdings/' },
            { code: 'VOX', link: 'https://stockanalysis.com/etf/vox/holdings/' },
        ];

        console.log('%c📊 Vanguard ETFs Data Source:', 'font-weight: bold; font-size: 14px; color: #0FEDBE;');
        vanguardETFs.forEach(etf => {
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
                        title="ETF Market Overview"
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
                        config={ETF_MARKET_DATA_WIDGET_CONFIG}
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
    )
}

export default ETFPage;
