// Nasdaq 100 Page Configuration

export const NASDAQ100_MARKET_OVERVIEW_WIDGET_CONFIG = {
    colorTheme: 'dark',
    dateRange: '12M',
    locale: 'en',
    largeChartUrl: '',
    isTransparent: true,
    showFloatingTooltip: true,
    plotLineColorGrowing: '#0FEDBE',
    plotLineColorFalling: '#0FEDBE',
    gridLineColor: 'rgba(240, 243, 250, 0)',
    scaleFontColor: '#DBDBDB',
    belowLineFillColorGrowing: 'rgba(41, 98, 255, 0.12)',
    belowLineFillColorFalling: 'rgba(41, 98, 255, 0.12)',
    belowLineFillColorGrowingBottom: 'rgba(41, 98, 255, 0)',
    belowLineFillColorFallingBottom: 'rgba(41, 98, 255, 0)',
    symbolActiveColor: 'rgba(15, 237, 190, 0.05)',
    tabs: [
        {
            title: 'Taiwan Related',
            symbols: [
                { s: 'NASDAQ:QQQ', d: 'Invesco QQQ Trust' },
                { s: 'AMEX:UUP', d: 'Invesco DB US Dollar Index Bullish Fund' },
                { s: 'AMEX:EWT', d: 'iShares MSCI Taiwan ETF' },
                { s: 'NYSE:TSM', d: 'Taiwan Semiconductor Manufacturing' }, // 台積電
                { s: 'NYSE:UMC', d: 'United Microelectronics Corp' }, // 聯電
                { s: 'NYSE:CHT', d: 'Chunghwa Telecom' }, // 中華電信
                { s: 'NYSE:ASX', d: 'ASE Technology Holding' }, //  日月光
                { s: 'NYSE:HMC', d: 'Hon Hai Precision (Foxconn)' }, // 鴻海 (Foxconn)
                { s: 'NASDAQ:HTHT', d: 'Himax Technologies' }, // 奇景光電
            ],
        },
        {
            title: 'Technology',
            symbols: [
                { s: 'NASDAQ:NVDA', d: 'NVIDIA Corporation' },
                { s: 'NASDAQ:MSFT', d: 'Microsoft Corporation' },
                { s: 'NASDAQ:AAPL', d: 'Apple Inc' },
                { s: 'NASDAQ:AVGO', d: 'Broadcom Inc' },
                { s: 'NASDAQ:GOOGL', d: 'Alphabet Inc' },
                { s: 'NASDAQ:TSLA', d: 'Tesla Inc' },
                { s: 'NASDAQ:GOOG', d: 'Alphabet Inc' },
                { s: 'NYSE:ORCL', d: 'Oracle Corporation' },
                { s: 'NASDAQ:AMD', d: 'Advanced Micro Devices' },
            ],
        },
        {
            title: 'Services',
            symbols: [
                { s: 'NASDAQ:META', d: 'Meta Platforms Inc' },
                { s: 'NASDAQ:NFLX', d: 'Netflix Inc' },
                { s: 'NASDAQ:PLTR', d: 'Palantir Technologies Inc' },
                { s: 'NASDAQ:PEP', d: 'PepsiCo Inc' },
                { s: 'NASDAQ:TMUS', d: 'T-Mobile US Inc' },
                { s: 'NASDAQ:LIN', d: 'Linde plc' },
                { s: 'NASDAQ:MU', d: 'Micron Technology Inc' },
            ],
        },
        {
            title: 'Retail',
            symbols: [
                { s: 'NASDAQ:AMZN', d: 'Amazon.com Inc' },
                { s: 'NASDAQ:CSCO', d: 'Cisco Systems Inc' },
                { s: 'NASDAQ:SHOP', d: 'Shopify Inc' },
                { s: 'NASDAQ:COST', d: 'Costco Wholesale Corp' },
                { s: 'NASDAQ:SBUX', d: 'Starbucks Corporation' },
                { s: 'NASDAQ:ABNB', d: 'Airbnb Inc' },
                { s: 'NASDAQ:BKNG', d: 'Booking Holdings Inc' },
            ],
        },
    ],
    support_host: 'https://www.tradingview.com',
    backgroundColor: '#141414',
    width: '100%',
    height: 600,
    showSymbolLogo: true,
    showChart: true,
};

export const NASDAQ100_HEATMAP_WIDGET_CONFIG = {
    dataSource: 'NASDAQ100',
    blockSize: 'market_cap_basic',
    blockColor: 'change',
    grouping: 'sector',
    isTransparent: true,
    locale: 'en',
    symbolUrl: '',
    colorTheme: 'dark',
    exchanges: [],
    hasTopBar: false,
    isDataSetEnabled: false,
    isZoomEnabled: true,
    hasSymbolTooltip: true,
    isMonoSize: false,
    width: '100%',
    height: '600',
};

export const NASDAQ100_MARKET_DATA_WIDGET_CONFIG = {
    title: 'Nasdaq 100 Stocks',
    width: '100%',
    height: 600,
    locale: 'en',
    showSymbolLogo: true,
    colorTheme: 'dark',
    isTransparent: false,
    backgroundColor: '#0F0F0F',
    symbolsGroups: [
        {
            name: 'QQQ',
            sourceUrl: 'https://stockanalysis.com/etf/qqq/holdings/',
            symbols: [
                { name: 'NASDAQ:NVDA', displayName: 'NVDA - NVIDIA Corporation (9.87%)' },
                { name: 'NASDAQ:MSFT', displayName: 'MSFT - Microsoft Corporation (8.42%)' },
                { name: 'NASDAQ:AAPL', displayName: 'AAPL - Apple Inc. (8.07%)' },
                { name: 'NASDAQ:AVGO', displayName: 'AVGO - Broadcom Inc. (5.60%)' },
                { name: 'NASDAQ:AMZN', displayName: 'AMZN - Amazon.com, Inc. (5.12%)' },
                { name: 'NASDAQ:META', displayName: 'META - Meta Platforms, Inc. (3.39%)' },
                { name: 'NASDAQ:TSLA', displayName: 'TSLA - Tesla, Inc. (3.34%)' },
                { name: 'NASDAQ:GOOGL', displayName: 'GOOGL - Alphabet Inc. (3.05%)' },
                { name: 'NASDAQ:GOOG', displayName: 'GOOG - Alphabet Inc. (2.86%)' },
                { name: 'NASDAQ:NFLX', displayName: 'NFLX - Netflix, Inc. (2.83%)' },
                { name: 'NASDAQ:COST', displayName: 'COST - Costco Wholesale Corporation (2.25%)' },
                { name: 'NASDAQ:PLTR', displayName: 'PLTR - Palantir Technologies Inc. (2.18%)' },
                { name: 'NASDAQ:AMD', displayName: 'AMD - Advanced Micro Devices, Inc. (1.90%)' },
                { name: 'NASDAQ:CSCO', displayName: 'CSCO - Cisco Systems, Inc. (1.47%)' },
                { name: 'NASDAQ:TMUS', displayName: 'TMUS - T-Mobile US, Inc. (1.40%)' },
                { name: 'NASDAQ:LIN', displayName: 'LIN - Linde plc (1.16%)' },
                { name: 'NASDAQ:PEP', displayName: 'PEP - PepsiCo, Inc. (1.12%)' },
                { name: 'NASDAQ:MU', displayName: 'MU - Micron Technology, Inc. (1.11%)' },
                { name: 'NASDAQ:SHOP', displayName: 'SHOP - Shopify Inc. (1.01%)' },
                { name: 'NASDAQ:INTU', displayName: 'INTU - Intuit Inc. (0.98%)' },
                { name: 'NASDAQ:APP', displayName: 'APP - AppLovin Corporation (0.96%)' },
                { name: 'NASDAQ:BKNG', displayName: 'BKNG - Booking Holdings Inc. (0.91%)' },
                { name: 'NASDAQ:AMAT', displayName: 'AMAT - Applied Materials, Inc. (0.91%)' },
                { name: 'NASDAQ:LRCX', displayName: 'LRCX - Lam Research Corporation (0.91%)' },
                { name: 'NASDAQ:QCOM', displayName: 'QCOM - QUALCOMM Incorporated (0.90%)' },
            ],
        },
        {
            name: 'EWT',
            sourceUrl: 'https://stockanalysis.com/etf/ewt/holdings/',
            symbols: [
                { name: 'NYSE:TSM', displayName: 'TSM - Taiwan Semiconductor Manufacturing' },
                { name: 'NYSE:UMC', displayName: 'UMC - United Microelectronics Corp' },
                { name: 'NYSE:CHT', displayName: 'CHT - Chunghwa Telecom' },
                { name: 'NYSE:ASX', displayName: 'ASX - ASE Technology Holding' },
                { name: 'NASDAQ:HTHT', displayName: 'HTHT - Himax Technologies' },
            ],
        },
        {
            name: 'TSM',
            sourceUrl: 'https://www.quiverquant.com/etfholdings/',
            symbols: [
                { name: 'AMEX:VEU', displayName: 'VEU - Vanguard FTSE All-World ex-US ETF' },
                { name: 'NASDAQ:SMH', displayName: 'SMH - VanEck Semiconductor ETF' },
                { name: 'AMEX:CGGR', displayName: 'CGGR - Capital Group Growth ETF' },
                { name: 'NASDAQ:SOXX', displayName: 'SOXX - iShares Semiconductor ETF' },
                { name: 'AMEX:AVEM', displayName: 'AVEM - Avantis Emerging Markets Equity ETF' },
                { name: 'AMEX:DFAX', displayName: 'DFAX - Dimensional World ex U.S. Core Equity 2 ETF' },
                { name: 'AMEX:ARKK', displayName: 'ARKK - ARK Innovation ETF' },
                { name: 'AMEX:JGRO', displayName: 'JGRO - JPMorgan Active Growth ETF' },
                { name: 'NASDAQ:JGLO', displayName: 'JGLO - JPMorgan Global Equity ETF' },
                { name: 'NASDAQ:AIQ', displayName: 'AIQ - Global X Future Analytics Tech ETF' },
                { name: 'AMEX:TCAF', displayName: 'TCAF - T. Rowe Price Capital Appreciation Equity ETF' },
                { name: 'AMEX:FBCG', displayName: 'FBCG - Fidelity Blue Chip Growth ETF' },
                { name: 'AMEX:JAVA', displayName: 'JAVA - JPMorgan Active Value ETF' },
                { name: 'NASDAQ:TDIV', displayName: 'TDIV - First Trust NASDAQ Technology Dividend Index Fund' },
                { name: 'AMEX:CGDG', displayName: 'CGDG - Capital Group Dividend Growers ETF' },
                { name: 'AMEX:FRDM', displayName: 'FRDM - Alpha Architect Freedom 100 Emerging Market ETF' },
                { name: 'AMEX:SPGM', displayName: 'SPGM - SPDR Portfolio MSCI Global Stock Market ETF' },
                { name: 'AMEX:CGIE', displayName: 'CGIE - Capital Group International Equity ETF' },
                { name: 'AMEX:CWI', displayName: 'CWI - SPDR MSCI ACWI ex-US ETF' },
            ],
        },
    ],
};

export const NASDAQ100_TOP_STORIES_WIDGET_CONFIG = {
    displayMode: 'regular',
    feedMode: 'market',
    colorTheme: 'dark',
    isTransparent: true,
    locale: 'en',
    market: 'stock',
    width: '100%',
    height: '600',
};

export const NASDAQ100_TICKER_TAPE_WIDGET_CONFIG = {
    symbols: [
        {
            proName: 'NASDAQ:NDX',
            title: 'Nasdaq 100 Index'
        },
        {
            proName: 'NASDAQ:IXIC',
            title: 'Nasdaq Composite'
        },
        {
            proName: 'NASDAQ:SMH',
            title: 'SMH'
        },
    ],
    showSymbolLogo: true,
    isTransparent: true,
    displayMode: 'adaptive',
    colorTheme: 'dark',
    locale: 'en',
    width: '100%',
    height: 46,
};
