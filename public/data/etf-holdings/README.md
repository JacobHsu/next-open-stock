# ETF Holdings Data

This directory contains static JSON files for ETF holdings data.

## File Structure

Each ETF has its own JSON file named with the ETF symbol (e.g., `VAW.json`, `VPU.json`).

## JSON Format

```json
{
  "symbol": "ETF_SYMBOL",
  "name": "Full ETF Name",
  "sourceUrl": "https://source-website.com/etf/symbol/holdings/",
  "holdings": [
    {
      "name": "EXCHANGE:TICKER",
      "displayName": "TICKER - Company Name (XX.XX%)"
    }
  ]
}
```

## Adding a New ETF

1. Create a new JSON file: `public/data/etf-holdings/SYMBOL.json`
2. Follow the JSON format above
3. The file will be automatically loaded when visiting `/etf/symbol`

### Example: Adding QQQ

```json
{
  "symbol": "QQQ",
  "name": "Invesco QQQ Trust",
  "sourceUrl": "https://stockanalysis.com/etf/qqq/holdings/",
  "holdings": [
    { "name": "NASDAQ:AAPL", "displayName": "AAPL - Apple Inc. (10.5%)" },
    { "name": "NASDAQ:MSFT", "displayName": "MSFT - Microsoft Corp. (9.2%)" }
  ]
}
```

## Benefits of This Approach

- **Scalability**: Add unlimited ETFs without code changes
- **No Bundle Impact**: JSON files loaded on-demand
- **Easy Updates**: Update holdings without redeployment
- **Type Safety**: TypeScript types in `lib/types/etf-holdings.ts`

## TypeScript Integration

Import types from `lib/types/etf-holdings.ts`:

```typescript
import { fetchETFHoldings, ETFHoldingConfig } from "@/lib/types/etf-holdings";

const etfData = await fetchETFHoldings("VAW");
```
