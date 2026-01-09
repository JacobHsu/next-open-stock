## ADDED Requirements

### Requirement: Exchange Code Validation
The system SHALL validate exchange codes (NYSE, NASDAQ, AMEX, etc.) for all ETF holdings symbols.

#### Scenario: Valid NYSE Exchange Code
- **WHEN** a symbol with NYSE exchange is processed
- **THEN** the system SHALL accept the exchange code as valid

#### Scenario: Valid NASDAQ Exchange Code
- **WHEN** a symbol with NASDAQ exchange is processed
- **THEN** the system SHALL accept the exchange code as valid

#### Scenario: Valid AMEX Exchange Code
- **WHEN** a symbol with AMEX exchange is processed
- **THEN** the system SHALL accept the exchange code as valid

### Requirement: VTI Symbols Validation
The system SHALL validate all VTI symbols from `lib/configs/sp500-config.ts`.

#### Scenario: All VTI Symbols Valid
- **WHEN** all VTI symbols are validated
- **THEN** the system SHALL verify exchange codes against KNOWN_EXCHANGES

### Requirement: Exchange Validation with Finnhub API
The system SHALL use Finnhub API for real-time exchange verification.

#### Scenario: Finnhub API Integration
- **WHEN** Finnhub API is available
- **THEN** the system SHALL verify exchange codes in real-time

#### Scenario: Finnhub API Fallback
- **WHEN** Finnhub API is unavailable
- **THEN** the system SHALL use KNOWN_EXCHANGES constant for validation

### Requirement: Invalid Exchange Code Handling
The system SHALL handle invalid exchange codes gracefully.

#### Scenario: Invalid Exchange Code
- **WHEN** an invalid exchange code is detected
- **THEN** the system SHALL log the error
- **AND** the system SHALL continue processing with fallback validation
