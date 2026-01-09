# Change: Exchange Code Validation for ETF Holdings

## Why
The OpenStock platform needs to validate exchange codes (NYSE, NASDAQ, AMEX, etc.) to ensure data integrity when processing ETF holdings from sp500-config.ts. This validation prevents incorrect exchange labels and improves data quality for TradingView widgets.

## What Changes
- Added exchange code validation using `KNOWN_EXCHANGES` constant (NYSE, NASDAQ, AMEX, etc.) in `lib/constants.ts`
- Added `STOCK_EXCHANGE_MAP` with 150+ major stock symbol-to-exchange mappings
- Added `validateSymbolExchange()` function for symbol validation
- Created `scripts/validate-vti-symbols.ts` validation script
- Validates all VTI symbols from `lib/configs/sp500-config.ts` (200 symbols)
- Finnhub API integration already exists in `scripts/update-etf-holdings.ts`

## Impact
- Affected specs: `exchange-validation`
- Affected code:
  - `lib/constants.ts` - Exchange code constants and validation functions
  - `scripts/validate-vti-symbols.ts` - VTI symbols validation script
  - `scripts/update-etf-holdings.ts` - Already has exchange validation (no changes needed)
  - `lib/configs/sp500-config.ts` - VTI symbols source

## Validation Results
- Total VTI symbols: 200
- Valid: 138 (69%)
- Invalid (unknown in map): 62 (31%)
- NYSE breakdown: 91/135 valid (67.4%)
- NASDAQ breakdown: 47/65 valid (72.3%)
