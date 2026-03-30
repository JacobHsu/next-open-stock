'use client';

import React from 'react';
import ETFMarketDataWidget from '@/components/ETFMarketDataWidget';
import { TPEX_MARKET_DATA_WIDGET_CONFIG } from '@/lib/constants';

const CUSTOM_GROUPS = [
    {
        title: 'TPEX 指數與 ETF',
        groupNames: ['ETFs', '富櫃50']
    },
    {
        title: '科技與電子業',
        groupNames: ['半導體業', '通信網路業', '光電業', '資訊服務業', '數位雲端', '其他電子業']
    },
    {
        title: '生醫、綠能與化工',
        groupNames: ['生技醫療', '綠能環保', '農業科技', '化學工業', '塑膠工業', '油電燃氣業']
    },
    {
        title: '傳產與民生',
        groupNames: ['建材營造', '航運業', '紡織纖維', '觀光餐旅', '文化創意業', '運動休閒', '居家生活', '其他']
    }
];

const TPEXPage = () => {
    const scriptUrl = `https://s3.tradingview.com/external-embedding/embed-widget-`;

    return (
        <div className="min-h-screen p-4 md:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-100 mb-2">TPEX</h1>
                    <p className="text-gray-400">台灣櫃買中心上櫃股票</p>
                </div>

                <div className="flex flex-col gap-10">
                    {CUSTOM_GROUPS.map((category, index) => {
                        // Find the corresponding groups from the original TPEX config
                        const groups = category.groupNames
                            .map(name => TPEX_MARKET_DATA_WIDGET_CONFIG.symbolsGroups?.find(g => g.name === name))
                            .filter((g): g is NonNullable<typeof g> => Boolean(g));
                            
                        return (
                            <div key={index} className="w-full">
                                <ETFMarketDataWidget
                                    scriptUrl={`${scriptUrl}market-quotes.js`}
                                    config={{
                                        ...TPEX_MARKET_DATA_WIDGET_CONFIG,
                                        title: category.title,
                                        symbolsGroups: groups
                                    }}
                                    height={600}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default TPEXPage;
