export const NAV_ITEMS = [
    { href: '/', label: 'S&P 500' },
    { href: '/etf', label: 'ETF' },
    { href: '/search', label: 'Search' },
    // { href: '/watchlist', label: 'Watchlist' },
];

export const ALERT_TYPE_OPTIONS = [
    { value: 'upper', label: 'Upper' },
    { value: 'lower', label: 'Lower' },
];

export const CONDITION_OPTIONS = [
    { value: 'greater', label: 'Greater than (>)' },
    { value: 'less', label: 'Less than (<)' },
];

// TradingView Charts
export const MARKET_OVERVIEW_WIDGET_CONFIG = {
    colorTheme: 'dark', // dark mode
    dateRange: '12M', // last 12 months
    locale: 'en', // language
    largeChartUrl: '', // link to a large chart if needed
    isTransparent: true, // makes background transparent
    showFloatingTooltip: true, // show tooltip on hover
    plotLineColorGrowing: '#0FEDBE', // line color when price goes up
    plotLineColorFalling: '#0FEDBE', // line color when price falls
    gridLineColor: 'rgba(240, 243, 250, 0)', // grid line color
    scaleFontColor: '#DBDBDB', // font color for scale
    belowLineFillColorGrowing: 'rgba(41, 98, 255, 0.12)', // fill under line when growing
    belowLineFillColorFalling: 'rgba(41, 98, 255, 0.12)', // fill under line when falling
    belowLineFillColorGrowingBottom: 'rgba(41, 98, 255, 0)',
    belowLineFillColorFallingBottom: 'rgba(41, 98, 255, 0)',
    symbolActiveColor: 'rgba(15, 237, 190, 0.05)', // highlight color for active symbol
    tabs: [
        {
            title: 'Financial',
            symbols: [
                { s: 'NYSE:BRK.B', d: 'Berkshire Hathaway Inc' },
                { s: 'NYSE:JPM', d: 'JPMorgan Chase' },
                { s: 'NYSE:V', d: 'Visa Inc' },
                { s: 'NYSE:MA', d: 'Mastercard Incorporated' },
                { s: 'NYSE:BAC', d: 'Bank Amer Corp' },
                { s: 'NYSE:WFC', d: 'Wells Fargo Co New' },
                { s: 'NYSE:C', d: 'Citigroup Inc' },
            ],
        },
        {
            title: 'Technology',
            symbols: [
                { s: 'NASDAQ:AAPL', d: 'Apple' },
                { s: 'NASDAQ:GOOGL', d: 'Alphabet' },
                { s: 'NASDAQ:MSFT', d: 'Microsoft' },
                { s: 'NASDAQ:META', d: 'Meta Platforms' },
                { s: 'NYSE:ORCL', d: 'Oracle Corp' },
                { s: 'NASDAQ:INTC', d: 'Intel Corp' },
            ],
        },
        {
            title: 'Services',
            symbols: [
                { s: 'NASDAQ:AMZN', d: 'Amazon' },
                { s: 'NYSE:BABA', d: 'Alibaba Group Hldg Ltd' },
                { s: 'NYSE:T', d: 'At&t Inc' },
                { s: 'NYSE:WMT', d: 'Walmart' },
                { s: 'NYSE:V', d: 'Visa' },
            ],
        },
    ],
    support_host: 'https://www.tradingview.com', // TradingView host
    backgroundColor: '#141414', // background color
    width: '100%', // full width
    height: 600, // height in px
    showSymbolLogo: true, // show logo next to symbols
    showChart: true, // display mini chart
};

export const HEATMAP_WIDGET_CONFIG = {
    dataSource: 'SPX500',
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

// ETF Widget Configs
export const ETF_MARKET_OVERVIEW_WIDGET_CONFIG = {
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
            title: 'Index ETFs',
            symbols: [
                { s: 'AMEX:SPY', d: 'SPDR S&P 500 ETF' },
                { s: 'NASDAQ:QQQ', d: 'Invesco QQQ Trust' },
                { s: 'AMEX:DIA', d: 'SPDR Dow Jones Industrial Average ETF' },
                { s: 'AMEX:IWM', d: 'iShares Russell 2000 ETF' },
                { s: 'AMEX:VTI', d: 'Vanguard Total Stock Market ETF' },
                { s: 'NASDAQ:VOO', d: 'Vanguard S&P 500 ETF' },
            ],
        },
        {
            title: 'SPDR', // SPDR Sector ETFs
            symbols: [
                { s: 'AMEX:XLK', d: 'Technology Select Sector SPDR Fund' },           // 科技
                { s: 'AMEX:XLF', d: 'Financial Select Sector SPDR Fund' },            // 金融
                { s: 'AMEX:XLE', d: 'Energy Select Sector SPDR Fund' },               // 能源
                { s: 'AMEX:XLV', d: 'Health Care Select Sector SPDR Fund' },          // 醫療保健
                { s: 'AMEX:XLI', d: 'Industrial Select Sector SPDR Fund' },           // 工業
                { s: 'AMEX:XLP', d: 'Consumer Staples Select Sector SPDR Fund' },     // 必需消費
                { s: 'AMEX:XLY', d: 'Consumer Discretionary Select Sector SPDR Fund' }, // 非必需消費
                { s: 'AMEX:XLB', d: 'Materials Select Sector SPDR Fund' },            // 原物料
                { s: 'AMEX:XLRE', d: 'Real Estate Select Sector SPDR Fund' },         // 不動產
                { s: 'AMEX:XLU', d: 'Utilities Select Sector SPDR Fund' },            // 公用事業
                { s: 'AMEX:XLC', d: 'Communication Services Select Sector SPDR Fund' } // 通訊服務
            ],
        },
        {
            title: 'Vanguard', // Vanguard Sector ETFs
            symbols: [
                { s: 'AMEX:VGT', d: 'Vanguard Information Technology ETF' },     // 科技
                { s: 'AMEX:VFH', d: 'Vanguard Financials ETF' },                 // 金融
                { s: 'AMEX:VDE', d: 'Vanguard Energy ETF' },                     // 能源
                { s: 'AMEX:VHT', d: 'Vanguard Health Care ETF' },                // 醫療保健
                { s: 'AMEX:VIS', d: 'Vanguard Industrials ETF' },                // 工業
                { s: 'AMEX:VDC', d: 'Vanguard Consumer Staples ETF' },           // 必需消費
                { s: 'AMEX:VCR', d: 'Vanguard Consumer Discretionary ETF' },     // 非必需消費
                { s: 'AMEX:VAW', d: 'Vanguard Materials ETF' },                  // 原物料
                { s: 'AMEX:VNQ', d: 'Vanguard Real Estate ETF' },                // 不動產
                { s: 'AMEX:VPU', d: 'Vanguard Utilities ETF' },                  // 公用事業
                { s: 'AMEX:VOX', d: 'Vanguard Communication Services ETF' }      // 通訊服務
            ],
        },
        {
            title: 'iShares', // iShares Sector ETFs
            symbols: [
                { s: 'AMEX:IYW', d: 'iShares U.S. Technology ETF' },             // 科技
                { s: 'AMEX:IYF', d: 'iShares U.S. Financials ETF' },             // 金融
                { s: 'AMEX:IYE', d: 'iShares U.S. Energy ETF' },                 // 能源
                { s: 'AMEX:IYH', d: 'iShares U.S. Healthcare ETF' },             // 醫療保健
                { s: 'AMEX:IYJ', d: 'iShares U.S. Industrials ETF' },            // 工業
                { s: 'AMEX:IYK', d: 'iShares U.S. Consumer Staples ETF' },       // 必需消費
                { s: 'AMEX:IYC', d: 'iShares U.S. Consumer Discretionary ETF' }, // 非必需消費
                { s: 'AMEX:IYM', d: 'iShares U.S. Basic Materials ETF' },        // 原物料
                { s: 'AMEX:IYR', d: 'iShares U.S. Real Estate ETF' },            // 不動產
                { s: 'AMEX:IDU', d: 'iShares U.S. Utilities ETF' },              // 公用事業
                { s: 'AMEX:IYZ', d: 'iShares U.S. Telecommunications ETF' }      // 通訊服務
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

export const ETF_HEATMAP_WIDGET_CONFIG = {
    dataSource: 'AllUSEtf',
    blockSize: 'aum',
    blockColor: 'change',
    grouping: 'asset_class',
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

export const ETF_MARKET_DATA_WIDGET_CONFIG = {
    title: 'ETFs',
    width: '100%',
    height: 600,
    locale: 'en',
    showSymbolLogo: true,
    colorTheme: 'dark',
    isTransparent: false,
    backgroundColor: '#0F0F0F',
    symbolsGroups: [
        {
            name: 'SPY',
            sourceUrl: 'https://stockanalysis.com/etf/spy/holdings/',
            symbols: [
                { name: 'NASDAQ:NVDA', displayName: 'NVIDIA Corporation' },
                { name: 'NASDAQ:MSFT', displayName: 'Microsoft Corporation' },
                { name: 'NASDAQ:AAPL', displayName: 'Apple Inc' },
                { name: 'NASDAQ:AMZN', displayName: 'Amazon.com, Inc.' },
                { name: 'NASDAQ:AVGO', displayName: 'Broadcom Inc.' },
                { name: 'NASDAQ:META', displayName: 'Meta Platforms, Inc.' },
                { name: 'NASDAQ:GOOGL', displayName: 'Alphabet Inc.' },
                { name: 'NASDAQ:TSLA', displayName: 'Tesla, Inc.' },
                { name: 'NASDAQ:GOOG', displayName: 'Alphabet Inc.' },
                { name: 'NYSE:BRK.B', displayName: 'Berkshire Hathaway Inc.' },
            ],
        },
        {
            name: 'QQQ',
            sourceUrl: 'https://stockanalysis.com/etf/qqq/holdings/',
            symbols: [
                { name: 'NASDAQ:NVDA', displayName: 'NVIDIA Corporation' },
                { name: 'NASDAQ:MSFT', displayName: 'Microsoft Corporation' },
                { name: 'NASDAQ:AAPL', displayName: 'Apple Inc.' },
                { name: 'NASDAQ:AVGO', displayName: 'Broadcom Inc.' },
                { name: 'NASDAQ:AMZN', displayName: 'Amazon.com, Inc.' },
                { name: 'NASDAQ:META', displayName: 'Meta Platforms, Inc.' },
                { name: 'NASDAQ:TSLA', displayName: 'Tesla, Inc.' },
                { name: 'NASDAQ:GOOGL', displayName: 'Alphabet Inc.' },
                { name: 'NASDAQ:GOOG', displayName: 'Alphabet Inc.' },
                { name: 'NASDAQ:NFLX', displayName: 'Netflix, Inc.' },
            ],
        },
        {
            name: 'DIA',
            sourceUrl: 'https://stockanalysis.com/etf/dia/holdings/',
            symbols: [
                { name: 'NYSE:GS', displayName: 'The Goldman Sachs Group, Inc.' },
                { name: 'NASDAQ:MSFT', displayName: 'Microsoft Corporation' },
                { name: 'NYSE:CAT', displayName: 'Caterpillar Inc.' },
                { name: 'NYSE:HD', displayName: 'The Home Depot, Inc.' },
                { name: 'NYSE:UNH', displayName: 'UnitedHealth Group Incorporated' },
                { name: 'NYSE:V', displayName: 'Visa Inc.' },
                { name: 'NYSE:SHW', displayName: 'The Sherwin-Williams Company' },
                { name: 'NYSE:AXP', displayName: 'American Express Company' },
                { name: 'NYSE:JPM', displayName: 'JPMorgan Chase & Co.' },
                { name: 'NASDAQ:AMGN', displayName: 'Amgen Inc.' },
            ],
        },
    ],
};

export const ETF_TOP_STORIES_WIDGET_CONFIG = {
    displayMode: 'regular',
    feedMode: 'market',
    colorTheme: 'dark',
    isTransparent: true,
    locale: 'en',
    market: 'index',
    width: '100%',
    height: '600',
};

export const TOP_STORIES_WIDGET_CONFIG = {
    displayMode: 'regular',
    feedMode: 'market',
    colorTheme: 'dark',
    isTransparent: true,
    locale: 'en',
    market: 'stock',
    width: '100%',
    height: '600',
};

export const MARKET_DATA_WIDGET_CONFIG = {
    title: 'Stocks',
    width: '100%',
    height: 600,
    locale: 'en',
    showSymbolLogo: true,
    colorTheme: 'dark',
    isTransparent: false,
    backgroundColor: '#0F0F0F',
    symbolsGroups: [
        {
            name: 'Financial',
            symbols: [
                { name: 'NYSE:JPM', displayName: 'JPMorgan Chase' },
                { name: 'NYSE:WFC', displayName: 'Wells Fargo Co New' },
                { name: 'NYSE:BAC', displayName: 'Bank Amer Corp' },
                { name: 'NYSE:HSBC', displayName: 'Hsbc Hldgs Plc' },
                { name: 'NYSE:C', displayName: 'Citigroup Inc' },
                { name: 'NYSE:MA', displayName: 'Mastercard Incorporated' },
            ],
        },
        {
            name: 'Technology',
            symbols: [
                { name: 'NASDAQ:AAPL', displayName: 'Apple' },
                { name: 'NASDAQ:GOOGL', displayName: 'Alphabet' },
                { name: 'NASDAQ:MSFT', displayName: 'Microsoft' },
                { name: 'NASDAQ:FB', displayName: 'Meta Platforms' },
                { name: 'NYSE:ORCL', displayName: 'Oracle Corp' },
                { name: 'NASDAQ:INTC', displayName: 'Intel Corp' },
            ],
        },
        {
            name: 'Services',
            symbols: [
                { name: 'NASDAQ:AMZN', displayName: 'Amazon' },
                { name: 'NYSE:BABA', displayName: 'Alibaba Group Hldg Ltd' },
                { name: 'NYSE:T', displayName: 'At&t Inc' },
                { name: 'NYSE:WMT', displayName: 'Walmart' },
                { name: 'NYSE:V', displayName: 'Visa' },
            ],
        },
    ],
};

export const SYMBOL_INFO_WIDGET_CONFIG = (symbol: string) => ({
    symbol: symbol.toUpperCase(),
    colorTheme: 'dark',
    isTransparent: true,
    locale: 'en',
    width: '100%',
    height: 170,
});

export const CANDLE_CHART_WIDGET_CONFIG = (symbol: string) => ({
    allow_symbol_change: false,
    calendar: false,
    details: true,
    hide_side_toolbar: true,
    hide_top_toolbar: false,
    hide_legend: false,
    hide_volume: false,
    hotlist: false,
    interval: 'D',
    locale: 'en',
    save_image: false,
    style: 1,
    symbol: symbol.toUpperCase(),
    theme: 'dark',
    timezone: 'Etc/UTC',
    backgroundColor: '#141414',
    gridColor: '#141414',
    watchlist: [],
    withdateranges: false,
    compareSymbols: [],
    studies: [],
    width: '100%',
    height: 600,
});

export const BASELINE_WIDGET_CONFIG = (symbol: string) => ({
    allow_symbol_change: false,
    calendar: false,
    details: false,
    hide_side_toolbar: true,
    hide_top_toolbar: false,
    hide_legend: false,
    hide_volume: false,
    hotlist: false,
    interval: 'D',
    locale: 'en',
    save_image: false,
    style: 10,
    symbol: symbol.toUpperCase(),
    theme: 'dark',
    timezone: 'Etc/UTC',
    backgroundColor: '#141414',
    gridColor: '#141414',
    watchlist: [],
    withdateranges: false,
    compareSymbols: [],
    studies: [],
    width: '100%',
    height: 600,
});

export const TECHNICAL_ANALYSIS_WIDGET_CONFIG = (symbol: string) => ({
    symbol: symbol.toUpperCase(),
    colorTheme: 'dark',
    isTransparent: 'true',
    locale: 'en',
    width: '100%',
    height: 400,
    interval: '1h',
    largeChartUrl: '',
});

export const COMPANY_PROFILE_WIDGET_CONFIG = (symbol: string) => ({
    symbol: symbol.toUpperCase(),
    colorTheme: 'dark',
    isTransparent: 'true',
    locale: 'en',
    width: '100%',
    height: 440,
});

export const COMPANY_FINANCIALS_WIDGET_CONFIG = (symbol: string) => ({
    symbol: symbol.toUpperCase(),
    colorTheme: 'dark',
    isTransparent: 'true',
    locale: 'en',
    width: '100%',
    height: 464,
    displayMode: 'regular',
    largeChartUrl: '',
});

export const POPULAR_STOCK_SYMBOLS = [
    // Tech Giants (the big technology companies)
    'AAPL',
    'MSFT',
    'GOOGL',
    'AMZN',
    'TSLA',
    'META',
    'NVDA',
    'NFLX',
    'ORCL',
    'CRM',

    // Growing Tech Companies
    'ADBE',
    'INTC',
    'AMD',
    'PYPL',
    'UBER',
    'ZOOM',
    'SPOT',
    'SQ',
    'SHOP',
    'ROKU',

    // Newer Tech Companies
    'SNOW',
    'PLTR',
    'COIN',
    'RBLX',
    'DDOG',
    'CRWD',
    'NET',
    'OKTA',
    'TWLO',
    'ZM',

    // Consumer & Delivery Apps
    'DOCU',
    'PTON',
    'PINS',
    'SNAP',
    'LYFT',
    'DASH',
    'ABNB',
    'RIVN',
    'LCID',
    'NIO',

    // International Companies
    'XPEV',
    'LI',
    'BABA',
    'JD',
    'PDD',
    'TME',
    'BILI',
    'DIDI',
    'GRAB',
    'SE',
];

export const NO_MARKET_NEWS =
    '<p class="mobile-text" style="margin:0 0 20px 0;font-size:16px;line-height:1.6;color:#4b5563;">No market news available today. Please check back tomorrow.</p>';

export const WATCHLIST_TABLE_HEADER = [
    'Company',
    'Symbol',
    'Price',
    'Change',
    'Market Cap',
    'P/E Ratio',
    'Alert',
    'Action',
];