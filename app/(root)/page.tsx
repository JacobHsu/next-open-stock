import TradingViewWidget from "@/components/TradingViewWidget";
import ETFMarketDataWidget from "@/components/ETFMarketDataWidget";
import {
    HEATMAP_WIDGET_CONFIG,
    MARKET_DATA_WIDGET_CONFIG,
    MARKET_OVERVIEW_WIDGET_CONFIG,
    TOP_STORIES_WIDGET_CONFIG,
    TICKER_TAPE_WIDGET_CONFIG
} from "@/lib/constants";

const Home = () => {
    const scriptUrl = `https://s3.tradingview.com/external-embedding/embed-widget-`;

    return (
        <div className="flex min-h-screen home-wrapper">
            <section className="grid w-full gap-8 home-section">
                <div className="md:col-span-1 xl:col-span-1">
                    <TradingViewWidget
                        title="Market Overview"
                        scriptUrl={`${scriptUrl}market-overview.js`}
                        config={MARKET_OVERVIEW_WIDGET_CONFIG}
                        className="custom-chart"
                        height={600}
                    />
                </div>
                <div className="md-col-span xl:col-span-2">
                    <TradingViewWidget
                        title="S&P 500 Heatmap"
                        titleLink="https://finviz.com/map.ashx?t=sec"
                        hiddenLinks={[
                            {
                                text: 'VTI',
                                urls: [
                                    'https://finviz.com/screener.ashx?v=711&t=NVDA,MSFT,AAPL,AMZN,META,AVGO,GOOGL,TSLA,GOOG,BRK-B,JPM,LLY,V,NFLX,XOM,ORCL,MA,WMT,JNJ,COST,ABBV,HD,PLTR,PG,UNH,BAC,CVX,GE,WFC,IBM,AMD,PM,CSCO,ABT,GS,CAT,LIN,KO,RTX,MCD,MRK,CRM,DIS,UBER,T,MS,PEP,NOW,INTU,MU&show_etf=true',
                                    'https://finviz.com/screener.ashx?v=711&t=QCOM,TMO,APP,BKNG,C,GEV,SCHW,TXN,VZ,LRCX,TJX,ISRG,BA,BLK,AXP,AMAT,AMGN,ACN,APH,SPGI,NEE,PFE,PGR,ADBE,ANET,ETN,KLAC,BSX,LOW,UNP,PANW,COF,INTC,GILD,HON,DHR,BX,SYK,WELL,MDT,ADI,ADP,CMCSA,COP,CRWD,DE,LMT,MO,TMUS,HOOD&show_etf=true',
                                    'https://finviz.com/screener.ashx?v=711&t=CB,CEG,SO,VRTX,PLD,PH,MMC,MCK,SBUX,TT,CDNS,CME,CVS,ICE,DUK,DASH,AMT,BMY,SNPS,WM,KKR,NEM,NOC,ORLY,RBLX,NKE,MSTR,MMM,MDLZ,CRH,GD,EQIX,HWM,CI,BK,AJG,MSI,RCL,PNC,WMB,USB,SHW,TDG,SNOW,MRVL,MCO,AON,ADSK,AZO,COIN&show_etf=true',
                                    'https://finviz.com/screener.ashx?v=711&t=CTAS,ITW,JCI,HCA,ECL,ELV,EMR,EOG,GLW,CSX,CL,NET,PWR,PYPL,NSC,TEL,TRV,URI,UPS,VST,VRT,ZTS,TFC,SPG,SRE,O,REGN,PSX,MPC,MAR,LHX,CMI,COR,AEP,AFL,APD,ALNY,ALL,GM,HLT,DLR,FTNT,FAST,FCX,FDX,EA,KMI,IDXX,BDX&show_etf=true'
                                ]
                            }
                        ]}
                        scriptUrl={`${scriptUrl}stock-heatmap.js`}
                        config={HEATMAP_WIDGET_CONFIG}
                        height={600}
                    />
                </div>
            </section>
            <section className="grid w-full gap-8 home-section">
                <div className="h-full md:col-span-1 xl:col-span-2">
                    <ETFMarketDataWidget
                        scriptUrl={`${scriptUrl}market-quotes.js`}
                        config={MARKET_DATA_WIDGET_CONFIG}
                        height={600}
                        showTopLosers={true}
                    />
                </div>
                <div className="h-full md:col-span-1 xl:col-span-1">
                    <TradingViewWidget
                        scriptUrl={`${scriptUrl}timeline.js`}
                        config={TOP_STORIES_WIDGET_CONFIG}
                        height={600}
                    />
                </div>

            </section>
        </div>
    )
}

export default Home;