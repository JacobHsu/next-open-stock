## 1. Implementation
- [x] 1.1 Create scraping script (`scripts/update-etf-holdings.ts`)
- [x] 1.2 Add exchange validation (KNOWN_EXCHANGES + Finnhub API)
- [x] 1.3 Create JSON data directory and initial ETF files
- [x] 1.4 Add TypeScript types (`lib/types/etf-holdings.ts`)
- [x] 1.5 Create ETF widget component (`components/ETFMarketDataWidget.tsx`)
- [x] 1.6 Create ETF pages (`app/(root)/etf/`)
- [x] 1.7 Add SPDR ETF definitions to script
- [x] 1.8 Add iShares US ETF definitions to script
- [x] 1.9 Update Vanguard definitions to match `ETF_MARKET_OVERVIEW_WIDGET_CONFIG`

## 2. CLI Enhancement
- [x] 2.1 Add `--all-spdr` flag support
- [x] 2.2 Add `--all-ishares` flag support
- [x] 2.3 Add `--provider` flag for batch updates by provider name
- [x] 2.4 Update help text with all available options

## 3. Automation
- [x] 3.1 Create GitHub Actions workflow for monthly updates
- [x] 3.2 Add `FINNHUB_API_KEY` secret configuration
- [x] 3.3 Update workflow to support SPDR and iShares batch updates
- [x] 3.4 Add separate scheduled workflows for each provider (optional) - Not needed, single workflow handles all

## 4. Data Coverage
- [x] 4.1 Vanguard ETFs defined (11)
- [x] 4.2 SPDR ETFs defined (11)
- [x] 4.3 iShares US ETFs defined (11)
- [x] 4.4 Exchange validation logic implemented (KNOWN_EXCHANGES + Finnhub API)

## 5. Documentation
- [x] 5.1 Create `docs/ETF_HOLDINGS_UPDATE_GUIDE.md`
- [x] 5.2 Add `public/data/etf-holdings/README.md`
- [x] 5.3 Update guide with new CLI commands
- [x] 5.4 Document provider-specific batch commands

## 6. Testing (complete)
- [x] 6.1 Verify scraping works for all Vanguard ETFs (11/11 ✓)
- [x] 6.2 Verify scraping works for all SPDR ETFs (11/11 ✓)
- [x] 6.3 Verify scraping works for all iShares ETFs (11/11 ✓)
- [x] 6.4 Verify exchange validation is correct (KNOWN_EXCHANGES + Finnhub API ✓)
- [x] 6.5 Verify TradingView widget displays holdings correctly
- [x] 6.6 Verify GitHub Actions workflow runs successfully
- [x] 6.7 Verify CLI commands work as expected

## 7. Deployment (complete)
- [x] 7.1 All 33+ ETF JSON files generated successfully
- [x] 7.2 Ready for deployment to production
- [x] 7.3 GitHub Actions ready for first automated run (monthly cron)
- [x] 7.4 Complete coverage: Vanguard (11) + SPDR (11) + iShares US (11)
