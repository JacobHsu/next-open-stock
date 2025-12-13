import { NextResponse } from 'next/server';
import { NASDAQ100_MARKET_DATA_WIDGET_CONFIG } from '@/lib/configs/nasdaq100-config';

const FINNHUB_BASE_URL = 'https://finnhub.io/api/v1';

interface FinnhubQuote {
  c: number;  // Current price
  d: number;  // Change
  dp: number; // Percent change
  h: number;  // High price of the day
  l: number;  // Low price of the day
  o: number;  // Open price of the day
  pc: number; // Previous close price
  t: number;  // Timestamp
}

interface TopMover {
  symbol: string;
  changePercent: number;
}

/**
 * Process items in batches to avoid rate limits
 */
async function processBatches<T, R>(
  items: T[],
  batchSize: number,
  processor: (item: T) => Promise<R>
): Promise<R[]> {
  const results: R[] = [];

  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    const batchResults = await Promise.all(batch.map(processor));
    results.push(...batchResults);
  }

  return results;
}

/**
 * API endpoint to get top losers from QQQ holdings
 * Processes all symbols in batches of 50 to avoid rate limits
 * GET /api/etf/top-losers?symbol=QQQ&limit=5
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const symbol = searchParams.get('symbol') || 'QQQ';
    const limit = parseInt(searchParams.get('limit') || '5', 10);

    const token = process.env.FINNHUB_API_KEY ?? process.env.NEXT_PUBLIC_FINNHUB_API_KEY;
    if (!token) {
      return NextResponse.json(
        { error: 'FINNHUB API key is not configured' },
        { status: 500 }
      );
    }

    // Get QQQ holdings from config
    const qqqGroup = NASDAQ100_MARKET_DATA_WIDGET_CONFIG.symbolsGroups.find(
      (group) => group.name === symbol
    );

    if (!qqqGroup) {
      return NextResponse.json(
        { error: `Symbol group ${symbol} not found` },
        { status: 404 }
      );
    }

    // Extract symbols (remove exchange prefix like "NASDAQ:")
    const symbols = qqqGroup.symbols
      .map((s) => s.name.split(':')[1])
      .filter(Boolean); // No limit - process all symbols in batches

    // Fetch quotes in batches to avoid rate limits
    const fetchQuote = async (sym: string): Promise<TopMover | null> => {
      try {
        const url = `${FINNHUB_BASE_URL}/quote?symbol=${encodeURIComponent(sym)}&token=${token}`;
        const res = await fetch(url, {
          next: { revalidate: 86400 } // Cache for 1 day (24 hours)
        });

        if (!res.ok) {
          console.error(`Failed to fetch quote for ${sym}:`, res.status);
          return null;
        }

        const quote: FinnhubQuote = await res.json();

        // Return null if no valid data
        if (quote.c === 0 || quote.dp === undefined) {
          return null;
        }

        return {
          symbol: sym,
          changePercent: quote.dp
        } as TopMover;
      } catch (error) {
        console.error(`Error fetching quote for ${sym}:`, error);
        return null;
      }
    };

    // Process symbols in batches of 50 to avoid rate limits
    const results = await processBatches(symbols, 50, fetchQuote);

    // Filter out nulls and sort by change percent (ascending for losers)
    const validResults = results.filter((r): r is TopMover => r !== null);
    const topLosers = validResults
      .sort((a, b) => a.changePercent - b.changePercent)
      .slice(0, limit);

    return NextResponse.json({
      success: true,
      symbol,
      topLosers,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error in top-losers API:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
