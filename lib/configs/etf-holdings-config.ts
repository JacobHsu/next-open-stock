// ETF Holdings Configuration
// Dynamic ETF holdings data for individual ETF pages

export interface ETFHoldingConfig {
    symbol: string;
    name: string;
    sourceUrl: string;
    holdings: Array<{
        name: string;
        displayName: string;
    }>;
}

export const ETF_HOLDINGS: Record<string, ETFHoldingConfig> = {
    VAW: {
        symbol: 'VAW',
        name: 'Vanguard Materials ETF',
        sourceUrl: 'https://stockanalysis.com/etf/vaw/holdings/',
        holdings: [
            { name: 'NASDAQ:LIN', displayName: 'LIN - Linde plc (15.07%)' },
            { name: 'NYSE:NEM', displayName: 'NEM - Newmont Corporation (6.82%)' },
            { name: 'NYSE:SHW', displayName: 'SHW - The Sherwin-Williams Company (6.29%)' },
            { name: 'NYSE:CRH', displayName: 'CRH - CRH plc (6.16%)' },
            { name: 'NYSE:ECL', displayName: 'ECL - Ecolab Inc. (5.01%)' },
            { name: 'NYSE:FCX', displayName: 'FCX - Freeport-McMoRan Inc. (4.58%)' },
            { name: 'NYSE:APD', displayName: 'APD - Air Products and Chemicals, Inc. (3.96%)' },
            { name: 'NYSE:CTVA', displayName: 'CTVA - Corteva, Inc. (3.21%)' },
            { name: 'NYSE:VMC', displayName: 'VMC - Vulcan Materials Company (2.93%)' },
            { name: 'NYSE:MLM', displayName: 'MLM - Martin Marietta Materials, Inc. (2.83%)' },
            { name: 'NYSE:NUE', displayName: 'NUE - Nucor Corporation (2.65%)' },
            { name: 'NYSE:DD', displayName: 'DD - DuPont de Nemours, Inc. (2.62%)' },
            { name: 'NYSE:PPG', displayName: 'PPG - PPG Industries, Inc. (1.70%)' },
            { name: 'NASDAQ:STLD', displayName: 'STLD - Steel Dynamics, Inc. (1.69%)' },
            { name: 'NYSE:IP', displayName: 'IP - International Paper Company (1.48%)' },
            { name: 'NYSE:SW', displayName: 'SW - Smurfit Westrock Plc (1.48%)' },
            { name: 'NYSE:AMCR', displayName: 'AMCR - Amcor plc (1.39%)' },
            { name: 'NYSE:PKG', displayName: 'PKG - Packaging Corporation of America (1.35%)' },
            { name: 'NYSE:DOW', displayName: 'DOW - Dow Inc. (1.29%)' },
            { name: 'NYSE:IFF', displayName: 'IFF - International Flavors & Fragrances Inc. (1.23%)' },
            { name: 'NYSE:RS', displayName: 'RS - Reliance, Inc. (1.14%)' },
            { name: 'NASDAQ:RGLD', displayName: 'RGLD - Royal Gold, Inc. (1.13%)' },
            { name: 'NYSE:RPM', displayName: 'RPM - RPM International Inc. (1.07%)' },
            { name: 'NYSE:AVY', displayName: 'AVY - Avery Dennison Corporation (1.05%)' },
            { name: 'NYSE:CF', displayName: 'CF - CF Industries Holdings, Inc. (1.03%)' },
        ],
    },
};

// Helper function to get ETF holdings config
export function getETFHoldingsConfig(symbol: string): ETFHoldingConfig | null {
    const upperSymbol = symbol.toUpperCase();
    return ETF_HOLDINGS[upperSymbol] || null;
}
