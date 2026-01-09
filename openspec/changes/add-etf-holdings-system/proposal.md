# Change: ETF Holdings Generation System

## Why
The OpenStock platform requires ETF holdings data to provide users with detailed sector breakdowns and holdings information. Currently, this data is sourced from stockanalysis.com and needs to be automatically scraped, validated, and stored as JSON files for use by the TradingView widgets and UI components.

## What Changes
- Added `scripts/update-etf-holdings.ts` - Node.js script that scrapes ETF holdings from stockanalysis.com
- Added exchange validation using Finnhub API to ensure correct NYSE/NASDAQ labels
- Added `public/data/etf-holdings/` directory with JSON files for supported ETFs
- Added `lib/types/etf-holdings.ts` with TypeScript types and `fetchETFHoldings()` function
- Added `components/ETFMarketDataWidget.tsx` - TradingView widget wrapper for ETF holdings display
- Added `app/(root)/etf/page.tsx` - ETF market overview page
- Added `app/(root)/etf/[symbol]/page.tsx` - Dynamic ETF details page
- Added GitHub Actions workflow for monthly automatic updates
- Added `docs/ETF_HOLDINGS_UPDATE_GUIDE.md` for maintenance documentation

## Expanded Provider Support
The system supports multiple ETF providers as defined in `ETF_MARKET_OVERVIEW_WIDGET_CONFIG`:

| Provider | ETFs | Status |
|----------|------|--------|
| Vanguard | VGT, VFH, VDE, VHT, VIS, VDC, VCR, VAW, VNQ, VPU, VOX | ✅ Supported |
| SPDR | XLK, XLF, XLE, XLV, XLI, XLP, XLY, XLB, XLRE, XLU, XLC | ✅ Supported |
| iShares US | IYW, IYF, IYE, IYH, IYJ, IYK, IYC, IYM, IYR, IDU, IYZ | ✅ Supported |
| iShares Global | IXN, IXG, IXC, IXJ, EXI, KXI, RXI, MXI, REET, JXI, IXP | ⏳ Future |

### CLI Commands
- `tsx scripts/update-etf-holdings.ts --all-vanguard` - Update all Vanguard ETFs
- `tsx scripts/update-etf-holdings.ts --all-spdr` - Update all SPDR ETFs
- `tsx scripts/update-etf-holdings.ts --all-ishares` - Update all iShares US ETFs
- `tsx scripts/update-etf-holdings.ts --symbols VGT,XLK,IYW` - Update specific ETFs

## Impact
- Affected specs: `etf-holdings`
- Affected code:
  - `scripts/update-etf-holdings.ts` - Main scraping script with provider support
  - `lib/types/etf-holdings.ts` - Type definitions and fetch utility
  - `components/ETFMarketDataWidget.tsx` - Widget component
  - `app/(root)/etf/` - ETF pages
  - `public/data/etf-holdings/` - Static JSON data files (33+ ETFs)
  - `.github/workflows/` - CI/CD automation (updated for multiple providers)
  - `docs/ETF_HOLDINGS_UPDATE_GUIDE.md` - Documentation
