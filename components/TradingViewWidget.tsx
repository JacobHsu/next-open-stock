'use client';

import React, { memo } from 'react';
import useTradingViewWidget from "@/hooks/useTradingViewWidget";
import {cn} from "@/lib/utils";
import Link from "next/link";

interface TradingViewWidgetProps {
    title?: string;
    titleLink?: string;
    scriptUrl: string;
    config: Record<string, unknown>;
    height?: number;
    className?: string;
}

const TradingViewWidget = ({ title, titleLink, scriptUrl, config, height = 600, className }: TradingViewWidgetProps) => {
    const containerRef = useTradingViewWidget(scriptUrl, config, height);

    return (
        <div className="w-full">
            {title && (
                <h3 className="font-semibold text-2xl text-gray-100 mb-5">
                    {titleLink ? (
                        <Link
                            href={titleLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-400 transition-colors"
                        >
                            {title}
                        </Link>
                    ) : (
                        title
                    )}
                </h3>
            )}
            <div className={cn('tradingview-widget-container', className)} ref={containerRef}>
                <div className="tradingview-widget-container__widget" style={{ height, width: "100%" }} />
            </div>
        </div>
    );
}

export default memo(TradingViewWidget);