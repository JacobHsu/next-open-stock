// Re-export page-specific configs from their dedicated files
export * from './configs/sp500-config';
export * from './configs/nasdaq100-config';
export * from './configs/dow30-config';
export * from './configs/russell2000-config';
export * from './configs/etf-config';
export * from './configs/crypto-config';
export * from './configs/watchlist-config';

// Common Navigation
export const NAV_ITEMS = [
    { href: '/', label: 'S&P 500' },
    { href: '/nasdaq100', label: 'Nasdaq 100' },
    { href: '/dow30', label: 'Dow 30' },
    { href: '/russell2000', label: 'Russell 2000' },
    { href: '/etf', label: 'ETF' },
    { href: '/crypto', label: 'Crypto' },
    { href: '/search', label: 'Search' },
    { href: '/watchlist', label: 'Watchlist' },
];

// Alert Options
export const ALERT_TYPE_OPTIONS = [
    { value: 'upper', label: 'Upper' },
    { value: 'lower', label: 'Lower' },
];

export const CONDITION_OPTIONS = [
    { value: 'greater', label: 'Greater than (>)' },
    { value: 'less', label: 'Less than (<)' },
];

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
    studies: [
        "STD;Multi-Time%Period%Charts",
        "STD;MA%1Cross",
        "STD;PSAR",
    ],
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
    style: 10, // Baseline（基線圖） - 以基準線為中心，顯示價格偏離
    symbol: symbol.toUpperCase(),
    theme: 'dark',
    timezone: 'Etc/UTC',
    backgroundColor: '#141414',
    gridColor: '#141414',
    watchlist: [],
    withdateranges: false,
    compareSymbols: [],
    studies: [
        "MACD@tv-basicstudies",
        // "STD;Supertrend",
        "STD;Pivot%1Points%1High%1Low",
        "STD;VWMA",
        // "RSI@tv-basicstudies",
    ],
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

// Known exchange codes for ETF holdings validation
export const KNOWN_EXCHANGES = [
    'NYSE',
    'NASDAQ',
    'AMEX',
    'OTC',
    'BATS',
] as const;

export type ExchangeCode = typeof KNOWN_EXCHANGES[number];

// Map of known stock symbols to their exchanges (extends to 200+ major stocks)
export const STOCK_EXCHANGE_MAP: Record<string, ExchangeCode> = {
    // Tech Giants
    'AAPL': 'NASDAQ', 'MSFT': 'NASDAQ', 'GOOGL': 'NASDAQ', 'GOOG': 'NASDAQ',
    'AMZN': 'NASDAQ', 'META': 'NASDAQ', 'TSLA': 'NASDAQ', 'NVDA': 'NASDAQ',
    'AVGO': 'NASDAQ', 'ORCL': 'NASDAQ', 'CRM': 'NASDAQ', 'ADBE': 'NASDAQ',
    'AMD': 'NASDAQ', 'INTC': 'NASDAQ', 'CSCO': 'NASDAQ', 'QCOM': 'NASDAQ',
    'TXN': 'NASDAQ', 'PEP': 'NASDAQ', 'COST': 'NASDAQ', 'CMCSA': 'NASDAQ',
    'AMGN': 'NASDAQ', 'NFLX': 'NASDAQ', 'PYPL': 'NASDAQ', 'INTU': 'NASDAQ',
    'MU': 'NASDAQ', 'ADI': 'NASDAQ', 'LRCX': 'NASDAQ', 'AMAT': 'NASDAQ',
    'KLAC': 'NASDAQ', 'SNPS': 'NASDAQ', 'CDNS': 'NASDAQ', 'PANW': 'NASDAQ',
    'FTNT': 'NASDAQ', 'NOW': 'NASDAQ', 'UBER': 'NASDAQ', 'ABNB': 'NASDAQ',
    'BKNG': 'NASDAQ', 'ISRG': 'NASDAQ', 'VRTX': 'NASDAQ', 'REGN': 'NASDAQ',
    'BIIB': 'NASDAQ', 'ILMN': 'NASDAQ', 'DXCM': 'NASDAQ', 'MRVL': 'NASDAQ',
    'HPE': 'NASDAQ',
    // Financial
    'JPM': 'NYSE', 'BAC': 'NYSE', 'WFC': 'NYSE', 'C': 'NYSE', 'GS': 'NYSE',
    'MS': 'NYSE', 'BLK': 'NYSE', 'SCHW': 'NYSE', 'AXP': 'NYSE', 'BK': 'NYSE',
    'COF': 'NYSE', 'PNC': 'NYSE', 'TFC': 'NYSE', 'USB': 'NYSE', 'NTRS': 'NYSE',
    'SPGI': 'NYSE', 'MCO': 'NYSE', 'CME': 'NASDAQ', 'ICE': 'NYSE', 'AON': 'NYSE',
    'MET': 'NYSE', 'PRU': 'NYSE', 'AFL': 'NYSE', 'ALL': 'NYSE', 'TRV': 'NYSE',
    'CB': 'NYSE', 'PGR': 'NYSE', 'CI': 'NYSE', 'ELV': 'NYSE', 'HUM': 'NYSE',
    'MCK': 'NYSE', 'CAH': 'NYSE', 'CVS': 'NYSE', 'WMT': 'NYSE', 'TGT': 'NYSE',
    'HD': 'NYSE', 'LOW': 'NYSE', 'NKE': 'NYSE', 'TJX': 'NYSE', 'ROST': 'NYSE',
    'DLTR': 'NASDAQ', 'ORLY': 'NASDAQ', 'AZO': 'NASDAQ', 'ULTA': 'NASDAQ',
    'YUM': 'NYSE', 'MCD': 'NYSE', 'SBUX': 'NASDAQ', 'DRI': 'NYSE', 'CMG': 'NYSE',
    'MAR': 'NASDAQ', 'HLT': 'NYSE', 'RCL': 'NYSE', 'CCL': 'NYSE', 'NCLH': 'NASDAQ',
    'DIS': 'NYSE', 'WBD': 'NASDAQ', 'FOX': 'NASDAQ', 'FOXA': 'NASDAQ', 'PARA': 'NASDAQ',
    'CHTR': 'NASDAQ', 'T': 'NYSE', 'VZ': 'NYSE', 'TMUS': 'NASDAQ',
    'KKR': 'NYSE', 'MMC': 'NYSE', 'BX': 'NYSE', 'COR': 'NYSE', 'AJG': 'NYSE',
    'MSI': 'NYSE', 'WMB': 'NYSE', 'WM': 'NYSE', 'HWM': 'NYSE', 'CRH': 'NYSE',
    'GM': 'NYSE', 'MO': 'NYSE', 'GEV': 'NYSE', 'BDX': 'NYSE', 'FDX': 'NYSE',
    'KMI': 'NYSE', 'GLW': 'NYSE', 'TEL': 'NYSE', 'UPS': 'NYSE', 'VST': 'NYSE',
    'VRT': 'NYSE', 'ZTS': 'NYSE', 'NET': 'NYSE', 'PWR': 'NYSE', 'SNOW': 'NYSE',
    'RBLX': 'NYSE', 'HCA': 'NYSE', 'JCI': 'NYSE', 'CEG': 'NASDAQ', 'COIN': 'NASDAQ',
    'CTAS': 'NASDAQ', 'FISV': 'NASDAQ', 'DASH': 'NASDAQ',
    'MSTR': 'NASDAQ', 'CRWD': 'NASDAQ', 'HOOD': 'NASDAQ', 'APP': 'NASDAQ',
    'ADP': 'NASDAQ', 'ALNY': 'NASDAQ', 'IDXX': 'NASDAQ', 'EA': 'NASDAQ',
    'ADSK': 'NASDAQ', 'BRK.B': 'NYSE', 'V': 'NYSE', 'MA': 'NYSE', 'GE': 'NYSE',
    'IBM': 'NYSE', 'PM': 'NYSE', 'ACN': 'NYSE', 'APH': 'NYSE', 'ANET': 'NYSE',
    // NOW, UBER already defined in Tech Giants section
    // Energy
    'XOM': 'NYSE', 'CVX': 'NYSE', 'COP': 'NYSE', 'EOG': 'NYSE', 'SLB': 'NYSE',
    'MPC': 'NYSE', 'PSX': 'NYSE', 'VLO': 'NYSE', 'OXY': 'NYSE', 'PXD': 'NYSE',
    'DVN': 'NYSE', 'HES': 'NYSE', 'FANG': 'NASDAQ', 'HAL': 'NYSE', 'BKR': 'NASDAQ',
    // Healthcare
    'LLY': 'NYSE', 'JNJ': 'NYSE', 'UNH': 'NYSE', 'MRK': 'NYSE', 'ABBV': 'NYSE',
    'TMO': 'NYSE', 'ABT': 'NYSE', 'DHR': 'NYSE', 'BMY': 'NYSE', 'PFE': 'NYSE',
    'GILD': 'NASDAQ', 'SYK': 'NYSE', 'MDT': 'NYSE',
    'BSX': 'NYSE', 'EW': 'NYSE', 'ZBH': 'NYSE', 'PH': 'NYSE',
    // ETN, ROK, TT, AME, IR, DXCM defined in Industrial section
    // Industrial
    'CAT': 'NYSE', 'DE': 'NYSE', 'MMM': 'NYSE', 'ITW': 'NYSE', 'EMR': 'NYSE',
    'CMI': 'NYSE', 'HON': 'NASDAQ', 'UNP': 'NYSE', 'CSX': 'NYSE', 'NSC': 'NYSE',
    'GD': 'NYSE', 'LMT': 'NYSE', 'NOC': 'NYSE', 'RTX': 'NYSE', 'BA': 'NYSE',
    'LHX': 'NYSE', 'TDG': 'NYSE', 'URI': 'NYSE', 'FAST': 'NASDAQ', 'PCAR': 'NASDAQ',
    'ODFL': 'NASDAQ',
    // Materials
    'LIN': 'NASDAQ', 'APD': 'NYSE', 'ECL': 'NYSE', 'SHW': 'NYSE', 'NUE': 'NYSE',
    'FCX': 'NYSE', 'NEM': 'NYSE', 'DOW': 'NYSE', 'DD': 'NYSE', 'PPG': 'NYSE',
    'NTR': 'NYSE', 'VMC': 'NYSE', 'MLM': 'NYSE', 'BRO': 'NYSE',
    // Utilities
    'NEE': 'NYSE', 'DUK': 'NYSE', 'SO': 'NYSE', 'D': 'NYSE', 'SRE': 'NYSE',
    'AEP': 'NASDAQ', 'XEL': 'NASDAQ', 'EXC': 'NASDAQ', 'ED': 'NYSE', 'PEG': 'NYSE',
    // Real Estate
    'PLD': 'NYSE', 'AMT': 'NYSE', 'CCI': 'NYSE', 'EQIX': 'NASDAQ', 'PSA': 'NYSE',
    'SPG': 'NYSE', 'O': 'NYSE', 'WELL': 'NYSE', 'DLR': 'NYSE', 'AVB': 'NYSE',
    'EQR': 'NYSE',
    // Communication (META, NFLX, CMCSA, WBD already defined)
    // Consumer
    'PG': 'NYSE', 'KO': 'NYSE', 'MDLZ': 'NASDAQ', 'KMB': 'NASDAQ',
    'CL': 'NYSE', 'MKC': 'NYSE', 'HSY': 'NYSE', 'GIS': 'NYSE', 'K': 'NYSE',
    'STZ': 'NASDAQ',
    // ETF Symbols
    'VOO': 'NYSE', 'VTI': 'NYSE', 'IVV': 'NYSE', 'SPY': 'NYSE', 'QQQ': 'NASDAQ',
    'VGT': 'NYSE', 'VFH': 'NYSE', 'VDE': 'NYSE', 'VHT': 'NYSE', 'VIS': 'NYSE',
    'VDC': 'NYSE', 'VCR': 'NYSE', 'VAW': 'NYSE', 'VNQ': 'NYSE', 'VPU': 'NYSE',
    'VOX': 'NYSE', 'XLK': 'NYSE', 'XLF': 'NYSE', 'XLE': 'NYSE', 'XLV': 'NYSE',
    'XLI': 'NYSE', 'XLP': 'NYSE', 'XLY': 'NYSE', 'XLB': 'NYSE', 'XLRE': 'NYSE',
    'XLU': 'NYSE', 'XLC': 'NYSE',
};

export function isValidExchange(exchange: string): exchange is ExchangeCode {
    return KNOWN_EXCHANGES.includes(exchange as ExchangeCode);
}

export function getExchangeForSymbol(symbol: string): ExchangeCode | null {
    return STOCK_EXCHANGE_MAP[symbol.toUpperCase()] || null;
}

export function validateSymbolExchange(symbol: string, expectedExchange?: string): { valid: boolean; exchange: ExchangeCode | null; reason?: string } {
    const symbolUpper = symbol.toUpperCase();
    const exchange = getExchangeForSymbol(symbolUpper);

    if (!exchange) {
        return { valid: false, exchange: null, reason: `Unknown exchange for symbol ${symbol}` };
    }

    if (expectedExchange && exchange !== expectedExchange) {
        return { valid: false, exchange, reason: `Expected ${expectedExchange} but got ${exchange}` };
    }

    return { valid: true, exchange };
}