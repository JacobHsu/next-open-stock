// ETF Holdings Types
// Types for dynamic ETF holdings data

export interface ETFHolding {
    name: string;
    displayName: string;
}

export interface ETFHoldingConfig {
    symbol: string;
    name: string;
    sourceUrl: string;
    holdings: ETFHolding[];
}

/**
 * Fetch ETF holdings configuration from static JSON file
 * @param symbol - The ETF symbol (e.g., 'VAW', 'VPU')
 * @returns Promise with ETF config or null if not found
 */
export async function fetchETFHoldings(symbol: string): Promise<ETFHoldingConfig | null> {
    try {
        const upperSymbol = symbol.toUpperCase();
        const response = await fetch(`/data/etf-holdings/${upperSymbol}.json`);

        if (!response.ok) {
            return null;
        }

        const data: ETFHoldingConfig = await response.json();
        return data;
    } catch (error) {
        console.error(`Failed to fetch ETF holdings for ${symbol}:`, error);
        return null;
    }
}
