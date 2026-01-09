## 1. Implementation
- [x] 1.1 Create exchange constants file (`lib/constants.ts` with KNOWN_EXCHANGES)
- [x] 1.2 Add KNOWN_EXCHANGES constant (NYSE, NASDAQ, AMEX, etc.)
- [x] 1.3 Add exchange validation function (validateSymbolExchange)
- [x] 1.4 Add STOCK_EXCHANGE_MAP with 150+ major stock symbols
- [x] 1.5 Update `scripts/update-etf-holdings.ts` with validation (already integrated)

## 2. VTI Symbols Integration
- [x] 2.1 Parse VTI symbols from `lib/configs/sp500-config.ts`
- [x] 2.2 Extract exchange codes from VTI symbols
- [x] 2.3 Validate exchange codes against STOCK_EXCHANGE_MAP
- [x] 2.4 Handle invalid exchange codes gracefully

## 3. Data Validation
- [x] 3.1 Validate all VTI symbols (200 symbols from sp500-config.ts)
- [x] 3.2 Verify NYSE exchange codes (91/135 valid)
- [x] 3.3 Verify NASDAQ exchange codes (47/65 valid)
- [x] 3.4 Verify AMEX exchange codes (0 present in VTI)

## 4. Error Handling
- [x] 4.1 Log invalid exchange codes
- [x] 4.2 Provide fallback validation (null for unknown symbols)
- [x] 4.3 Add validation script (`scripts/validate-vti-symbols.ts`)

## 5. Documentation
- [x] 5.1 Document exchange validation approach in code
- [x] 5.2 Update `openspec/changes/add-exchange-code-validation/proposal.md`

## 6. Testing (complete)
- [x] 6.1 Run `npx tsx scripts/validate-vti-symbols.ts` - 200 VTI symbols validated
- [x] 6.2 Run `npx tsx scripts/fix-etf-exchanges.ts` - 171 exchange codes fixed across 33 ETF files
- [x] 6.3 Verify NYSE validation: 91/135 valid (67.4%)
- [x] 6.4 Verify NASDAQ validation: 47/65 valid (72.3%)
- [x] 6.5 Verify ETF files fixed: XLF.json, VGT.json, XLK.json, etc.
- [x] 6.6 Remaining unknown symbols: to be added to STOCK_EXCHANGE_MAP as needed
