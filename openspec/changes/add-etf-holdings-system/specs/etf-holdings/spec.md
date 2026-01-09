## ADDED Requirements

### Requirement: ETF Holdings Data Storage
The system SHALL store ETF holdings data as static JSON files in the `public/data/etf-holdings/` directory.

#### Scenario: JSON file structure
- **WHEN** an ETF holdings file is created
- **THEN** it SHALL contain `symbol`, `name`, `sourceUrl`, and `holdings` fields
- **AND** each holding SHALL have `name` (format: `EXCHANGE:SYMBOL`) and `displayName` fields

#### Scenario: Supported ETF formats
- **WHEN** storing ETF data
- **THEN** the system SHALL support Vanguard ETFs (e.g., VGT, VFH, VHT)
- **AND** the system SHALL support SPDR ETFs (e.g., XLK, XLF, XLE)
- **AND** the system SHALL support iShares ETFs (e.g., IYW, IYF, IYE)

#### Scenario: Complete provider coverage
- **WHEN** all ETF providers are fully scraped
- **THEN** the system SHALL have JSON files for 33 ETFs:
  - 11 Vanguard sector ETFs
  - 11 SPDR sector ETFs
  - 11 iShares US sector ETFs

### Requirement: ETF Holdings Scraping
The system SHALL provide a script to scrape ETF holdings from stockanalysis.com.

#### Scenario: Scraping single ETF
- **WHEN** the script is run with an ETF symbol
- **THEN** it SHALL fetch holdings from `https://stockanalysis.com/etf/{symbol}/holdings/`
- **AND** it SHALL extract up to 25 top holdings
- **AND** it SHALL save the data to `public/data/etf-holdings/{SYMBOL}.json`

#### Scenario: Scraping multiple ETFs
- **WHEN** the script is run with multiple symbols
- **THEN** it SHALL process each ETF sequentially
- **AND** it SHALL add delays between requests to avoid rate limiting

#### Scenario: Vanguard batch update
- **WHEN** the script is run with `--all-vanguard` flag
- **THEN** it SHALL update all 11 Vanguard ETFs defined in `ETF_MARKET_OVERVIEW_WIDGET_CONFIG`

#### Scenario: SPDR batch update
- **WHEN** the script is run with `--all-spdr` flag
- **THEN** it SHALL update all 11 SPDR ETFs defined in `ETF_MARKET_OVERVIEW_WIDGET_CONFIG`

#### Scenario: iShares batch update
- **WHEN** the script is run with `--all-ishares` flag
- **THEN** it SHALL update all 11 iShares US ETFs defined in `ETF_MARKET_OVERVIEW_WIDGET_CONFIG`

#### Scenario: Provider batch update
- **WHEN** the script is run with `--provider` flag
- **THEN** it SHALL accept provider name as argument (vanguard, spdr, ishares)
- **AND** it SHALL update all ETFs for the specified provider

### Requirement: Exchange Validation
The system SHALL validate and correct stock exchange labels (NYSE vs NASDAQ) for holdings.

#### Scenario: Known exchange mapping
- **WHEN** a stock symbol is in the KNOWN_EXCHANGES mapping
- **THEN** the system SHALL use the predefined exchange without API calls

#### Scenario: Finnhub API fallback
- **WHEN** a stock symbol is not in the known mapping
- **THEN** the system SHALL query the Finnhub API for exchange information
- **AND** the system SHALL map Finnhub responses to NYSE, NASDAQ, OTC, or AMEX

#### Scenario: Cache mechanism
- **WHEN** exchange lookup is performed
- **THEN** the result SHALL be cached for the duration of the script execution
- **AND** subsequent lookups for the same symbol SHALL use the cached value

### Requirement: ETF Holdings API
The system SHALL provide a function to fetch ETF holdings data.

#### Scenario: Fetching ETF holdings
- **WHEN** `fetchETFHoldings(symbol)` is called
- **THEN** it SHALL fetch the corresponding JSON file from `/data/etf-holdings/{SYMBOL}.json`
- **AND** it SHALL return an `ETFHoldingConfig` object or null if not found

#### Scenario: Symbol normalization
- **WHEN** `fetchETFHoldings` is called with lowercase symbol
- **THEN** it SHALL convert the symbol to uppercase before fetching

### Requirement: ETF Market Pages
The system SHALL provide web pages for ETF market overview and individual ETF details.

#### Scenario: ETF market overview page
- **WHEN** a user visits `/etf`
- **THEN** the system SHALL display ETF market overview widget
- **AND** the system SHALL display ETF heatmap widget
- **AND** the system SHALL display ETF market data widget
- **AND** the system SHALL display ETF top stories widget

#### Scenario: Individual ETF details page
- **WHEN** a user visits `/etf/{symbol}`
- **THEN** the system SHALL fetch holdings for the specified ETF
- **AND** the system SHALL display the ETF name and holdings in the market data widget
- **AND** the system SHALL show a 404 error if the ETF is not found

### Requirement: ETF Widget Component
The system SHALL provide a component to display ETF holdings using TradingView widgets.

#### Scenario: Market quotes widget
- **WHEN** `ETFMarketDataWidget` is rendered with holdings config
- **THEN** it SHALL display TradingView market quotes widget
- **AND** the widget SHALL show ETF holdings in `symbolsGroups` format
- **AND** the widget SHALL link to source URL for holdings

#### Scenario: Dynamic symbol loading
- **WHEN** ETF holdings are fetched
- **THEN** the component SHALL dynamically update the widget configuration
- **AND** the component SHALL display a loading state while fetching

### Requirement: Automated Updates
The system SHALL provide GitHub Actions workflow for automated ETF holdings updates.

#### Scenario: Scheduled monthly update
- **WHEN** the scheduled workflow triggers on the 1st of each month
- **THEN** it SHALL run the update script for configured ETF providers
- **AND** it SHALL commit and push any changes to the repository

#### Scenario: Manual workflow trigger
- **WHEN** a user manually triggers the workflow
- **THEN** they SHALL be able to specify ETF symbols or provider to update
- **AND** the workflow SHALL use the provided parameters or default to all providers

#### Scenario: Provider-specific workflow
- **WHEN** workflow is triggered with provider parameter
- **THEN** it SHALL run the appropriate batch update command:
  - `--all-vanguard` for Vanguard ETFs
  - `--all-spdr` for SPDR ETFs
  - `--all-ishares` for iShares ETFs

#### Scenario: API key availability
- **WHEN** the workflow runs
- **THEN** it SHALL have access to `FINNHUB_API_KEY` secret
- **AND** it SHALL use the secret for exchange validation during scraping

### Requirement: CLI Command Interface
The system SHALL provide a command-line interface for ETF holdings updates.

#### Scenario: Help display
- **WHEN** the script is run with no arguments or `--help`
- **THEN** it SHALL display available commands and options
- **AND** it SHALL show examples for each command type

#### Scenario: Single symbol update
- **WHEN** the script is run with a single ETF symbol
- **THEN** it SHALL update only that ETF's holdings

#### Scenario: Multiple symbol update
- **WHEN** the script is run with `--symbols` flag and comma-separated list
- **THEN** it SHALL update all specified ETFs
- **AND** it SHALL process them sequentially with appropriate delays

#### Scenario: All providers update
- **WHEN** the script is run with `--all` flag
- **THEN** it SHALL update ETFs from all supported providers (Vanguard, SPDR, iShares)
