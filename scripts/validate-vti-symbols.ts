#!/usr/bin/env tsx

import { STOCK_EXCHANGE_MAP, KNOWN_EXCHANGES, ExchangeCode } from '../lib/constants';

interface SymbolWithExchange {
    name: string;
    displayName: string;
    exchange: string;
    exchangeFromMap: ExchangeCode | null;
    isValid: boolean;
}

function extractSymbolsFromConfig(): SymbolWithExchange[] {
    const symbols: SymbolWithExchange[] = [];

    // VTI symbols group from sp500-config.ts
    const vtiSymbols = [
        { name: 'NASDAQ:NVDA', displayName: 'NVDA - NVIDIA Corp. (6.70%)' },
        { name: 'NASDAQ:MSFT', displayName: 'MSFT - Microsoft Corp. (5.99%)' },
        { name: 'NASDAQ:AAPL', displayName: 'AAPL - Apple Inc. (5.88%)' },
        { name: 'NASDAQ:AMZN', displayName: 'AMZN - Amazon.com Inc. (3.28%)' },
        { name: 'NASDAQ:META', displayName: 'META - Facebook Inc. (2.48%)' },
        { name: 'NASDAQ:AVGO', displayName: 'AVGO - Broadcom Inc. (2.41%)' },
        { name: 'NASDAQ:GOOGL', displayName: 'GOOGL - Alphabet Inc. Class A (2.20%)' },
        { name: 'NASDAQ:TSLA', displayName: 'TSLA - Tesla Inc. (1.90%)' },
        { name: 'NASDAQ:GOOG', displayName: 'GOOG - Alphabet Inc. Class C (1.75%)' },
        { name: 'NYSE:BRK.B', displayName: 'BRK.B - Berkshire Hathaway Inc. (1.40%)' },
        { name: 'NYSE:JPM', displayName: 'JPM - JPMorgan Chase & Co. (1.30%)' },
        { name: 'NYSE:LLY', displayName: 'LLY - Eli Lilly & Co. (1.01%)' },
        { name: 'NYSE:V', displayName: 'V - Visa Inc. (0.89%)' },
        { name: 'NASDAQ:NFLX', displayName: 'NFLX - Netflix Inc. (0.79%)' },
        { name: 'NYSE:XOM', displayName: 'XOM - Exxon Mobil Corp. (0.75%)' },
        { name: 'NYSE:ORCL', displayName: 'ORCL - Oracle Corp. (0.74%)' },
        { name: 'NYSE:MA', displayName: 'MA - Mastercard Inc. (0.71%)' },
        { name: 'NASDAQ:WMT', displayName: 'WMT - Walmart Inc. (0.70%)' },
        { name: 'NYSE:JNJ', displayName: 'JNJ - Johnson & Johnson (0.69%)' },
        { name: 'NASDAQ:COST', displayName: 'COST - Costco Wholesale Corp. (0.64%)' },
        { name: 'NYSE:ABBV', displayName: 'ABBV - AbbVie Inc. (0.64%)' },
        { name: 'NYSE:HD', displayName: 'HD - Home Depot Inc. (0.63%)' },
        { name: 'NASDAQ:PLTR', displayName: 'PLTR - Palantir Technologies Inc. (0.61%)' },
        { name: 'NYSE:PG', displayName: 'PG - Procter & Gamble Co. (0.56%)' },
        { name: 'NYSE:UNH', displayName: 'UNH - UnitedHealth Group Inc. (0.49%)' },
        { name: 'NYSE:BAC', displayName: 'BAC - Bank of America Corp. (0.49%)' },
        { name: 'NYSE:CVX', displayName: 'CVX - Chevron Corp. (0.47%)' },
        { name: 'NYSE:GE', displayName: 'GE - General Electric Co. (0.47%)' },
        { name: 'NYSE:WFC', displayName: 'WFC - Wells Fargo & Co. (0.42%)' },
        { name: 'NYSE:IBM', displayName: 'IBM - IBM Corp. (0.41%)' },
        { name: 'NASDAQ:AMD', displayName: 'AMD - Advanced Micro Devices Inc. (0.41%)' },
        { name: 'NYSE:PM', displayName: 'PM - Philip Morris International Inc. (0.39%)' },
        { name: 'NASDAQ:CSCO', displayName: 'CSCO - Cisco Systems Inc. (0.38%)' },
        { name: 'NYSE:ABT', displayName: 'ABT - Abbott Laboratories (0.36%)' },
        { name: 'NYSE:GS', displayName: 'GS - Goldman Sachs Group Inc. (0.36%)' },
        { name: 'NYSE:CAT', displayName: 'CAT - Caterpillar Inc. (0.35%)' },
        { name: 'NASDAQ:LIN', displayName: 'LIN - Linde plc (0.35%)' },
        { name: 'NYSE:KO', displayName: 'KO - Coca-Cola Co. (0.35%)' },
        { name: 'NYSE:RTX', displayName: 'RTX - Raytheon Technologies Corp. (0.35%)' },
        { name: 'NYSE:MCD', displayName: 'MCD - McDonald\'s Corp. (0.34%)' },
        { name: 'NYSE:MRK', displayName: 'MRK - Merck & Co. Inc. (0.33%)' },
        { name: 'NYSE:CRM', displayName: 'CRM - Salesforce Inc. (0.33%)' },
        { name: 'NYSE:DIS', displayName: 'DIS - Walt Disney Co. (0.32%)' },
        { name: 'NYSE:UBER', displayName: 'UBER - Uber Technologies Inc. (0.32%)' },
        { name: 'NYSE:T', displayName: 'T - AT&T Inc. (0.31%)' },
        { name: 'NYSE:MS', displayName: 'MS - Morgan Stanley (0.30%)' },
        { name: 'NASDAQ:PEP', displayName: 'PEP - PepsiCo Inc. (0.30%)' },
        { name: 'NYSE:NOW', displayName: 'NOW - ServiceNow Inc. (0.30%)' },
        { name: 'NASDAQ:INTU', displayName: 'INTU - Intuit Inc. (0.30%)' },
        { name: 'NASDAQ:MU', displayName: 'MU - Micron Technology Inc. (0.29%)' },
        { name: 'NASDAQ:QCOM', displayName: 'QCOM - QUALCOMM Inc. (0.28%)' },
        { name: 'NYSE:TMO', displayName: 'TMO - Thermo Fisher Scientific Inc. (0.28%)' },
        { name: 'NASDAQ:APP', displayName: 'APP - AppLovin Corp. (0.28%)' },
        { name: 'NASDAQ:BKNG', displayName: 'BKNG - Booking Holdings Inc. (0.27%)' },
        { name: 'NYSE:C', displayName: 'C - Citigroup Inc. (0.26%)' },
        { name: 'NYSE:GEV', displayName: 'GEV - GE Vernova LLC (0.26%)' },
        { name: 'NYSE:SCHW', displayName: 'SCHW - Charles Schwab Corp. (0.26%)' },
        { name: 'NASDAQ:TXN', displayName: 'TXN - Texas Instruments Inc. (0.26%)' },
        { name: 'NYSE:VZ', displayName: 'VZ - Verizon Communications Inc. (0.26%)' },
        { name: 'NASDAQ:LRCX', displayName: 'LRCX - Lam Research Corp. (0.26%)' },
        { name: 'NYSE:TJX', displayName: 'TJX - TJX Cos. Inc. (0.25%)' },
        { name: 'NASDAQ:ISRG', displayName: 'ISRG - Intuitive Surgical Inc. (0.25%)' },
        { name: 'NYSE:BA', displayName: 'BA - Boeing Co. (0.25%)' },
        { name: 'NYSE:BLK', displayName: 'BLK - BlackRock Inc. (0.25%)' },
        { name: 'NYSE:AXP', displayName: 'AXP - American Express Co. (0.25%)' },
        { name: 'NASDAQ:AMAT', displayName: 'AMAT - Applied Materials Inc. (0.25%)' },
        { name: 'NASDAQ:AMGN', displayName: 'AMGN - Amgen Inc. (0.24%)' },
        { name: 'NYSE:ACN', displayName: 'ACN - Accenture plc (0.24%)' },
        { name: 'NYSE:APH', displayName: 'APH - Amphenol Corp. (0.24%)' },
        { name: 'NYSE:SPGI', displayName: 'SPGI - S&P Global Inc. (0.24%)' },
        { name: 'NYSE:NEE', displayName: 'NEE - NextEra Energy Inc. (0.24%)' },
        { name: 'NYSE:PFE', displayName: 'PFE - Pfizer Inc. (0.23%)' },
        { name: 'NYSE:PGR', displayName: 'PGR - Progressive Corp. (0.23%)' },
        { name: 'NASDAQ:ADBE', displayName: 'ADBE - Adobe Inc. (0.23%)' },
        { name: 'NYSE:ANET', displayName: 'ANET - Arista Networks Inc. (0.23%)' },
        { name: 'NYSE:ETN', displayName: 'ETN - Eaton Corp. plc (0.23%)' },
        { name: 'NASDAQ:KLAC', displayName: 'KLAC - KLA Corp. (0.22%)' },
        { name: 'NYSE:BSX', displayName: 'BSX - Boston Scientific Corp. (0.22%)' },
        { name: 'NYSE:LOW', displayName: 'LOW - Lowe\'s Cos. Inc. (0.22%)' },
        { name: 'NYSE:UNP', displayName: 'UNP - Union Pacific Corp. (0.22%)' },
        { name: 'NASDAQ:PANW', displayName: 'PANW - Palo Alto Networks Inc. (0.21%)' },
        { name: 'NYSE:COF', displayName: 'COF - Capital One Financial Corp. (0.21%)' },
        { name: 'NASDAQ:INTC', displayName: 'INTC - Intel Corp. (0.21%)' },
        { name: 'NASDAQ:GILD', displayName: 'GILD - Gilead Sciences Inc. (0.21%)' },
        { name: 'NASDAQ:HON', displayName: 'HON - Honeywell International Inc. (0.21%)' },
        { name: 'NYSE:DHR', displayName: 'DHR - Danaher Corp. (0.20%)' },
        { name: 'NYSE:BX', displayName: 'BX - Blackstone Inc. (0.20%)' },
        { name: 'NYSE:SYK', displayName: 'SYK - Stryker Corp. (0.20%)' },
        { name: 'NYSE:WELL', displayName: 'WELL - Welltower Inc. (0.19%)' },
        { name: 'NYSE:MDT', displayName: 'MDT - Medtronic plc (0.19%)' },
        { name: 'NASDAQ:ADI', displayName: 'ADI - Analog Devices Inc. (0.19%)' },
        { name: 'NASDAQ:ADP', displayName: 'ADP - Automatic Data Processing Inc. (0.18%)' },
        { name: 'NASDAQ:CMCSA', displayName: 'CMCSA - Comcast Corp. (0.18%)' },
        { name: 'NYSE:COP', displayName: 'COP - ConocoPhillips (0.18%)' },
        { name: 'NASDAQ:CRWD', displayName: 'CRWD - CrowdStrike Holdings Inc. (0.18%)' },
        { name: 'NYSE:DE', displayName: 'DE - Deere & Co. (0.18%)' },
        { name: 'NYSE:LMT', displayName: 'LMT - Lockheed Martin Corp. (0.18%)' },
        { name: 'NYSE:MO', displayName: 'MO - Altria Group Inc. (0.17%)' },
        { name: 'NASDAQ:TMUS', displayName: 'TMUS - T-Mobile US Inc. (0.17%)' },
        { name: 'NASDAQ:HOOD', displayName: 'HOOD - Robinhood Markets Inc. (0.17%)' },
        { name: 'NYSE:CB', displayName: 'CB - Chubb Ltd. (0.17%)' },
        { name: 'NASDAQ:CEG', displayName: 'CEG - Constellation Energy Corp. (0.16%)' },
        { name: 'NYSE:SO', displayName: 'SO - Southern Co. (0.16%)' },
        { name: 'NASDAQ:VRTX', displayName: 'VRTX - Vertex Pharmaceuticals Inc. (0.16%)' },
        { name: 'NYSE:PLD', displayName: 'PLD - Prologis Inc. (0.16%)' },
        { name: 'NYSE:PH', displayName: 'PH - Parker-Hannifin Corp. (0.15%)' },
        { name: 'NYSE:MMC', displayName: 'MMC - Marsh & McLennan Cos. Inc. (0.15%)' },
        { name: 'NYSE:MCK', displayName: 'MCK - McKesson Corp. (0.15%)' },
        { name: 'NASDAQ:SBUX', displayName: 'SBUX - Starbucks Corp. (0.15%)' },
        { name: 'NYSE:TT', displayName: 'TT - Trane Technologies plc (0.15%)' },
        { name: 'NASDAQ:CDNS', displayName: 'CDNS - Cadence Design Systems Inc. (0.15%)' },
        { name: 'NASDAQ:CME', displayName: 'CME - CME Group Inc. (0.15%)' },
        { name: 'NYSE:CVS', displayName: 'CVS - CVS Health Corp. (0.15%)' },
        { name: 'NYSE:ICE', displayName: 'ICE - Intercontinental Exchange Inc. (0.15%)' },
        { name: 'NYSE:DUK', displayName: 'DUK - Duke Energy Corp. (0.15%)' },
        { name: 'NASDAQ:DASH', displayName: 'DASH - DoorDash Inc. Class A (0.14%)' },
        { name: 'NYSE:AMT', displayName: 'AMT - American Tower Corp. (0.14%)' },
        { name: 'NYSE:BMY', displayName: 'BMY - Bristol-Myers Squibb Co. (0.14%)' },
        { name: 'NASDAQ:SNPS', displayName: 'SNPS - Synopsys Inc. (0.14%)' },
        { name: 'NYSE:WM', displayName: 'WM - Waste Management Inc. (0.14%)' },
        { name: 'NYSE:KKR', displayName: 'KKR - KKR & Co. Inc. (0.14%)' },
        { name: 'NYSE:NEM', displayName: 'NEM - Newmont Corp. (0.14%)' },
        { name: 'NYSE:NOC', displayName: 'NOC - Northrop Grumman Corp. (0.14%)' },
        { name: 'NASDAQ:ORLY', displayName: 'ORLY - O\'Reilly Automotive Inc. (0.14%)' },
        { name: 'NYSE:RBLX', displayName: 'RBLX - ROBLOX Corp. (0.13%)' },
        { name: 'NYSE:NKE', displayName: 'NKE - NIKE Inc. Class B (0.13%)' },
        { name: 'NASDAQ:MSTR', displayName: 'MSTR - MicroStrategy Inc. Class A (0.13%)' },
        { name: 'NYSE:MMM', displayName: 'MMM - 3M Co. (0.13%)' },
        { name: 'NASDAQ:MDLZ', displayName: 'MDLZ - Mondelez International Inc. Class A (0.13%)' },
        { name: 'NYSE:CRH', displayName: 'CRH - CRH plc (0.13%)' },
        { name: 'NYSE:GD', displayName: 'GD - General Dynamics Corp. (0.13%)' },
        { name: 'NASDAQ:EQIX', displayName: 'EQIX - Equinix Inc. (0.12%)' },
        { name: 'NYSE:HWM', displayName: 'HWM - Howmet Aerospace Inc. (0.12%)' },
        { name: 'NYSE:CI', displayName: 'CI - Cigna Group (0.12%)' },
        { name: 'NYSE:BK', displayName: 'BK - Bank of New York Mellon Corp. (0.12%)' },
        { name: 'NYSE:AJG', displayName: 'AJG - Arthur J Gallagher & Co. (0.12%)' },
        { name: 'NYSE:MSI', displayName: 'MSI - Motorola Solutions Inc. (0.12%)' },
        { name: 'NYSE:RCL', displayName: 'RCL - Royal Caribbean Cruises Ltd. (0.12%)' },
        { name: 'NYSE:PNC', displayName: 'PNC - PNC Financial Services Group Inc. (0.12%)' },
        { name: 'NYSE:WMB', displayName: 'WMB - Williams Cos. Inc. (0.12%)' },
        { name: 'NYSE:USB', displayName: 'USB - US Bancorp (0.12%)' },
        { name: 'NYSE:SHW', displayName: 'SHW - Sherwin-Williams Co. (0.12%)' },
        { name: 'NYSE:TDG', displayName: 'TDG - TransDigm Group Inc. (0.12%)' },
        { name: 'NYSE:SNOW', displayName: 'SNOW - Snowflake Inc. (0.11%)' },
        { name: 'NASDAQ:MRVL', displayName: 'MRVL - Marvell Technology Inc. (0.11%)' },
        { name: 'NYSE:MCO', displayName: 'MCO - Moody\'s Corp. (0.11%)' },
        { name: 'NYSE:AON', displayName: 'AON - Aon plc Class A (0.11%)' },
        { name: 'NASDAQ:ADSK', displayName: 'ADSK - Autodesk Inc. (0.11%)' },
        { name: 'NYSE:AZO', displayName: 'AZO - AutoZone Inc. (0.11%)' },
        { name: 'NASDAQ:COIN', displayName: 'COIN - Coinbase Global Inc. Class A (0.11%)' },
        { name: 'NASDAQ:CTAS', displayName: 'CTAS - Cintas Corp. (0.11%)' },
        { name: 'NYSE:ITW', displayName: 'ITW - Illinois Tool Works Inc. (0.11%)' },
        { name: 'NYSE:JCI', displayName: 'JCI - Johnson Controls International plc (0.11%)' },
        { name: 'NYSE:HCA', displayName: 'HCA - HCA Healthcare Inc. (0.11%)' },
        { name: 'NYSE:ECL', displayName: 'ECL - Ecolab Inc. (0.11%)' },
        { name: 'NYSE:ELV', displayName: 'ELV - Elevance Health Inc. (0.11%)' },
        { name: 'NYSE:EMR', displayName: 'EMR - Emerson Electric Co. (0.11%)' },
        { name: 'NASDAQ:FISV', displayName: 'FI - Fiserv Inc. (0.11%)' },
        { name: 'NYSE:EOG', displayName: 'EOG - EOG Resources Inc. (0.10%)' },
        { name: 'NYSE:GLW', displayName: 'GLW - Corning Inc. (0.10%)' },
        { name: 'NASDAQ:CSX', displayName: 'CSX - CSX Corp. (0.10%)' },
        { name: 'NYSE:CL', displayName: 'CL - Colgate-Palmolive Co. (0.10%)' },
        { name: 'NYSE:NET', displayName: 'NET - Cloudflare Inc. Class A (0.10%)' },
        { name: 'NYSE:PWR', displayName: 'PWR - Quanta Services Inc. (0.10%)' },
        { name: 'NASDAQ:PYPL', displayName: 'PYPL - PayPal Holdings Inc. (0.10%)' },
        { name: 'NYSE:NSC', displayName: 'NSC - Norfolk Southern Corp. (0.10%)' },
        { name: 'NYSE:TEL', displayName: 'TEL - TE Connectivity plc (0.10%)' },
        { name: 'NYSE:TRV', displayName: 'TRV - Travelers Cos. Inc. (0.10%)' },
        { name: 'NYSE:URI', displayName: 'URI - United Rentals Inc. (0.10%)' },
        { name: 'NYSE:UPS', displayName: 'UPS - United Parcel Service Inc. Class B (0.10%)' },
        { name: 'NYSE:VST', displayName: 'VST - Vistra Corp. (0.10%)' },
        { name: 'NYSE:VRT', displayName: 'VRT - Vertiv Holdings Co. Class A (0.09%)' },
        { name: 'NYSE:ZTS', displayName: 'ZTS - Zoetis Inc. (0.09%)' },
        { name: 'NYSE:TFC', displayName: 'TFC - Truist Financial Corp. (0.09%)' },
        { name: 'NYSE:SPG', displayName: 'SPG - Simon Property Group Inc. (0.09%)' },
        { name: 'NYSE:SRE', displayName: 'SRE - Sempra (0.09%)' },
        { name: 'NYSE:O', displayName: 'O - Realty Income Corp. (0.09%)' },
        { name: 'NASDAQ:REGN', displayName: 'REGN - Regeneron Pharmaceuticals Inc. (0.09%)' },
        { name: 'NYSE:PSX', displayName: 'PSX - Phillips 66 (0.09%)' },
        { name: 'NYSE:MPC', displayName: 'MPC - Marathon Petroleum Corp. (0.09%)' },
        { name: 'NASDAQ:MAR', displayName: 'MAR - Marriott International Inc./MD Class A (0.09%)' },
        { name: 'NYSE:LHX', displayName: 'LHX - L3Harris Technologies Inc. (0.09%)' },
        { name: 'NYSE:CMI', displayName: 'CMI - Cummins Inc. (0.09%)' },
        { name: 'NYSE:COR', displayName: 'COR - Cencora Inc. (0.09%)' },
        { name: 'NASDAQ:AEP', displayName: 'AEP - American Electric Power Co. Inc. (0.09%)' },
        { name: 'NYSE:AFL', displayName: 'AFL - Aflac Inc. (0.09%)' },
        { name: 'NYSE:APD', displayName: 'APD - Air Products & Chemicals Inc. (0.09%)' },
        { name: 'NASDAQ:ALNY', displayName: 'ALNY - Alnylam Pharmaceuticals Inc. (0.09%)' },
        { name: 'NYSE:ALL', displayName: 'ALL - Allstate Corp. (0.09%)' },
        { name: 'NYSE:GM', displayName: 'GM - General Motors Co. (0.09%)' },
        { name: 'NYSE:HLT', displayName: 'HLT - Hilton Worldwide Holdings Inc. (0.09%)' },
        { name: 'NYSE:DLR', displayName: 'DLR - Digital Realty Trust Inc. (0.09%)' },
        { name: 'NASDAQ:FTNT', displayName: 'FTNT - Fortinet Inc. (0.09%)' },
        { name: 'NASDAQ:FAST', displayName: 'FAST - Fastenal Co. (0.09%)' },
        { name: 'NYSE:FCX', displayName: 'FCX - Freeport-McMoRan Inc. (0.09%)' },
        { name: 'NYSE:FDX', displayName: 'FDX - FedEx Corp. (0.08%)' },
        { name: 'NASDAQ:EA', displayName: 'EA - Electronic Arts Inc. (0.08%)' },
        { name: 'NYSE:KMI', displayName: 'KMI - Kinder Morgan Inc. (0.08%)' },
        { name: 'NASDAQ:IDXX', displayName: 'IDXX - IDEXX Laboratories Inc. (0.08%)' },
        { name: 'NYSE:BDX', displayName: 'BDX - Becton Dickinson & Co. (0.08%)' },
    ];

    for (const symbol of vtiSymbols) {
        const exchange = symbol.name.split(':')[0];
        const ticker = symbol.name.split(':')[1];
        const exchangeFromMap = STOCK_EXCHANGE_MAP[ticker] || null;

        symbols.push({
            name: symbol.name,
            displayName: symbol.displayName,
            exchange,
            exchangeFromMap,
            isValid: exchangeFromMap !== null && exchange === exchangeFromMap
        });
    }

    return symbols;
}

function validateSymbols(): void {
    console.log('🔍 Validating VTI symbols from sp500-config.ts\n');

    const symbols = extractSymbolsFromConfig();

    let validCount = 0;
    let invalidCount = 0;
    const exchangeStats: Record<string, { total: number; valid: number; invalid: number }> = {
        'NYSE': { total: 0, valid: 0, invalid: 0 },
        'NASDAQ': { total: 0, valid: 0, invalid: 0 },
        'AMEX': { total: 0, valid: 0, invalid: 0 },
        'Unknown': { total: 0, valid: 0, invalid: 0 },
    };

    for (const symbol of symbols) {
        const exchange = symbol.exchange;

        if (!exchangeStats[exchange]) {
            exchangeStats[exchange] = { total: 0, valid: 0, invalid: 0 };
        }
        exchangeStats[exchange].total++;

        if (symbol.isValid) {
            validCount++;
            exchangeStats[exchange].valid++;
            console.log(`✅ ${symbol.name} -> ${symbol.exchangeFromMap}`);
        } else {
            invalidCount++;
            exchangeStats[exchange].invalid++;
            console.log(`❌ ${symbol.name} -> Expected: ${symbol.exchangeFromMap || 'Unknown'}, Got: ${symbol.exchange}`);
        }
    }

    console.log('\n' + '='.repeat(60));
    console.log('📊 VALIDATION SUMMARY');
    console.log('='.repeat(60));
    console.log(`Total symbols: ${symbols.length}`);
    console.log(`Valid: ${validCount} (${((validCount / symbols.length) * 100).toFixed(1)}%)`);
    console.log(`Invalid: ${invalidCount} (${((invalidCount / symbols.length) * 100).toFixed(1)}%)`);

    console.log('\n📈 Exchange Breakdown:');
    for (const [exchange, stats] of Object.entries(exchangeStats)) {
        if (stats.total > 0) {
            const validPercent = ((stats.valid / stats.total) * 100).toFixed(1);
            console.log(`  ${exchange}: ${stats.valid}/${stats.total} valid (${validPercent}%)`);
        }
    }

    console.log('\n✨ VTI symbols validation complete!');
}

validateSymbols();
