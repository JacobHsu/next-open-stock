'use client';

import React, { memo, useEffect, useRef } from 'react';
import { cn } from "@/lib/utils";

interface TradingViewScreenerProps {
    height?: number;
    className?: string;
}

const TradingViewScreener = ({ height = 550, className }: TradingViewScreenerProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Clear previous content
        containerRef.current.innerHTML = '';

        const script = document.createElement('script');
        script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-screener.js';
        script.type = 'text/javascript';
        script.async = true;
        script.innerHTML = JSON.stringify({
            "width": "100%",
            "height": height,
            "defaultColumn": "overview",
            "defaultScreen": "earnings_this_week",
            "market": "america",
            "showToolbar": true,
            "colorTheme": "dark",
            "locale": "en"
        });

        containerRef.current.appendChild(script);

        return () => {
            if (containerRef.current) {
                containerRef.current.innerHTML = '';
            }
        };
    }, [height]);

    return (
        <div className={cn('w-full', className)}>
            <div className='tradingview-widget-container' ref={containerRef}>
                <div className="tradingview-widget-container__widget"></div>
            </div>
        </div>
    );
}

export default memo(TradingViewScreener);
