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
            { code: 'VGT', name: '資訊科技ETF', link: 'https://stockanalysis.com/etf/vgt/holdings/' },
            { code: 'VFH', name: '金融ETF', link: 'https://stockanalysis.com/etf/vfh/holdings/' },
            { code: 'VDE', name: '能源ETF', link: 'https://stockanalysis.com/etf/vde/holdings/' },
            { code: 'VHT', name: '醫療保健ETF', link: 'https://stockanalysis.com/etf/vht/holdings/' },
            { code: 'VIS', name: '工業ETF', link: 'https://stockanalysis.com/etf/vis/holdings/' },
            { code: 'VDC', name: '必需性消費ETF', link: 'https://stockanalysis.com/etf/vdc/holdings/' },
            { code: 'VCR', name: '非必需消費ETF', link: 'https://stockanalysis.com/etf/vcr/holdings/' },
            { code: 'VAW', name: '原物料ETF', link: 'https://stockanalysis.com/etf/vaw/holdings/' },
            { code: 'VNQ', name: '房地產ETF', link: 'https://stockanalysis.com/etf/vnq/holdings/' },
            { code: 'VPU', name: '公用事業ETF', link: 'https://stockanalysis.com/etf/vpu/holdings/' },
            { code: 'VOX', name: '通訊服務ETF', link: 'https://stockanalysis.com/etf/vox/holdings/' },
        ];

        console.log('%c📊 Vanguard ETFs Data Source:', 'font-weight: bold; font-size: 14px; color: #0FEDBE;');
        vanguardETFs.forEach(etf => {
            console.log(`%c${etf.code}%c ${etf.name}`, 
                'font-weight: bold; color: #60A5FA;',
                'color: #9CA3AF;',
                etf.link
            );
        });
    }, []);

    return (
        <div className="flex min-h-screen home-wrapper">
            <section className="grid w-full gap-8 home-section">
                <div className="md:col-span-1 xl:col-span-1">
                    <TradingViewWidget
                        title="ETF Market Overview"
                        hiddenLinks={[
                            {
                                text: 'ETFs',
                                urls: [
                                    'https://www.macromicro.me/etf'
                                ]
                            }
                        ]}
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
                        hiddenLinks={[
                            {
                                text: 'Country',
                                urls: [
                                    'https://finviz.com/screener.ashx?v=711&t=CNYA,EWG,EWJ,INDA,EWU,EWQ,EWI,EWC,EWZ,EWW,EWA,EWP,EWY,EIDO,TUR,KSA,EWN,EWL,EPOL,EWT,EWK,ARGT,EWD,EIRL,EWS,EIS,UAE,THD,EWO,NORW,VNM,EPHE,EDEN,EWM,COLO,EWH,EZA,ACWI&show_etf=true'
                                ]
                            },
                            {
                                text: 'Vanguard',
                                urls: [
                                    'https://finviz.com/screener.ashx?v=711&t=VT,VTI,VOO,VEA,VWO,BND,VNQ,VXUS,VIG,VYM,VUG,VTV,VO,VB,VIGI,VTEB,VGLT,VGSH,VCSH,VCIT,VCLT,VCR,VDC,VFH,VHT,VIS,VPU,VOX,VAW,VDE,VPL,VGK,VSS,VGT,VIOG,VIOV,VIOO,VOE,VOT,VXF,VBR,VBK&show_etf=true'
                                ]
                            }
                        ]}
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
