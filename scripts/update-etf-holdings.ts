#!/usr/bin/env tsx

import axios from 'axios';
import * as cheerio from 'cheerio';
import * as fs from 'fs/promises';
import * as path from 'path';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

interface Holding {
    name: string;
    displayName: string;
}

interface ETFConfig {
    symbol: string;
    name: string;
    sourceUrl: string;
    holdings: Holding[];
}

// Known exchange mappings for common stocks
// This helps quickly resolve exchanges without API calls
const KNOWN_EXCHANGES: Record<string, string> = {
    // Major NYSE stocks
    'JPM': 'NYSE', 'BAC': 'NYSE', 'WFC': 'NYSE', 'C': 'NYSE', 'GS': 'NYSE',
    'MS': 'NYSE', 'BLK': 'NYSE', 'SCHW': 'NYSE', 'AXP': 'NYSE', 'BK': 'NYSE',
    'XOM': 'NYSE', 'CVX': 'NYSE', 'COP': 'NYSE', 'SLB': 'NYSE', 'EOG': 'NYSE',
    'JNJ': 'NYSE', 'UNH': 'NYSE', 'LLY': 'NYSE', 'ABBV': 'NYSE', 'MRK': 'NYSE',
    'TMO': 'NYSE', 'ABT': 'NYSE', 'DHR': 'NYSE', 'BMY': 'NYSE', 'PFE': 'NYSE',
    'WMT': 'NASDAQ', 'HD': 'NYSE', 'MCD': 'NYSE', 'NKE': 'NYSE', 'SBUX': 'NASDAQ',
    'V': 'NYSE', 'MA': 'NYSE', 'DIS': 'NYSE', 'BA': 'NYSE', 'CAT': 'NYSE',
    'NEE': 'NYSE', 'DUK': 'NYSE', 'SO': 'NYSE', 'D': 'NYSE', 'SRE': 'NYSE',
    'LIN': 'NASDAQ', 'NEM': 'NYSE', 'SHW': 'NYSE', 'ECL': 'NYSE', 'FCX': 'NYSE',
    'APD': 'NYSE', 'CTVA': 'NYSE', 'VMC': 'NYSE', 'MLM': 'NYSE', 'NUE': 'NYSE',

    // Major NASDAQ stocks
    'AAPL': 'NASDAQ', 'MSFT': 'NASDAQ', 'GOOGL': 'NASDAQ', 'GOOG': 'NASDAQ',
    'AMZN': 'NASDAQ', 'META': 'NASDAQ', 'TSLA': 'NASDAQ', 'NVDA': 'NASDAQ',
    'NFLX': 'NASDAQ', 'ADBE': 'NASDAQ', 'CSCO': 'NASDAQ', 'INTC': 'NASDAQ',
    'AMD': 'NASDAQ', 'QCOM': 'NASDAQ', 'AVGO': 'NASDAQ', 'TXN': 'NASDAQ',
    'COST': 'NASDAQ', 'CMCSA': 'NASDAQ', 'PEP': 'NASDAQ', 'AMGN': 'NASDAQ',
    'GILD': 'NASDAQ', 'ISRG': 'NASDAQ', 'VRTX': 'NASDAQ', 'REGN': 'NASDAQ',
    'MDLZ': 'NASDAQ', 'ADP': 'NASDAQ', 'PYPL': 'NASDAQ', 'ADSK': 'NASDAQ',
    'CEG': 'NASDAQ', 'AEP': 'NASDAQ', 'XEL': 'NASDAQ', 'EXC': 'NASDAQ',
    'BKR': 'NASDAQ', 'FANG': 'NASDAQ', 'EXE': 'NASDAQ', 'STLD': 'NASDAQ',
    'RGLD': 'NASDAQ', 'IDXX': 'NASDAQ', 'KMB': 'NASDAQ',
};

// Cache for exchange lookups to avoid repeated API calls
const exchangeCache: Record<string, string> = { ...KNOWN_EXCHANGES };

// ETF full names mapping
const ETF_NAMES: Record<string, string> = {
    // Vanguard ETFs
    'VGT': 'Vanguard Information Technology ETF',
    'VFH': 'Vanguard Financials ETF',
    'VDE': 'Vanguard Energy ETF',
    'VHT': 'Vanguard Health Care ETF',
    'VIS': 'Vanguard Industrials ETF',
    'VDC': 'Vanguard Consumer Staples ETF',
    'VCR': 'Vanguard Consumer Discretionary ETF',
    'VAW': 'Vanguard Materials ETF',
    'VNQ': 'Vanguard Real Estate ETF',
    'VPU': 'Vanguard Utilities ETF',
    'VOX': 'Vanguard Communication Services ETF',

    // SPDR ETFs
    'XLK': 'Technology Select Sector SPDR Fund',
    'XLF': 'Financial Select Sector SPDR Fund',
    'XLE': 'Energy Select Sector SPDR Fund',
    'XLV': 'Health Care Select Sector SPDR Fund',
    'XLI': 'Industrial Select Sector SPDR Fund',
    'XLP': 'Consumer Staples Select Sector SPDR Fund',
    'XLY': 'Consumer Discretionary Select Sector SPDR Fund',
    'XLB': 'Materials Select Sector SPDR Fund',
    'XLRE': 'Real Estate Select Sector SPDR Fund',
    'XLU': 'Utilities Select Sector SPDR Fund',
    'XLC': 'Communication Services Select Sector SPDR Fund',

    // iShares US ETFs
    'IYW': 'iShares U.S. Technology ETF',
    'IYF': 'iShares U.S. Financials ETF',
    'IYE': 'iShares U.S. Energy ETF',
    'IYH': 'iShares U.S. Healthcare ETF',
    'IYJ': 'iShares U.S. Industrials ETF',
    'IYK': 'iShares U.S. Consumer Staples ETF',
    'IYC': 'iShares U.S. Consumer Discretionary ETF',
    'IYM': 'iShares U.S. Basic Materials ETF',
    'IYR': 'iShares U.S. Real Estate ETF',
    'IDU': 'iShares U.S. Utilities ETF',
    'IYZ': 'iShares U.S. Telecommunications ETF',

    // iShares Global ETFs (future support)
    'IXN': 'iShares Global Tech ETF',
    'IXG': 'iShares Global Financials ETF',
    'IXC': 'iShares Global Energy ETF',
    'IXJ': 'iShares Global Healthcare ETF',
    'EXI': 'iShares Global Industrials ETF',
    'KXI': 'iShares Global Consumer Staples ETF',
    'RXI': 'iShares Global Consumer Discretionary ETF',
    'MXI': 'iShares Global Materials ETF',
    'REET': 'iShares Global REIT ETF',
    'JXI': 'iShares Global Utilities ETF',
    'IXP': 'iShares Global Comm Services ETF',
};

// Provider definitions for batch updates
const VANGUARD_ETFS = [
    'VGT', 'VFH', 'VDE', 'VHT', 'VIS', 'VDC', 'VCR', 'VAW', 'VNQ', 'VPU', 'VOX',
];

const SPDR_ETFS = [
    'XLK', 'XLF', 'XLE', 'XLV', 'XLI', 'XLP', 'XLY', 'XLB', 'XLRE', 'XLU', 'XLC',
];

const ISHARES_ETFS = [
    'IYW', 'IYF', 'IYE', 'IYH', 'IYJ', 'IYK', 'IYC', 'IYM', 'IYR', 'IDU', 'IYZ',
];

const ALL_PROVIDERS = {
    vanguard: VANGUARD_ETFS,
    spdr: SPDR_ETFS,
    ishares: ISHARES_ETFS,
};

/**
 * Fetch correct exchange for a stock symbol using Finnhub API
 * Falls back to NASDAQ if unable to determine
 */
async function getCorrectExchange(symbol: string): Promise<string> {
    // Check cache first
    if (exchangeCache[symbol]) {
        return exchangeCache[symbol];
    }

    const apiKey = process.env.FINNHUB_API_KEY;

    if (!apiKey) {
        console.warn(`⚠️  No Finnhub API key, defaulting ${symbol} to NASDAQ`);
        exchangeCache[symbol] = 'NASDAQ';
        return 'NASDAQ';
    }

    try {
        // Use Finnhub API to get stock profile which includes exchange
        const response = await axios.get('https://finnhub.io/api/v1/stock/profile2', {
            params: {
                symbol: symbol,
                token: apiKey
            },
            timeout: 5000
        });

        const exchange = response.data?.exchange || '';

        // Map Finnhub exchange names to our format
        let mappedExchange: string;
        if (exchange.includes('NEW YORK') || exchange === 'NYE' || exchange === 'NYSE') {
            mappedExchange = 'NYSE';
        } else if (exchange.includes('NASDAQ') || exchange === 'NMS' || exchange === 'NGM') {
            mappedExchange = 'NASDAQ';
        } else if (exchange.includes('OTC')) {
            mappedExchange = 'OTC';
        } else if (exchange.includes('AMEX')) {
            mappedExchange = 'AMEX';
        } else {
            console.warn(`⚠️  Unknown exchange "${exchange}" for ${symbol}, defaulting to NASDAQ`);
            mappedExchange = 'NASDAQ';
        }

        exchangeCache[symbol] = mappedExchange;
        return mappedExchange;

    } catch (error) {
        console.warn(`⚠️  Failed to fetch exchange for ${symbol}, defaulting to NASDAQ`);
        exchangeCache[symbol] = 'NASDAQ';
        return 'NASDAQ';
    }
}

/**
 * Scrape ETF holdings from stockanalysis.com
 */
async function scrapeETFHoldings(symbol: string): Promise<ETFConfig | null> {
    const url = `https://stockanalysis.com/etf/${symbol.toLowerCase()}/holdings/`;

    try {
        console.log(`📡 Fetching ${symbol} from ${url}`);

        const response = await axios.get(url, {
            timeout: 10000,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        });

        const $ = cheerio.load(response.data);

        // Get ETF name from mapping first, fallback to web scraping
        const symbolUpper = symbol.toUpperCase();
        const etfName = ETF_NAMES[symbolUpper] || $('h1').first().text().trim() || `${symbolUpper} ETF`;

        // Find holdings table
        const holdings: Holding[] = [];
        const rows = $('table tbody tr').slice(0, 25); // Top 25 holdings

        if (rows.length === 0) {
            console.error(`❌ No holdings found for ${symbol}`);
            return null;
        }

        for (let i = 0; i < rows.length; i++) {
            const row = rows.eq(i);
            const cells = row.find('td');

            if (cells.length < 2) continue;

            // stockanalysis.com structure:
            // Column 0: Rank (#)
            // Column 1: Symbol
            // Column 2: Company Name
            // Column 3: % Weight

            // Extract symbol
            const stockSymbol = cells.eq(1).text().trim();

            // Extract company name
            const companyName = cells.eq(2).text().trim();

            // Extract weight percentage
            let weight = '';
            if (cells.length >= 4) {
                const weightText = cells.eq(3).text().trim();
                // Match percentage like "15.07%"
                const weightMatch = weightText.match(/([\d.]+)%/);
                if (weightMatch) {
                    weight = weightMatch[0];
                }
            }

            // Skip invalid or non-stock entries
            if (!stockSymbol || !companyName) continue;

            // Filter out non-US stocks and special entries
            const symbolLower = stockSymbol.toLowerCase();
            if (symbolLower === 'n/a' ||
                stockSymbol.includes(':') || // Already has exchange prefix (e.g., "SWX: AMRZ")
                symbolLower.includes('trs:') ||
                symbolLower.includes('mktliq')) {
                console.log(`  ⏭️  Skipping non-US stock: ${stockSymbol} - ${companyName}`);
                continue;
            }

            // Get correct exchange
            console.log(`  🔍 Verifying exchange for ${stockSymbol}...`);
            const exchange = await getCorrectExchange(stockSymbol);

            // Add small delay to avoid rate limiting
            await new Promise(resolve => setTimeout(resolve, 500));

            holdings.push({
                name: `${exchange}:${stockSymbol}`,
                displayName: `${stockSymbol} - ${companyName}${weight ? ` (${weight})` : ''}`
            });

            console.log(`  ✅ ${exchange}:${stockSymbol} - ${companyName} ${weight}`);
        }

        return {
            symbol: symbol.toUpperCase(),
            name: etfName,
            sourceUrl: url,
            holdings
        };

    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error(`❌ Failed to fetch ${symbol}: ${error.message}`);
        } else {
            console.error(`❌ Error processing ${symbol}:`, error);
        }
        return null;
    }
}

/**
 * Save ETF config to JSON file
 */
async function saveETFConfig(config: ETFConfig): Promise<void> {
    const outputDir = path.join(process.cwd(), 'public', 'data', 'etf-holdings');
    await fs.mkdir(outputDir, { recursive: true });

    const outputPath = path.join(outputDir, `${config.symbol}.json`);
    await fs.writeFile(outputPath, JSON.stringify(config, null, 2), 'utf-8');

    console.log(`💾 Saved ${config.symbol}.json with ${config.holdings.length} holdings`);
}

/**
 * Main function
 */
async function main() {
    const args = process.argv.slice(2);

    let symbols: string[] = [];

    // Parse command line arguments
    if (args.includes('--help') || args.length === 0) {
        console.log(`
Usage: tsx scripts/update-etf-holdings.ts [options] [symbols...]

Options:
  --all-vanguard     Update all Vanguard sector ETFs (11 ETFs)
  --all-spdr         Update all SPDR sector ETFs (11 ETFs)
  --all-ishares      Update all iShares US sector ETFs (11 ETFs)
  --all              Update ETFs from all providers (33 ETFs)
  --provider NAME    Update ETFs for specific provider (vanguard, spdr, ishares)
  --symbols LIST     Update comma-separated list of ETFs
  --help             Show this help message

Examples:
  tsx scripts/update-etf-holdings.ts --all-vanguard
  tsx scripts/update-etf-holdings.ts --all-spdr
  tsx scripts/update-etf-holdings.ts --all-ishares
  tsx scripts/update-etf-holdings.ts --all
  tsx scripts/update-etf-holdings.ts --provider spdr
  tsx scripts/update-etf-holdings.ts --symbols VGT,XLK,IYW
  tsx scripts/update-etf-holdings.ts VGT XLK IYW
`);
        return;
    }

    // Handle --all flag (all providers)
    if (args.includes('--all')) {
        symbols = [...VANGUARD_ETFS, ...SPDR_ETFS, ...ISHARES_ETFS];
    }
    // Handle --all-vanguard flag
    else if (args.includes('--all-vanguard')) {
        symbols = VANGUARD_ETFS;
    }
    // Handle --all-spdr flag
    else if (args.includes('--all-spdr')) {
        symbols = SPDR_ETFS;
    }
    // Handle --all-ishares flag
    else if (args.includes('--all-ishares')) {
        symbols = ISHARES_ETFS;
    }
    // Handle --provider flag
    else if (args.includes('--provider')) {
        const providerIndex = args.indexOf('--provider');
        const providerName = args[providerIndex + 1]?.toLowerCase();
        if (providerName && ALL_PROVIDERS[providerName as keyof typeof ALL_PROVIDERS]) {
            symbols = ALL_PROVIDERS[providerName as keyof typeof ALL_PROVIDERS];
        } else {
            console.error('Error: Unknown provider. Use: vanguard, spdr, or ishares');
            console.log('Available providers: vanguard, spdr, ishares');
            return;
        }
    }
    // Handle --symbols flag
    else if (args.includes('--symbols')) {
        const symbolsIndex = args.indexOf('--symbols');
        const symbolsArg = args[symbolsIndex + 1];
        if (symbolsArg) {
            symbols = symbolsArg.split(',').map(s => s.trim().toUpperCase());
        }
    }
    // Handle positional arguments (individual symbols)
    else if (args.length > 0) {
        symbols = args.map(s => s.trim().toUpperCase());
    } else {
        console.log('Usage:');
        console.log('  tsx scripts/update-etf-holdings.ts --all-vanguard');
        console.log('  tsx scripts/update-etf-holdings.ts --all-spdr');
        console.log('  tsx scripts/update-etf-holdings.ts --all-ishares');
        console.log('  tsx scripts/update-etf-holdings.ts --all');
        console.log('  tsx scripts/update-etf-holdings.ts --provider spdr');
        console.log('  tsx scripts/update-etf-holdings.ts --symbols VGT,VFH,VHT');
        console.log('  tsx scripts/update-etf-holdings.ts VGT VFH VHT');
        return;
    }

    console.log(`\n🚀 Starting ETF holdings update for ${symbols.length} ETFs\n`);

    for (const symbol of symbols) {
        console.log(`\n${'='.repeat(60)}`);
        console.log(`Processing ${symbol}`);
        console.log('='.repeat(60));

        const config = await scrapeETFHoldings(symbol);

        if (config) {
            await saveETFConfig(config);
        }

        // Add delay between ETFs to be nice to the server
        await new Promise(resolve => setTimeout(resolve, 2000));
    }

    console.log('\n✨ ETF holdings update complete!\n');
}

main().catch(console.error);
