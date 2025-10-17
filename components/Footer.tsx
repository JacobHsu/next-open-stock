'use client';

import { usePathname } from "next/navigation";
import OpenDevSocietyBranding from "./OpenDevSocietyBranding";
import TradingViewWidget from "./TradingViewWidget";
import {
    TICKER_TAPE_WIDGET_CONFIG,
    NASDAQ100_TICKER_TAPE_WIDGET_CONFIG,
    DOW30_TICKER_TAPE_WIDGET_CONFIG,
    ETF_TICKER_TAPE_WIDGET_CONFIG,
    CRYPTO_TICKER_TAPE_WIDGET_CONFIG
} from "@/lib/constants";

const Footer = () => {
    const pathname = usePathname();
    const scriptUrl = `https://s3.tradingview.com/external-embedding/embed-widget-`;

    // 根據路徑選擇對應的跑馬燈配置
    const getTickerTapeConfig = () => {
        if (pathname === '/nasdaq100') return NASDAQ100_TICKER_TAPE_WIDGET_CONFIG;
        if (pathname === '/dow30') return DOW30_TICKER_TAPE_WIDGET_CONFIG;
        if (pathname === '/etf') return ETF_TICKER_TAPE_WIDGET_CONFIG;
        if (pathname === '/crypto') return CRYPTO_TICKER_TAPE_WIDGET_CONFIG;
        return TICKER_TAPE_WIDGET_CONFIG; // S&P 500 (default for home page)
    };

    const tickerTapeConfig = getTickerTapeConfig();

    return (
        <footer className="bg-gray-900 text-white border-t border-gray-800">
            <div className="container mx-auto px-4 py-4">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    {/* Copyright */}
                    <div className="text-gray-400 text-sm">
                        © {new Date().getFullYear()} Open Dev Society. All rights reserved.
                    </div>

                    {/* Ticker Tape */}
                    {tickerTapeConfig && (
                        <div className="flex-1 min-w-0">
                            <TradingViewWidget
                                scriptUrl={`${scriptUrl}ticker-tape.js`}
                                config={tickerTapeConfig}
                                height={46}
                            />
                        </div>
                    )}

                    {/* Open Dev Society Branding */}
                    <div className="flex items-center space-x-2">
                        <OpenDevSocietyBranding />
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
